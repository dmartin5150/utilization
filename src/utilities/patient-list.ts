const getPatientList = async (npi:string) => {
    try {

      const response = await fetch("http://localhost:5001/patients", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'NPI': npi})

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

  export default getPatientList;