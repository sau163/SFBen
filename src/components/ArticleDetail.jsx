import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../store/slices/articlesSlice';

function ArticleDetail() {
  const { articleId } = useParams();
  const dispatch = useDispatch();

  const { singleArticle, singleArticleStatus, singleArticleError } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  if (singleArticleStatus === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (singleArticleStatus === 'failed') {
    return (
      <div className="text-center py-4 text-red-600">
        {singleArticleError || 'Failed to load article'}
      </div>
    );
  }

  if (!singleArticle) {
    return <div className="text-center py-4 text-red-600">Article not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{singleArticle.title}</h1>
      <div className="text-gray-600 mb-4">
        <span>By {singleArticle.author}</span>
        <span className="mx-2">•</span>
        <span>{new Date(singleArticle.created_at).toLocaleDateString()}</span>
      </div>
      {singleArticle.image_url && (
        <img
          src={singleArticle.image_url}
          alt={singleArticle.title}
          className="w-full rounded-lg mb-6"
        />
      )}
      <p className="text-gray-800 leading-relaxed">{singleArticle.content}</p>
    </div>
  );
}

export default ArticleDetail;
