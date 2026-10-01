import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import EduExamLogo from '../../components/common/EduExamLogo';

export const LoginPage = () => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      addToast('Vui lòng nhập đầy đủ email và mật khẩu', 'warning');
      return;
    }

    try {
      setLoading(true);
      await login({ email, password });
      addToast('Đăng nhập thành công!', 'success');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      addToast(err.message || 'Đăng nhập thất bại. Vui lòng thử lại!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 180px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px 20px' }}>
      <div
        className="bento-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '44px 38px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '16px' }}>
            <EduExamLogo size={46} showText={false} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Đăng Nhập</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '6px' }}>
            Chào mừng trở lại! Vui lòng nhập thông tin tài khoản của bạn.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={16} /> Địa chỉ Email
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                <Lock size={16} /> Mật khẩu
              </label>
              <Link
                to="/forgot-password"
                style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 700 }}
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '48px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-subtle)',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-full)', fontSize: '1rem', marginTop: '16px', fontWeight: 800 }}
            disabled={loading}
          >
            <LogIn size={18} /> {loading ? 'Đang xác thực...' : 'Đăng Nhập Ngay'}
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '1px solid var(--border-subtle)', paddingTop: '22px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Chưa có tài khoản EduExam?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 800 }}>
              Đăng ký ngay <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
