/**
 * lib/db.ts — MongoDB Atlas singleton connection
 *
 * Uses Google/Cloudflare DNS to resolve Atlas SRV records (fixes ISP blocks).
 * Uses ServerApiVersion.v1 as recommended by Atlas.
 */

import dns from "dns";
import { MongoClient, ServerApiVersion, type Db } from "mongodb";

// Force Google + Cloudflare DNS — fixes Atlas SRV lookup failures on some ISPs
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not set in environment variables.");

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

/** Returns the BUCC_EM database handle */
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db("BUCC_EM");
}
