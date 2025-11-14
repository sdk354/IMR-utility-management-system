function Reports() {
  return (
    <div className="admin-page">
      {/* SUMMARY CARDS 
      add data from db to values*/}
      <div className="admin-reports-grid">
        <div className="admin-report-card blue">
          <div className="admin-report-label">Daily Collection</div>
          <div className="admin-report-value">Rs. 4.59M</div> {/*placeholders only */}
        </div>

        <div className="admin-report-card green">
          <div className="admin-report-label">Monthly Revenue</div>
          <div className="admin-report-value">Rs. 120M</div>
        </div>

        <div className="admin-report-card orange">
          <div className="admin-report-label">Unpaid Bills</div>
          <div className="admin-report-value">Rs. 45M</div>
        </div>

        <div className="admin-report-card purple">
          <div className="admin-report-label">Collection Rate</div>
          <div className="admin-report-value">87%</div>
        </div>
      </div>

      {/* GENERATE REPORT FORM */}
      <div className="admin-table-container">
        <h3 className="admin-section-title">Generate Reports</h3>

        <div className="admin-reports-form">
          <div className="admin-form-group">
            <label>Report Type</label>
            <select className="admin-select">
              <option>Daily Collection Report</option>
              <option>Monthly Revenue Report</option>
              <option>Yearly Revenue Report</option>
              <option>Top Consumers Report</option>
              <option>Unpaid Bills Report</option>
              <option>Consumption Trend Report</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label>Period</label>
            <select className="admin-select">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        <button className="admin-btn-primary" style={{ marginTop: '1.5rem' }}>
          Generate Report
        </button> {/*on click- generate and download the report to admins pc */}
      </div>
    </div>
  );
}

export default Reports;