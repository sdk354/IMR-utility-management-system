import { Link } from 'react-router-dom';
function Billing() {
  return (
    <div className="admin-page">   
      <div className="admin-table-container">
        <div className="admin-page-header">
        <h3>Billing Management</h3>
        <div className="admin-page-actions">
          <Link to="/admin/billing/add">        
            <button className="admin-btn-primary">+ New Bill</button> {/*go to AddEditBill.jsx page */}
          </Link>  
        </div>
        </div>
        <table className="admin-table"> {/*Billing details table */}
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Meter No</th>
              <th>Customer</th>              
              <th>Period</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BILL-2024-001</td>
              <td>MTR-E-001234</td>
              <td>Peter Fernando</td>
              <td>March 2024</td>
              <td>Rs. 24,500</td>
              <td>2024-03-17</td>
              <td><span className="admin-status pending">Unpaid</span></td>
              <td> 
                  <Link to="/admin/billing/add">
                   <button className="admin-btn-secondary">Edit</button>
                  </Link> 
              </td> {/*go to AddEditBill.jsx page but make it prefilled*/}                    
            </tr>

            <tr>
              <td>BILL-2024-002</td>
              <td>MTR-G-001234</td>
              <td>Sam Fernando</td>
              <td>Jan 2024</td>
              <td>Rs. 28,500</td>
              <td>2024-01-20</td>
              <td><span className="admin-status completed">Paid</span></td>
              <td> <button className="admin-btn-secondary">Edit</button> </td> {/*go to AddEditBill.jsx page but make it prefilled*/}                    
            </tr>

            <tr>
              <td>BILL-2024-001</td>
              <td>MTR-W-001234</td>
              <td>Sarah Johnsons</td>
              <td>Jan 2024</td>
              <td>Rs. 21,400</td>
              <td>2024-01-17</td>
              <td><span className="admin-status incompleted">Overdue</span></td>
              <td> <button className="admin-btn-secondary">Edit</button> </td> {/*go to AddEditBill.jsx page but make it prefilled*/}                    
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Billing;