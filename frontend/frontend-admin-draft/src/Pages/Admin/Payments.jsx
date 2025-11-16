import { Link } from 'react-router-dom';
function Payments() {
  return (
    <div className="admin-page">   
      <div className="admin-table-container">
        <div className="admin-page-header">
        <h3>Payment Management</h3>
        <div className="admin-page-actions">
          <button className="admin-btn-secondary">Export Report</button>  {/*add export functionality */}
          <Link to="/admin/payments/recordpayment"> 
          <button className="admin-btn-primary">+ Record Payment</button> 
          </Link>  {/*go to RecordPayment.jsx page */}
        </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Customer</th>
              <th>Bill Number</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PAY-2024-001</td>
              <td>Sarah Johnson</td>
              <td>BILL-2024-002</td>
              <td>Rs. 18,950</td>
              <td>Online</td>
              <td>2024-01-20</td>
              
            </tr>
            <tr>
              <td>PAY-2024-002</td>
              <td>Michael Brown</td>
              <td>BILL-2024-005</td>
              <td>Rs. 15,600</td>
              <td>Cash</td>
              <td>2024-01-19</td>
              
            </tr>
            <tr>
              <td>PAY-2024-003</td>
              <td>XYZ Company</td>
              <td>BILL-2024-006</td>
              <td>Rs. 234,000</td>
              <td>Bank Transfer</td>
              <td>2024-01-18</td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;