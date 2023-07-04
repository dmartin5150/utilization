import { DetailsWithBlock } from "../../store/ORData/ordata.types";
import { PrimeTime } from "../../store/Facility/facility.types";

const getDetails = async (unit:string, date: string, room:string, primeTime:PrimeTime) => {
      const response = await fetch("http://localhost:5001/details", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'unit': unit, 'date':date,'room':room, 'primeTime':primeTime})

      });
      if (response) {
        const data: DetailsWithBlock = await response.json();
        return data
      }
      return {room:[], block:[]}
  };
  export default getDetails;