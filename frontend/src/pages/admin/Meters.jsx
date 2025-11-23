import { Link } from 'react-router-dom';
function Meters() {
  return (
    <div className="admin-page">   
      <div className="admin-table-container">
        <div className="admin-page-header">
        <h3>Meter Management</h3>
        <div className="admin-page-actions">  
          <Link to="/admin/meters/register">        
            <button className="admin-btn-primary">+ Register Meter</button>
          </Link> {/*go to RegisterMeter.jsx page */}
        </div>
        </div>
        <table className="admin-table"> {/*Meter details table */}
          <thead>
            <tr>
              <th>Meter No</th>
              <th>Customer</th>
              <th>Utility Type</th>
              <th>Last Reading</th>
              <th>Reading Date</th>
              <th>Meter Status</th>
              <th>Actions</th>
              <th>New Reading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MTR-W-001234</td>
              <td>Sarah Johnson</td>
              <td>Water</td>
              <td>-</td>
              <td>-</td>
              <td><span className="admin-status pending">Pending</span></td>
              <td>
                <Link to="/admin/meters/register">        
                  <button className="admin-btn-secondary">Edit</button>
                </Link> 
              </td>  {/*Go to RegisterMeter.jsx but make details prefilled */} 
              <td> 
                <Link to="/admin/meters/newreading">  
                  <button className="admin-btn-secondary">+</button> 
                </Link>
              </td> {/*Go to AddMeterReading.jsx */}                     
            </tr>

            <tr>
              <td>MTR-E-001234</td>
              <td>Peter Fernando</td>
              <td>Electricity</td>
              <td>2356 kWh</td>
              <td>2024-01-17</td>
              <td><span className="admin-status incompleted">Inctive</span></td>
              <td> <button className="admin-btn-secondary">Edit</button> </td> 
              <td> <button className="admin-btn-secondary">+</button> </td>                     
            </tr>

            <tr>
              <td>MTR-G-001234</td>
              <td>Sam pieris</td>
              <td>Gas</td>
              <td>64m³</td>
              <td>2024-02-15</td>
              <td><span className="admin-status completed">Active</span></td>
              <td> <button className="admin-btn-secondary">Edit</button> </td> 
              <td> <button className="admin-btn-secondary">+</button> </td>                     
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Meters;