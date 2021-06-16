const rootPath = __dirname;

module.exports = {
  rootPath,
  db: {
    name: 'glamping',
    url: 'mongodb://localhost/',
  },
  getDbUrl() {
    return this.db.url + this.db.name;
  },
};
