const getFinCareTeam = async (requestDate: string) => {
    try {

      const response = await fetch("http://localhost:5001/", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'date': requestDate})

      });
      if (response) {
        const data = await response.json();
        return data
      }
    } catch (e) {
      // console.log("Error: ", e);
      return []
    }
  };

  export default getFinCareTeam;