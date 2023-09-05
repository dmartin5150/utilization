import { RoomStats } from "../../store/Stats/stats.types";

const getRoomStats = async (unit:string)=> {
      const response = await fetch("http://localhost:5001/roomstats", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'unit': unit })

      });
      if (response) {
        const data: RoomStats[] = await response.json();
        console.log('stats',data)
        return data
      }
      return []
  };

  export default getRoomStats;