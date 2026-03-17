import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import SkillsClient from './SkillsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('skills', locale, 'skills');
}

export default function SkillsPage() {
  return <SkillsClient />;
}
