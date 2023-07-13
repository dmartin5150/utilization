import { PrimeTime } from "../../store/Facility/facility.types";
import { PT_Hours, SurgeryInfo } from "../../store/ORData/ordata.types";


const emptyPTHours: PT_Hours = {
    surgeryInfo: []
}

export const getPTHours = async (primeTime:PrimeTime, unit: string) => {
  const response = await fetch("http://localhost:5001/pt_hours", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({'primeTime': primeTime, 'unit': unit})
  });
  if (response) {
    const data:PT_Hours = await response.json();
    // console.log(data)
    return data
  }
  return emptyPTHours
  
}
 export default getPTHours;