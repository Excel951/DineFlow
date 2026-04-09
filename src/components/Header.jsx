import React from 'react';
import { Search } from 'lucide-react';
import CategoryBar from './CategoryBar';

export default function Header({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  searchQuery,
  setSearchQuery 
}) {
  return (
    <header className="sticky top-0 bg-white p-4 shadow-sm z-10">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-xl font-bold text-orange-600">DineFlow</h1>
        <div className="flex-1 flex items-center bg-gray-100 px-3 py-2 rounded-full border border-transparent focus-within:border-orange-300 focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari menu favorit..."
            className="bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <CategoryBar
        categories={categories}
        activeCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
    </header>
  );
}