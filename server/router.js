module.exports = (app, routes) => {
  return {
    init: () => {
      for(let path in routes) {
        app.use(path, routes[path]);
      }
    }
  };
};