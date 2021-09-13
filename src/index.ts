import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import {MainApi} from "./routes";
import { DbMongo } from "./config/mongodb.conn";
import { Server } from "http";
const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();
import { MongoCluster,MongoDbName,Mongo_Pass,Mongo_user_name,mongo_con_string } from "./utills/constant";
let server: Server | null = null;
const PORT = process.env.PORT || 5000;
function initApplication(): express.Application {

    // add your own mongo_con_string
     new DbMongo().connect(mongo_con_string);
 
    const app = express();
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(express.static("public"));
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        }
    }));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(MainApi);
    app.use(
        (err: any, req: Request, res: Response, next: NextFunction) => {
            res.locals.message = err.message;
            const status = err.statusCode || 500;
            res.locals.status = status;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(status);
            return res.json({
                error: {
                    message: err.message
                }
            });
        }
    );
    app.use('/health', health.LivenessEndpoint(healthcheck))
    app.use('/ready', health.ReadinessEndpoint(healthcheck));
    return app;
}
function start() {
    const app = initApplication();

    server = app.listen(process.env.PORT || PORT, () => {
        console.log(`Server started on PORT:`+ PORT);
    });
}
// Start the application
start();