function Complaints() {
  return (
    <div className="admin-page">
      <div className="admin-table-container">
        <div className="admin-page-header">
          <h3>Complaint Management</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Customer</th>
              <th>Complaint</th>
              <th>Date Submitted</th>
              <th>Actions</th>    
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>C001</td>
              <td>Nimal Perera</td>
              <td>Water bill shows wrong amount</td>
              <td>2025-11-01</td>
              <td><button className="admin-btn-secondary">Reply</button></td> {/*open email to send a reply to the customer*/}
              
            </tr>
            <tr>
              <td>C002</td>
              <td>Kavindu Silva</td>
              <td>Gas meter not working properly</td>
              <td>2025-11-05</td>
              <td><button className="admin-btn-secondary">Reply</button></td>
            </tr>
            <tr>
              <td>C003</td>
              <td>Sarah Fernando</td>
              <td>Didn’t receive last month’s bill</td>
              <td>2025-11-15</td>
              <td><button className="admin-btn-secondary">Reply</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Complaints;