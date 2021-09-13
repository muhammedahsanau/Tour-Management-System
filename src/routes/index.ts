import express from 'express';
import { BussRoutesApi } from "./Buss.routes";

 

export class MainRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

    
      this.router.use('/Buss',BussRoutesApi);
    }


}
export const MainApi = new MainRouter().router;


//// this.router.use('/products',ProductRoutesApi);
//// this.router.use('/orders',OrderRoutesApi);
// this.router.use('/Items',ItemRoutesApi);
// this.router.use('/orders',OrderRoutesApi);