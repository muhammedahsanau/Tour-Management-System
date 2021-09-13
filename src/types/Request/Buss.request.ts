export interface ISaveReqBuss{
  BusName: string ,
  BussSeats:string , 
 
  }
  export interface IUpdateReqBuss {
    _id: string;
    BusName: string ,
    BussSeats:string , 
    BussBokingDates:  string ,
  }
  
  
  export interface IDeleteBuss {
    id: string
  }
 
 