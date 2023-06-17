import { CalendarData } from "../components/calendar/calendar";

const getCalendar = async (unit:string, date: string) => {
    try {

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
    } catch (e) {
      console.log("Error: ", e);
      return e
    }
  };

  export default getCalendar;