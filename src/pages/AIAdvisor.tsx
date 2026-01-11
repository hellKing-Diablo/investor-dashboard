const AIAdvisor = () => {
  return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <h1>AI Financial Advisor</h1>
      <div style={{ flex: 1, backgroundColor: 'white', marginTop: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
        <p style={{ color: '#64748b', fontStyle: 'italic' }}>AI Chat History will appear here...</p>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Ask about your portfolio..." 
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
        <button style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px' }}>Ask</button>
      </div>
    </div>
  );
};
export default AIAdvisor;