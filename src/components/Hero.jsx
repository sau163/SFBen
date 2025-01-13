import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Hero() {
  const { items } = useSelector((state) => state.articles);
  const featuredArticle = items.length > 0 ? items[0] : null;

  return (
    <section className="relative h-[400px] rounded-lg overflow-hidden">
      {featuredArticle ? (
        <Link to={`/article/${featuredArticle.id}`} className="block">
          <img
            src={featuredArticle.image_url || '/images/hero-image.jpg'}
            alt={featuredArticle.title || 'Featured article'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-white text-4xl font-bold mb-4">
                {featuredArticle.title || 'Untitled Article'}
              </h1>
              <p className="text-white/90 text-lg">
                {featuredArticle.content
                  ? `${featuredArticle.content.substring(0, 100)}...`
                  : 'No description available.'}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-200 text-gray-600">
          No featured article available.
        </div>
      )}
    </section>
  );
}

export default Hero;