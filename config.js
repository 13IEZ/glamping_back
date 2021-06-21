const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  db: {
    name: 'glamping',
    url: 'mongodb://localhost/',
  },
  getDbUrl() {
    return this.db.url + this.db.name;
  },
};
