import React from 'react';

export const EduExamLogo = ({
  size = 38,
  showText = true,
  showSubtitle = false,
  className = '',
  textClassName = ''
}) => {
  const iconRadius = Math.round(size * 0.28);
  const iconPadding = Math.round(size * 0.18);

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
      {/* Proprietary Geometric Emblem */}
      <div
        className="eduexam-emblem"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: `${iconRadius}px`,
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Ambient Sheen Glass Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />

        {/* Crisp Modern Vector: Dynamic Geometric 'E' */}
        <svg
          width={Math.round(size * 0.64)}
          height={Math.round(size * 0.64)}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Top Dynamic Bar with Arrow Angle */}
          <path
            d="M5 6.5C5 5.67 5.67 5 6.5 5H21.5C22.18 5 22.61 5.68 22.34 6.31L20.2 11.31C20.03 11.72 19.64 12 19.2 12H10.5C9.67 12 9 11.33 9 10.5V6.5"
            fill="#ffffff"
            fillOpacity="0.96"
          />

          {/* Center Precision Horizon Stem of 'E' */}
          <rect
            x="5"
            y="12"
            width="12"
            height="4"
            rx="2"
            fill="#ffffff"
            fillOpacity="0.92"
          />

          {/* Bottom Ascension Foundation */}
          <path
            d="M9 17.5C9 16.67 9.67 16 10.5 16H20.5C21.42 16 22.02 16.92 21.68 17.77L19.28 23.77C19.04 24.38 18.45 24.78 17.8 24.78H6.5C5.67 24.78 5 24.11 5 23.28V17.5"
            fill="#ffffff"
            fillOpacity="0.96"
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
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
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
