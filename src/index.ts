import express from 'express';
import routes from "./routes";
import { AppDataSource } from './config/data-source';

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());

    app.use(routes);


    return app.listen(3333, () => {
        console.log('Server is running on port 3333');
    });

}).catch((err) => {
    console.error("Error initializing data source", err);
});