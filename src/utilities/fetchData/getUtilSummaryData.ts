import  {SummaryTotalRequest} from "../../store/ORData/ordata.types"
import { CalendarDayData } from "../../components/calendar/calendarDay";



const getUtilSummaryData = async (request:SummaryTotalRequest) => {
  const response = await fetch("http://localhost:5001/utilSummary", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({'unit': request.unit, 'startDate':request.startDate, 'endDate':request.endDate,
                        'selectedProviders': request.selectedProviders, 'roomSelectionOption':request.roomSelectionOption,
                        'primeTime':request.primeTime, 'selectAll':request.selectAll,'selectedRooms':request.selectedRooms})
  });
  if (response) {
    const data:CalendarDayData[] = await response.json();
    return data
  }
  return []
}
 export default getUtilSummaryData;