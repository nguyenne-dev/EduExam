import React from 'react';

export const EduExamLogo = ({
  size = 38,
  showText = true,
  showSubtitle = false,
  className = '',
  textClassName = ''
}) => {
  return (
    <div
      className={`eduexam-brand ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '11px',
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {/* Brand Squircle Emblem */}
      <div
        className="eduexam-emblem"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          filter: 'drop-shadow(0 4px 14px rgba(225, 27, 34, 0.28))'
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="eduShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11B22" />
              <stop offset="55%" stopColor="#C51622" />
              <stop offset="100%" stopColor="#8B0000" />
            </linearGradient>
            <linearGradient id="eduShieldSheen" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* User requested squircle base */}
          <rect x="3" y="3" width="42" height="42" rx="11" fill="url(#eduShieldGrad)"></rect>
          <rect x="3" y="3" width="42" height="42" rx="11" fill="url(#eduShieldSheen)"></rect>
          <rect
            x="3.5"
            y="3.5"
            width="41"
            height="41"
            rx="10.5"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
            fill="none"
          ></rect>

          {/* Graduation Cap Cylinder (Base & 3D Depth) */}
          <path
            d="M17 22.5V26.8C17 29.8 20.1 32 24 32C27.9 32 31 29.8 31 26.8V22.5"
            fill="#DDE5ED"
          />
          <path
            d="M17 24.5V26.8C17 29.8 20.1 32 24 32C27.9 32 31 29.8 31 26.8V24.5C28.2 26 25 26.5 24 26.5C23 26.5 19.8 26 17 24.5Z"
            fill="#CAD6E2"
          />

          {/* Graduation Cap Top Diamond (Mortarboard Lid) */}
          <path
            d="M24 13.5L35.5 19.2L24 25L12.5 19.2L24 13.5Z"
            fill="#FFFFFF"
          />
          {/* Lid 3D Edge */}
          <path
            d="M12.5 19.2L24 25L35.5 19.2V20.4L24 26.2L12.5 20.4V19.2Z"
            fill="#E2E8F0"
          />

          {/* Cap Center Button and Tassel Cord */}
          <ellipse cx="24" cy="19.2" rx="1.3" ry="0.9" fill="#CAD6E2" />
          <path
            d="M24 19.5C20.5 20.5 16.5 21.5 15.2 23.5V27.5"
            stroke="#CAD6E2"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="15.2" cy="27.8" r="1" fill="#CAD6E2" />

          {/* Verification Checkmark Badge (White outer ring + Green pill + White checkmark) */}
          <circle cx="31.5" cy="29" r="6.8" fill="#FFFFFF" />
          <circle cx="31.5" cy="29" r="5.5" fill="url(#badgeGrad)" />
          <path
            d="M29.2 28.8L30.8 30.5L34 27.2"
            stroke="#FFFFFF"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Typography Brand Name */}
      {showText && (
        <div
          className={`nav-logo-text ${textClassName}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'visible'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              lineHeight: 1.45,
              padding: '3px 0',
              overflow: 'visible'
            }}
          >
            <span
              style={{
                fontSize: `${Math.max(1.32, size * 0.045)}rem`,
                fontWeight: 900,
                letterSpacing: '-0.035em',
                color: 'var(--text-main)',
                display: 'inline-flex',
                alignItems: 'baseline',
                lineHeight: 1.4,
                overflow: 'visible'
              }}
            >
              Edu
              <span
                style={{
                  background: 'linear-gradient(135deg, #e11b22 0%, #c51622 50%, #8b0000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  lineHeight: 1.4,
                  padding: '2px 1px',
                  overflow: 'visible'
                }}
              >
                Exam
              </span>
            </span>
          </div>

          {showSubtitle && (
            <span
              className="nav-logo-subtitle"
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--text-subtle)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginTop: '1px',
                lineHeight: 1.3
              }}
            >
              Assessment Platform
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default EduExamLogo;
