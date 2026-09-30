import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home';
import LoginPage from './components/Auth/Login/LoginPage';
import RegisterPage from './components/Auth/Register/RegisterPage';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  )
}

export default App;
