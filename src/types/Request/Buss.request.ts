export interface ISaveReqBuss{
  BusName: string ,
  BussSeats:string , 
  StartDate: string ;
  EndDate: string ,
  }
  export interface IUpdateReqBuss {
    _id: string;
    BusName: string ,
    BussSeats:string , 
    StartDate: string ;
    EndDate: string ,
  }
  
  
  export interface IDeleteBuss {
    id: string
  }
 
 