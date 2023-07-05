import {StatSummary} from '../../store/Stats/stats.types';
import {SURGEON_MENU_ITEM_INITIAL_STATE,STAT_DATA_SET_INITIAL_SET} from "../../store/Stats/stats.reducer";



const getStatSummary = async (NPI:string) => {
  const response = await fetch("http://localhost:5001/stats", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({'NPI': NPI})
  });
  if (response) {
    const data: StatSummary = await response.json();
    return data
  }
  return {
    surgeon: SURGEON_MENU_ITEM_INITIAL_STATE,
    mainCard: STAT_DATA_SET_INITIAL_SET,
    secondaryCards: []
    }
}
 export default getStatSummary;