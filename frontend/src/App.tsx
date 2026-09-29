import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account" element={<Account/>}/>
    </Routes>
  )
}

export default App;
