import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mohammed Boussardi — Consultant Enterprise & Oracle APEX',
  description: 'Portfolio professionnel de Mohammed Boussardi. Spécialiste Oracle APEX, SIRH, GTA et transformation digitale.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
