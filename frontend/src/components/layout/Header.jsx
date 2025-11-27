import { useNavigate } from 'react-router-dom';

function Header({ title, isCustomer = false }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate('/');
    }
  };

  const headerClass = isCustomer ? 'customer-header' : 'admin-header';
  const titleClass = isCustomer ? 'customer-page-title' : 'admin-page-title';
  const profileClass = isCustomer ? 'customer-user-profile' : 'admin-user-profile';
  const avatarClass = isCustomer ? 'customer-user-avatar' : 'admin-user-avatar';
  const nameClass = isCustomer ? 'customer-user-name' : 'admin-user-name';
  const roleClass = isCustomer ? 'customer-user-role' : 'admin-user-role';
  const roleText = isCustomer ? 'Customer' : 'Administrator';
  const userInitials = isCustomer ? 'CU' : 'AD';

  return (
    <header className={headerClass}>
      <h1 className={titleClass}>{title}</h1>
      <div className={profileClass} onClick={handleLogout}>
        <div className={avatarClass}>{userInitials}</div>
        <div>
          <div className={nameClass}>User</div>
          <div className={roleClass}>{roleText}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
