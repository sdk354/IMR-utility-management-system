import {useState, useEffect} from 'react';

function Reports() {
	const [summary, setSummary] = useState({
		totalCustomers: 0, activeMeters: 0, outstandingBalance: 0, todaysCollections: 0
	});
	const [loading, setLoading] = useState(true);
	const [reportType, setReportType] = useState("Monthly Revenue Report");
	const [period, setPeriod] = useState("Last 30 Days");

	const [reportData, setReportData] = useState([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const getAuthHeader = () => {
		const user = JSON.parse(localStorage.getItem('user'));
		return {'Authorization': `Bearer ${user?.token}`};
	};

	useEffect(() => {
		fetchSummary();
	}, []);

	const fetchSummary = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/reports/summary', {
				headers: getAuthHeader()
			});
			if (!response.ok) throw new Error('Unauthorized or Server Error');
			const data = await response.json();
			setSummary(data);
		} catch (error) {
			console.error("Failed to load reports:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleViewReport = async () => {
		setIsGenerating(true);
		try {
			const response = await fetch(`http://localhost:8080/api/reports/data?type=${encodeURIComponent(reportType)}&period=${encodeURIComponent(period)}`, {headers: getAuthHeader()});
			if (!response.ok) throw new Error("Failed to fetch report data");
			const data = await response.json();
			setReportData(data);
		} catch (error) {
			alert("Error: " + error.message);
		} finally {
			setIsGenerating(false);
		}
	};

	return (<div className="admin-page">
		<div className="admin-reports-grid">
			<div className="admin-report-card blue">
				<div className="admin-report-label">Daily Collection</div>
				<div className="admin-report-value">
					Rs. {loading ? "..." : Number(summary.todaysCollections).toLocaleString()}
				</div>
			</div>

			<div className="admin-report-card green">
				<div className="admin-report-label">Total Customers</div>
				<div className="admin-report-value">
					{loading ? "..." : summary.totalCustomers}
				</div>
			</div>

			<div className="admin-report-card orange">
				<div className="admin-report-label">Unpaid / Outstanding</div>
				<div className="admin-report-value">
					Rs. {loading ? "..." : (Number(summary.outstandingBalance) / 1000000).toFixed(2)}M
				</div>
			</div>

			<div className="admin-report-card purple">
				<div className="admin-report-label">Active Meters</div>
				<div className="admin-report-value">
					{loading ? "..." : summary.activeMeters}
				</div>
			</div>
		</div>

		<div className="admin-table-container">
			<h3 className="admin-section-title">Report Configuration</h3>

			<div className="admin-reports-form">
				<div className="admin-form-group">
					<label>Report Type</label>
					<select
						className="admin-select"
						value={reportType}
						onChange={(e) => setReportType(e.target.value)}
					>
						<option>Monthly Revenue Report</option>
						<option>Daily Collection Report</option>
						<option>Yearly Revenue Report</option>
						<option>Unpaid Bills Report</option>
					</select>
				</div>

				<div className="admin-form-group">
					<label>Period</label>
					<select
						className="admin-select"
						value={period}
						onChange={(e) => setPeriod(e.target.value)}
					>
						<option>Last 7 Days</option>
						<option>Last 30 Days</option>
						<option>Last Month</option>
						<option>This Year</option>
					</select>
				</div>
			</div>

			<button
				className="admin-btn-primary"
				style={{marginTop: '1.5rem'}}
				onClick={handleViewReport}
				disabled={isGenerating}
			>
				{isGenerating ? "Loading..." : "View Report Online"}
			</button>
		</div>

		{reportData.length > 0 && (<div className="admin-table-container" style={{marginTop: '2rem'}}>
			<h3 className="admin-section-title">Results: {reportType}</h3>
			<table className="admin-table">
				<thead>
				<tr>
					{Object.keys(reportData[0]).map((key) => (<th key={key}>{key}</th>))}
				</tr>
				</thead>
				<tbody>
				{reportData.map((row, index) => (<tr key={index}>
					{Object.values(row).map((val, i) => (<td key={i}>{val?.toString()}</td>))}
				</tr>))}
				</tbody>
			</table>
		</div>)}
	</div>);
}

export default Reports;