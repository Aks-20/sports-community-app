import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import Profile from "./pages/Profile";
import SkillCheck from "./pages/SkillCheck";
import NotFound from "./pages/NotFound";
import OverView from "./pages/Admin/OverView";
import ProductPage from "./pages/Admin/ProductPage";
import Admin from "./pages/Admin/Admin";
import SettingsPage from "./pages/Admin/Settings";
import PlayerRadarChart from "./pages/PlayerRadarChart";
import Grounds from "./pages/Ground";
//import AnalyticsPage from "./pages/Admin/Analytics";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill-check" element={<SkillCheck />} />
        <Route path="*" element={<NotFound />} />
       
        <Route path="/overview" element={<OverView/>  } />
        <Route path="/products" element={<ProductPage/>}/>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/settings" element={<SettingsPage />} />
   <Route path="/playerradar" element={<PlayerRadarChart/>} />
         <Route path="/ground" element={<Grounds />} />              
      </Routes>
    </BrowserRouter>
  );
}

export default App;