import React, { useContext, useEffect, useState } from 'react';
import qlinkLogoMark from '../../assets/brand/qlink-logo-mark.png';
import qlinkPreloaderLight from '../../assets/brand/qlink-preloader-light.png';
import { useTheme } from '../../context/ThemeContext';
import { LanguageContext } from '../../context/LanguageContext';
import './Preloader.css';

const MEET_MS = 1100;
const SPIN_BEFORE_FADE_MS = 1200;

const Preloader = ({ onFinish }) => {
  const { isLight } = useTheme();
  const { lang } = useContext(LanguageContext);
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState('meet');

  useEffect(() => {
    const t = setTimeout(() => setPhase('spin'), MEET_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fadeAt = MEET_MS + SPIN_BEFORE_FADE_MS;
    const timer1 = setTimeout(() => setIsVisible(false), fadeAt);
    const timer2 = setTimeout(() => {
      if (onFinish) onFinish();
    }, fadeAt + 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className={`preloader-wrapper ${isVisible ? '' : 'fade-out'}`}>
      <div className="preloader-content">
        <div
          className={`qlink-logo-loader ${phase === 'spin' ? 'qlink-logo-loader--spinning' : ''} ${isLight ? 'qlink-logo-loader--light' : ''}`}
          aria-hidden
        >
          <div className="qlink-logo-merge">
            {isLight ? (
              <img
                src={qlinkPreloaderLight}
                alt=""
                className="qlink-logo-img qlink-logo-img--whole"
                draggable={false}
              />
            ) : (
              <>
                <div className="qlink-logo-split qlink-logo-split--left">
                  <img src={qlinkLogoMark} alt="" className="qlink-logo-img" draggable={false} />
                </div>
                <div className="qlink-logo-split qlink-logo-split--right">
                  <img src={qlinkLogoMark} alt="" className="qlink-logo-img" draggable={false} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className={`loading-text ${lang === 'ar' ? 'loading-text--ar' : 'loading-text--en'}`}>
          {lang === 'ar' ? (
            <span className="letter letter--word-ar" style={{ animationDelay: '0.25s' }}>
              كيولينك
            </span>
          ) : (
            Array.from('QLINK').map((char, idx, arr) => {
              const isAccentChar = idx >= arr.length - 2;
              return (
                <span
                  key={`${char}-${idx}`}
                  className={`letter ${isAccentChar ? 'letter--accent' : ''}`}
                  style={{ animationDelay: `${0.25 + idx * 0.1}s` }}
                >
                  {char}
                </span>
              );
            })
          )}
        </div>

        <div className="loading-bar-container">
          <div className="loading-bar-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
