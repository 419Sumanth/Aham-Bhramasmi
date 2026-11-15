import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {ArticleDetailsPage} from './components/ArticleDetailsPage.tsx';
import {DeityDetailsPage} from './components/DeityDetailsPage.tsx';
import {DEITY_MEDIA} from './data/articles.ts';
import './index.css';

const deityId = window.location.pathname.match(/^\/deity\/([^/]+)\/?$/)?.[1];
const deityItem = DEITY_MEDIA.find((item) => item.id === deityId);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.location.pathname === '/read-more' ? (
      <ArticleDetailsPage />
    ) : deityItem ? (
      <DeityDetailsPage item={deityItem} />
    ) : (
      <App />
    )}
  </StrictMode>,
);
