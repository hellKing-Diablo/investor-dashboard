import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

// Placeholder imports (we will create these files next)
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import RiskTax from './pages/RiskTax';
import AIAdvisor from './pages/AIAdvisor';
import MarketInsights from './pages/MarketInsights';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="risk-tax" element={<RiskTax />} />
          <Route path="ai-advisor" element={<AIAdvisor />} />
          <Route path="market-insights" element={<MarketInsights />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;