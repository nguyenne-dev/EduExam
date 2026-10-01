import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topicService } from '../../services/topicService';
import { Search, BookOpen, ArrowRight, Sparkles, Filter, Zap, Award } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await topicService.getAllTopics();
        setTopics(data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách chủ đề:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const filteredTopics = topics.filter((topic) => {
    const titleMatch = topic.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = topic.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || descMatch;
  });

  return (
    <div className="container" style={{ paddingBottom: '70px', paddingTop: '20px' }}>
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '30px auto 44px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '12px', padding: '6px 16px' }}>
          <Sparkles size={14} /> NGÂN HÀNG KHẢO THÍ CHỌN LỌC
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '14px', letterSpacing: '-0.03em' }}>
          Khám Phá Các <span className="gradient-text">Bộ Đề Thi Trắc Nghiệm</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Lựa chọn chủ đề bạn quan tâm, thử thách độ nhạy bén và nhận báo cáo phân tích điểm số chuẩn xác tức thì.
        </p>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginTop: '32px' }}>
          <Search
            size={20}
            color="var(--text-subtle)"
            style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Tìm kiếm chủ đề theo tên hoặc nội dung..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: '50px',
              paddingRight: '20px',
              height: '52px',
              borderRadius: 'var(--radius-full)',
              fontSize: '1rem',
              boxShadow: 'var(--shadow-md)',
              backgroundColor: 'var(--bg-surface)'
            }}
          />
        </div>
      </div>

      {/* Topics Grid */}
      {loading ? (
        <LoadingSpinner message="Đang tải danh sách chủ đề khảo thí..." />
      ) : filteredTopics.length === 0 ? (
        <div
          className="bento-card"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)',
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-subtle)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: 'var(--text-muted)'
          }}>
            <Filter size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Không tìm thấy chủ đề phù hợp</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
            Không có kết quả nào khớp với từ khóa "{searchQuery}". Vui lòng thử từ khóa khác.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Xóa tìm kiếm
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredTopics.map((topic, index) => (
            <div
              key={topic._id}
              className="bento-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '22px',
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
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {topic.description || 'Bộ đề thi kiểm tra năng lực và củng cố kiến thức toàn diện.'}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
                  Chấm điểm tức thì
                </span>
                <Link to={`/quiz/${topic._id}`} className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                  Bắt đầu làm bài <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default TopicsPage;
