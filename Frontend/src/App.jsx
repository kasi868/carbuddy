// App.jsx
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { BrowserRouter, Outlet, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
 


  // Hide navbar and footer on these routes
  // const hideNavbar = [ '/admin-dashboard'].includes(location.pathname);
  // const hideFooter = ['/login', '/register'].includes(location.pathname); // already working, just an FYI

  const hideNavbar = location.pathname.startsWith('/dashboard');
  const hideFooter = location.pathname.startsWith('/dashboard');
  
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideFooter && <Footer />}

      
    </div>
  );
}

export default App;