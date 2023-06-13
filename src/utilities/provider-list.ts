const getProviderList = async (firstLetter: string) => {
    try {

      const response = await fetch("http://localhost:5001/providers", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'letter': firstLetter})

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

  export default getProviderList;