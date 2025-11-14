import { Link } from 'react-router-dom';
function Customers() {
  return (
    <div className="admin-page">   
      <div className="admin-table-container">
        <div className="admin-page-header">
        <h3>Customer Details</h3>
        <div className="admin-page-actions">
          <button className="admin-btn-secondary">Filters</button>  {/*add filters */}
          <Link to="/admin/customers/add">
          <button className="admin-btn-primary">+ Add New Customer</button> {/*go to AddEditCustomers.jsx page */}
          </Link>

        </div>
        </div>
        <table className="admin-table"> {/*customer details table */}
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Acc Type</th>
              <th>Meters</th>
              <th>Acc Status</th>
              <th>Past Payments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#12345</td>
              <td>Sarah Johnson</td>
              <td>0763356273</td>
              <td>sarah@gmail.com</td>
              <td>Household</td>
              <td>3</td>
              <td><span className="admin-status completed">Active</span></td>
              <td> 
                <Link to="/admin/customers/view">
                   <button className="admin-btn-secondary">View</button> 
                </Link>
              </td> {/*Go to PastPayments.jsx */}
              
              <td>
                <Link to="/admin/customers/add">
                  <button className="admin-btn-secondary">Edit</button>  
                </Link>
              </td> {/*go to AddEditCustomers.jsx page but make it prefilled*/}
             
            </tr>
            <tr>
              <td>#12346</td>
              <td>john fernando</td>
              <td>0783356273</td>
              <td>john@gmail.com</td>
              <td>Business</td>
              <td>12</td>
              <td><span className="admin-status incompleted">Inactive</span></td>
              <td> <button className="admin-btn-secondary">View</button> </td>
              <td> <button className="admin-btn-secondary">Edit</button>  </td>
             
            </tr>
            <tr>
              <td>#12347</td>
              <td>Sam pieris</td>
              <td>076338990</td>
              <td>sam@gmail.com</td>
              <td>Government</td>
              <td>-</td>
              <td><span className="admin-status pending">Pending</span></td>
              <td> <button className="admin-btn-secondary">View</button> </td>
              <td> <button className="admin-btn-secondary">Edit</button>  </td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;