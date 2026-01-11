const RiskTax = () => {
  return (
    <div>
      <h1>Risk & Tax Analysis</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>Risk Meter</h3>
          <p>[Gauge Chart Placeholder]</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3>Tax Liability</h3>
          <p>Est. Capital Gains: $1,200</p>
        </div>
      </div>
    </div>
  );
};
export default RiskTax;