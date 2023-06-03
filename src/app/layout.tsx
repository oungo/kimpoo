import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '김프 김치프리미엄(kimchi premium) - KIMPUU',
  description: '김치프리미엄(김프) 및 암호화폐 시세를 실시간 제공합니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
