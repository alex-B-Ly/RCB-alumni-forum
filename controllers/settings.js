var settings = {}

settings.mongo.uri = process.env.DUOSTACK_DB_mongo;
settings.mongo.host = 'localhost';
settings.mongo.port = 27017;
settings.mongo.db = 'nodesession';
settings.web.port = process.env.WEB_PORT || 8080;

module.exports = settings;