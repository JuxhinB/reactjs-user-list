const { override } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = override([
  function reset(config, env) {
    config = rewireReactHotLoader(config, env);
    return config;
  },
]);
