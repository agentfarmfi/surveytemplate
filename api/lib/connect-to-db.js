const { MongoClient, ServerApiVersion } = require('mongodb')

let cachedDb = null

const uri = process.env.MONGODB_URI

module.exports = async () => {
  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

  const db = await client.db('bigfive')

  cachedDb = db

  return db
}
