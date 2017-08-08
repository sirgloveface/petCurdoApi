var config = {};

config.twitter = {};
config.redis = {};
config.web = {};

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9050;


/***************************/
/***** Datos base de datos */
/***************************/
config.db.user_name = process.env.DB_USER || 'username';
config.db.password =  process.env.DB_PASSWORD || 'password';
config.db.url =  process.env.DB_URL || "postgres://mattveso:EoQSBnjPQRmONUw1H4sXK3lQD-YJQKpB@pellefant.db.elephantsql.com:5432/mattveso";
module.exports = config;
