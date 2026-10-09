import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { questionService } from '../../services/questionService';
import { topicService } from '../../services/topicService';
import { submissionService } from '../../services/submissionService';
import { useToast } from '../../components/common/Toast';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  RotateCcw,
  Check,
  Lock,
  Zap,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ListOrdered,
  Maximize2,
  Minimize2,
  Bold
} from 'lucide-react';

export const QuizPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quiz execution states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionId]: boolean }
  const [startedAt, setStartedAt] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // Fetch topic & questions
  useEffect(() => {
    const initQuiz = async () => {
      try {
        setLoading(true);
        const [topicData, questionsData] = await Promise.all([
          topicService.getTopicById(topicId),
          questionService.getQuestionsByTopic(topicId)
        ]);

        setTopic(topicData);
        setQuestions(questionsData || []);
        setStartedAt(new Date().toISOString());
      } catch (err) {
        console.error('Lỗi khi chuẩn bị đề thi:', err);
        addToast('Không thể tải câu hỏi của chủ đề này', 'error');
      } finally {
        setLoading(false);
      }
    };

    initQuiz();
  }, [topicId]);

  // Live Timer
  useEffect(() => {
    if (loading || questions.length === 0) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, questions.length]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = useCallback((key) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ._id]: key
    }));
  }, [currentIndex, questions]);

  const toggleFlagQuestion = useCallback(() => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ._id]: !prev[currentQ._id]
    }));
  }, [currentIndex, questions]);

  // Fullscreen & Zen Focus Mode handler
  const toggleFocusMode = () => {
    if (!focusMode) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setFocusMode(true);
      addToast('Đã bật Chế độ tập trung (Zen Focus Mode)', 'info');
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setFocusMode(false);
    }
  };

  // Exit focus mode if user presses ESC or exits browser fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && focusMode) {
        setFocusMode(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [focusMode]);

  // Keyboard navigation support: A/B/C/D or 1/2/3/4, Arrows, F for flag (with scroll prevention)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Exit focus mode on Escape
      if (e.key === 'Escape' && focusMode) {
        toggleFocusMode();
        return;
      }

      // Don't trigger if modal is open or user is typing in an input
      if (showSubmitModal || ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelectAnswer(key);
      } else if (e.key === '1') handleSelectAnswer('A');
      else if (e.key === '2') handleSelectAnswer('B');
      else if (e.key === '3') handleSelectAnswer('C');
      else if (e.key === '4') handleSelectAnswer('D');
      else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      } else if (key === 'F') {
        toggleFlagQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectAnswer, toggleFlagQuestion, questions.length, showSubmitModal, focusMode]);

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = questions.length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Jump to first unanswered question
  const jumpToFirstUnanswered = () => {
    const firstUnansweredIndex = questions.findIndex((q) => !selectedAnswers[q._id]);
    if (firstUnansweredIndex !== -1) {
      setCurrentIndex(firstUnansweredIndex);
      setShowSubmitModal(false);
      addToast(`Đã chuyển tới câu ${firstUnansweredIndex + 1} chưa làm`, 'info');
    }
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;

    // Strict validation: Bắt buộc hoàn thành 100% câu hỏi
    if (unansweredCount > 0) {
      addToast(`Bạn bắt buộc phải hoàn thành toàn bộ ${totalQuestions} câu hỏi trước khi nộp bài! (Còn ${unansweredCount} câu chưa làm)`, 'warning');
      return;
    }

    try {
      setSubmitting(true);
      const submittedAt = new Date().toISOString();

      const formattedAnswers = Object.entries(selectedAnswers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      }));

      // Gọi API nộp bài
      const res = await submissionService.createSubmission({
        topicId,
        answers: formattedAnswers,
        startedAt,
        submittedAt
      });

      addToast('Nộp bài thành công!', 'success');
      setShowSubmitModal(false);
      navigate(`/result/${res.submissionId}`);
    } catch (err) {
      console.error('Lỗi khi nộp bài:', err);
      addToast(err.message || 'Lỗi khi nộp bài thi', 'error');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" message="Đang khởi tạo đề thi và kết nối máy chủ..." />;
  }

  if (questions.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px', backgroundColor: 'var(--bg-surface)' }}>
          <AlertTriangle size={48} color="var(--warning)" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Chưa có câu hỏi</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Chủ đề này hiện tại chưa có câu hỏi nào để làm bài.
          </p>
          <Link to="/topics" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
            <ArrowLeft size={16} /> Quay lại danh sách chủ đề
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedKey = currentQuestion ? selectedAnswers[currentQuestion._id] : null;
  const isFlagged = currentQuestion ? !!flaggedQuestions[currentQuestion._id] : false;

  return (
    <div
      className={focusMode ? 'quiz-focus-overlay' : 'container'}
      style={focusMode ? {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg-main)',
        overflowY: 'auto',
        padding: '24px 32px 70px 32px',
        margin: 0,
        maxWidth: '100%',
        width: '100vw',
        minHeight: '100vh',
        boxSizing: 'border-box'
      } : {
        paddingBottom: '70px',
        paddingTop: '24px'
      }}
    >
      
      {/* 1. Header Bar: Topic Name, Live Timer, Progress Indicator, Submit Action */}
      <div
        className="glass-card"
        style={{
          padding: '18px 26px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link to="/topics" className="btn-icon btn-secondary" title="Thoát bài thi" style={{ borderRadius: 'var(--radius-md)' }}>
            <ArrowLeft size={19} />
          </Link>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>BÀI THI CHÍNH THỨC</span>
              {focusMode && (
                <span className="badge" style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--primary)', border: '1px solid var(--border-hover)', fontSize: '0.7rem' }}>
                  ZEN FOCUS MODE
                </span>
              )}
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                {topic?.title || 'Bài thi trắc nghiệm'}
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Đã làm <strong style={{ color: 'var(--primary)' }}>{answeredCount}</strong> / {totalQuestions} câu ({progressPercent}%)
              {unansweredCount > 0 ? (
                <span style={{ color: 'var(--warning)', marginLeft: '8px', fontWeight: 600 }}>
                  • Còn {unansweredCount} câu chưa làm
                </span>
              ) : (
                <span style={{ color: 'var(--success)', marginLeft: '8px', fontWeight: 600 }}>
                  • Đã hoàn thành 100%
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Timer, Focus Mode & Submit CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Zen Focus Mode Toggle */}
          <button
            onClick={toggleFocusMode}
            className={`btn btn-sm ${focusMode ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.85rem', gap: '6px' }}
            title={focusMode ? "Tắt chế độ tập trung (ESC)" : "Bật chế độ tập trung toàn màn hình"}
          >
            {focusMode ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            <span>{focusMode ? 'Thoát tập trung' : 'Chế độ tập trung'}</span>
          </button>

          {/* SVG Circular Timer Ring - Fixed stable dimensions, no layout jitter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              fontWeight: 800,
              fontSize: '1rem',
              color: 'var(--primary)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              minWidth: '112px',
              width: '112px',
              flexShrink: 0,
              userSelect: 'none'
            }}
          >
            <div style={{ position: 'relative', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--border-subtle)"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3.5"
                  strokeDasharray={`${Math.min(100, ((elapsedSeconds % 60) / 60) * 100)}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <Clock size={11} color="var(--primary)" style={{ position: 'absolute' }} />
            </div>
            <span
              style={{
                fontWeight: "bold",
                fontVariantNumeric: 'tabular-nums',
                fontFeatureSettings: '"tnum"',
                letterSpacing: '0.02em',
                display: 'inline-block',
                minWidth: '46px',
                textAlign: 'center'
              }}
            >
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className={`btn ${unansweredCount === 0 ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.925rem'
            }}
            title={unansweredCount > 0 ? `Cần trả lời đủ ${totalQuestions} câu để nộp bài` : 'Nộp bài ngay'}
          >
            <Send size={16} /> Nộp bài {unansweredCount > 0 ? `(${answeredCount}/${totalQuestions})` : 'thi'}
          </button>
        </div>
      </div>

      {/* Progress Bar with Gradient */}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '28px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div
          style={{
            width: `${((answeredCount) / totalQuestions) * 100}%`,
            height: '100%',
            background: 'var(--primary-gradient)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: 'var(--shadow-glow)'
          }}
        />
      </div>

      {/* 2. Main Layout: Question Area + Question Matrix Navigator */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: '28px',
          alignItems: 'start',
        }}
        className="quiz-grid-layout"
      >
        
        {/* Left: Question Box */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-card)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          {/* Top Bar of Question: Question # and Flag action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                className="badge badge-primary"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  padding: '6px 16px',
                  minWidth: '158px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  flexShrink: 0,
                  userSelect: 'none',
                  letterSpacing: '0.03em'
                }}
              >
                <span style={{ fontWeight: 800 }}>CÂU HỎI</span>
                <span
                  style={{
                    fontWeight: 800,
                    fontVariantNumeric: 'tabular-nums',
                    fontFeatureSettings: '"tnum"',
                    letterSpacing: '0.02em',
                    display: 'inline-block',
                    minWidth: '48px',
                    textAlign: 'center'
                  }}
                >
                  {currentIndex + 1} / {totalQuestions}
                </span>
              </span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-subtle)' }}>
                (Dùng phím <span className="kbd-key">A</span> <span className="kbd-key">B</span> <span className="kbd-key">C</span> <span className="kbd-key">D</span>)
              </span>
            </div>

            {/* Flag Button */}
            <button
              onClick={toggleFlagQuestion}
              className={`btn btn-sm ${isFlagged ? 'btn-warning' : 'btn-outline'}`}
              style={{
                borderRadius: 'var(--radius-full)',
                backgroundColor: isFlagged ? 'var(--warning-bg)' : 'transparent',
                borderColor: isFlagged ? 'var(--warning)' : 'var(--border-subtle)',
                color: isFlagged ? 'var(--warning)' : 'var(--text-muted)',
                fontWeight: 600
              }}
              title="Đánh dấu câu hỏi cần xem lại (Phím tắt: F)"
            >
              <Flag size={15} fill={isFlagged ? 'currentColor' : 'none'} />
              {isFlagged ? 'Đã đánh dấu cờ' : 'Đánh dấu cờ'} <span className="kbd-key" style={{ marginLeft: '4px' }}>F</span>
            </button>
          </div>

          {/* Question Text */}
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.6, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {currentQuestion?.question}
            </h3>
          </div>

          {/* Tactile Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {currentQuestion?.answers?.map((option) => {
              const isSelected = selectedKey === option.key;

              return (
                <div
                  key={option.key}
                  onClick={() => handleSelectAnswer(option.key)}
                  className={`tactile-option ${isSelected ? 'selected' : ''}`}
                >
                  {/* Key Badge */}
                  <div className="key-badge">
                    {option.key}
                  </div>

                  {/* Option Text */}
                  <div style={{ flex: 1, fontSize: '1rem', fontWeight: isSelected ? 700 : 500, color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {option.text}
                  </div>

                  {/* Check Indicator */}
                  {isSelected && (
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <Check size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '22px', marginTop: '10px' }}>
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="btn btn-secondary"
              style={{ borderRadius: 'var(--radius-full)', padding: '10px 22px' }}
            >
              <ArrowLeft size={16} /> Câu trước
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                className="btn btn-primary"
                style={{ borderRadius: 'var(--radius-full)', padding: '10px 24px' }}
              >
                Câu tiếp theo <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitModal(true)}
                className={`btn ${unansweredCount === 0 ? 'btn-success' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '10px 24px' }}
              >
                <Send size={16} /> {unansweredCount === 0 ? 'Nộp bài thi ngay' : `Xem lại bài (${answeredCount}/${totalQuestions})`}
              </button>
            )}
          </div>
        </div>

        {/* Right: Question Matrix Navigator */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-card)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'sticky',
            top: '94px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ListOrdered size={18} color="var(--primary)" />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Ma Trận Đề Thi</h4>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', fontVariantNumeric: 'tabular-nums', fontFeatureSettings: '"tnum"', letterSpacing: '0.02em' }}>
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          {/* Grid Question Numbers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
            }}
          >
            {questions.map((q, idx) => {
              const isAnswered = !!selectedAnswers[q._id];
              const isFlag = !!flaggedQuestions[q._id];
              const isCurrent = idx === currentIndex;

              let bgColor = 'var(--bg-subtle)';
              let borderColor = 'var(--border-subtle)';
              let textColor = 'var(--text-main)';

              if (isAnswered) {
                bgColor = 'var(--primary-light)';
                borderColor = 'var(--primary)';
                textColor = 'var(--primary)';
              }

              if (isFlag) {
                bgColor = 'var(--warning-bg)';
                borderColor = 'var(--warning)';
                textColor = 'var(--warning)';
              }

              return (
                <button
                  key={q._id}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: bgColor,
                    border: `2px solid ${borderColor}`,
                    color: textColor,
                    fontWeight: isCurrent ? 900 : 700,
                    fontSize: '0.925rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: isCurrent ? '0 0 0 3px var(--primary), var(--shadow-glow)' : 'none',
                    transition: 'all var(--transition-fast)',
                    transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
                    zIndex: isCurrent ? 2 : 1
                  }}
                  title={`Câu ${idx + 1}: ${isAnswered ? 'Đã làm' : 'Chưa làm'}`}
                >
                  {idx + 1}
                  {isFlag && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--warning)',
                        boxShadow: '0 0 4px var(--warning)'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Jump Unanswered button if any */}
          {unansweredCount > 0 && (
            <button
              onClick={jumpToFirstUnanswered}
              className="btn btn-secondary btn-sm"
              style={{
                width: '100%',
                borderRadius: 'var(--radius-md)',
                color: 'var(--warning)',
                borderColor: 'var(--warning-border)',
                backgroundColor: 'var(--warning-bg)',
                fontWeight: 700
              }}
            >
              Chuyển tới câu chưa làm ({unansweredCount})
            </button>
          )}

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.825rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: 'var(--primary-light)', border: '2px solid var(--primary)' }} />
              <span>Đã trả lời ({answeredCount})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: 'var(--warning-bg)', border: '2px solid var(--warning)' }} />
              <span>Đánh dấu cờ cần xem lại</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: 'var(--bg-subtle)', border: '2px solid var(--border-subtle)' }} />
              <span>Chưa chọn đáp án ({unansweredCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Confirm Submit Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Xác nhận nộp bài thi"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {unansweredCount > 0 ? (
            <div
              style={{
                display: 'flex',
                gap: '16px',
                padding: '18px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--danger-bg)',
                border: '1px solid var(--danger-border)',
                color: 'var(--text-main)',
              }}
            >
              <Lock size={26} color="var(--danger)" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 800, marginBottom: '6px', color: 'var(--danger)', fontSize: '1.05rem' }}>
                  Chưa thể nộp bài thi!
                </p>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  Quy chuẩn khảo thí yêu cầu bạn phải chọn đủ <strong style={{ color: 'var(--danger)' }}>{totalQuestions}/{totalQuestions}</strong> câu hỏi. Hiện tại còn <strong>{unansweredCount} câu chưa làm</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                gap: '16px',
                padding: '18px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--success-bg)',
                border: '1px solid var(--success-border)',
                color: 'var(--text-main)',
              }}
            >
              <CheckCircle2 size={26} color="var(--success)" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 800, marginBottom: '6px', color: 'var(--success)', fontSize: '1.05rem' }}>
                  Đã hoàn thành 100% câu hỏi!
                </p>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  Bạn đã trả lời đầy đủ {totalQuestions} câu hỏi. Hệ thống sẽ ngay lập tức chấm điểm và tổng hợp bảng phân tích chi tiết.
                </p>
              </div>
            </div>
          )}

          {/* Review Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>{totalQuestions}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TỔNG CÂU HỎI</p>
            </div>
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--success)' }}>{answeredCount}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ĐÃ TRẢ LỜI</p>
            </div>
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--info)' }}>{formatTime(elapsedSeconds)}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>THỜI LƯỢNG</p>
            </div>
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
            {unansweredCount > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="btn btn-secondary"
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={jumpToFirstUnanswered}
                  className="btn btn-primary"
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  Làm tiếp câu chưa xong <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  disabled={submitting}
                  className="btn btn-secondary"
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  Xem lại bài thi
                </button>
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={submitting}
                  className="btn btn-success"
                  style={{ borderRadius: 'var(--radius-full)', padding: '10px 24px' }}
                >
                  {submitting ? 'Đang chấm điểm...' : 'Xác nhận nộp bài'}
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default QuizPage;
