import mongoose from 'mongoose';

const { Schema } = mongoose;

export default {
  logLevel: 'info', // 'debug' | 'info' | 'warn' | 'error' | 'silent'
  mongoUri: 'mongodb://radar-dev-db:C29fiJv49oAdNpN8SpYaLElv95HmtZgxKOd9vRM54BgPNu6LqnPRwq5YsjTvOPBRMnVwkvDd2VRuFedSTvVtQQ%3D%3D@radar-dev-db.mongo.cosmos.azure.com:10255/radar-dev-db?authSource=admin&replicaSet=globaldb&maxIdleTimeMS=120000&readPreference=primary&appname=MongoDB%20Compass&retryWrites=false&ssl=true',
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
