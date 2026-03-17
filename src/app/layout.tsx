import type { Metadata } from 'next';

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
  return children;
}
