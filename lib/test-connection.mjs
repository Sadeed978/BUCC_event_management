import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://sadeedahmed681_db_user:ATnktZalF2q2DJqA@cluster0.ldztwya.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. Successfully connected to MongoDB Atlas!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
