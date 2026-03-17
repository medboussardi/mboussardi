import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CertificationsClient from './CertificationsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('certifications', locale, 'certifications');
}

export default function CertificationsPage() {
  return <CertificationsClient />;
}
