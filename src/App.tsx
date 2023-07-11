
import React, {useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './routes/navigation/navigation.component';
import Utilization from "./pages/utilization/utilization";
import Settings from './pages/settings/settings';
import Surgeons from './pages/surgeons/surgeons';
// import Rooms from './pages/Rooms/Block';
import Block from './pages/Block/Block';
import { useSelector } from 'react-redux';
import { fetchPTHourSuccessAsync} from './store/ORData/actions/pthours.action';
import { selectPrimeTime,selectUnit } from './store/Facility/facility.selector';
import { useAppDispatch } from './hooks/hooks';
import { selectCalendarPTHoursAll,selectPTHoursTotalsAll  } from './store/ORData/selectors/ordata.ptselectors';
import { selectCalendar, selectSurgeryInfo, selectPTHours, } from './store/ORData/selectors/ordata.selector';
import { selectActiveRoomLists } from './store/ORData/selectors/ordata.selector';
import { fetchSurgeonListsAsync } from './store/ORData/actions/surgeonLists.actions';
import { fetchRoomListsSuccess, setActiverRoomListSuccess} from './store/ORData/actions/roomsListActions';
import { TNNASRoomLists } from './pages/settings/settings.constants';

import "./App.scss";

function App() {

  const primeTime = useSelector(selectPrimeTime)
  const unit = useSelector(selectUnit)
  const calendar = useSelector(selectCalendar)
  const surgeryInfo = useSelector(selectSurgeryInfo)
  const ptHours = useSelector(selectPTHours)
  const calendarPTHours = useSelector(selectCalendarPTHoursAll)
  const totalPTHours = useSelector(selectPTHoursTotalsAll)
  const rooms = useSelector(selectActiveRoomLists)
  const dispatch = useAppDispatch()


    useEffect(()=> {
        dispatch(fetchSurgeonListsAsync())
        dispatch(fetchRoomListsSuccess(TNNASRoomLists))
        dispatch(setActiverRoomListSuccess(TNNASRoomLists['BH JRI']));
    },[]);

  useEffect(() => {
    if (unit && primeTime) {
      dispatch(fetchPTHourSuccessAsync(primeTime, unit));
    }
  },[primeTime, unit])





  return (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route path="/" element={<Utilization />}></Route>
      <Route index  path="/surgeon" element={<Surgeons />}></Route>
      <Route index  path="/block" element={<Block />}></Route>
      <Route index  path="/settings" element={<Settings />}></Route>
    </Route>
  </Routes>
  );
}
export default App;
