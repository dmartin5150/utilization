import { Fragment, useEffect, useState } from "react";
import getFinCareTeam from "../../utilities/fin-data";
import FinCareTeam from "../../components/fin-careteam/fin-careteam-component";
import './patient-page.scss';

const Patient = () => {
    const [finCareTeam, setFinCareTeam] = useState([]);



  useEffect( () => {
    const getFinData = async() => {
    const finData = await getFinCareTeam("8/1/2022");
    setFinCareTeam(finData);
    }
    getFinData();
  }, []);

  return (
    <section className='patient'>
        <div className='patient__calendar'>Patient Calendar</div>
        <div className='patient__info'>
            <FinCareTeam data={finCareTeam}/>
        </div>
    </section>

  );
};

export default Patient;
