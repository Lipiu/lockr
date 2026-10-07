import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home';
import LoginPage from './components/Auth/Login/LoginPage';
import RegisterPage from './components/Auth/Register/RegisterPage';
import ForgotPasswordPage from './components/Auth/ForgotPassword/ForgotPasswordPage';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
    </Routes>
  )
}

export default App;
