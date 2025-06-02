import React, { useState } from 'react';
import { Download, Upload, Copy, Trash2, Lock, Image, Text, Shapes, Palette, Grid, MoveHorizontal, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

// Mock user data - in a real app this would come from auth/backend
const mockUserData = {
  tier: 'free', // 'free', 'premium', or 'expert'
};

// Mock templates
const designTemplates = [
  {
    id: '1',
    name: 'Instagram Post',
    thumbnail: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=600',
    dimensions: '1080 x 1080px',
    tier: 'free'
  },
  {
    id: '2',
    name: 'Facebook Cover',
    thumbnail: 'https://images.pexels.com/photos/5082587/pexels-photo-5082587.jpeg?auto=compress&cs=tinysrgb&w=600',
    dimensions: '1640 x 924px',
    tier: 'free'
  },
  {
    id: '3',
    name: 'Twitter Post',
    thumbnail: 'https://images.pexels.com/photos/5082593/pexels-photo-5082593.jpeg?auto=compress&cs=tinysrgb&w=600',
    dimensions: '1200 x 675px',
    tier: 'premium'
  },
  {
    id: '4',
    name: 'LinkedIn Post',
    thumbnail: 'https://images.pexels.com/photos/5625008/pexels-photo-5625008.jpeg?auto=compress&cs=tinysrgb&w=600',
    dimensions: '1200 x 627px',
    tier: 'premium'
  },
  {
    id: '5',
    name: 'Email Header',
    thumbnail: 'https://images.pexels.com/photos/5082615/pexels-photo-5082615.jpeg?auto=compress&cs=tinysrgb&w=600',
    dimensions: '600 x 200px',
    tier: 'premium'
  },
  {
    id: '6',
    name: 'Presentation',
    thumbnail: 'https://images.pexels.com/photos/5082588/pexels-photo-5082588.jpeg?auto=compress&cs=tinysrgb&w=600',
    dimensions: '1920 x 1080px',
    tier: 'expert'
  },
];

// Mock design elements
const designElements = [
  {
    category: 'Shapes',
    icon: <Shapes size={18} />,
    items: ['Rectangle', 'Circle', 'Triangle', 'Line', 'Arrow', 'Star']
  },
  {
    category: 'Text',
    icon: <Text size={18} />,
    items: ['Heading', 'Subheading', 'Body Text', 'Caption', 'Quote']
  },
  {
    category: 'Images',
    icon: <Image size={18} />,
    items: ['Upload Image', 'Stock Photos', 'Backgrounds', 'Icons']
  },
  {
    category: 'Colors',
    icon: <Palette size={18} />,
    items: ['Color Picker', 'Gradients', 'Color Schemes']
  },
  {
    category: 'Layout',
    icon: <Grid size={18} />,
    items: ['Grid', 'Columns', 'Alignment', 'Spacing']
  }
];

const DesignPage: React.FC = () => {
  const [userTier, setUserTier] = useState<'free' | 'premium' | 'expert'>(mockUserData.tier as any);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Shapes');

  // Select a template
  const handleTemplateSelect = (templateId: string, tier: string) => {
    if ((tier === 'premium' || tier === 'expert') && userTier === 'free') {
      setShowPremiumModal(true);
      return;
    }
    if (tier === 'expert' && userTier === 'premium') {
      setShowPremiumModal(true);
      return;
    }
    
    setSelectedTemplate(templateId);
  };

  // Upgrade to premium (demo)
  const upgradeToPremium = () => {
    setUserTier('premium');
    setShowPremiumModal(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Design Creator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create professional marketing designs for various platforms.
          </p>
        </div>
        {selectedTemplate && (
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-1" /> Export
            </Button>
            <Button variant="primary" size="sm">
              <Copy size={16} className="mr-1" /> Save
            </Button>
          </div>
        )}
      </div>

      {!selectedTemplate ? (
        <>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Choose a template to get started
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {designTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer overflow-hidden group hover:shadow-md transition-shadow ${
                  template.tier !== 'free' && userTier === 'free' ? 'relative' : ''
                }`}
                onClick={() => handleTemplateSelect(template.id, template.tier)}
              >
                {template.tier !== 'free' && userTier === 'free' && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10 text-white">
                    <Lock size={24} className="mb-2" />
                    <span className="font-medium">{template.tier === 'premium' ? 'Premium' : 'Expert'} Template</span>
                  </div>
                )}
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {template.dimensions}
                      </p>
                    </div>
                    {template.tier !== 'free' && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        template.tier === 'premium' 
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' 
                          : 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300'
                      }`}>
                        {template.tier === 'premium' ? 'Premium' : 'Expert'}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Can't find what you need?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create a custom design with your own dimensions
            </p>
            <Button>Create Custom Design</Button>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-16rem)]">
          {/* Tools sidebar */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2">
            <div className="space-y-1">
              {designElements.map((category) => (
                <button 
                  key={category.category}
                  className={`w-full flex items-center p-2 rounded-md text-sm ${
                    activeCategory === category.category 
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category.category)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.category}
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {activeCategory}
              </h3>
              <div className="grid grid-cols-2 gap-1">
                {designElements.find(c => c.category === activeCategory)?.items.map((item, index) => (
                  <button
                    key={index}
                    className="p-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-center"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Canvas */}
          <div className="col-span-8 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center relative">
            <div className="w-[600px] h-[600px] bg-white shadow-md flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-500 flex flex-col items-center">
                <MoveHorizontal size={48} className="mb-2 opacity-50" />
                <p>Drag elements from the sidebar to start designing</p>
              </div>
            </div>
          </div>
          
          {/* Properties panel */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Properties
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dimensions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400">Width</label>
                    <input 
                      type="number" 
                      value="1080" 
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400">Height</label>
                    <input 
                      type="number" 
                      value="1080" 
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Background
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="color" 
                    value="#ffffff" 
                    className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded"
                  />
                  <input 
                    type="text" 
                    value="#ffffff" 
                    className="flex-grow px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Format
                </label>
                <select className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
                  <option>PNG</option>
                  <option>JPEG</option>
                  <option>PDF</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Layers
              </h3>
              <div className="space-y-2">
                <div className="flex items-center p-2 text-xs bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 rounded">
                  <Check size={12} className="text-primary-600 dark:text-primary-400 mr-1" />
                  <span>Background</span>
                  <Trash2 size={12} className="ml-auto text-gray-400 hover:text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Feature Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-slide-up">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upgrade to Premium
                </h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowPremiumModal(false)}
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This template is available for Premium and Expert users. Upgrade now to access:
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">All premium design templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Advanced design tools and elements</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Export in multiple high-quality formats</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Access to premium stock photos library</span>
                  </li>
                </ul>
                
                <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Starting at</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      $19.99<span className="text-sm font-normal text-gray-600 dark:text-gray-300">/month</span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowPremiumModal(false)}
                    >
                      Not Now
                    </Button>
                    <Button
                      onClick={upgradeToPremium}
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignPage;