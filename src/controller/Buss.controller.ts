import { IBUSS } from '../types/document/IBUSS';
import { MainBuss } from '../repositories/Buss.repositories';
import CustomeError from '../utills/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse,Security } from "tsoa";
import { ISaveUpdateResBuss } from '../types/Response/Buss.response'; 
import { IDeleteBuss, ISaveReqBuss, IUpdateReqBuss} from '../types/Request/Buss.request';
@Route('Buss')
@Tags('TMS - Busses')
// @Security('api_key')
export class BussController {
  constructor() { }


  

  /**@summary Get list of all the busses*/
  @Post('/getAllBuss')
  async getBussList(): Promise<ISaveUpdateResBuss[]> {
    const admin: IBUSS[] = await new MainBuss().getBusseslist();
    return <ISaveUpdateResBuss[]>(admin);
  }



  /**@summary Save a New Buss */
  @Post('/saveBuss')
  async saveBuss(@Body() admin: ISaveReqBuss): Promise<ISaveUpdateResBuss> {
    const new_bus:IBUSS = await new MainBuss().saveBuss(<IBUSS>(admin));
    return <ISaveUpdateResBuss>(new_bus);
  }



  /** @summary Update existing Buss by its Id */
  @Put('/updateBuss')
    async updateBuss(@Body() buss: IUpdateReqBuss): Promise<ISaveUpdateResBuss> {
      const updateBuss = await new MainBuss().updateBuss(<IBUSS>(buss));
      if (updateBuss === null)
        throw new CustomeError(400, 'Buss not updated');
      return <ISaveUpdateResBuss>updateBuss;
  }



    /**@summary Delete Buss By its Id*/
    @Delete('/deleteBuss')
    @SuccessResponse("200","product deleted")
    async deleteBuss(@Body() delreq: IDeleteBuss): Promise<any> {

      return await new MainBuss().deletBuss(delreq.id);
    }
}
