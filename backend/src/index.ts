import express, {Application} from "express";
import dotenv from 'dotenv';
import  {AuthRoute} from "./routes/auth.route";
import bodyParser from "body-parser";
import {CommonRoutesConfig} from "./config/common-routes.config";
import http from 'http';
import BasketRoute from "./routes/basket.route";
import * as mongoose from "mongoose";

dotenv.config();

const routes : CommonRoutesConfig[] = [];

const app: Application = express();
const server = http.createServer(app);
const port = process.env.PORT;
const dbConnection: string = process.env.DB_CONNECTION ?? "";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


routes.push(new AuthRoute(app));
routes.push(new BasketRoute(app));

server.listen(port, async () => {
    await mongoose.connect(dbConnection);
    console.log(`server is running at:  http://localhost:${port}`);
})