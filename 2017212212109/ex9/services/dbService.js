const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost";
const mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const MAX_QUERY_LIMIT = 1000;

class DbService {
    constructor() {
        this.client = null;
        this.db = null;
    }

    async open() {
        this.client = await mongoClient.connect();
        this.db = this.client.db("ex9");
    }

    async find(collectionName, query) {
        if (this.db === null) await this.open();
        const collection = await this.db.collection(collectionName);
        const result = await collection.find(query, {
            projection: { '_id': 0 },
            limit: MAX_QUERY_LIMIT,
        }).toArray();

        return result;
    }

    async findOne(collectionName, query) {
        if (this.db === null) await this.open();
        const collection = await this.db.collection(collectionName);
        const result = await collection.findOne(query);

        return result;
    }

    async update(collectionName, selector, update) {
        if (this.db === null) await this.open();
        const collection = await this.db.collection(collectionName);
        await collection.updateOne(selector, { '$set': update }, { upsert: true });
    }

    close() {
        if (this.client) this.client.close();
    }
}

const dbService = new DbService();

module.exports = dbService;