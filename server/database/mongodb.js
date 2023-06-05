const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb")
const dbUrl = process.env.MONGODB_URL

async function connetMongo() {
  const client = new MongoClient(dbUrl, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  db = await client.db("echo")
}

function idHandler(datas) {
  for (const data of datas) {
    data.id = data._id.toString()
    delete data._id
  }
  return datas
}

module.exports = async () => {
  try {
    await connetMongo()
    const mongoFn = {
      async addAdmin(name, data) {
        const isNull = await db.collection(name).count()
        if (!isNull) {
          return await db.collection(name).insertOne(data)
        } else {
          return false
        }
      },
      async getAdmin(name, data) {
        data = data || {}
        const result = await db.collection(name).findOne({ "name": data.name })
        if (!result) return
        return idHandler([result])[0]
      },
      async getImage(name, data) {
        const result = await db.collection(name).findOne({ "name": data })
        if (result) {
          return result.imgData
        } else {
          return false
        }
      },
      async saveData(name, data) {
        try {
          const sameName = await db.collection(name).find({ "name": data.name }).toArray()
          if (sameName.length > 0) {
            return false
          } else {
            return await db.collection(name).insertOne(data)
          }
        } catch (error) {
          return false
        }
      }
    }
    return mongoFn
  } catch (error) {
    console.log(error);
  }
}