import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, setFilter } from '../store/slices/articlesSlice';
import { useNavigate } from 'react-router-dom';

function ArticleList() {
  const dispatch = useDispatch();
  const { items, status, activeFilter } = useSelector((state) => state.articles);
  const tabs = ['Latest', 'Most Popular', "Editors' Picks"];
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArticles(activeFilter));
  }, [dispatch, activeFilter]);

  const handleTabClick = (filter) => {
    dispatch(setFilter(filter.toLowerCase()));
  };

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-600">Error loading articles</div>;
  }

  return (
    <div className="mt-8">
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 rounded-md ${
              tab.toLowerCase() === activeFilter
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {items.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleArticleClick(article.id)}
          >
            <div className="md:flex">
              <div className="md:flex-1 p-6">
                <span className="text-purple-600 text-sm font-medium">
                  {article.category}
                </span>
                <h2 className="text-2xl font-bold mt-2 mb-4">
                  {article.title}
                </h2>
                <div className="text-gray-600">
                  <span>By {article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              {article.image_url && (
                <div className="md:w-1/3">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="h-48 w-full object-cover md:h-full"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;