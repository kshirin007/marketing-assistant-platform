import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { mockRecommendations } from '../data/mockData';
import { 
  MarketingTarget, 
  MarketingType, 
  CampaignType, 
  BudgetLevel, 
  MarketingPreferences 
} from '../types/marketing';

const MarketingTypePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<Partial<MarketingPreferences>>({});
  const [recommendations, setRecommendations] = useState(mockRecommendations);

  const handleTargetSelect = (target: MarketingTarget) => {
    setPreferences({ ...preferences, target });
    setStep(2);
  };

  const handleTypeSelect = (type: MarketingType) => {
    setPreferences({ ...preferences, type });
    setStep(3);
  };

  const handleCampaignTypeSelect = (campaignType: CampaignType) => {
    setPreferences({ ...preferences, campaignType });
    setStep(4);
  };

  const handleBudgetSelect = (budget: BudgetLevel) => {
    setPreferences({ ...preferences, budget });
    setStep(5);
    
    // In a real application, we would filter recommendations based on user preferences
    // For this demo, we'll just use all recommendations
  };

  const resetForm = () => {
    setPreferences({});
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {step < 5 ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Create Your Marketing Campaign
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Answer a few questions to get personalized marketing recommendations.
            </p>
          </div>

          <div className="mb-8">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div 
                className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Target</span>
              <span>Type</span>
              <span>Campaign</span>
              <span>Budget</span>
            </div>
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                What do you want to market?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleTargetSelect('product')}
                >
                  <CardHeader>
                    <CardTitle>Product</CardTitle>
                    <CardDescription>
                      A physical or digital item you sell to customers
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleTargetSelect('business')}
                >
                  <CardHeader>
                    <CardTitle>Business</CardTitle>
                    <CardDescription>
                      Your company, store, or service-based business
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleTargetSelect('brand')}
                >
                  <CardHeader>
                    <CardTitle>Brand</CardTitle>
                    <CardDescription>
                      Your brand identity, values, and overall image
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleTargetSelect('website')}
                >
                  <CardHeader>
                    <CardTitle>Website</CardTitle>
                    <CardDescription>
                      Your online presence or web application
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Do you want to do online or offline marketing?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleTypeSelect('online')}
                >
                  <CardHeader>
                    <CardTitle>Online Marketing</CardTitle>
                    <CardDescription>
                      Digital channels like social media, websites, email, and ads
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleTypeSelect('offline')}
                >
                  <CardHeader>
                    <CardTitle>Offline Marketing</CardTitle>
                    <CardDescription>
                      Traditional channels like print, events, billboards, and direct mail
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <Button 
                variant="ghost" 
                className="mt-6"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                What kind of campaign do you need?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleCampaignTypeSelect('post')}
                >
                  <CardHeader>
                    <CardTitle>Single Post or Ad</CardTitle>
                    <CardDescription>
                      A one-time marketing asset for a specific purpose
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleCampaignTypeSelect('campaign')}
                >
                  <CardHeader>
                    <CardTitle>Full Campaign</CardTitle>
                    <CardDescription>
                      A comprehensive marketing strategy with multiple components
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <Button 
                variant="ghost" 
                className="mt-6"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                What is your budget?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleBudgetSelect('low')}
                >
                  <CardHeader>
                    <CardTitle>Low Budget</CardTitle>
                    <CardDescription>
                      Cost-effective options with minimal spending
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleBudgetSelect('medium')}
                >
                  <CardHeader>
                    <CardTitle>Medium Budget</CardTitle>
                    <CardDescription>
                      Balanced approach with moderate investment
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleBudgetSelect('high')}
                >
                  <CardHeader>
                    <CardTitle>High Budget</CardTitle>
                    <CardDescription>
                      Premium options with significant investment
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card 
                  className="cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-all"
                  onClick={() => handleBudgetSelect('not-sure')}
                >
                  <CardHeader>
                    <CardTitle>Not Sure</CardTitle>
                    <CardDescription>
                      Get options across different budget levels
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <Button 
                variant="ghost" 
                className="mt-6"
                onClick={() => setStep(3)}
              >
                Back
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Marketing Recommendations
            </h1>
            <Button onClick={resetForm} variant="outline">Start Over</Button>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Your Preferences
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Target:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{preferences.target}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{preferences.type}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Campaign:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{preferences.campaignType}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Budget:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{preferences.budget}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} hover>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{recommendation.title}</CardTitle>
                      <CardDescription className="mt-1">{recommendation.description}</CardDescription>
                    </div>
                    {recommendation.tier !== 'free' && (
                      <span className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {recommendation.tier === 'premium' ? 'Premium' : 'Expert'}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Cost:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{recommendation.estimatedCost}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Difficulty:</span>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{recommendation.difficulty}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Time Required:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{recommendation.timeRequired}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Steps:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      {recommendation.steps.map((step, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                  <Button className="w-full sm:w-auto">
                    Use This Recommendation <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingTypePage;