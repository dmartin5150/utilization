import { PTTotalHours } from "./selectors/ordata.ptselectors";


export const minutestohours = (time:number):string  => {
var num = time;
var hours = (time / 60);
var rhours = Math.floor(hours);
var minutes = (hours - rhours) * 60;
var rminutes = Math.round(minutes);
return rhours + " H: " + rminutes + " M";
}

export type hasCurDate = {
    curDate:string;
}


export function compare<T extends hasCurDate>( a:T, b:T ):number {
    if ( a.curDate < b.curDate ){
      return -1;
    }
    if ( a.curDate > b.curDate ){
      return 1;
    }
    return 0;
  }