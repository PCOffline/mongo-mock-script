# An Easy Way to Maintain Clean Collections

With this script you can drop any collection and swiftly insert as many documents as you'd like to it, with simple and straight-forward configurations.

# Installation

`git clone https://github.com/PCOffline/reset-db.git`

`cd reset-db`

# Config

Before running, you'll have to configure the script.
Go to the `config.js` file and set the mongoUri variable to your mongoDB server.
Then provide all the collections you'd like to modify in the following syntax:

```js
// config.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

export default {
  noPrompt: false, // Don't prompt before deleting
  preferPath: true, // When both path and data are provided, ignore the data and only use the path. If false, only the data will be used in such case.
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

```

It's recommended to use the `path` instead of the `data` to avoid clustering and make modifying the data easier.

# Usage

Run using `npm start` for the process to begin.
You can also use `npm run dry` to see all the changes that would be made.
