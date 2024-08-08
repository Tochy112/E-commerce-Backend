import 'express-async-errors'
import "reflect-metadata"
import express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import dotenv from "dotenv"
import { ErrorHandler } from "./utils/error-management"
import "./utils/services"
import { container } from 'tsyringe'
dotenv.config()

AppDataSource.initialize().then(async () => {   
    // create express app
    const app = express()

    // instantiate error handler 
    const errorHandler = new ErrorHandler();
    app.use(errorHandler.handle);
    app.use(bodyParser.json())

     // register express routes from defined application routes
     Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const controllerInstance = container.resolve(route.controller as any) as any;
                const result = await controllerInstance[route.action](req, res, next);
                if (result !== null && result !== undefined) {
                    res.json(result);
                }
            } catch (error) {
                next(error);
            }
        });
    });

    app.listen(5000)

    console.log("Express server has started on port 5000")

}).catch(error => console.log(error))
