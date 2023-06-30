
import { SurgeonLists } from "../../store/ORData/ordata.types";
const getSurgeonLists = async () => {
    const response = await fetch("http://localhost:5001/surgeon");
    if (response) {
      const data: SurgeonLists = await response.json();
      console.log('surgeons', data)
      return data
    }
    return {}
  };

  export default getSurgeonLists;