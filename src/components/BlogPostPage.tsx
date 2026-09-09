import React, { useEffect } from 'react';
import { ArrowLeft, Share2, ChevronRight, Check } from 'lucide-react';
import { BlogPost, getRelatedBlogPosts } from '../data/blogPosts';
import { useLanguage } from '../lib/i18n.tsx';
import { City, CITIES_DATABASE } from '../data/cities';
import { TimeComparator } from './TimeComparator';
import { HeroClock } from './HeroClock';

interface BlogPostPageProps {
  post: BlogPost;
  onBackToBlog: () => void;
  onSelectPost: (slug: string) => void;
  is24Hour: boolean;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onBackToBlog,
  onSelectPost,
  is24Hour
}) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const langPost = post.translations[language] || post.translations.es;
  const relatedPosts = getRelatedBlogPosts(post, 3);
  const targetCity: City = CITIES_DATABASE.find(c => c.id === post.targetCityId) || CITIES_DATABASE[0];

  // Dynamic document title update for SEO
  useEffect(() => {
    document.title = `${langPost.title} — Blog 9:41 AM`;
    window.scrollTo(0, 0);
  }, [post, language, langPost.title]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '2rem 1.5rem 5rem 1.5rem',
      color: '#071A33'
    }}>
      {/* Top Controls: Back Button & Breadcrumbs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <button
          onClick={onBackToBlog}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#071A33',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-sky-light)';
            e.currentTarget.style.borderColor = '#0284C7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-bg-secondary)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          <ArrowLeft size={16} />
          <span>{t.blog.backToBlog}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            background: copied ? '#e0f2fe' : 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: copied ? '#0284C7' : '#071A33',
            cursor: 'pointer'
          }}
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          <span>{copied ? t.blog.linkCopied : t.blog.share}</span>
        </button>
      </div>

      {/* Breadcrumb Trail */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.82rem',
        fontWeight: 600,
        color: '#0284C7',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        <span onClick={onBackToBlog} style={{ cursor: 'pointer', opacity: 0.8 }}>{t.nav.blog}</span>
        <ChevronRight size={12} style={{ opacity: 0.5 }} />
        <span style={{ color: 'var(--color-text-muted)' }}>
          {post.categoryName[language] || post.categoryName.es}
        </span>
      </div>

      {/* Main Post Title (H1) */}
      <h1 style={{
        fontSize: '2.4rem',
        fontWeight: 900,
        color: '#071A33',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        marginBottom: '1.25rem'
      }}>
        {langPost.title}
      </h1>

      {/* Minimalist Author Metadata */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        paddingBottom: '1.75rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--color-border)',
        fontSize: '0.88rem',
        color: 'var(--color-text-muted)',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img
            src={post.author.avatar.startsWith('/') ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${post.author.avatar}` : post.author.avatar}
            alt={post.author.name[language] || post.author.name.es}
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#071A33' }}>{post.author.name[language] || post.author.name.es}</div>
            <div style={{ fontSize: '0.78rem' }}>{post.author.role[language] || post.author.role.es}</div>
          </div>
        </div>
      </div>

      {/* Featured Snippet Box (Position 0 Google Box) */}
      {langPost.featuredSnippet && (
        <div style={{
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          borderRadius: 'var(--radius-md)',
          padding: '1.75rem 2rem',
          marginBottom: '2.5rem',
          boxShadow: '0 8px 24px rgba(2, 132, 199, 0.08)'
        }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 800,
            color: '#0284C7',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.75rem'
          }}>
            <span>{t.blog.featuredSnippetTitle}</span>
          </div>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: '#071A33',
            fontWeight: 600,
            margin: 0
          }}>
            {langPost.featuredSnippet}
          </p>
        </div>
      )}

      {/* Embedded Live Widget Depending on Article Topic */}
      {post.interactiveWidget && (
        <div style={{
          margin: '2.5rem 0',
          padding: '1.5rem',
          background: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: '#0284C7',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {t.blog.liveWidgetTitle}
          </div>

          {post.interactiveWidget === 'clock' && (
            <HeroClock
              city={targetCity}
              is24Hour={is24Hour}
              showSeconds={true}
              onSelectCity={() => {}}
              onAddToWorldClock={() => {}}
              isCityInWorldClock={false}
            />
          )}

          {post.interactiveWidget === 'comparator' && (
            <TimeComparator
              initialCityA={targetCity}
              initialCityB={CITIES_DATABASE[3]} // Tokyo
              is24Hour={is24Hour}
            />
          )}
        </div>
      )}

      {/* Article Rich HTML Content Body */}
      <div
        className="blog-content-body"
        dangerouslySetInnerHTML={{ __html: langPost.contentHtml }}
        style={{
          fontSize: '1.1rem',
          lineHeight: 1.8,
          color: '#071A33',
          marginBottom: '3.5rem'
        }}
      />


      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '3rem' }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#071A33',
            marginBottom: '1.75rem'
          }}>
            {t.blog.relatedPosts}
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {relatedPosts.map((relPost: BlogPost) => {
              const relLang = relPost.translations[language] || relPost.translations.es;
              return (
                <div
                  key={relPost.id}
                  onClick={() => onSelectPost(relPost.slug)}
                  style={{
                    background: 'var(--color-white)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(2, 132, 199, 0.15)',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 12px 32px rgba(7, 26, 51, 0.1), 0 4px 12px rgba(2, 132, 199, 0.08)',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 45px rgba(2, 132, 199, 0.24), 0 6px 18px rgba(7, 26, 51, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(7, 26, 51, 0.1), 0 4px 12px rgba(2, 132, 199, 0.08)';
                  }}
                >
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#071A33',
                      lineHeight: 1.35,
                      margin: 0
                    }}>
                      {relLang.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
};
