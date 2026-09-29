import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home';
import Account from './components/account/Account';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App;
