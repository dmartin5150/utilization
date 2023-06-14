const sayHello = async () => {
    try {
      const response = await fetch("http://localhost:5001/", {
        method:'GET',
        headers: {
          'Content-Type': 'application/json'
        },

      });
      if (response) {
        const data:string = await response.json();
        console.log(data)
        return data
      }
    } catch (e) {
      console.log("Error: ", e);
      return 
    }
  };

  export default sayHello;