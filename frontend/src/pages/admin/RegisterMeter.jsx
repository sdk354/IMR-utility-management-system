import { useNavigate } from 'react-router-dom';

function RegisterMeter() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Backend will handle this)');
    navigate('/admin/meters');
  };

  const handleCancel = () => {
    navigate('/admin/meters');
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Meter Details :</h2>
      </div>

    
    <div className="admin-form-container">
    <div className="admin-card" style={{ maxWidth: '700px' }}>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label>Meter No</label>
              <input type="text" placeholder="e.g., MTR-W-001234" required />
            </div>

            <div className="admin-form-group">
              <label>Customer Name</label>
              <input type="text" placeholder="e.g., Sarah Johnson" required />
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
              <label>Meter Status</label>
              <select>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
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

export default RegisterMeter;