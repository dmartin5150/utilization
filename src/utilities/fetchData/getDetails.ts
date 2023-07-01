import { DetailsData } from "../../components/team-card/details-card";
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
        const data: DetailsData[] = await response.json();
        return data
      }
      return []
  };
  export default getDetails;