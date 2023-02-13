import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";


//contexto
import { AuthProvider } from './context/AuthContext';

//componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashborad/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';



function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }
  return (
    <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar/>
          <div className="container">
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
                <Route path='/register' element={!user ? <Register/> : <Navigate to='/'/>}/>
                <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to='/login'/>}/>
                <Route path='/post/create' element={user ? <CreatePost/> : <Navigate to='/login'/>}/>
              </Routes>
          </div>
          <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
