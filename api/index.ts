import { app, initDb } from "../server";

let isInitialized = false;

export default async function handler(req: any, res: any) {
  if (!isInitialized) {
    try {
      await initDb();
      isInitialized = true;
    } catch (err) {
      console.error("Failed to initialize database on serverless function startup:", err);
    }
  }
  return app(req, res);
}
