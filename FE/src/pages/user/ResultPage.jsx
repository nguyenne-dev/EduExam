import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { submissionService } from '../../services/submissionService';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  BookOpen, 
  History, 
  ArrowLeft,
  Calendar,
  Percent,
  Check,
  X,
  Filter,
  Sparkles,
  ArrowRight,
  Award
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export const ResultPage = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'CORRECT' | 'WRONG'

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const data = await submissionService.getSubmissionById(submissionId);
        setSubmission(data);

        // Calculate score percentage
        const total = data?.totalQuestions || data?.questions?.length || 1;
        const score = data?.score || 0;
        const percentage = Math.round((score / total) * 100);

        // Trigger confetti if high score (>= 70%)
        if (percentage >= 70) {
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {
            console.warn('Confetti effect failed', e);
          }
        }
      } catch (err) {
        console.error('Lỗi khi tải kết quả:', err);
      } finally {
        setLoading(false);
      }
    };

    if (submissionId) {
      fetchResult();
    }
  }, [submissionId]);

  if (loading) {
    return <LoadingSpinner size="large" message="Đang tổng hợp bảng điểm và phân tích kết quả..." />;
  }

  if (!submission) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '480px', margin: '0 auto', padding: '40px', backgroundColor: 'var(--bg-surface)' }}>
          <XCircle size={48} color="var(--danger)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Không tìm thấy kết quả</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Bài làm này không tồn tại hoặc đã bị gỡ khỏi hệ thống.
          </p>
          <Link to="/submissions" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
            <ArrowLeft size={16} /> Xem lịch sử làm bài
          </Link>
        </div>
      </div>
    );
  }

  const totalQuestions = submission.totalQuestions || submission.questions?.length || 0;
  const score = submission.score || 0;
  const wrongCount = Math.max(0, totalQuestions - score);
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Elapsed Time calculation
  const startTime = new Date(submission.startedAt || Date.now()).getTime();
  const endTime = new Date(submission.submittedAt || Date.now()).getTime();
  const elapsedSecs = Math.max(1, Math.round((endTime - startTime) / 1000));
  const timeFormatted = `${Math.floor(elapsedSecs / 60)} phút ${elapsedSecs % 60} giây`;
  
  const formattedDate = submission.submittedAt
    ? new Date(submission.submittedAt).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '-';

  // Status configuration
  let statusBadge = "badge-success";
  let statusTitle = "Chúc mừng bạn!";
  let statusColor = "var(--success)";
  let statusDesc = "Bạn đã hoàn thành bài thi trắc nghiệm này.";

  if (percentage >= 85) {
    statusTitle = "Xuất sắc! 🎉";
    statusBadge = "badge-success";
    statusColor = "var(--success)";
    statusDesc = "Kiến thức của bạn rất vững chắc. Hãy tiếp tục phát huy ở các chủ đề nâng cao!";
  } else if (percentage >= 60) {
    statusTitle = "Đạt yêu cầu 👍";
    statusBadge = "badge-info";
    statusColor = "var(--info)";
    statusDesc = "Bạn đã vượt qua bài thi với kết quả tốt. Hãy xem lại các câu sai để hoàn thiện hơn.";
  } else {
    statusTitle = "Cần cố gắng thêm 💪";
    statusBadge = "badge-warning";
    statusColor = "var(--warning)";
    statusDesc = "Đừng nản lòng! Hãy xem kỹ đáp án giải thích bên dưới và thử sức làm lại bài thi nhé.";
  }

  // Filter questions list
  const filteredQuestions = (submission.questions || []).filter((q) => {
    if (activeFilter === 'CORRECT') return q.isCorrect;
    if (activeFilter === 'WRONG') return !q.isCorrect;
    return true;
  });

  return (
    <div className="container" style={{ paddingBottom: '80px', paddingTop: '24px' }}>
      
      {/* Breadcrumb Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--text-muted)' }}>Trang chủ</Link>
        <span>/</span>
        <Link to="/submissions" style={{ color: 'var(--text-muted)' }}>Lịch sử thi</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Kết quả chi tiết</span>
      </div>

      {/* 1. Score Showcase Bento Card */}
      <div
        className="bento-card"
        style={{
          maxWidth: '920px',
          margin: '0 auto 40px',
          backgroundColor: 'var(--bg-surface)',
          textAlign: 'center',
          position: 'relative',
          padding: '48px 36px',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)'
        }}
      >
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'var(--primary-gradient)',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)'
        }}>
          <Trophy size={32} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <span className={`badge ${statusBadge}`} style={{ fontSize: '0.9rem', padding: '6px 18px' }}>
            {statusTitle}
          </span>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '10px', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
          {submission.topicTitle || 'Bài thi trắc nghiệm'}
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          {statusDesc}
        </p>

        {/* 4 Stat Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          {/* Điểm số */}
          <div style={{ padding: '20px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {score} / {totalQuestions}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '6px', textTransform: 'uppercase' }}>SỐ CÂU ĐÚNG</p>
          </div>

          {/* Tỷ lệ chính xác */}
          <div style={{ padding: '20px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: '2.2rem', fontWeight: 900, color: statusColor, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {percentage}%
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '6px', textTransform: 'uppercase' }}>TỶ LỆ CHÍNH XÁC</p>
          </div>

          {/* Thời gian làm bài */}
          <div style={{ padding: '20px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Clock size={18} color="var(--primary)" />
              <p style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)' }}>
                {timeFormatted}
              </p>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '6px', textTransform: 'uppercase' }}>THỜI LƯỢNG LÀM</p>
          </div>

          {/* Thời gian nộp */}
          <div style={{ padding: '20px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Calendar size={18} color="var(--text-subtle)" />
              <p style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {formattedDate.split(' ')[0] || formattedDate}
              </p>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '6px', textTransform: 'uppercase' }}>NGÀY NỘP BÀI</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px' }}>
          {submission.topicId && (
            <Link to={`/quiz/${submission.topicId}`} className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '12px 26px' }}>
              <RotateCcw size={16} /> Làm lại bài thi này
            </Link>
          )}
          <Link to="/topics" className="btn btn-secondary" style={{ borderRadius: 'var(--radius-full)', padding: '12px 26px' }}>
            <BookOpen size={16} /> Chọn chủ đề khác
          </Link>
          <Link to="/submissions" className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '12px 26px' }}>
            <History size={16} /> Xem lịch sử tất cả lần thi
          </Link>
        </div>
      </div>

      {/* 2. Detailed Question-by-Question Breakdown */}
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        
        {/* Section Header & Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Bảng Đối Chiếu Chi Tiết</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Xem lại từng câu trả lời đã chọn và đối chiếu với đáp án chuẩn xác
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--bg-subtle)', padding: '5px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`btn btn-sm ${activeFilter === 'ALL' ? 'btn-primary' : ''}`}
              style={{
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeFilter === 'ALL' ? 'var(--primary)' : 'transparent',
                color: activeFilter === 'ALL' ? '#ffffff' : 'var(--text-muted)',
                padding: '6px 16px',
                fontSize: '0.825rem',
                fontWeight: 700
              }}
            >
              Tất cả ({totalQuestions})
            </button>
            <button
              onClick={() => setActiveFilter('CORRECT')}
              className={`btn btn-sm ${activeFilter === 'CORRECT' ? 'btn-primary' : ''}`}
              style={{
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeFilter === 'CORRECT' ? 'var(--success)' : 'transparent',
                color: activeFilter === 'CORRECT' ? '#ffffff' : 'var(--text-muted)',
                padding: '6px 16px',
                fontSize: '0.825rem',
                fontWeight: 700
              }}
            >
              Đúng ({score})
            </button>
            <button
              onClick={() => setActiveFilter('WRONG')}
              className={`btn btn-sm ${activeFilter === 'WRONG' ? 'btn-primary' : ''}`}
              style={{
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeFilter === 'WRONG' ? 'var(--danger)' : 'transparent',
                color: activeFilter === 'WRONG' ? '#ffffff' : 'var(--text-muted)',
                padding: '6px 16px',
                fontSize: '0.825rem',
                fontWeight: 700
              }}
            >
              Sai ({wrongCount})
            </button>
          </div>
        </div>

        {/* Questions Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {filteredQuestions.length === 0 ? (
            <div className="bento-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Không có câu hỏi nào thuộc bộ lọc này.
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const isCorrect = q.isCorrect;
              const userAnswerKey = q.selectedAnswer;
              const correctAnswerKey = q.correctAnswer;

              return (
                <div
                  key={idx}
                  className="bento-card"
                  style={{
                    padding: '28px 32px',
                    backgroundColor: 'var(--bg-surface)',
                    borderLeft: `5px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`,
                    borderRadius: 'var(--radius-xl)'
                  }}
                >
                  {/* Header of Question Review */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.8rem' }}>
                      CÂU HỎI {idx + 1}
                    </span>

                    {isCorrect ? (
                      <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '5px 12px' }}>
                        <CheckCircle2 size={14} /> Chính xác (+1.0 điểm)
                      </span>
                    ) : (
                      <span className="badge badge-danger" style={{ fontSize: '0.8rem', padding: '5px 12px' }}>
                        <XCircle size={14} /> Chưa chính xác (0 điểm)
                      </span>
                    )}
                  </div>

                  {/* Question Content */}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.6, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    {q.question}
                  </h3>

                  {/* Options List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {q.answers?.map((opt) => {
                      const isUserChoice = userAnswerKey === opt.key;
                      const isCorrectChoice = correctAnswerKey === opt.key;

                      let rowBg = 'var(--bg-subtle)';
                      let rowBorder = 'var(--border-subtle)';
                      let badgeBg = 'var(--bg-surface)';
                      let badgeColor = 'var(--text-main)';

                      if (isCorrectChoice) {
                        rowBg = 'var(--success-bg)';
                        rowBorder = 'var(--success)';
                        badgeBg = 'var(--success)';
                        badgeColor = '#ffffff';
                      } else if (isUserChoice && !isCorrect) {
                        rowBg = 'var(--danger-bg)';
                        rowBorder = 'var(--danger)';
                        badgeBg = 'var(--danger)';
                        badgeColor = '#ffffff';
                      }

                      return (
                        <div
                          key={opt.key}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '14px 18px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: rowBg,
                            border: `2px solid ${rowBorder}`,
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          {/* Option Key Letter */}
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              backgroundColor: badgeBg,
                              color: badgeColor,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '0.9rem',
                              flexShrink: 0
                            }}
                          >
                            {opt.key}
                          </div>

                          {/* Option Text */}
                          <div style={{ flex: 1, fontSize: '0.95rem', fontWeight: (isUserChoice || isCorrectChoice) ? 700 : 500, color: 'var(--text-main)' }}>
                            {opt.text}
                          </div>

                          {/* Status Flags */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {isUserChoice && (
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-sm)', backgroundColor: isCorrect ? 'var(--success-bg)' : 'var(--danger-bg)', color: isCorrect ? 'var(--success)' : 'var(--danger)', border: `1px solid ${isCorrect ? 'var(--success-border)' : 'var(--danger-border)'}` }}>
                                Lựa chọn của bạn
                              </span>
                            )}
                            {isCorrectChoice && (
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--success)', color: '#ffffff' }}>
                                Đáp án đúng
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};

export default ResultPage;
