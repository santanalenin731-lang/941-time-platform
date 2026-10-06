import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogCategory } from '../data/blogPosts';
import { useLanguage } from '../lib/i18n.tsx';

interface BlogListPageProps {
  onSelectPost: (slug: string) => void;
  onGoHome?: () => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onSelectPost }) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div style={{
      maxWidth: 'var(--max-width)',
      margin: '0 auto',
      padding: '2rem 1.5rem 4rem 1.5rem',
      color: 'var(--color-navy)'
    }}>
      {/* Hero Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2.5rem 1.5rem',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF3FB 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid #C4DCEF',
        borderBottom: '1.5px solid #B4D3EB',
        boxShadow: '0 2px 4px rgba(7, 26, 51, 0.04), 0 11px 26px -3px rgba(7, 26, 51, 0.11), 0 6px 16px -2px rgba(2, 132, 199, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
      }}>
        <h1 style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '0.3rem',
          flexWrap: 'wrap',
          marginBottom: '0.85rem',
          lineHeight: 1.2,
          textShadow: '0 4px 12px rgba(2, 132, 199, 0.15)'
        }}>
          {/* 9:41 (Grande) */}
          <span style={{
            color: '#0284C7',
            fontSize: 'clamp(2.2rem, 5.5vw, 2.9rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em'
          }}>
            9:41
          </span>

          {/* AM (Pequeño, a la línea base) */}
          <span style={{
            color: '#0284C7',
            fontSize: 'clamp(1.1rem, 2.7vw, 1.45rem)',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            marginRight: '0.35rem'
          }}>
            AM
          </span>

          {/* Blog (Mismo tamaño grande que 9:41) */}
          <span style={{
            color: '#0369A1',
            fontSize: 'clamp(2.2rem, 5.5vw, 2.9rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em'
          }}>
            {t.nav.blog}
          </span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: '#0D47A1',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.6,
          fontWeight: 500
        }}>
          {t.blog.subtitle}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        marginBottom: '2.5rem'
      }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '0.55rem 1.15rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: '1px solid',
            borderColor: selectedCategory === 'all' ? '#0284C7' : '#C4DCEF',
            borderBottom: selectedCategory === 'all' ? '1px solid #0284C7' : '1.5px solid #B4D3EB',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            background: selectedCategory === 'all' ? '#0284C7' : 'rgba(255, 255, 255, 0.95)',
            color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--color-navy)',
            boxShadow: selectedCategory === 'all'
              ? '0 4px 14px rgba(2, 132, 199, 0.35)'
              : '0 2px 5px rgba(7, 26, 51, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== 'all') e.currentTarget.style.borderColor = '#BAE6FD';
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== 'all') e.currentTarget.style.borderColor = '#C4DCEF';
          }}
        >
          {t.blog.allCategories}
        </button>

        {BLOG_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          const catName = cat.name[language] || cat.name.es;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: isSelected ? '#0284C7' : '#C4DCEF',
                borderBottom: isSelected ? '1px solid #0284C7' : '1.5px solid #B4D3EB',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                background: isSelected ? '#0284C7' : 'rgba(255, 255, 255, 0.95)',
                color: isSelected ? '#FFFFFF' : 'var(--color-navy)',
                boxShadow: isSelected
                  ? '0 4px 14px rgba(2, 132, 199, 0.35)'
                  : '0 2px 5px rgba(7, 26, 51, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = '#BAE6FD';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = '#C4DCEF';
              }}
            >
              {catName}
            </button>
          );
        })}
      </div>

      {/* Zero State if Search yields nothing */}
      {filteredPosts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-navy)'
        }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
            {t.blog.noResults}
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              background: '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {t.blog.allCategories}
          </button>
        </div>
      )}

      {/* Clean Minimalist Articles Grid - High 3D Depth Cards */}
      {filteredPosts.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {filteredPosts.map(post => {
            const langPost = post.translations[language] || post.translations.es;
            return (
              <div
                key={post.id}
                onClick={() => onSelectPost(post.slug)}
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF3FB 100%)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid #C4DCEF',
                  borderBottom: '1.5px solid #B4D3EB',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(7, 26, 51, 0.04), 0 11px 26px -3px rgba(7, 26, 51, 0.11), 0 6px 16px -2px rgba(2, 132, 199, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#BAE6FD';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#C4DCEF';
                }}
              >
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#071A33',
                    lineHeight: 1.35,
                    marginBottom: '0.75rem'
                  }}>
                    {langPost.title}
                  </h3>

                  <p style={{
                    fontSize: '0.92rem',
                    color: 'var(--color-navy)',
                    lineHeight: 1.55,
                    opacity: 0.85,
                    marginBottom: '1.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {langPost.excerpt}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid #D9EAF5',
                  fontSize: '0.82rem'
                }}>
                  <span style={{ fontWeight: 800, color: '#0284C7', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {t.blog.readMore} <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
