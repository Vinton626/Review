import { useState } from 'react';
import './App.css'
import { Login } from './conponents/login'
import { Register } from './conponents/register'

function App() {
  const[islogin, setIslogin]=useState(true);
  return islogin ? <Login onSwitch={()=>setIslogin(false)}/> : <Register onSwitch={()=>setIslogin(true)}/>;
  
}

export default App