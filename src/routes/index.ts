import express from 'express';
import { BussRoutesApi } from "./Buss.routes";
import { TourRoutesApi }  from "./Tour.routes";
 

export class MainRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

    
      this.router.use('/Buss',BussRoutesApi);
      this.router.use('/Tour',TourRoutesApi);
    }


}
export const MainApi = new MainRouter().router;


 