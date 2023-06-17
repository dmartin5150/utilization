import { CalendarData } from "../components/calendar/calendar";


const getCalendarData = async (unit:string, date: string)=> {
      const response = await fetch("http://localhost:5001/calendar", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'unit': unit, 'date':date})

      });
      if (response) {
        const data: CalendarData[] = await response.json();
        return data
      }
      return []
  };

  export default getCalendarData;