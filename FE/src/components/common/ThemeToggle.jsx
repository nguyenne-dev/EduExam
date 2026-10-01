import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', size = 'normal' }) => {
  const { toggleTheme, isDark } = useTheme();

  const buttonSize = size === 'sm' ? '32px' : '36px';
  const iconSize = size === 'sm' ? 16 : 17;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      title={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      style={{
        width: buttonSize,
        height: buttonSize,
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-card)',
        color: 'var(--text-main)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        transition: 'all var(--transition-fast)',
        padding: 0,
        flexShrink: 0
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-card)';
        e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
      }}
    >
      {/* Hiển thị duy nhất 1 icon tương ứng, màu sắc trung tính trang nhã không tô màu vàng rực */}
      {isDark ? (
        <Sun size={iconSize} strokeWidth={2} />
      ) : (
        <Moon size={iconSize} strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;
