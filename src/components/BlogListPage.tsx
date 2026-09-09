import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogCategory } from '../data/blogPosts';
import { useLanguage } from '../lib/i18n.tsx';

interface BlogListPageProps {
  onSelectPost: (slug: string) => void;
  onGoHome: () => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onSelectPost, onGoHome }) => {
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
      {/* Breadcrumb Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#0284C7',
        marginBottom: '1.5rem'
      }}>
        <span onClick={onGoHome} style={{ cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.15s' }}>
          {t.nav.home}
        </span>
        <ChevronRight size={14} style={{ opacity: 0.5 }} />
        <span style={{ color: 'var(--color-navy)', fontWeight: 700 }}>
          {t.nav.blog}
        </span>
      </div>

      {/* Hero Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2.5rem 1.5rem',
        background: 'linear-gradient(180deg, #F5F9FC 0%, #FFFFFF 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 10px 30px rgba(7, 26, 51, 0.04)'
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 900,
          color: '#0284C7',
          letterSpacing: '-0.02em',
          marginBottom: '0.85rem',
          lineHeight: 1.2,
          textShadow: '0 10px 30px rgba(2, 132, 199, 0.45), 0 4px 18px rgba(7, 26, 51, 0.25)',
          filter: 'drop-shadow(0 8px 20px rgba(2, 132, 199, 0.3))'
        }}>
          {t.blog.title}
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
            padding: '0.5rem 1.1rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: '1px solid',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            background: selectedCategory === 'all' ? '#071A33' : 'var(--color-bg-secondary)',
            color: selectedCategory === 'all' ? '#FFFFFF' : '#071A33',
            borderColor: selectedCategory === 'all' ? '#071A33' : 'var(--color-border)'
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
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                background: isSelected ? '#0284C7' : 'var(--color-white)',
                color: isSelected ? '#FFFFFF' : '#071A33',
                borderColor: isSelected ? '#0284C7' : 'var(--color-border)'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = '#0284C7';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border)';
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
                  background: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(2, 132, 199, 0.12)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: '0 12px 36px rgba(7, 26, 51, 0.09), 0 3px 12px rgba(2, 132, 199, 0.08)',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(2, 132, 199, 0.24), 0 6px 18px rgba(7, 26, 51, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(7, 26, 51, 0.09), 0 3px 12px rgba(2, 132, 199, 0.08)';
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
                    opacity: 0.8,
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
                  borderTop: '1px solid var(--color-border)',
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
