module.exports = {

    'host': process.env.MONGODB_HOST,
    'port': process.env.MONGDB_PORT,
    'db' : process.env.MONGODB_DB,
    'user': process.env.MONGODB_USER,
    'pass': process.env.MONGODB_PASS,
    "authMechanism": process.env.MONGODB_AUTH_MECHANISM

    // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
     
     //Please replace your host file Here : 127.1.1.0 , Express is Collection Name (Database Name)
};