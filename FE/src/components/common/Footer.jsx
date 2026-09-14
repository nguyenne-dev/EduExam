import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Github, Mail, Globe, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '100px',
        paddingTop: '70px',
        paddingBottom: '36px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          opacity: 0.6
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '340px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Sparkles size={19} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
                Edu<span className="gradient-text">Exam</span>
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Nền tảng khảo thí và đánh giá năng lực trắc nghiệm trực tuyến chuẩn EdTech 2026. Tốc độ tức thì, giao diện tương tác cao và phân tích điểm số chuyên sâu.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-primary">
                <Zap size={11} /> Đột phá UX
              </span>
              <span className="badge badge-success">
                <ShieldCheck size={11} /> 100% Bảo mật
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '20px', color: 'var(--text-main)' }}>
              Điều Hướng
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <Link to="/" style={{ transition: 'color var(--transition-fast)' }}>Trang chủ</Link>
              <Link to="/topics" style={{ transition: 'color var(--transition-fast)' }}>Chủ đề thi trắc nghiệm</Link>
              <Link to="/submissions" style={{ transition: 'color var(--transition-fast)' }}>Lịch sử làm bài</Link>
              <Link to="/about" style={{ transition: 'color var(--transition-fast)' }}>Về EduExam</Link>
              <Link to="/contact" style={{ transition: 'color var(--transition-fast)' }}>Hỗ trợ kỹ thuật</Link>
            </div>
          </div>

          {/* Topics Preview */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '20px', color: 'var(--text-main)' }}>
              Danh Mục Đề Thi
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <Link to="/topics">Lập trình Web & Javascript Core</Link>
              <Link to="/topics">React & Modern Frontend</Link>
              <Link to="/topics">Backend Architecture & Node.js</Link>
              <Link to="/topics">Cơ sở dữ liệu & Cấu trúc thuật toán</Link>
              <Link to="/topics">Kiến thức tổng hợp & IQ</Link>
            </div>
          </div>

          {/* System Info */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '20px', color: 'var(--text-main)' }}>
              Hệ Sinh Thái
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', display: 'inline-block', boxShadow: '0 0 8px var(--success)' }} />
                <span>Trạng thái: <strong style={{ color: 'var(--text-main)' }}>Hoạt động ổn định</strong></span>
              </div>
              <p>Engine: <strong style={{ color: 'var(--text-main)' }}>React 18 + Vite 6 SPA</strong></p>
              <p>Thuật toán chấm điểm: <strong style={{ color: 'var(--text-main)' }}>Tức thì 0ms</strong></p>
              <p>Mã hóa phiên: <strong style={{ color: 'var(--text-main)' }}>JWT Auth 256-bit</strong></p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            color: 'var(--text-subtle)',
            fontSize: '0.875rem',
          }}
        >
          <p>© {new Date().getFullYear()} EduExam Platform. Bản quyền thuộc về nền tảng khảo thí EduExam.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Phát triển với <Heart size={14} color="var(--danger)" fill="var(--danger)" /> cho cộng đồng học tập trực tuyến
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
