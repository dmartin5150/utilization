import { PrimeTime } from "../../store/Facility/facility.types";
import { PT_Hours, SurgeryInfo } from "../../store/ORData/ordata.types";


const emptyPTHours: PT_Hours = {
    surgeryInfo: []
}

export const getPTHours = async (primeTime:PrimeTime, unit: string, startDate:string) => {
  const response = await fetch("http://localhost:5001/pt_hours", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({primeTime, unit, startDate})
  });
  if (response) {
    const data:PT_Hours = await response.json();
    console.log('pthours', data)
    return data
  }
  return emptyPTHours
  
}
 export default getPTHours;