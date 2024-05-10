import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePageScreen from "./screens/HomePageScreen/HomePageScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import DetailPage from "./screens/DetailPage/DetailPage";
import StatisticPage from "./screens/StatisticPage/StatisticPage";
import OtherListPage from "./screens/OtherListPage/OtherListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageScreen />}></Route>
        <Route path="/list" element={<HomePageScreen />}></Route>
        <Route path="/detail/:orderId" element={<DetailPage />}></Route>
        <Route path="/statistic" element={<StatisticPage />}></Route>
        <Route path="/otherlist" element={<OtherListPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
