import { BlockLists } from "../../store/Block/block.types";

const getBlockData = async (unit:string,selectAll:boolean, startDate: string, selectedProviders:string[])=> {
      const response = await fetch("http://localhost:5001/blocks", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'unit': unit, 
                        'selectAll': selectAll, 'startDate':startDate, 'selectedProviders':selectedProviders})


      });
      if (response) {
        const data: BlockLists = await response.json();
        return data
      }
      return {
        grid:[],
        details:[]
      }
  };

  export default getBlockData;