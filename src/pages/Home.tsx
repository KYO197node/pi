import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'The Future of Pi Network',
    excerpt: 'Exploring the potential and future developments of Pi Network...',
    author: 'John Doe',
    date: new Date(),
    imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&auto=format&fit=crop'
  },
  // Add more mock articles...
];

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Latest News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ARTICLES.map((article) => (
          <Link 
            key={article.id}
            to={`/article/${article.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{article.author}</span>
                <span>{format(article.date, 'MMM d, yyyy')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}