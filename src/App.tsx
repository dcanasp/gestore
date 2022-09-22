import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './common/navbar/NavBar';
import './App.css';
import Login from "./pages/Login/Login"
import AllComponents from "./pages/AllComponents/AllCompents"
import Principal from './pages/Home/Principal'; 
import Help from './pages/Help/Help';
import Footer from './common/Footer';
import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';


// quitar express y prisma, esos no van aca
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar />  
       <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/main" element={<Principal/>}></Route>
      <Route path="/help" element={<Help/>}></Route>
      <Route path="/allComponents" element={<AllComponents/>}></Route>
      
       </Routes>
   <div/>
    <Footer></Footer>
    </Router>
       
  );
}

export default App;
