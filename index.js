import mongoose from 'mongoose';
import chalk from 'chalk';
import ora, { oraPromise } from 'ora';
import readline from 'readline';
import config from './config.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const defaultTextColor = 'cyan';
const spinnerColor = 'yellow';
const colors = {
  text: chalk[defaultTextColor],
  error: chalk.red,
  success: chalk.green,
  warn: chalk.yellow,
  info: chalk.blue,
  debug: chalk.magenta,
  special: chalk.cyanBright,
};
const logLevels = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 };
const logLevel = logLevels[config.logLevel.toLowerCase()] ?? logLevels.info;

const logDebug = (...text) => {
  if (logLevel <= logLevels.debug) console.debug(colors.debug('🛠', ...text));
};
const logInfo = (...text) => {
  if (logLevel <= logLevels.info) console.info(colors.info('ℹ', ...text));
};
const logWarn = (...text) => {
  if (logLevel <= logLevels.warn) console.warn(colors.warn('⚠', ...text));
};
const logError = (...text) => {
  if (logLevel <= logLevels.error) console.error(colors.error('⨯', ...text));
};

const promisify = (func) =>
  new Promise((resolve, reject) => {
    try {
      const result = func();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

const oraOptions = {
  color: spinnerColor,
  spinner: 'dots',
  isEnabled: true,
  discardStdin: true,
};
const load = (text, color) => {
  if (logLevel >= logLevels.warn)
    return {
      stop: () => {},
      start: () => {},
      fail: logLevel <= logLevels.error ? logError : () => {},
      info: () => {},
      succeed: () => {},
      warn: logLevel === logLevels.warn ? logWarn : () => {},
    };

  return ora({ ...oraOptions, text: chalk[color ?? defaultTextColor](text) });
};
const loadPromise = (
  promise,
  { color, text, failText, successText, ...options },
) => {
  if (logLevel === logLevels.silent) return promise;
  if (logLevel >= logLevels.warn)
    return promise.catch((error) => {
      logError(failText ?? text);
      throw error;
    });

  return oraPromise(promise, {
    ...oraOptions,
    ...options,
    text: chalk[color ?? defaultTextColor](text),
    failText: colors.error(failText),
    successText: colors.success(successText),
  }).catch((error) => {
    logDebug(error);
    throw error;
  });
};

const standardCollections = [];

function logDebugData() {
  if (logLevel > logLevels.debug) return;

  logDebug('Log Level:', logLevel);
  logDebug('Config:', JSON.stringify(config));
  logDebug('Standard Collections:', JSON.stringify(standardCollections));
}

async function initialise() {
  // Connect to mongoose
  await loadPromise(mongoose.connect(config.mongoUri), {
    text: 'Connecting to MongoDB',
    successText: 'Connected to MongoDB',
    failText: 'Failed to connect to MongoDB',
  });

  const modelsPromise = promisify(() => {
    // Create all models
    Object.keys(config.collections).forEach(async (collectionName) => {
      const { model, schema, path, data } = config.collections[collectionName];

      if (!data?.length && !path) {
        logError(`No data or path for collection '${collectionName}'!`);
        return;
      }

      let realData;

      if (path && data?.length)
        logWarn(
          `Both data and path were provided in '${collectionName}', using ${
            config.preferPath ? 'path' : 'data'
          }. To change this behavior, change 'preferPath' in config.js.`,
        );

      if (config.preferPath ? !path : data) realData = data;
      else {
        try {
          const extensionIndex = path.lastIndexOf('.');
          const extension = path.slice(extensionIndex + 1);
          const allowedExtensions = ['json', 'js', 'mjs'];

          if (
            path.lastIndexOf('.') === -1 ||
            !allowedExtensions.includes(extension)
          ) {
            logError(
              `Invalid file extension '.${extension}' in the path '${path}' of '${collectionName}'.`,
            );
            return;
          }

          realData = await import(path);
        } catch (error) {
          logError(`The path '${path}' of '${collectionName}' is invalid!`);
          logDebug(error);

          return;
        }
      }

      standardCollections.push({
        name: collectionName,
        model: mongoose.model(model, schema, collectionName),
        data: realData,
      });
    });
  });

  return loadPromise(modelsPromise, {
    text: 'Creating models',
    successText: 'Created models',
    failText: 'Failed to create models',
  })
    .then(logDebugData)
    .then(() => {
      if (standardCollections.length === 0) {
        logError('No valid collections found!');
        throw new Error('No valid collections found!');
      }
    });
}

async function dryRun() {
  await loadPromise(initialise(), {
    text: 'Initialising',
    successText: 'Initialised',
    failText: 'Failed to initialise',
  });

  // Print how many documents would be deleted and inserted for each collection
  await loadPromise(
    Promise.all([
      Promise.all(
        standardCollections.map(async ({ name, model }) => {
          const count = await model.countDocuments();

          return `${colors.special(name)} - ${colors.special(count)}`;
        }),
      ),
      promisify(() =>
        standardCollections.map(({ name, data }) =>
          data
            ? `${colors.special(name)} - ${colors.special(data.length)}`
            : logDebug(`Data is undefined in ${name}`),
        ),
      ),
    ]),
    {
      text: 'Counting documents',
      failText: 'Failed to count documents',
      successText: 'Counted documents',
    },
  ).then(([deleteMessages, insertMessages]) =>
    logInfo(
      chalk.bold('Documents that would be deleted'),
      '\n',
      deleteMessages.join('\n'),
      '\n\n',
      chalk.bold('Documents that would be inserted'),
      '\n',
      insertMessages.join('\n'),
    ),
  );
}

async function run() {
  // Initialise
  await loadPromise(initialise(), {
    text: 'Initialising',
    successText: 'Initialised',
    failText: 'Failed to initialise',
  });

  // Drop all collections
  await loadPromise(
    Promise.all(standardCollections.map(({ model }) => model.deleteMany({}))),
    {
      text: 'Dropping collections',
      successText: 'Dropped collections',
      failText: 'Failed to drop collections',
    },
  );

  // Insert all documents
  await loadPromise(
    Promise.all(
      standardCollections.map(({ model, data }) => model.insertMany(data)),
    ),
    {
      text: 'Inserting documents',
      successText: 'Inserted documents',
      failText: 'Failed to insert documents',
    },
  );
}

function startDryRun() {
  loadPromise(dryRun(), {
    text: 'Performing a dry run',
    successText: 'Dry run complete',
    failText: 'Failed to perform a dry run',
  })
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

function startRun() {
  // Prompt user whether they're sure they want to run this script
  if (!config.noPrompt)
    rl.question(
      'Running this script will delete all existing documents in the collections specified in the configuration file. Are you sure you want to continue? (y/N) ',
      (answer) => {
        rl.close();
        if (answer.toLowerCase() !== 'y') {
          logInfo('Exiting');
          process.exit(0);
        }
      },
    );

  loadPromise(run(), {
    text: 'Performing a run',
    successText: 'Run complete',
    failText: 'Failed to perform a run',
  })
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
