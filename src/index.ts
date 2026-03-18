import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './core/settings/settings';
import { runDB } from './db/mongodb';

const bootstrap = async () => {
    const app = express();

    setupApp(app);

    await runDB(SETTINGS.MONGO_URL);

    app.listen(SETTINGS.PORT, () => {
        console.log(`Example app listening on port ${SETTINGS.PORT}`);
    });
};

bootstrap().catch((err) => {
    console.error('App crashed:', err);
    process.exit(1);
});