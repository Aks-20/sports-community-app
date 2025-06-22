import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Profile from "./pages/Profile";

import NotFound from "./pages/NotFound";
import OverView from "./pages/Admin/OverView";
import ProductPage from "./pages/Admin/ProductPage";
import Admin from "./pages/Admin/Admin";
import SettingsPage from "./pages/Admin/Settings";
import PlayerRadarChart from "./pages/PlayerRadarChart";
import Grounds from "./pages/Ground";
import SportConnectApp from "./pages/Tournament";
//import AnalyticsPage from "./pages/Admin/Analytics";


function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />} />
  
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
       
        <Route path="/overview" element={<OverView/>  } />
        <Route path="/products" element={<ProductPage/>}/>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/settings" element={<SettingsPage />} />
   <Route path="/performance" element={<PlayerRadarChart/>} />
         <Route path="/ground" element={<Grounds />} />  
         <Route path="/tournament" element={<SportConnectApp />} />           
      </Routes>
    </BrowserRouter>
  );
}

export default App;