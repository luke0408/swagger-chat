'use client';

import { cn } from "@/lib";
import { useTranslation } from "react-i18next";

export function LandingFooter() {
  const { t } = useTranslation();

  return (
    <footer className={cn('text-sm text-gray-500 text-center mt-8')}>
      {t('landing.footer.line1')}
      <br />
      {t('landing.footer.line2')}
    </footer>
  );
}
