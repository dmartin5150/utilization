import {StatSummaryResults} from '../../store/Stats/stats.types';
import {SURGEON_MENU_ITEM_INITIAL_STATE,STAT_CARD_INITIAL_STATE} from "../../store/Stats/stats.reducer";



const getStatSummary = async (NPI:string, unit:string, name:string) => {
  const response = await fetch("http://localhost:5001/stats", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({'NPI': NPI, 'unit': unit, 'name':name})
  });
  if (response) {
    const data: StatSummaryResults = await response.json();
    return data
  }
  return {
    surgeon: SURGEON_MENU_ITEM_INITIAL_STATE,
    mainCard: STAT_CARD_INITIAL_STATE,
    secondaryCards: []
    }
}
 export default getStatSummary;