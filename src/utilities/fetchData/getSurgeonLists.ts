
const getSurgeonLists = async () => {
    try {
      const response = await fetch("http://localhost:5001/surgeon");
      if (response) {
        // console.log(response)
        const data = await response.json();
        // console.log(data)
        return data
      }
    } catch (e) {
      console.log("Error: ", e);
      return []
    }
  };

  export default getSurgeonLists;