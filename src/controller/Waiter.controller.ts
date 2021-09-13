import { IWAITER } from '../types/document/IWAITER';
import { IITEM } from '../types/document/IITEM';
import { MainWaiter } from '../repositories/Waiter.repositories';
import CustomeError from '../utills/error';
import { MainOrder } from '../repositories/Order.repositories';
import { USERSchema } from '../model/Waiter.model'; 
import { IORDER } from '../types/document/IORDER';
import { ITEMSchema } from "../model/Item.model";
import { MainItem } from '../repositories/Item.repositories';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse,Security } from "tsoa";
import { SaveUpdateResWaiter } from '../types/Response/waiter.responce'; 
import {  SaveReqWaiter,GetWaiter  } from '../types/Request/waiter.request';
import { DeleteOrder, SaveReqOrder, UpdateReqOrder,updateOrder_readyOrDelivered } from '../types/Request/Order.request';
import { DeleteItem, GetItem, SaveReqItem, UpdateReqItem,search ,getItemPrice,getwaiterID } from '../types/Request/Item.request';
import { SaveUpdateResOrder } from '../types/Response/Order.responce'; 
import { SaveUpdateResItem } from '../types/Response/Item.responce'; 
const bcrypt = require('bcrypt');
require('dotenv').config()
@Route('waiter')
@Tags('PMS - Waiter')
// @Security('api_key') 
export class WaiterController {
  constructor() { }

  /**@summary Log into the waiter account, which is registered by admin*/
  @Post("/loginwaiter")
  async authwaiter(@Body() getreq:GetWaiter): Promise<SaveUpdateResWaiter> {
    const waiter:any = await new MainWaiter().authwaiter(getreq);
    if(!waiter) throw new CustomeError(404, 'waiter email or password is incorrect');  
    const validPassword = await bcrypt.compare(getreq.waiter_password, waiter.waiter_password)
    if(!validPassword) throw new CustomeError(404, 'waiter email or password is incorrect');
    if (waiter === null) throw new CustomeError(404, 'waiter does not exist');
      return <SaveUpdateResWaiter>waiter;
  }



  /**@summary Register new waiter => Only Login admin is allowed */
  @Security('api_key')
  @Post('/Registerwaiter')
  async saveWaiter(@Body() user: SaveReqWaiter): Promise<SaveUpdateResWaiter> {
    const new_user:IWAITER = await new MainWaiter().savewaiter(<IWAITER>(user));
    return <SaveUpdateResWaiter>(new_user);
  }



 









 











  // /**@summary Get Single Item By Item Id => Only Login Waiter is allowed */
  // @Security('api_key')
  // @Post("/getItemByID")
  // async getItem(@Body() getreq:GetItem): Promise<SaveUpdateResItem> {
  //   const admin= await new MainItem().getProduct(getreq.id);
  //   if (admin === null) throw new CustomeError(404, 'Admin not found');
  //   return <SaveUpdateResItem>admin;
  // }



  // /**@summary Get list of all the items => anyone is allowed */
  // @Post('/getMenu')
  // async getItemList(): Promise<SaveUpdateResItem[]> {
  //   const admin: IITEM[] = await new MainItem().getItemslist();
  //   return <SaveUpdateResItem[]>(admin);
  // }



  // /**@summary Get list of all the items with spacific price=> anyone is allowed  */
  // @Security('api_key')
  // @Post('/getItemsbyPrice')
  // async getItemByPrice(@Body() admin: getItemPrice): Promise<SaveUpdateResItem[]> {
  //   const newadmin: IITEM[] = await new MainItem().getItemsByPrice(admin.item_price);
  //   return <SaveUpdateResItem[]>(newadmin);
  // }


}
