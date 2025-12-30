import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, BookOpen, Newspaper, Shield, Info } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'الرئيسية', path: '/' },
        { name: 'صحيفة المدينة', path: '/updates' },
        { name: 'القوانين', path: '/rules' },
        { name: 'عن المدينة', path: '/about' },
        { name: 'صناع العمل', path: '/creators' },
        { name: 'الاقتراحات', path: '/suggestions' },
    ];

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <img src="assets/logo.png" alt="Tiger City" />
                    <span>تايقر سيتي</span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    {links.map((link) => (
                        link.path === '/updates' ? (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <Newspaper size={20} />
                                <span>{link.name}</span>
                            </NavLink>
                        ) : (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mobile-menu">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
