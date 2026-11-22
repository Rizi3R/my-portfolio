import { FileText, Mail, Workflow } from 'lucide-react';
import { useI18n } from '../i18n';
import { useIllustrationMotion } from '../utils/useIllustrationMotion';

function playMigration(element: HTMLElement): Animation[] {
  return Array.from(element.querySelectorAll('.migration-carrier')).map((tile, index) =>
    tile.animate(
      [
        { transform: 'translateX(calc(-100% + 5.5rem)) translateY(6px)', opacity: 0 },
        { transform: 'translateX(calc(-100% + 5.5rem))', opacity: 1, offset: 0.24 },
        { transform: 'translateX(-28%)', opacity: 1, offset: 0.74 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 1900, delay: index * 180, easing: 'ease-in-out', fill: 'backwards' },
    ),
  );
}

export function MigrationIllustration() {
  const { t } = useI18n();
  const { ref } = useIllustrationMotion<HTMLElement>(playMigration);

  return (
    <figure ref={ref} className="migration-route no-print">
      <div className="migration-brands" aria-hidden="true">
        <span><Mail size={18} />Google Workspace</span>
        <span><Workflow size={18} />Lark</span>
      </div>
      <div className="migration-track" aria-hidden="true">
        <div className="migration-line" />
        {[0, 1, 2].map((tile) => (
          <div className="migration-carrier" key={tile}>
            <span className="migration-tile"><FileText size={12} /></span>
          </div>
        ))}
      </div>
      <figcaption>{t.caseStudies.illustrativeMigration}</figcaption>
    </figure>
  );
}
