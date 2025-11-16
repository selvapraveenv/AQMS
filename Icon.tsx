// src/components/Icon.tsx (Corrected Version)

import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const ICONS: Record<string, React.ReactElement> = {
  'inbox': <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.25 2.25v3.86a2.25 2.25 0 002.25 2.25h3.86a2.25 2.25 0 002.25-2.25v-3.86a2.25 2.25 0 012.25-2.25h3.86m-16.5 0a2.25 2.25 0 00-2.25 2.25v3.86a2.25 2.25 0 01-2.25 2.25H2.25m16.5 0a2.25 2.25 0 012.25 2.25v3.86a2.25 2.25 0 002.25 2.25h3.86M2.25 13.5h3.86a2.25 2.25 0 002.25-2.25V7.38a2.25 2.25 0 012.25-2.25h3.86a2.25 2.25 0 012.25 2.25v3.86a2.25 2.25 0 002.25 2.25h3.86m-16.5 0h16.5" />,
  'chart-bar': <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
  'users': <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  'arrow-left': <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />,
  'logout': <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />,
  'search': <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
  'chevron-down': <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
  'cpu': (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5m-12-9.75h1.5m15 0h1.5M12 4.5v-1.5m0 18v-1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.364 15.364A9 9 0 108.636 8.636m6.728 6.728l-1.414-1.414" />
    </>
  ),
  'tag': (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </>
  ),
  'shopping-cart': <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.831A1.125 1.125 0 0018.143 8.25H7.5M7.5 14.25L5.106 5.165A1.125 1.125 0 004.02 4.5H3" />,
  'leaf': (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563A2.25 2.25 0 0112 9a2.25 2.25 0 013 2.25.75.75 0 01-1.5 0 2.25 2.25 0 00-1.5-1.5.75.75 0 010-1.5z" />
    </>
  ),
  'sparkles': (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.197-.398a2.25 2.25 0 001.423-1.423L16.5 15.75l.398 1.197a2.25 2.25 0 001.423 1.423l1.197.398-1.197.398a2.25 2.25 0 00-1.423 1.423z" />
    </>
  ),
  'bolt': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
  'google': <path fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-8.25a.75.75 0 00-1.5 0V15a.75.75 0 001.5 0v-1.25zm2.52-6.52a.75.75 0 01.04 1.06l-4.5 6a.75.75 0 01-1.1.04l-2.25-3a.75.75 0 111.1-1.02l1.7 2.26 4.02-5.36a.75.75 0 011.06-.04z" clipRule="evenodd" />,
  'brain': <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />,
  'menu': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />,
  'google-logo': <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.86 2.25-4.82 2.25-3.44 0-6.5-2.86-6.5-6.5s3.06-6.5 6.5-6.5c1.95 0 3.22.79 4.1 1.69l2.58-2.58C17.34 2.34 15.24 1 12.48 1 7.1 1 3.08 5.1 3.08 10.5S7.1 20 12.48 20c2.9 0 5.06-.97 6.64-2.58 1.64-1.64 2.14-4.22 2.14-6.42 0-.4-.04-.8-.1-1.18h-8.56z" />,
  'chevron-double-left': (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
    </>
  ),
  'chevron-double-right': (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" />
    </>
  ),
};

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  // Special case for Google logo which uses fill instead of stroke
  if (name === 'google-logo') {
    return (
       <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         {ICONS[name]}
       </svg>
    )
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      {ICONS[name] || null}
    </svg>
  );
};

export default Icon;