# Sync Your Mock Data With a MongoDB Server

This script will delete all the documents in the provided database and upload the mock data instead.

# Installation

Simply use `git clone`:
`git clone https://github.com/alphayesodot/mongo-mock-script.git`

# Config

Before running the script, you'll have to configure the script.
Begin with setting the mongoUri variable to your mongoDB server.
Then provide all the collections you'd like to modify in the following syntax:

```js
import mongoose from 'mongoose';

const { Schema } = mongoose;

export default {
  debugMode: false, // Enables debug logs
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
