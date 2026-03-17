import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ExperienceClient from './ExperienceClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('experience', locale, 'experience');
}

export default function ExperiencePage() {
  return <ExperienceClient />;
}
