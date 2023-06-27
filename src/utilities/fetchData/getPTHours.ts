import { PrimeTime } from "../../store/Facility/facility.types";

const getPTHours = async (primeTime:PrimeTime) => {
  const response = await fetch("http://localhost:5001/pt_hours", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({'primeTime': primeTime})
  });
  if (response) {
    const data = await response.json();
    console.log(data)
    return data
  }
  return []
}
 export default getPTHours;