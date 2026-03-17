import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ContactClient from './ContactClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('contact', locale, 'contact');
}

export default function ContactPage() {
  return <ContactClient />;
}
