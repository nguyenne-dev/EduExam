import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topicService } from '../../services/topicService';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Zap, 
  Trophy, 
  Users, 
  BookOpen, 
  TrendingUp,
  Award,
  Clock,
  ShieldCheck,
  Check,
  Flame,
  LayoutDashboard,
  CheckSquare
} from 'lucide-react';
import EduExamLogo from '../../components/common/EduExamLogo';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const HomePage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interactive Hero Micro-Challenge state
  const [heroSelectedOption, setHeroSelectedOption] = useState('A');
  const [heroAnswerRevealed, setHeroAnswerRevealed] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await topicService.getAllTopics();
        setTopics(data.slice(0, 6)); // Lấy tối đa 6 chủ đề nổi bật
      } catch (err) {
        console.error('Lỗi khi tải chủ đề trang chủ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleHeroOptionClick = (key) => {
    setHeroSelectedOption(key);
    setHeroAnswerRevealed(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '90px', paddingBottom: '60px' }}>
      
      {/* 1. Hero Section */}
      <section className="container" style={{ paddingTop: '50px', paddingBottom: '20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '60px',
        }}>
          <div>
            {/* Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.825rem',
                marginBottom: '26px',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                boxShadow: '0 2px 10px rgba(99, 102, 241, 0.15)'
              }}
            >
              <Sparkles size={15} /> NỀN TẢNG KHẢO THÍ THẾ HỆ MỚI • 2026 EDITION
            </div>

            <h1 style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.2rem)', fontWeight: 900, lineHeight: 1.12, marginBottom: '24px', letterSpacing: '-0.035em' }}>
              Kiểm Tra Tri Thức, <br />
              <span className="gradient-text">Bứt Phá Năng Lực</span> Cùng EduExam
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '36px', maxWidth: '540px' }}>
              Trải nghiệm khảo thí trắc nghiệm chuẩn EdTech: giao diện tương tác ổn định không giật nảy, đồng hồ đếm ngược trực quan, phím tắt tốc độ cao và bảng phân tích điểm tức thì.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link to="/topics" className="btn btn-primary btn-lg" style={{ borderRadius: 'var(--radius-full)' }}>
                Bắt đầu làm bài ngay <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg" style={{ borderRadius: 'var(--radius-full)' }}>
                Khám phá hệ sinh thái
              </Link>
            </div>

            {/* Micro checklist */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', marginTop: '44px', color: 'var(--text-muted)', fontSize: '0.925rem', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="var(--success)" /> Miễn phí 100%
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="var(--success)" /> Chấm điểm tức thì
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="var(--success)" /> Bảng phân tích chi tiết
              </div>
            </div>
          </div>

          {/* Hero Visual Card: Interactive Live Micro-Challenge (ZERO BOUNCE) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="bento-card"
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '36px',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(160deg, var(--bg-surface) 0%, var(--bg-card) 100%)',
                position: 'relative',
                boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
                border: '1px solid var(--border-card)'
              }}
            >
              {/* Header inside hero card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <EduExamLogo size={42} showText={false} />
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Thử Thách Trực Quan</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phản hồi ánh sáng mượt mà tức thì</p>
                  </div>
                </div>
                <span className="badge badge-success">
                  <Flame size={12} /> ĐANG LIVE
                </span>
              </div>

              {/* Sample Interactive Question */}
              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '22px',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '22px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                    Javascript Core • Câu 1
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Clock size={13} /> 00:15
                  </span>
                </div>
                <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '16px', lineHeight: 1.5 }}>
                  JavaScript chạy trên môi trường đơn luồng (Single-threaded) dựa vào cơ chế nào?
                </p>

                {/* Tactile Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { key: 'A', text: 'Event Loop & Call Stack', correct: true },
                    { key: 'B', text: 'Multi-threading Worker', correct: false },
                    { key: 'C', text: 'Hardware Thread Pool', correct: false },
                  ].map((opt) => {
                    const isSelected = heroSelectedOption === opt.key;
                    return (
                      <div
                        key={opt.key}
                        onClick={() => handleHeroOptionClick(opt.key)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                          border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                          boxShadow: isSelected ? '0 0 16px rgba(99, 102, 241, 0.25)' : 'none',
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-subtle)',
                            color: isSelected ? '#ffffff' : 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            flexShrink: 0
                          }}
                        >
                          {opt.key}
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: isSelected ? 700 : 500, flex: 1 }}>
                          {opt.text}
                        </span>
                        {isSelected && (
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {heroAnswerRevealed && (
                  <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--success-bg)', border: '1px solid var(--success-border)', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} /> Chính xác! JavaScript sử dụng Event Loop để xử lý bất đồng bộ.
                  </div>
                )}
              </div>

              {/* Bottom stats inside hero card */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.02em' }}>&lt; 5ms</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>ĐỘ TRỄ PHẢN HỒI</p>
                </div>
                <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--success)', letterSpacing: '-0.02em' }}>100%</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>TỰ ĐỘNG CHẤM ĐIỂM</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Stats Bento Grid */}
      <section className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
          }}
        >
          <div className="bento-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '14px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '14px' }}>
              <BookOpen size={24} />
            </div>
            <h3 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '4px' }}>10+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', fontWeight: 600 }}>Chủ Đề Thi Chuyên Sâu</p>
          </div>

          <div className="bento-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '14px', backgroundColor: 'var(--info-bg)', color: 'var(--info)', marginBottom: '14px' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '4px' }}>500+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', fontWeight: 600 }}>Câu Hỏi Tuyển Chọn</p>
          </div>

          <div className="bento-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '14px', backgroundColor: 'var(--warning-bg)', color: 'var(--warning)', marginBottom: '14px' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '4px' }}>1,000+</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', fontWeight: 600 }}>Lượt Thi Thành Công</p>
          </div>

          <div className="bento-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '14px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', marginBottom: '14px' }}>
              <Trophy size={24} />
            </div>
            <h3 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '4px' }}>99.8%</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', fontWeight: 600 }}>Độ Hài Lòng Trải Nghiệm</p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Bento Grid Feature Showcase */}
      <section className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>CÔNG NGHỆ KHẢO THÍ BENTO</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Trải Nghiệm Khác Biệt Tại EduExam</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '12px', lineHeight: 1.7 }}>
            Kết hợp giữa công nghệ phản hồi tức thì và thiết kế tương tác gamified, giúp việc ôn luyện đạt hiệu quả cao nhất.
          </p>
        </div>

        <div className="bento-grid">
          {/* Bento 1: Quiz Engine (Col 8) */}
          <div className="bento-card bento-col-8" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '320px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                  <Zap size={22} />
                </div>
                <span className="badge badge-primary">QUIZ RUNNER ENGINE</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px' }}>
                Tương Tác Phím Tắt & Ma Trận Câu Hỏi Thông Minh
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '580px' }}>
                Làm bài với tốc độ ánh sáng: bạn có thể bấm phím <span className="kbd-key">A</span> <span className="kbd-key">B</span> <span className="kbd-key">C</span> <span className="kbd-key">D</span> trực tiếp trên bàn phím, dùng phím mũi tên chuyển câu, gắn cờ đánh dấu câu hỏi phân vân và theo dõi ma trận câu hỏi đa trạng thái.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <span className="kbd-key">←</span> <span className="kbd-key">→</span> Chuyển câu hỏi
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <span className="kbd-key">F</span> Đánh dấu cờ
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                <span className="kbd-key">A</span> <span className="kbd-key">B</span> <span className="kbd-key">C</span> <span className="kbd-key">D</span> Chọn đáp án
              </div>
            </div>
          </div>

          {/* Bento 2: Analytics & Score (Col 4) */}
          <div className="bento-card bento-col-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '12px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', marginBottom: '16px' }}>
                <TrendingUp size={22} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px' }}>
                Phân Tích Chi Tiết Từng Câu Hỏi
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Không chỉ biết điểm số, bạn còn được đối chiếu đáp án đã chọn với đáp án chuẩn xác cùng bảng giải thích cặn kẽ để lấp đầy lỗ hổng kiến thức.
              </p>
            </div>
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                <span>Tỉ lệ chính xác mẫu</span>
                <span style={{ color: 'var(--success)' }}>90%</span>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: 'var(--bg-muted)', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', backgroundColor: 'var(--success)', borderRadius: '3px' }} />
              </div>
            </div>
          </div>

          {/* Bento 3: Admin Hub (Col 4) */}
          <div className="bento-card bento-col-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '12px', backgroundColor: 'var(--info-bg)', color: 'var(--info)', marginBottom: '16px' }}>
                <LayoutDashboard size={22} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px' }}>
                Bảng Điều Khiển Quản Trị
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Hệ thống Admin Panel mạnh mẽ cho phép quản trị viên thêm ngân hàng câu hỏi, tổ chức danh mục chủ đề và theo dõi biểu đồ phổ điểm của thí sinh.
              </p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
              <span className="badge badge-info">Phổ điểm</span>
              <span className="badge badge-primary">Xuất CSV/Excel</span>
            </div>
          </div>

          {/* Bento 4: History & Security (Col 8) */}
          <div className="bento-card bento-col-8" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'var(--warning-bg)', color: 'var(--warning)' }}>
                  <ShieldCheck size={22} />
                </div>
                <span className="badge badge-warning">LỊCH SỬ THI BẢO MẬT</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px' }}>
                Lưu Trữ Kết Quả & Theo Dõi Tiến Trình Trọn Đời
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '600px' }}>
                Tất cả các lần làm bài, mốc thời gian hoàn thành, thời lượng làm và tỉ lệ chính xác được ghi nhận an toàn vào hồ sơ cá nhân. Dễ dàng xem lại bài cũ bất cứ lúc nào.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--success)" /> Mã hóa JWT phiên đăng nhập
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--success)" /> Xác thực Email 2 lớp
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Topics */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>BỘ ĐỀ CHỌN LỌC</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Chủ Đề Thi Nổi Bật</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px' }}>Lựa chọn bài thi phù hợp với năng lực và mục tiêu của bạn</p>
          </div>
          <Link to="/topics" className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)' }}>
            Xem tất cả chủ đề <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Đang tải danh sách chủ đề tuyển chọn..." />
        ) : topics.length === 0 ? (
          <div className="glass-card" style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Chưa có chủ đề nào được tạo.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {topics.map((topic, index) => (
              <div
                key={topic._id}
                className="bento-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '24px',
                  backgroundColor: 'var(--bg-surface)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: index % 2 === 0 ? 'var(--primary-gradient)' : 'var(--accent-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      boxShadow: '0 6px 14px rgba(0,0,0,0.15)'
                    }}>
                      <BookOpen size={22} />
                    </div>
                    <span className="badge badge-primary">TRẮC NGHIỆM</span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '10px' }}>
                    {topic.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {topic.description || 'Bài thi trắc nghiệm kiến thức tổng quát và chuyên sâu.'}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
                    Sẵn sàng thử thách
                  </span>
                  <Link to={`/quiz/${topic._id}`} className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                    Làm bài ngay <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. CTA Bento Banner */}
      <section className="container">
        <div
          className="bento-card"
          style={{
            padding: '70px 40px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)',
            color: '#fff',
            borderRadius: 'var(--radius-2xl)',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(99, 102, 241, 0.45)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Ambient circles */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', filter: 'blur(50px)' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '18px', letterSpacing: '-0.03em' }}>
              Sẵn Sàng Chinh Phục Kiến Thức?
            </h2>
            <p style={{ fontSize: '1.15rem', opacity: 0.95, lineHeight: 1.7, marginBottom: '36px' }}>
              Hàng trăm câu hỏi thú vị đang chờ bạn khám phá. Bắt đầu ngay hôm nay để khẳng định năng lực bản thân!
            </p>
            <Link
              to="/topics"
              className="btn btn-lg"
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--primary)',
                fontWeight: 800,
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                padding: '16px 36px',
                fontSize: '1.05rem'
              }}
            >
              Khám Phá Các Đề Thi Ngay <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
