/**
 * lib/db.ts — MongoDB Atlas singleton connection
 *
 * IMPORTANT: Never throw at module load time — only throw inside getDb()
 * so missing env vars fail at runtime (request time), not at build time.
 */

import dns from "dns";
import { MongoClient, ServerApiVersion, type Db } from "mongodb";

// Fix Atlas SRV resolution on ISPs that block SRV lookups
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClient(): MongoClient {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in environment variables.");

  return new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
}

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClient().connect();
    }
    return global._mongoClientPromise;
  }
  return createClient().connect();
}

/** Returns the BUCC_EM database — only call inside route handlers */
export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db("BUCC_EM");
}
