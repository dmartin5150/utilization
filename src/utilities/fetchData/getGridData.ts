import { SummaryGridData } from "../../components/summary-grid/summary-grid";

const getGridData = async (unit:string, date: string) => {
  const response = await fetch("http://localhost:5001/grid", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({'unit': unit, 'date':date})
  });
  if (response) {
    const data: SummaryGridData[] = await response.json();
    return data
  }
  return []
}
 export default getGridData;