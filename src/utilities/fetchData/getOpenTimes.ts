import { OpenTimes} from "../../store/Facility/facility.types"

const getOpenTimes = async (unit:string, startDate: string)=> {
      const response = await fetch("http://localhost:5001/opentimes", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'unit': unit, 'startDate':startDate })

      });
      if (response) {
        const data: OpenTimes[] = await response.json();
        return data
      }
      return []
  };

  export default getOpenTimes;