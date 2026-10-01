import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  History, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  BookOpen, 
  ArrowRight, 
  LayoutDashboard,
  Home,
  Info,
  PhoneCall
} from 'lucide-react';
import EduExamLogo from './EduExamLogo';
import ThemeToggle from './ThemeToggle';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close mobile menu on screen resize (> 400px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 400) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
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
    gap: '6px',
    whiteSpace: 'nowrap'
  });

  return (
    <header
      className="glass-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 150,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div
        className="container nav-header-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
          gap: '12px',
          flexWrap: 'nowrap',
          position: 'relative'
        }}
      >
        {/* Brand Logo & Embedded Logo Theme Toggle */}
        <div className="nav-brand-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0
            }}
          >
            <EduExamLogo size={48} showText={true} />
          </Link>

          {/* Theme toggle embedded with logo (active at <= 768px when "chế độ cho vào logo") */}
          <div className="nav-logo-theme-toggle">
            <ThemeToggle size="sm" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'nowrap',
            flexShrink: 0
          }}
        >
          <NavLink to="/" style={navLinkStyle} className="nav-link-item" title="Trang chủ">
            <Home size={19} />
            <span className="nav-link-text">Trang chủ</span>
          </NavLink>
          <NavLink to="/topics" style={navLinkStyle} className="nav-link-item" title="Chủ đề trắc nghiệm">
            <BookOpen size={19} />
            <span className="nav-link-text">Chủ đề</span>
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/submissions" style={navLinkStyle} className="nav-link-item" title="Lịch sử làm bài">
              <History size={19} />
              <span className="nav-link-text">Lịch sử thi</span>
            </NavLink>
          )}
          <NavLink to="/about" style={navLinkStyle} className="nav-link-item" title="Giới thiệu EduExam">
            <Info size={19} />
            <span className="nav-link-text">Giới thiệu</span>
          </NavLink>
          <NavLink to="/contact" style={navLinkStyle} className="nav-link-item" title="Liên hệ góp ý">
            <PhoneCall size={19} />
            <span className="nav-link-text">Liên hệ</span>
          </NavLink>
        </nav>

        {/* Mobile Center Hub Button (Exclusively displayed in the center at <= 400px) */}
        <div className="mobile-center-hub">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hub-btn"
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu chính'}
            title="Menu điều hướng"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-card)',
              color: 'var(--text-main)',
              fontSize: '0.825rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            <span>Menu</span>
          </button>
        </div>

        {/* Right Actions Cluster */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0
          }}
        >
          {/* Admin shortcut if admin user */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className="btn btn-sm nav-admin-badge"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                color: 'var(--primary)',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LayoutDashboard size={15} />
              <span className="nav-admin-text">Admin Hub</span>
            </Link>
          )}

          {/* Theme Toggle - Modern Segmented Capsule */}
          <div className="nav-theme-toggle">
            <ThemeToggle size="normal" />
          </div>

          {/* User Auth Section */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-secondary nav-user-btn"
                title={user?.fullname}
                style={{
                  padding: '4px 14px 4px 6px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid var(--border-card)',
                  backgroundColor: 'var(--bg-surface)',
                  minHeight: '42px',
                  overflow: 'visible'
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'var(--primary-gradient)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.35)',
                    flexShrink: 0
                  }}
                >
                  {user?.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                </div>

                {/* Full name displayed with ample vertical breathing room - zero clipping */}
                <span
                  className="nav-user-name"
                  title={user?.fullname}
                  style={{
                    maxWidth: '260px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    lineHeight: 1.6,
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    display: 'inline-block',
                    verticalAlign: 'middle'
                  }}
                >
                  {user?.fullname || 'Tài khoản'}
                </span>

                <ChevronDown
                  size={15}
                  color="var(--text-muted)"
                  className="nav-user-chevron"
                  style={{
                    flexShrink: 0,
                    transition: 'transform 0.22s ease',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>

              {/* User Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="glass-card animate-fade-in"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '260px',
                    padding: '8px',
                    backgroundColor: 'var(--bg-surface)',
                    boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
                    zIndex: 200,
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-card)'
                  }}
                >
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '6px' }}>
                    <p style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', wordBreak: 'break-word', lineHeight: 1.5, padding: '2px 0' }}>
                      {user?.fullname}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user?.email}
                    </p>
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
                    <History size={16} color="var(--primary)" />
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
                        transition: 'all var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LayoutDashboard size={16} />
                      Khu vực Quản trị
                    </Link>
                  )}

                  {/* Theme Switcher inside User Menu (accessible on tablet & mobile) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      marginTop: '6px',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      Chuyển theme
                    </span>
                    <ThemeToggle size="sm" />
                  </div>

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
        </div>
      </div>

      {/* Mobile Drawer Menu (Slide-down with backdrop blur) */}
      {mobileMenuOpen && (
        <div
          className="animate-fade-in mobile-menu-drawer"
          style={{
            position: 'absolute',
            top: '72px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-card)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: 'var(--shadow-lg), 0 10px 30px rgba(0,0,0,0.1)',
            zIndex: 199
          }}
        >
          {/* User quick info if authenticated on mobile */}
          {isAuthenticated && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-subtle)',
                marginBottom: '8px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--primary-gradient)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  flexShrink: 0
                }}
              >
                {user?.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.5, padding: '2px 0' }}>
                  {user?.fullname}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <NavLink to="/" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
            <Home size={18} /> Trang chủ
          </NavLink>
          <NavLink to="/topics" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
            <BookOpen size={18} /> Chủ đề trắc nghiệm
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/submissions" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
              <History size={18} /> Lịch sử làm bài
            </NavLink>
          )}
          <NavLink to="/about" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
            <Info size={18} /> Giới thiệu EduExam
          </NavLink>
          <NavLink to="/contact" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
            <PhoneCall size={18} /> Liên hệ góp ý
          </NavLink>

          {isAuthenticated && isAdmin && (
            <NavLink
              to="/admin"
              style={{
                ...navLinkStyle({ isActive: false }),
                color: 'var(--primary)',
                fontWeight: 700
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <LayoutDashboard size={18} /> Trung tâm Quản trị Admin
            </NavLink>
          )}

          {/* Drawer Footer Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
              marginTop: '10px',
              paddingTop: '16px'
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Giao diện:
            </span>
            <ThemeToggle size="normal" />
          </div>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{
                width: '100%',
                marginTop: '10px',
                color: 'var(--danger)',
                justifyContent: 'center',
                borderColor: 'var(--danger-border)'
              }}
            >
              <LogOut size={16} /> Đăng xuất
            </button>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
              <Link
                to="/login"
                className="btn btn-secondary"
                style={{ justifyContent: 'center' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                style={{ justifyContent: 'center' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
