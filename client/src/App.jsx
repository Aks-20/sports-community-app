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
import TrainingSession from "./pages/TrainingSession";
import TrainingModules from "./pages/TrainingModules";
import Community from "./pages/Community";
import SignUpPage from "./pages/Auth/SignUp";

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
         <Route path="/session" element={<TrainingSession />} />  
         <Route path="/module" element={<TrainingModules />} />  
              <Route path="/comm" element={<Community />} />          
                   <Route path="/login" element={<SignUpPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;