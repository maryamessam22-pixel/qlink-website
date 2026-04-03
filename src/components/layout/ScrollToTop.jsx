import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Routes where we don't want auto-scroll-to-top (in-page tab navigation)
const NO_SCROLL_ROUTES = [
  '/shop/nova/privacy',
  '/shop/nova/inbox',
  '/shop/pulse/privacy',
  '/shop/pulse/inbox',
];

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!NO_SCROLL_ROUTES.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;