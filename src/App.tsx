import React from 'react';
import './App.css';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import Registration from "./components/Registration";

function App() {
    const PATH = [
        {path: '/',point:'Profile',component:<Profile/>},
        {path: '/login',point:'Login',component:<Login/>},
        {path: '/registration',point:'Registration',component:<Registration/>}
]


  return (
      <div className={'App'}>
          <nav className={'navLinks'}>
              {PATH.map(link=><NavLink to={link.path}>{link.point}</NavLink>)}
          </nav>
        <Routes>
            {PATH.map(route=><Route path={route.path} element={route.component}/>)}

          <Route path={'/*'} element={<PageNotFound/>}/>
        </Routes>
      </div>
  );
}

export default App;
