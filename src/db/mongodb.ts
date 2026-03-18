import dotenv from 'dotenv'
dotenv.config()
import { Collection, Db, MongoClient } from 'mongodb';
import { Blog} from "../blogs/types/blog";
import {SETTINGS} from "../core/settings/settings";

import {PostDbModel} from "../posts/types/post-db-model";

const BLOG_COLLECTION_NAME = 'blogs'
const POST_COLLECTION_NAME = 'posts'
const mongoUri = process.env.MONGO_URI || ''
export let client: MongoClient;
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<PostDbModel>;

export async function runDB(url: string): Promise<void> {
    client = new MongoClient(mongoUri);
    const db: Db = client.db(SETTINGS.DB_NAME);

    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<PostDbModel>(POST_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ ping: 1})

        console.log("Database Connected")
    } catch (error) {
        await client.close();
        throw new Error(`❌ Database not connected: ${error}`);
    }
}

export async function stopDb() {
    if (!client) {
        throw new Error(`❌ No active client`);
    }
    await client.close();
}