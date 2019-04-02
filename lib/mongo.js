const {
    MongoClient,
    ObjectId
} = require('mongodb');
const {
    config
} = require('../config');

const DB_NAME = config.dbName
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword)

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}/test?retryWrites=true` //

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true
        });
        this.dbName = DB_NAME;
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(error => {
                if (error) {
                    reject(error);
                }
                console.log('Conectados con exito a mongo')
                resolve(this.client.db(this.dbName))
            })
        })
    }

    getAll() {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .find(query)
                .toArray();
        })
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({
                _id: ObjectId(id)
            })
        })
    }
    create(collection, data) {
        return this.connect().then(db => {
                return db.collection(collection).insertOne(data);
            })
            .then(result => result.insertedId);
    }
    update(collection, id, data) {
        return this.connect().then(db => {
                return db.collection(collection).updateOne({
                    _id: ObjectId(id)
                }, {
                    $set: data
                }, {
                    upsert: true
                })
            })
            .then(result => result.upsertedId || id);
    }
    patch(collection, id, data) {
        return this.connect.then(db => {
            return db.collection(collection).patch(
                {_id: ObjectId(id)},
                {$set: data},
                {upsert: true}
            )
        }).then(result => result.upsertedId || id)
    }
    delete(collection, id) {
        return this.connect()
            .then(db => {
                return db.collection(collection).deleteOne({
                    _id: ObjectId(id)
                });
            })
            .then(() => id);
    }
}

module.exports = MongoLib;