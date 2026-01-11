const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1>Dashboard</h1>
        <p style={{ color: '#64748b' }}>Welcome back, Investor.</p>
      </header>
      
      {/* Top AI Insight Panel */}
      <section style={{ backgroundColor: '#eff6ff', padding: '20px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
        <h3 style={{ color: '#1e40af' }}>AI Insight: Risk Level Moderate</h3>
        <p>Market volatility is increasing. Consider diversifying your tech sector exposure.</p>
        <button style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px' }}>
          Explain My Risk
        </button>
      </section>

      {/* Portfolio Snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>Total Portfolio Value</h3>
          <h2 style={{ fontSize: '2rem' }}>$12,450.00</h2>
          <span style={{ color: 'green' }}>+2.4% Today</span>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>Asset Allocation</h3>
          <p>[Pie Chart Placeholder]</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;