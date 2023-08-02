import { CalendarDayData } from "../../components/calendar/calendarDay";
import { BlockTotalRequest } from "../../store/ORData/ordata.types";


const getBlockTotals = async (request:BlockTotalRequest)=> {
      const response = await fetch("http://localhost:5001/blocktotals", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'unit': request.unit, 
                        'selectAll': request.selectAll, 'startDate':request.startDate,'endDate':request.endDate, 'selectedProviders':request.selectedProviders})

      });
      if (response) {
        const data: CalendarDayData[] = await response.json();
        return data
      }
      return []
  };

  export default getBlockTotals;