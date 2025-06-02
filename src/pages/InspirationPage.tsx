import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { inspirationExamples } from '../data/mockData';

type FilterCategory = 'all' | 'product' | 'business' | 'brand' | 'website';
type FilterType = 'all' | 'online' | 'offline' | 'both';

const InspirationPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter examples based on category, type, and search query
  const filteredExamples = inspirationExamples.filter(example => {
    const matchesCategory = categoryFilter === 'all' || example.category === categoryFilter;
    const matchesType = typeFilter === 'all' || example.type === typeFilter || (typeFilter === 'both' && example.type === 'both');
    const matchesSearch = searchQuery === '' || 
      example.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      example.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Marketing Inspiration
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse examples and get inspired for your next marketing campaign.
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for inspiration..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto"
          >
            <Filter size={18} className="mr-2" /> Filters
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marketing Target
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={categoryFilter === 'all' ? 'primary' : 'outline'}
                    onClick={() => setCategoryFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={categoryFilter === 'product' ? 'primary' : 'outline'}
                    onClick={() => setCategoryFilter('product')}
                  >
                    Product
                  </Button>
                  <Button 
                    size="sm" 
                    variant={categoryFilter === 'business' ? 'primary' : 'outline'}
                    onClick={() => setCategoryFilter('business')}
                  >
                    Business
                  </Button>
                  <Button 
                    size="sm" 
                    variant={categoryFilter === 'brand' ? 'primary' : 'outline'}
                    onClick={() => setCategoryFilter('brand')}
                  >
                    Brand
                  </Button>
                  <Button 
                    size="sm" 
                    variant={categoryFilter === 'website' ? 'primary' : 'outline'}
                    onClick={() => setCategoryFilter('website')}
                  >
                    Website
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marketing Type
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant={typeFilter === 'all' ? 'primary' : 'outline'}
                    onClick={() => setTypeFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={typeFilter === 'online' ? 'primary' : 'outline'}
                    onClick={() => setTypeFilter('online')}
                  >
                    Online
                  </Button>
                  <Button 
                    size="sm" 
                    variant={typeFilter === 'offline' ? 'primary' : 'outline'}
                    onClick={() => setTypeFilter('offline')}
                  >
                    Offline
                  </Button>
                  <Button 
                    size="sm" 
                    variant={typeFilter === 'both' ? 'primary' : 'outline'}
                    onClick={() => setTypeFilter('both')}
                  >
                    Integrated
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inspiration Grid */}
      {filteredExamples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example) => (
            <Card key={example.id} hover className="overflow-hidden group">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img 
                  src={example.imageUrl} 
                  alt={example.title}
                  className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-semibold text-lg">{example.title}</h3>
                    <div className="flex mt-2 space-x-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 rounded-full">
                        {example.category}
                      </span>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 rounded-full">
                        {example.type === 'both' ? 'Integrated' : example.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {example.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="text-gray-400 dark:text-gray-500 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            No results found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setTypeFilter('all');
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default InspirationPage;