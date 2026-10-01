import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submissionService } from '../../services/submissionService';
import { 
  History, 
  Search, 
  Calendar, 
  Trophy, 
  ArrowRight, 
  RotateCcw, 
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const data = await submissionService.getAllSubmissions();
        setSubmissions(data || []);
      } catch (err) {
        console.error('Lỗi khi tải lịch sử làm bài:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((sub) =>
    (sub.topicTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ paddingBottom: '70px', paddingTop: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', margin: '20px 0 36px' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '10px' }}>
            <History size={14} /> TIẾN ĐỘ HỌC TẬP
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Lịch Sử Khảo Thí</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px' }}>
            Theo dõi tất cả các bài kiểm tra trắc nghiệm bạn đã hoàn thành trên hệ thống
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} color="var(--text-subtle)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Tìm theo tên chủ đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '44px', height: '46px', borderRadius: 'var(--radius-full)' }}
          />
        </div>
      </div>

      {/* Submissions List */}
      {loading ? (
        <LoadingSpinner message="Đang tải lịch sử thi..." />
      ) : filteredSubmissions.length === 0 ? (
        <div
          className="bento-card"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)',
            maxWidth: '520px',
            margin: '40px auto',
          }}
        >
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--text-muted)' }}>
            <History size={30} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Chưa có bài làm nào</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            {searchQuery ? `Không tìm thấy kết quả cho "${searchQuery}"` : 'Bạn chưa tham gia bài thi trắc nghiệm nào. Hãy bắt đầu ngay để ghi danh bảng vàng!'}
          </p>
          <Link to="/topics" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
            <BookOpen size={16} /> Khám phá các chủ đề thi
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredSubmissions.map((sub) => {
            const total = sub.totalQuestions || 1;
            const score = sub.score || 0;
            const percentage = Math.round((score / total) * 100);

            const formattedDate = sub.submittedAt
              ? new Date(sub.submittedAt).toLocaleString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : '-';

            return (
              <div
                key={sub._id}
                className="bento-card"
                style={{
                  padding: '24px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)'
                }}
              >
                {/* Left: Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    backgroundColor: percentage >= 80 ? 'var(--success-bg)' : percentage >= 50 ? 'var(--primary-light)' : 'var(--warning-bg)',
                    color: percentage >= 80 ? 'var(--success)' : percentage >= 50 ? 'var(--primary)' : 'var(--warning)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 900,
                    fontSize: '1.15rem'
                  }}>
                    {percentage}%
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
                      {sub.topicTitle || 'Bài thi trắc nghiệm'}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} /> {formattedDate}
                      </span>
                      <span>•</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        Đúng {score} / {total} câu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Link
                    to={`/result/${sub._id}`}
                    className="btn btn-secondary btn-sm"
                    style={{ borderRadius: 'var(--radius-full)' }}
                  >
                    Xem chi tiết bài làm <ArrowRight size={14} />
                  </Link>

                  {sub.topicId && (
                    <Link
                      to={`/quiz/${sub.topicId}`}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: 'var(--radius-full)' }}
                    >
                      <RotateCcw size={14} /> Thi lại
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default SubmissionsPage;
