import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" className="nav-block">
        <div className="logo">
          Home
        </div>
      </Link>

      <nav className="nav-links">
        <Link to="/converter" className="nav-block">
          <div className="nav-item">Youtube Downloader</div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
