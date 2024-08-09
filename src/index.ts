import 'express-async-errors'
import "reflect-metadata"
import express, { NextFunction } from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { RouteGroups } from "./routes"
import dotenv from "dotenv"
import { ErrorHandler } from "./utils/error-management"
import "./services"
import { container } from 'tsyringe'
import { AuthMiddleware, conditionalMiddleware } from './utils/middleware/AuthMiddleware'
dotenv.config()

AppDataSource.initialize().then(async () => {   
    const port = process.env.PORT || 5000
    // create express app
    const app = express()

    // instantiate error handler 
    const errorHandler = new ErrorHandler();
    app.use(bodyParser.json())

    app.use(conditionalMiddleware(AuthMiddleware()));

    // register express routes from defined application routes
    const API_VERSION = "/v1";

    RouteGroups.forEach(group => {
    const controllerInstance = container.resolve(group.controller as any) as any;
        Object.getOwnPropertyNames(group.controller?.prototype).forEach(methodName => {
            
            if (methodName !== "constructor") {
                const routePath = `${API_VERSION}${group.prefix}/${methodName}`;
    
                const middlewares = group.middlewares || [];
                const routeHandler = async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const result = await controllerInstance[methodName](req, res, next);
                        if (result !== null && result !== undefined) {                                                        
                            return result
                        }
                    } catch (error) {
                        next(error);
                    }
                };
    
                app.all(routePath, ...middlewares, routeHandler);
            }
        });
    });
        
    app.use(errorHandler.handle);

    app.use((req, res) => {
        res.status(404).send('Not Found');
    });

    app.listen(port)

    console.log("Express server has started on port 5000")

}).catch(error => console.log(error))
