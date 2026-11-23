import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { I18nProvider, resolveLocale } from './i18n';
import { loadLocale } from './i18n/loadLocale';
import { enMYBundle } from './i18n/translations/en-MY';
import './index.css';

const root = createRoot(document.getElementById('root')!);
const initialLocale = resolveLocale();

void loadLocale(initialLocale).catch(() => enMYBundle).then((initialBundle) => {
  root.render(
    <I18nProvider initialBundle={initialBundle}>
      <App />
    </I18nProvider>,
  );
});
