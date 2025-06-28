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
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import LoginPage from "./pages/Auth/LoginPage";
import EmailVerificationPage from "./pages/Auth/EmailVerificationPage";
import PlayerDashboard from "./pages/Player/Player.";
import UpgradePlan from "./pages/UpgradePlan";
import ResetPasswordPage from "./pages/Auth/ResetPassword";

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
                   <Route path="/signup" element={<SignUpPage />} /> 

                     <Route path="/login" element={<LoginPage />} /> 
                     <Route path="/forgotpass" element={<ForgotPasswordPage />} /> 
                     <Route path="/verify-email" element={<EmailVerificationPage />} />
                     <Route path="/dashboard" element={<PlayerDashboard />} />
                      <Route path="/upgrade" element={<UpgradePlan />} />
                      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;