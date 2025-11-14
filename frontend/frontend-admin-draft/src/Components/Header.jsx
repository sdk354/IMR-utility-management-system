import { useNavigate } from 'react-router-dom';

function Header({ title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate('/');
    }
  };

  return (
    <header className="admin-header">
      <h1 className="admin-page-title">{title}</h1>
      <div className="admin-user-profile" onClick={handleLogout}>
        <div className="admin-user-avatar">AD</div>
        <div>
          <div className="admin-user-name">Admin User</div>
          <div className="admin-user-role">Administrator</div>
        </div>
      </div>
    </header>
  );
}

export default Header;