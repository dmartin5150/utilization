
import { UnitRoomLists } from "../../pages/settings/settings.constants";
const getSurgeonLists = async () => {
    const response = await fetch("http://localhost:5001/surgeon");
    if (response) {
      const data: UnitRoomLists = await response.json();
      console.log('surgeons', data)
      return data
    }
    return {}
  };

  export default getSurgeonLists;