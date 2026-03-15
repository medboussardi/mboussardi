'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function HighlightsStrip() {
  const t = useTranslations('highlights');
  const items: string[] = t.raw('items');

  return (
    <section className="py-8 bg-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {items.map((item, i) => (
            <span
              key={i}
              className="text-sm font-medium text-navy-200 flex items-center gap-2"
            >
              {i > 0 && <span className="w-1 h-1 rounded-full bg-gold-500" />}
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
