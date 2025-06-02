import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';

// Types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface SuggestionPrompt {
  id: string;
  text: string;
}

// Mock user data - in a real app this would come from auth/backend
const mockUserData = {
  tier: 'free', // 'free', 'premium', or 'expert'
};

const suggestionPrompts: SuggestionPrompt[] = [
  { id: '1', text: 'How can I improve my Instagram engagement?' },
  { id: '2', text: "What's the best marketing strategy for a small local business?" },
  { id: '3', text: 'How often should I post on social media?' },
  { id: '4', text: 'What are the key elements of a good email campaign?' },
  { id: '5', text: 'How do I create a content calendar?' },
  { id: '6', text: 'What metrics should I track for my marketing campaigns?' },
  { id: '7', text: 'How can I use SEO to improve my website visibility?' },
  { id: '8', text: "What's the difference between organic and paid marketing?" },
];

// Welcome message from the bot
const welcomeMessage: Message = {
  id: '0',
  content: "Hi there! I'm your MarketMate AI assistant. I can help you with marketing strategies, content ideas, and answer your questions about growing your business. What would you like to know today?",
  sender: 'bot',
  timestamp: new Date(),
};

const ChatbotPage: React.FC = () => {
  const [userTier, setUserTier] = useState<'free' | 'premium' | 'expert'>(mockUserData.tier as any);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate a random ID for messages
  const generateId = () => Math.random().toString(36).substring(2, 11);

  // Add a new message to the chat
  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: generateId(),
      content,
      sender,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    if (sender === 'user') {
      setMessageCount(prev => prev + 1);
    }
  };

  // Format time for message timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Check if free tier user has reached message limit
    if (userTier === 'free' && messageCount >= 5) {
      setShowPremiumModal(true);
      return;
    }
    
    addMessage(inputValue, 'user');
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      getBotResponse(inputValue);
      setIsLoading(false);
    }, 1000);
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get bot response based on user input
  const getBotResponse = (userInput: string) => {
    // In a real app, this would call an AI API
    // For this demo, we'll use some canned responses
    
    const input = userInput.toLowerCase();
    let response = '';
    
    if (input.includes('instagram') || input.includes('social media')) {
      response = "For Instagram and social media success, consistency is key. I recommend posting 3-5 times per week, using a mix of content types (photos, carousels, Reels, Stories). Engage with your audience by responding to comments and messages. Use hashtags strategically - 5-10 relevant tags per post. And most importantly, focus on creating value for your audience rather than just promoting your products.";
    } else if (input.includes('email') || input.includes('newsletter')) {
      response = "Effective email campaigns start with a compelling subject line to improve open rates. Keep your content concise and valuable, with a clear call-to-action. Segment your audience to send targeted content, and optimize for mobile viewing. The ideal frequency depends on your industry, but starting with once a week is usually a good baseline. A/B test different elements to continuously improve performance.";
    } else if (input.includes('website') || input.includes('seo')) {
      response = "To improve your website visibility through SEO: 1) Research and use relevant keywords in your content, titles, and meta descriptions. 2) Create high-quality, original content regularly. 3) Optimize your site's loading speed and ensure it's mobile-friendly. 4) Build quality backlinks from reputable sites. 5) Use internal linking to help search engines understand your site structure. These fundamentals will help improve your organic search rankings over time.";
    } else if (input.includes('budget') || input.includes('cost')) {
      response = "Marketing on a limited budget? Focus on high-ROI channels: 1) Content marketing through a blog or social media. 2) Email marketing to nurture leads. 3) Local SEO to improve visibility in your area. 4) Strategic partnerships with complementary businesses. 5) User-generated content campaigns. Start small, measure results, and reinvest in what works best for your specific business.";
    } else if (input.includes('content') || input.includes('calendar')) {
      response = "Creating a content calendar starts with identifying your key content pillars - the main topics that align with your business and audience interests. Then, plan content types (blog posts, videos, social posts) for each pillar. Schedule content based on your capacity - quality over quantity. Use tools like Trello, Asana, or even a simple spreadsheet to organize everything. Leave room for timely content that responds to trends or news.";
    } else {
      response = "That's a great question about marketing strategy. The most effective approach combines consistent content creation, audience engagement, and data analysis to refine your tactics. I recommend starting with clear goals, identifying your target audience, and selecting channels where they're most active. Test different approaches, measure results, and adjust your strategy based on what performs best.";
    }
    
    addMessage(response, 'bot');
  };

  // Handle clicking a suggestion prompt
  const handleSuggestionClick = (prompt: string) => {
    setInputValue(prompt);
  };

  // Upgrade to premium (demo)
  const upgradeToPremium = () => {
    setUserTier('premium');
    setShowPremiumModal(false);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="animate-fade-in h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Marketing Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Get answers, ideas, and guidance for your marketing campaigns.
          </p>
        </div>
      </div>

      <Card className="flex flex-col flex-grow overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-primary-100 dark:bg-primary-900/30 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <CardTitle className="text-lg">MarketMate AI</CardTitle>
              <CardDescription>
                Your AI marketing assistant
              </CardDescription>
            </div>
            {userTier === 'free' && (
              <div className="ml-auto bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                {5 - messageCount} messages left
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow p-0 overflow-hidden flex flex-col">
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'bot' ? (
                      <Bot className="w-4 h-4 mr-1 text-primary-600 dark:text-primary-400" />
                    ) : (
                      <User className="w-4 h-4 mr-1 text-white" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.sender === 'bot' ? 'MarketMate AI' : 'You'} • {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none">
                  <div className="flex items-center mb-1">
                    <Bot className="w-4 h-4 mr-1 text-primary-600 dark:text-primary-400" />
                    <span className="text-xs opacity-70">
                      MarketMate AI • {formatTime(new Date())}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {userTier === 'free' && messageCount >= 5 ? (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  You've reached the free message limit
                </span>
                <Button size="sm" onClick={() => setShowPremiumModal(true)}>
                  Upgrade
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about marketing..."
                  className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[2.5rem] max-h-32 resize-none"
                  rows={1}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="shrink-0"
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send size={18} />
                </Button>
              </div>
              
              {/* Suggestion prompts */}
              <div className="mt-3">
                <div 
                  className="flex items-center text-sm text-gray-500 dark:text-gray-400 cursor-pointer mb-2"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                >
                  <Sparkles size={14} className="mr-1" />
                  <span>Suggested questions</span>
                  {showSuggestions ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  )}
                </div>
                
                {showSuggestions && (
                  <div className="flex flex-wrap gap-2 animate-fade-in">
                    {suggestionPrompts.slice(0, 4).map((prompt) => (
                      <button
                        key={prompt.id}
                        onClick={() => handleSuggestionClick(prompt.text)}
                        className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {prompt.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
                  You've reached the free message limit. Upgrade to Premium to get:
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Unlimited AI assistant messages</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Advanced marketing strategy guidance</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Personalized campaign recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Access to all premium features</span>
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

export default ChatbotPage;