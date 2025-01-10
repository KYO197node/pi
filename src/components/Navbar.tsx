import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, User } from 'lucide-react';
import { usePiAuth } from '../contexts/PiAuthContext';

export default function Navbar() {
  const { user, login, isLoading } = usePiAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-purple-600" />
            <span className="font-bold text-xl">Pi News</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/subscribe" className="text-purple-600 hover:text-purple-700">
              Subscribe
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{user.username}</span>
              </div>
            ) : (
              <button
                onClick={login}
                disabled={isLoading}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {isLoading ? 'Connecting...' : 'Connect Pi'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}