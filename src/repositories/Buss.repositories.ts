import { BUSSSchema } from '../model/Buss.model';  
import { IBUSS } from '../types/document/IBUSS';
export class MainBuss {
  constructor() {}
 
  saveBuss(buss: IBUSS) {
    return new BUSSSchema(buss).save();
  }
  updateBuss(buss: IBUSS) {
    return BUSSSchema.findByIdAndUpdate(buss._id, buss, {
      new: true
    });
  }
  deletBuss(_id: string) {
    return BUSSSchema.findByIdAndDelete(_id);
  }
  getBusseslist() {
   return BUSSSchema.find();
  }

  
}
