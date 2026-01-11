import {Outlet, useLocation} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function CustomerLayout() {
	const location = useLocation();

	const getPageTitle = () => {
		const path = location.pathname;
		const titles = {
			'/customer/dashboard': 'Dashboard',
			'/customer/bills': 'My Bills',
			'/customer/bills/:id': 'Bill Details',
			'/customer/payment': 'Payments',
			'/customer/support': 'Complaints',
			'/customer/profile': 'Profile'
		};
		return titles[path] || 'Customer Portal';
	};

	return (<div className="customer-layout">
			<Sidebar isCustomer={true}/>
			<div className="customer-main">
				<Header title={getPageTitle()} isCustomer={true}/>
				<main className="customer-content">
					<div className="customer-container">
						<Outlet/>
					</div>
				</main>
			</div>
		</div>);
}

export default CustomerLayout;
