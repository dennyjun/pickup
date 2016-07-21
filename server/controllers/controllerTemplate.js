var express = require('express');

module.exports = (() => {
  return {
    clone: (attributes) => {
      return {
        path: attributes.path || '',
        router: express.Router()
      };
    }
  };
})();