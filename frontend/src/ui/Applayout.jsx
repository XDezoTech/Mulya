import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  const { pathname } = useLocation();
  // true for "/home", "/home/anything", "/home/anything/else", etc.
  const isHomeView = pathname === '/home' || pathname.startsWith('/home/');

  return (
    <>
      <Header homeView={isHomeView} />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
