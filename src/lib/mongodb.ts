import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

// Cache the client across hot-reloads in dev and across serverless invocations
// so we don't open a new connection on every API request.
let cachedClient: MongoClient | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set in environment variables");
  }

  if (cachedClient) {
    return cachedClient.db("portfolio");
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }

  cachedClient = await global._mongoClientPromise;
  return cachedClient.db("portfolio");
}
