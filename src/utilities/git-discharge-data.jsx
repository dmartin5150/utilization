const getDischargeData = async () => {
    try {
      const response = await fetch("http://localhost:5000/discharges", {
        method:'GET',
        headers: {
          'Content-Type': 'application/json'
        },

      });
      if (response) {
        const data = await response.json();
        return data
      }
    } catch (e) {
      console.log("Error: ", e);
      return []
    }
  };

  export default getDischargeData;