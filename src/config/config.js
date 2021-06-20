const rootPath = __dirname;

module.exports = {
	rootPath,
	db: {
		name: 'glamping1',
		url: 'mongodb://localhost/',
	},
	getDbUrl() {
		return this.db.url + this.db.name;
	},
};
