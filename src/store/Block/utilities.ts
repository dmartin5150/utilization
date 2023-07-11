import { BlockData } from "./block.types";
import { BlockStats } from "./block.types";



export function timeConvert(n:number):string {
    const num = n;
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + "H: " + rminutes + "M";
    }
 

 export const getBlockStats = (blockDay:BlockData[]):BlockStats => {
    const btMinutes = blockDay.map((day)=> {
        console.log('minutes', day.bt_minutes)
        return parseInt(day.bt_minutes)
    });
    const nbtMinutes = blockDay.map((day)=> parseInt(day.nbt_minutes));
    const allMinutes = blockDay.map((day)=> parseInt(day.total_minutes));
    const totalbtminutes = btMinutes.reduce((ac, total)=> ac + total, 0);
    const totalnbtminutes = nbtMinutes.reduce((ac,total)=> ac + total, 0);
    const totalMinutes = allMinutes.reduce((ac, total) => ac + total, 0);
    let utilization = '0%';
    if (totalMinutes > 0) {
        utilization = Math.round(totalbtminutes/totalMinutes*100).toString() + '%' 
    }
    const stats: BlockStats = {btMinutes:totalbtminutes, nbtMinutes:totalnbtminutes,totalMinutes, utilization}
    return stats
 }