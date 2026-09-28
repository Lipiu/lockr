import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home';
import Account from './components/account/Account';
import Login from './components/Login/Login';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/account" element={<Account/>}/>
    </Routes>
  )
}

export default App;
