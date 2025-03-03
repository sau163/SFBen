import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArticleList from './components/ArticleList';
import Sidebar from './components/Sidebar';
import ArticleDetail from './components/ArticleDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Hero />
                    <ArticleList />
                  </div>
                  <Sidebar />
                </div>
              }
            />
            <Route path="/article/:articleId" element={<ArticleDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;