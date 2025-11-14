function PastPayments() {
  return (
      <div className="admin-page">   
      <div className="admin-table-container">
        <div className="admin-page-header">
        <h3>Past Payments:</h3>
        </div>

        {/*include selected customers past payment details */}

        <table className="admin-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Bill Number</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PAY-2024-001</td>
              <td>BILL-2024-002</td>
              <td>Rs. 1,950</td>
              <td>2024-01-20</td>
            </tr>
            <tr>
              <td>PAY-2024-002</td>
              <td>BILL-2024-005</td>
              <td>Rs. 600</td>
              <td>2024-01-19</td>
            </tr>
            <tr>
              <td>PAY-2024-003</td>
              <td>BILL-2024-006</td>
              <td>Rs. 4,000</td>
              <td>2024-01-18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PastPayments;