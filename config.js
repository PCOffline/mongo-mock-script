export default {
  noPrompt: true, // Don't prompt before deleting
  preferPath: true, // When both path and data are provided, ignore the data and only use the path. If false, only the data will be used in such case.
  logLevel: 'info', // 'debug' | 'info' | 'warn' | 'error' | 'silent'
  // TODO: Change to CosmosDB URI locally (or use ENV instead)
  mongoUri: 'mongodb://localhost:27017/my-database',
  collections: {
    events: { path: './collections/events.js' },
    malshabs: { path: './collections/malshabs.js' },
    nodegroups: { path: './collections/nodegroups.js' },
    nodes: { path: './collections/nodes.js' },
    questionnaireinstances: { path: './collections/questionnaireinstances.js' },
    questionnaireschemas: { path: './collections/questionnaireschemas.js' },
    // sms: { path: './collections/sms.js' }, // TODO: Add after sms-track goes into dev
    temporaryinstances: { path: './collections/temporaryinstances.js' },
    units: { path: './collections/units.js' },
    users: { path: './collections/users.js' },
  },
};
