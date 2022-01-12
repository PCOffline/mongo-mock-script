import mongoose from 'mongoose';

const { Schema } = mongoose;

export default {
  noPrompt: false, // Don't prompt before deleting
  logLevel: 'info', // 'debug' | 'info' | 'warn' | 'error' | 'silent'
  mongoUri: 'mongodb://localhost:27017/my-database',
  collections: {
    collectionName: {
      schema: new Schema({
        // The mongoose schema of the collection
        fieldName: {
          type: Schema.Types.String,
          required: true,
        },
      }),
      model: 'modelName', // The name of the model to use, will be equal to the collection name by default, use it in order to not break refs
      data: [
        // The data to be inserted into the collection
        {
          fieldName: 'value',
        },
      ],
      path: 'path/to/file.json', // alternative to 'data', can be either json or js with default export
    },
  },
};
