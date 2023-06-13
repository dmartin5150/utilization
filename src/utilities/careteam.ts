const getCareTeam = async (fin:string = "0") => {
  try {
    const time = new Date().getTime();
    const request = `http://localhost:5001/careteam?time=${time}`
    const response = await fetch(request, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fin: fin }),
    });
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.log("Error: ", e);
    return [];
  }
};

export default getCareTeam;
