import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePageScreen from "./screens/HomePageScreen/HomePageScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import DetailPage from "./screens/DetailPage/DetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageScreen />}></Route>
        <Route path="/list" element={<HomePageScreen />}></Route>
        <Route path="/detail" element={<DetailPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
