import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, ShieldAlert, Bot, TrendingUp, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Portfolio', path: '/portfolio', icon: <PieChart size={20} /> },
    { label: 'Risk & Tax', path: '/risk-tax', icon: <ShieldAlert size={20} /> },
    { label: 'AI Advisor', path: '/ai-advisor', icon: <Bot size={20} /> },
    { label: 'Market Insights', path: '/market-insights', icon: <TrendingUp size={20} /> },
    { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside style={{
      width: '240px',
      height: '100vh',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <div style={{ marginBottom: '40px', fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>
        FinAI Dash
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: location.pathname === item.path ? '#eff6ff' : 'transparent',
              color: location.pathname === item.path ? '#2563eb' : '#64748b',
              fontWeight: location.pathname === item.path ? '600' : '400',
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;