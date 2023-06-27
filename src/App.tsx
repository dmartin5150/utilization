
import React, {useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './routes/navigation/navigation.component';
import Utilization from "./pages/utilization/utilization";
import Settings from './pages/settings/settings';
import Surgeons from './pages/surgeons/surgeons';
import Rooms from './pages/Rooms/Rooms';



import "./App.scss";

function App() {



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
