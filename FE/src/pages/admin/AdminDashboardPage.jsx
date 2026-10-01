import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { topicService } from '../../services/topicService';
import { questionService } from '../../services/questionService';
import { authService } from '../../services/authService';
import { submissionService } from '../../services/submissionService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  BookOpen, 
  HelpCircle, 
  Users, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck, 
  TrendingUp,
  Activity,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Flame,
  FileSpreadsheet
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    topicsCount: 0,
    questionsCount: 0,
    usersCount: 0,
    submissionsCount: 0,
    averageScore: 0,
    passRate: 0,
  });
  const [recentTopics, setRecentTopics] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [topics, questions, users, submissionStats] = await Promise.all([
          topicService.getAllTopics().catch(() => []),
          questionService.getAllQuestions().catch(() => []),
          authService.getAllUsers().catch(() => []),
          submissionService.getAdminSubmissionStats().catch(() => null),
        ]);

        setStats({
          topicsCount: topics?.length || 0,
          questionsCount: questions?.length || 0,
          usersCount: users?.length || 0,
          submissionsCount: submissionStats?.totalSubmissions || 0,
          averageScore: submissionStats?.averageScorePercent || 0,
          passRate: submissionStats?.passRate || 0,
        });

        setRecentTopics((topics || []).slice(0, 4));
        setRecentSubmissions(submissionStats?.recentAttempts || []);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu tổng quan admin:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner size="large" message="Đang kết nối trung tâm quản trị EduExam..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Welcome Command Banner */}
      <div
        className="bento-card"
        style={{
          padding: '32px 36px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.18) 50%, rgba(236, 72, 153, 0.12) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          borderRadius: 'var(--radius-2xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-glow)'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', marginBottom: '12px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <Sparkles size={14} /> LIVE COMMAND CENTER
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: '6px', letterSpacing: '-0.03em' }}>
            Bảng Điều Khiển Quản Trị
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px' }}>
            Giám sát thời gian thực số liệu thí sinh, phân bổ bài thi và quản lý ngân hàng câu hỏi khảo thí toàn hệ thống.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/submissions" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
            <Award size={16} /> Quản lý bài thi
          </Link>
          <Link to="/admin/questions" className="btn btn-secondary" style={{ borderRadius: 'var(--radius-full)' }}>
            <PlusCircle size={16} /> Thêm câu hỏi mới
          </Link>
        </div>
      </div>

      {/* 4 Metric Bento Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Card 1: Topics */}
        <div className="bento-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
              <BookOpen size={24} />
            </div>
            <Link to="/admin/topics" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Quản lý <ArrowRight size={14} />
            </Link>
          </div>
          <h3 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '4px', letterSpacing: '-0.03em' }}>{stats.topicsCount}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>TỔNG CHỦ ĐỀ THI</p>
        </div>

        {/* Card 2: Questions */}
        <div className="bento-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'var(--info-bg)', color: 'var(--info)' }}>
              <HelpCircle size={24} />
            </div>
            <Link to="/admin/questions" style={{ fontSize: '0.85rem', color: 'var(--info)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Quản lý <ArrowRight size={14} />
            </Link>
          </div>
          <h3 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '4px', letterSpacing: '-0.03em' }}>{stats.questionsCount}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>NGÂN HÀNG CÂU HỎI</p>
        </div>

        {/* Card 3: Submissions & Performance */}
        <div className="bento-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
              <Award size={24} />
            </div>
            <Link to="/admin/submissions" style={{ fontSize: '0.85rem', color: '#ec4899', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Quản lý <ArrowRight size={14} />
            </Link>
          </div>
          <h3 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '4px', letterSpacing: '-0.03em' }}>{stats.submissionsCount}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>LƯỢT THI</p>
            <span className="badge badge-success" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
              ĐTB: {stats.averageScore}%
            </span>
          </div>
        </div>

        {/* Card 4: Users */}
        <div className="bento-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'var(--success-bg)', color: 'var(--success)' }}>
              <Users size={24} />
            </div>
            <Link to="/admin/users" style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Quản lý <ArrowRight size={14} />
            </Link>
          </div>
          <h3 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '4px', letterSpacing: '-0.03em' }}>{stats.usersCount}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>THÍ SINH</p>
            <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
              Đạt: {stats.passRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Recent Topics & Recent Exam Attempts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Box 1: Recent Topics */}
        <div className="bento-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={20} color="var(--primary)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Chủ Đề Khảo Thí Gần Đây</h2>
            </div>
            <Link to="/admin/topics" className="btn btn-outline btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
              Xem tất cả
            </Link>
          </div>

          {recentTopics.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chưa có chủ đề nào được tạo.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentTopics.map((t) => (
                <div
                  key={t._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ maxWidth: '65%' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.title}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.description || 'Chủ đề thi trắc nghiệm'}
                    </p>
                  </div>

                  <Link
                    to={`/admin/questions?topicId=${t._id}`}
                    className="btn btn-secondary btn-sm"
                    style={{ borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
                  >
                    Xem câu hỏi
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Box 2: Recent Attempts */}
        <div className="bento-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={20} color="var(--info)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Lượt Nộp Bài Mới Nhất</h2>
            </div>
            <Link to="/admin/submissions" className="btn btn-outline btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
              Toàn bộ bài thi
            </Link>
          </div>

          {recentSubmissions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chưa có lượt thi nào được ghi nhận.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentSubmissions.map((sub, idx) => {
                const total = sub.totalQuestions || sub.questions?.length || 1;
                const score = sub.score || 0;
                const percent = Math.round((score / total) * 100);

                return (
                  <div
                    key={sub._id || idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0, paddingRight: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'var(--primary-gradient)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        flexShrink: 0
                      }}>
                        {sub.user?.fullname ? sub.user.fullname.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div style={{ overflow: 'hidden', minWidth: 0 }}>
                        <p
                          title={sub.user?.fullname}
                          style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {sub.user?.fullname || 'Thí sinh'}
                        </p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sub.topic?.title || 'Bài thi trắc nghiệm'}
                        </p>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={`badge ${percent >= 70 ? 'badge-success' : percent >= 50 ? 'badge-info' : 'badge-warning'}`}>
                        {score}/{total} ({percent}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardPage;
