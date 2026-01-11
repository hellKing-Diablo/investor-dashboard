import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        marginLeft: '240px', // Matches sidebar width
        padding: '32px',
        maxWidth: '1200px'
      }}>
        {/* Outlet renders the current page based on the route */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;