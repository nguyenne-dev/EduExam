import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  User, 
  History, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  BookOpen,
  ArrowRight,
  Flame,
  LayoutDashboard
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }) => ({
    padding: '8px 16px',
    borderRadius: 'var(--radius-full)',
    fontWeight: 600,
    fontSize: '0.9rem',
    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
    border: isActive ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
    transition: 'all var(--transition-fast)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  });

  return (
    <header className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.1 }}>
              Edu<span className="gradient-text">Exam</span>
            </span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Adaptive Quiz Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav">
          <NavLink to="/" style={navLinkStyle}>Trang chủ</NavLink>
          <NavLink to="/topics" style={navLinkStyle}>
            <BookOpen size={16} /> Chủ đề
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/submissions" style={navLinkStyle}>
              <History size={16} /> Lịch sử thi
            </NavLink>
          )}
          <NavLink to="/about" style={navLinkStyle}>Giới thiệu</NavLink>
          <NavLink to="/contact" style={navLinkStyle}>Liên hệ</NavLink>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Admin shortcut if admin user */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                color: 'var(--primary)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)'
              }}
            >
              <LayoutDashboard size={15} /> Admin Hub
            </Link>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-icon btn-secondary"
            title={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
            style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)' }}
          >
            {isDark ? <Sun size={19} color="#fbbf24" /> : <Moon size={19} color="#6366f1" />}
          </button>

          {/* User Auth Section */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-secondary"
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid var(--border-card)'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary-gradient)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.35)'
                }}>
                  {user?.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.9rem', fontWeight: 600 }}>
                  {user?.fullname || 'Tài khoản'}
                </span>
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="glass-card animate-fade-in"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '240px',
                    padding: '8px',
                    backgroundColor: 'var(--bg-surface)',
                    boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
                    zIndex: 200,
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '6px' }}>
                    <p style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>{user?.fullname}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
                    {isAdmin && (
                      <span className="badge badge-primary" style={{ marginTop: '8px' }}>
                        <ShieldCheck size={12} /> Quản trị viên
                      </span>
                    )}
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <User size={16} color="var(--primary)" />
                    Thông tin cá nhân
                  </Link>

                  <Link
                    to="/submissions"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <History size={16} color="var(--info)" />
                    Lịch sử làm bài
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        backgroundColor: 'var(--primary-light)',
                        margin: '4px 0',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <LayoutDashboard size={16} />
                      Trang Quản trị
                    </Link>
                  )}

                  <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '6px', paddingTop: '6px' }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--danger)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        width: '100%',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--danger-bg)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                Đăng ký <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon btn-secondary mobile-menu-btn"
            style={{ width: '42px', height: '42px', display: 'none' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: 'absolute',
            top: '76px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <NavLink to="/" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Trang chủ</NavLink>
          <NavLink to="/topics" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Chủ đề</NavLink>
          {isAuthenticated && (
            <NavLink to="/submissions" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Lịch sử thi</NavLink>
          )}
          <NavLink to="/about" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Giới thiệu</NavLink>
          <NavLink to="/contact" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Liên hệ</NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
