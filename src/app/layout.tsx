import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Mohammed Boussardi — Enterprise Applications & Oracle APEX Consultant',
  description: 'Professional portfolio of Mohammed Boussardi. Oracle APEX, HRIS, Workforce Management consultant and digital transformation specialist based in Morocco.',
  metadataBase: new URL('https://mboussardi.ma'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
