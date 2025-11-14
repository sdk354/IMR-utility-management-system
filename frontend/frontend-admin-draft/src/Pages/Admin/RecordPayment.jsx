import { useNavigate } from 'react-router-dom';

function RecordPayment() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (Backend will handle this)');
    navigate('/admin/payments');
  };

  const handleCancel = () => {
    navigate('/admin/payments');
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Payment Details:</h2>
      </div>

    
    <div className="admin-form-container">
    <div className="admin-card" style={{ maxWidth: '700px' }}>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label>Payment ID</label>
              <input type="text" placeholder="PAY-2024-001" required />
            </div>                     

            <div className="admin-form-group">
              <label>Customer Name</label>
              <input type="text" placeholder="e.g., Sarah Johnson" required />
            </div>

            <div className="admin-form-group">
              <label>Bill No</label>
              <input type="text" placeholder="BILL-2024-001" required />
            </div>           

            <div className="admin-form-group">
              <label>Amount</label>
              <input type="number" step="0.01" min="0"placeholder="e.g.,2400.50 " required />
            </div>

            <div className="admin-form-group">
              <label>Method</label>
              <select>
                <option>Online</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Date</label>
              <input type="date" required  />
            </div>          
           </div> 
        
          <div className="admin-page-actions" style={{ marginTop: '2rem' }}>
            <button type="button" onClick={handleCancel} className="admin-btn-secondary">
              Cancel
            </button>
            <button type="submit" className="admin-btn-primary">
              Record Payment
            </button>
          </div>
        </form>

        
      </div>
      </div>
    </div>
  );
}

export default RecordPayment;