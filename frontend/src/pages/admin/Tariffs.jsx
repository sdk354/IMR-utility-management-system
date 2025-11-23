import { Link } from 'react-router-dom';
function Tariffs() {
  return (
    <div className="admin-page">
      <div className="admin-table-container">
        <div className="admin-page-header">
         <h3>Tariff Management</h3>
         <div className="admin-page-actions">  
          <Link to="/admin/tariffs/add">      
            <button className="admin-btn-primary">+ Add Tariff</button> 
          </Link> {/*go to AddTariff.jsx page */}
         </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tariff Name</th>
              <th>Utility Type</th>
              <th>Rate</th>
              <th>Category</th>
              <th>Actions</th>    
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Domestic - 0-30 Units</td>
              <td>Electricity</td>
              <td>Rs. 8.00/kWh</td>
              <td>Household</td>
              <td>
                <Link to="/admin/tariffs/add">   
                   <button className="admin-btn-secondary">Edit</button>
                </Link>
              </td> {/*go to AddTariff.jsx page but make form prefilled*/}
              
            </tr>
            <tr>
              <td>Domestic - 31-60 Units</td>
              <td>Electricity</td>
              <td>Rs. 16.00/kWh</td>
              <td>Business</td>
              <td><button className="admin-btn-secondary">Edit</button></td>
            </tr>
            <tr>
              <td>Commercial Rate</td>
              <td>Electricity</td>
              <td>Rs. 25.00/kWh</td>
              <td>Government</td>
              <td><button className="admin-btn-secondary">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tariffs;