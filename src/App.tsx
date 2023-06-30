
import React, {useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './routes/navigation/navigation.component';
import Utilization from "./pages/utilization/utilization";
import Settings from './pages/settings/settings';
import Surgeons from './pages/surgeons/surgeons';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
import { fetchPTHourSuccessAsync} from './store/ORData/actions/pthours.action';
import { selectPrimeTime,selectUnit } from './store/Facility/facility.selector';
import { useAppDispatch } from './hooks/hooks';
import { selectCalendar, selectSurgeryInfo, selectPTHours, selectCalendarPTHoursAll,selectCalendarPTHoursTotals } from './store/ORData/ordata.selector';
import { selectActiveRoomLists } from './store/ORData/ordata.selector';
import { fetchSurgeonListsAsync } from './store/ORData/actions/surgeonLists.actions';

import "./App.scss";

function App() {

  const primeTime = useSelector(selectPrimeTime)
  const unit = useSelector(selectUnit)
  const calendar = useSelector(selectCalendar)
  const surgeryInfo = useSelector(selectSurgeryInfo)
  const ptHours = useSelector(selectPTHours)
  const calendarPTHours = useSelector(selectCalendarPTHoursAll)
  const totalPTHours = useSelector(selectCalendarPTHoursTotals)
  const rooms = useSelector(selectActiveRoomLists)
  const dispatch = useAppDispatch()


    useEffect(()=> {
        dispatch(fetchSurgeonListsAsync())
    },[]);

  useEffect(() => {
    if (unit && primeTime) {
      dispatch(fetchPTHourSuccessAsync(primeTime, unit));
    }
  },[primeTime, unit])


  // useEffect(() => {
  //    if (rooms && ptHours) {
  //       console.log( 'calendar', calendar)
  //       console.log('calendar PTHours', calendarPTHours)
  //       console.log('total hours', totalPTHours)
  //    }

  // },[ptHours,rooms])


  return (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route path="/" element={<Utilization />}></Route>
      <Route index  path="/surgeon" element={<Surgeons />}></Route>
      <Route index  path="/room" element={<Rooms />}></Route>
      <Route index  path="/settings" element={<Settings />}></Route>
    </Route>
  </Routes>
  );
}
export default App;
