import mongoose from 'mongoose';
import chalk from 'chalk';
import ora, { oraPromise } from 'ora';
import config from './config.js';

const textColor = 'cyan';
const errorColor = chalk.red;
const successColor = chalk.green;
const warnColor = chalk.yellow;
const infoColor = chalk.blue;
const debugColor = chalk.magenta;

const logDebug = (...text) => {
  if (config.logLevel === 'debug') console.debug(debugColor(...text));
};
const logInfo = (...text) => {
  if (config.logLevel === 'info' || config.logLevel === 'debug')
    console.info(infoColor(...text));
};

const logWarn = (...text) => console.warn(warnColor(...text));

const logError = (...text) => console.error(errorColor(...text));

const oraOptions = {
  color: 'yellow',
  spinner: 'dots',
  isEnabled: true,
  discardStdin: true,
};
const load = (text, color) =>
  ora({ ...oraOptions, text: chalk[color ?? textColor](text) });
const loadPromise = (promise, { color, text, failText, successText }) =>
  oraPromise(promise, {
    ...oraOptions,
    text: chalk[color ?? textColor](text),
    failText: errorColor(failText),
    successText: successColor(successText),
  });

async function initialise() {
  // Connect to mongoose
  await loadPromise(mongoose.connect(config.mongoUri), {
    text: 'Connecting to MongoDB',
    successText: 'Connected to MongoDB',
    failText: 'Failed to connect to MongoDB',
  });

  const modelsPromise = new Promise((resolve, reject) => {
    try {
      // Create all models
      Object.keys(config.collections).forEach((collectionName) => {
        const collection = config.collections[collectionName];
        collection.model = mongoose.model(
          collection.model,
          collection.schema,
          collectionName,
        );
      });

      resolve();
    } catch (error) {
      reject(error);
    }
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
  }).catch((error) => {
    logDebug(error);
    process.exit(1);
  });

  // Print how many documents would be deleted for each collection
  Object.keys(config.collections).forEach((collectionName) => {
    const { model } = config.collections[collectionName];
    const count = model.countDocuments();
    logInfo(`${collectionName} (${count})`);
  });
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

loadPromise(initialise(), {
  text: 'Initialising',
  successText: 'Initialised',
  failText: 'Failed to initialise',
}).catch((error) => {
  logDebug(error);
  process.exit(1);
});
