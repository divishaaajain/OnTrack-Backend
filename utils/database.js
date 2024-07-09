const {
    MONGODB_CLUSTER_URI,
    MONGODB_PASSWORD,
    MONGODB_USER,
    MONGODB_APP_NAME,
    MONGODB_DBNAME
} = require("../config");

const MongoClient = require("mongodb").MongoClient;

class MongoDBClient {
    constructor(mongoUri) {
        this._mongoUri = mongoUri;
        this._client = null;
        this._db = null;
    }

    async initiateDb() {
        this._client = new MongoClient(this._mongoUri, {
            maxIdleTimeMS: 270000,
            minPoolSize: 2,
            maxPoolSize: 4,
        });

        try {
            await this._client.connect();
            this._db = this._client.db();

            console.log(`Mongo Driver successfully connected to DB : ${this._db.databaseName}`);
        } catch (error) {
            console.log("Connection Error MongoDB driver : ", error);

            throw error;
        }
    }

    get client() {
        if (!this._client) {
            throw new Error("MongoDB client is not connected");
        }
        return this._client;
    }

    get db() {
        if (!this._db) {
            throw new Error("MongoDB database is not connected");
        }
        return this._db;
    }

    getDifferentDb(name) {
        if (!this._client) {
            throw new Error("MongoDB client is not connected");
        }
        return this._client.db(name);
    }
}

const mongoDBClient = new MongoDBClient(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER_URI}/${MONGODB_DBNAME}?retryWrites=true&w=majority&appName=${MONGODB_APP_NAME}`
);

module.exports = {
    mongoDBClient
};