import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="admin-page">
      
      <div className="admin-dashboard-grid">
        <div className="admin-summary-card">
          <div className="admin-summary-icon blue">
            <span className="icon-users"></span>
          </div>
          <div>
            <div className="admin-summary-title">Total Customers</div>
            <div className="admin-summary-value">24,567</div>
            <div className="admin-summary-change up">↑ 12% from last month</div>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="admin-summary-icon green">
            <span className="icon-gauge"></span>
          </div>
          <div>
            <div className="admin-summary-title">Active Meters</div>
            <div className="admin-summary-value">31,245</div>
            <div className="admin-summary-change up">↑ 8% from last month</div>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="admin-summary-icon orange">
            <span className="icon-money"></span>
          </div>
          <div>
            <div className="admin-summary-title">Outstanding Balance</div>
            <div className="admin-summary-value">Rs. 120M</div>
            <div className="admin-summary-change down">↓ 5% from last month</div>
          </div>
        </div>

        <div className="admin-summary-card">
          <div className="admin-summary-icon teal">
            <span className="icon-collection"></span>
          </div>
          <div>
            <div className="admin-summary-title">Today's Collections</div>
            <div className="admin-summary-value">Rs. 4,589,000</div>
            <div className="admin-summary-change up">↑ 23% from yesterday</div>
          </div>
        </div>
      </div>

      {/* REVENUE TREND CHART */}
      <div className="admin-card" style={{ marginTop: '2rem' }}>
       <div className="admin-card-header">
        <h3 className="admin-section-title">Monthly Revenue Trend</h3>
        <button className="admin-btn-secondary">Export</button>
       </div>
       <div className="admin-chart-placeholder">
        <img 
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fquietlight.com%2Ffinancial-trend-analysis%2F&psig=AOvVaw35H75NFHnPlN-2gZ13JG8k&ust=1763117023952000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPinkvH47pADFQAAAAAdAAAAABAK"
          alt="Monthly Revenue Trend"
          style={{ width: '100%', height: '100%', borderRadius: '8px' }}
        />
       </div>
      </div>

      {/* ALERTS + QUICK ACTIONS */}
      <div className="admin-flex-row" style={{ marginTop: '2rem', gap: '1.5rem' }}>
        {/* RECENT ALERTS */}
        <div className="admin-card" style={{ flex: 1 }}>
          <h3 className="admin-section-title">Recent Alerts</h3>
          <div className="admin-alert orange">
            <strong>High Consumption Alert</strong>
            <p>Customer #12345 exceeded 150% of average usage</p>
          </div>
          <div className="admin-alert red">
            <strong>Payment Overdue</strong>
            <p>245 accounts have payments overdue by 30+ days</p>
          </div>
          <div className="admin-alert blue">
            <strong>Meter Reading Due</strong>
            <p>1,234 meters pending monthly reading</p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="admin-card" style={{ flex: 1 }}>
          <h3 className="admin-section-title">Quick Actions</h3>
          <div className="admin-quick-actions">
            <Link to="/admin/customers/add">
              <button className="admin-quick-btn blue">
                <span className="icon-plus"></span> Add New Customer
              </button>
            </Link>
            <Link to="/admin/meters/register">
              <button className="admin-quick-btn indigo">
                <span className="icon-gauge"></span> Register New Meter
              </button>
            </Link>
            <Link to="/admin/payments/recordpayment">
              <button className="admin-quick-btn green">
                <span className="icon-credit-card"></span> Record Payment
              </button>
            </Link>
            <Link to="/admin/tariffs/add">
              <button className="admin-quick-btn purple">
                <span className="icon-tag"></span> Add Tariff
              </button>
            </Link>
            <Link to="/admin/complaints">
              <button className="admin-quick-btn orange">
                <span className="icon-message-alert"></span> View Complaints
              </button>
            </Link>
            <Link to="/admin/reports">
              <button className="admin-quick-btn gray">
                <span className="icon-chart"></span> View Reports
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;