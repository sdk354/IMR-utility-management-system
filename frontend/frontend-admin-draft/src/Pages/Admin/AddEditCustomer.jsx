import { useNavigate } from 'react-router-dom';

function AddEditCustomer() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Backend will handle this)');
    navigate('/admin/customers');
  };

  const handleCancel = () => {
    navigate('/admin/customers');
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Customer Details:</h2>
      </div>

    
    <div className="admin-form-container">
    <div className="admin-card" style={{ maxWidth: '700px' }}>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label>Customer ID</label>
              <input type="text" placeholder="e.g., CUST-001" required />
            </div>

            <div className="admin-form-group">
              <label>Customer Name</label>
              <input type="text" placeholder="e.g., Sarah Johnson" required />
            </div>

            <div className="admin-form-group">
              <label>Phone No</label>
              <input type="tel" placeholder="e.g., 0763356273" required />
            </div>

            <div className="admin-form-group">
              <label>Email</label>
              <input type="email" placeholder="e.g., sarah@gmail.com" required />
            </div>

            <div className="admin-form-group">
              <label>Account Type</label>
              <select>
                <option>Household</option>
                <option>Business</option>
                <option>Government</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>No. of Meters</label>
              <input type="number" min="1" placeholder="e.g., 3" />
            </div>

            <div className="admin-form-group">
              <label>Account Status</label>
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

export default AddEditCustomer;