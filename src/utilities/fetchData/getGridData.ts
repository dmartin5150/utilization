import { SummaryGridRowData } from "../../components/summary-grid/summary-grid-row";

const getGridData = async (unit:string, date: string) => {
  const response = await fetch("http://localhost:5001/grid", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({'unit': unit, 'date':date})
  });
  if (response) {
    const data: SummaryGridRowData[] = await response.json();
    return data
  }
  return []
}
 export default getGridData;