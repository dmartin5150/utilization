
import React, {useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './routes/navigation/navigation.component';
import Utilization from "./pages/utilization/utilization";
import Settings from './pages/settings/settings';
import TestDrawer from './pages/testDrawer/testDrawer';
import Surgeons from './pages/surgeons/surgeons';
// import Rooms from './pages/Rooms/Block';
import Block from './pages/Block/Block';
import OpenTimes from './pages/openTimes/OpenTimes';
import FindRoom from './pages/FindRoom/FindRoom';
import { useSelector } from 'react-redux';
import { fetchPTHourSuccessAsync} from './store/ORData/actions/pthours.action';
import { selectPrimeTime,selectUnit } from './store/Facility/facility.selector';
import { useAppDispatch } from './hooks/hooks';
import { selectCalendarPTHoursAll,selectPTHoursTotalsAll  } from './store/ORData/selectors/ordata.ptselectors';
import { selectCalendar, selectSurgeryInfo, selectPTHours, } from './store/ORData/selectors/ordata.selector';
import { selectActiveRoomLists } from './store/ORData/selectors/ordata.selector';
import { fetchSurgeonListsAsync } from './store/ORData/actions/surgeonLists.actions';
import { fetchRoomLists, setActiveRoomList} from './store/ORData/actions/roomsListActions';
import { TNNASRoomLists } from './pages/settings/settings.constants';
import { fetchBlockDataAsync } from './store/Block/block.actions';
import ErrorPage from './pages/Error/Error';


import "./App.scss";

function App() {








  const primeTime = useSelector(selectPrimeTime)
  const unit = useSelector(selectUnit)
  // const calendar = useSelector(selectCalendar)
  // const surgeryInfo = useSelector(selectSurgeryInfo)
  // const ptHours = useSelector(selectPTHours)
  // const calendarPTHours = useSelector(selectCalendarPTHoursAll)
  // const totalPTHours = useSelector(selectPTHoursTotalsAll)
  // const rooms = useSelector(selectActiveRoomLists)
  const dispatch = useAppDispatch()

  useEffect(()=> {
    console.log('getting surgeon list')
    dispatch(fetchSurgeonListsAsync())
    dispatch(fetchRoomLists(TNNASRoomLists))
    dispatch(setActiveRoomList(TNNASRoomLists['BH JRI']));
    // dispatch(fetchBlockDataAsync('BH JRI',true,'2023-7-1',['1548430291']))
},[]);


  // useEffect(() => {
  //   if (primeTime) {
  //     dispatch(fetchPTHourSuccessAsync(primeTime, unit));

  //   }
  // },[primeTime])





  return (
  <div className='app'>
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Utilization />}></Route>
        <Route index  path="/surgeon" element={<Surgeons />}></Route>
        <Route index  path="/block" element={<Block />}></Route>
        <Route index  path="/settings" element={<Settings />}></Route>
        <Route index  path="/drawer" element={<TestDrawer />}></Route>
        <Route index  path="/opentimes" element={<OpenTimes />}></Route>
        <Route index  path="/findroom" element={<FindRoom />}></Route>
      </Route>
    </Routes>
  </div>
  );
}
export default App;
