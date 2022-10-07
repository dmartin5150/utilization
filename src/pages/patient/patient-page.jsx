import { Fragment, useEffect, useState } from "react";
import getFinCareTeam from "../../utilities/fin-data";

const Patient = () => {
    const [finCareTeam, setFinCareTeam] = useState([]);



  useEffect(() => {
    const finData = getFinCareTeam("8/1/2022");
    setFinCareTeam(finData);
  }, []);

  return (
    <Fragment>
      <h1>I am the patient page</h1>
      <button onClick={getFinCareTeam.bind(null,'8/2/2022')}>Get Care Teams</button>
    </Fragment>
  );
};

export default Patient;
