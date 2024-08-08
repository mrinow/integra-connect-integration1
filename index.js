const authentication = require('./authentication');
const createSmartDocumentCreate = require('./creates/create_smart_document.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  requestTemplate: {
    params: {
      auth_token: '{{bundle.authData.auth_token}}',
      username: '{{bundle.authData.username}}',
      password: '{{bundle.authData.password}}',
    },
    headers: {
      'X-USERNAME': '{{bundle.authData.username}}',
      'X-PASSWORD': '{{bundle.authData.password}}',
      'X-AUTH-TOKEN': '{{bundle.authData.auth_token}}',
    },
  },
  triggers: {},
  creates: { [createSmartDocumentCreate.key]: createSmartDocumentCreate },
};
