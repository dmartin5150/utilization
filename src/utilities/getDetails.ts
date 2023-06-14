import { DetailsData } from "../components/team-card/details-card";

const getDetails = async (unit:string, date: string, room:string) => {
    try {

      const response = await fetch("http://localhost:5001/details", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'unit': unit, 'date':date,'room':room})

      });
      if (response) {
        const data: DetailsData[] = await response.json();
        console.log(data);
        return data
      }
    } catch (e) {
      console.log("Error: ", e);
      return []
    }
  };

  export default getDetails;