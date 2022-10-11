import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Physician from "./pages/physcian/physician-page";
import Patient from "./pages/patient/patient-page";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* <Route index element={<Patient />}></Route> */}
        <Route path="/" element={<Patient />}></Route>
        <Route index  path="/physician" element={<Physician />}></Route>
      </Route>
    </Routes>
  );
}
export default App;
