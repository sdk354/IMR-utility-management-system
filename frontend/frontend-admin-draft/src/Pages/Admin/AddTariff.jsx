import { useNavigate } from 'react-router-dom';

function AddTariff() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Backend will handle this)');
    navigate('/admin/tariffs');
  };

  const handleCancel = () => {
    navigate('/admin/tariffs');
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Tariff Details:</h2>
      </div>

    
    <div className="admin-form-container">
    <div className="admin-card" style={{ maxWidth: '700px' }}>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">            

            <div className="admin-form-group">
              <label>Tariff Name</label>
              <input type="text" placeholder="e.g., Domestic - 0-30 Units" required />
            </div>

            <div className="admin-form-group">
              <label>Utility Type</label>
              <select>
                <option>Water</option>
                <option>Electricity</option>
                <option>Gas</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Rate</label>
              <input type="number" step="0.01" min="0"placeholder="e.g.,Rs. 8.00/kWh " required />
            </div>

            <div className="admin-form-group">
              <label>Category</label>
              <select>
                <option>Household</option>
                <option>Business</option>
                <option>Government</option>
              </select>
            </div>
           </div> 
        
          <div className="admin-page-actions" style={{ marginTop: '2rem' }}>
            <button type="button" onClick={handleCancel} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="submit" className="admin-btn-primary">
              Submit
            </button>
          </div>
        </form>

        
      </div>
      </div>
    </div>
  );
}

export default AddTariff;