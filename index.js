import mongoose from 'mongoose';
import chalk from 'chalk';
import ora, { oraPromise } from 'ora';
import config from './config.js';

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
  if (logLevel <= 0) console.debug(colors.debug(...text));
};
const logInfo = (...text) => {
  if (logLevel <= 1) console.info(colors.info(...text));
};
const logWarn = (...text) => {
  if (logLevel <= 2) console.warn(colors.warn(...text));
};
const logError = (...text) => {
  if (logLevel <= 3) console.error(colors.error(...text));
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
const loadPromise = (promise, { color, text, failText, successText }) => {
  if (logLevel === logLevels.silent) return promise;
  if (logLevel >= logLevels.warn)
    return promise.catch((error) => {
      logError(failText ?? text);
      throw error;
    });

  return oraPromise(promise, {
    ...oraOptions,
    text: chalk[color ?? defaultTextColor](text),
    failText: colors.error(failText),
    successText: colors.success(successText),
  }).catch((error) => {
    logDebug(error);
    throw error;
  });
};

function logDebugData() {
  logDebug('Log Level:', logLevel);
  logDebug('Mongo URI:', config.mongoUri);
  logDebug('Config:', JSON.stringify(config));
}

async function initialise() {
  logDebugData();

  // Connect to mongoose
  await loadPromise(mongoose.connect(config.mongoUri), {
    text: 'Connecting to MongoDB',
    successText: 'Connected to MongoDB',
    failText: 'Failed to connect to MongoDB',
  });

  const modelsPromise = promisify(() => {
    // Create all models
    Object.keys(config.collections).forEach((collectionName) => {
      const collection = config.collections[collectionName];
      collection.model = mongoose.model(
        collection.model,
        collection.schema,
        collectionName,
      );
    });
  });

  return loadPromise(modelsPromise, {
    text: 'Creating models',
    successText: 'Created models',
    failText: 'Failed to create models',
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
        Object.keys(config.collections).map(async (collectionName) => {
          const { model } = config.collections[collectionName];
          const count = await model.countDocuments();

          return `${colors.special(collectionName)} - ${colors.special(count)}`;
        }),
      ),
      promisify(() =>
        Object.keys(config.collections).map((collectionName) => {
          const { data } = config.collections[collectionName];

          return `${colors.special(collectionName)} - ${colors.special(data.length)}`;
        }),
      ),
    ]),
    {
      text: 'Counting documents',
      failText: 'Failed to count documents',
      successText: 'Counted documents',
    },
  ).then(([deleteMessages, insertMessages]) =>
    logInfo(
      chalk.bold('ℹ Documents that would be deleted'),
      '\n',
      deleteMessages.join('\n'),
      '\n\n',
      chalk.bold('ℹ Documents that would be inserted'),
      '\n',
      insertMessages.join('\n'),
    ),
  );
}

async function run() {
  // Drop all collections
  await Promise.all(
    Object.keys(config.collections).map(async (collectionName) => {
      const collection = config.collections[collectionName];
      await collection.model.deleteMany({});
    }),
  );
}
