import { MarketingRecommendation, SubscriptionPlan } from '../types/marketing';

export const mockRecommendations: MarketingRecommendation[] = [
  {
    id: '1',
    title: 'Social Media Content Calendar',
    description: 'Create a structured content calendar for social media platforms to maintain consistent posting schedule.',
    steps: [
      'Identify target platforms (Instagram, Facebook, Twitter, etc.)',
      'Determine optimal posting frequency',
      'Create content pillars and themes',
      'Design template posts for each platform',
      'Schedule posts using a management tool'
    ],
    estimatedCost: '$0-50',
    difficulty: 'beginner',
    timeRequired: '2-3 hours setup, 1 hour weekly maintenance',
    tier: 'free'
  },
  {
    id: '2',
    title: 'Email Marketing Campaign',
    description: 'Create an email sequence to nurture leads and promote your product or service.',
    steps: [
      'Build an email list through website opt-ins',
      'Segment your audience based on interests',
      'Create compelling email templates',
      'Write a sequence of 5-7 emails',
      'Set up automated delivery with analytics tracking'
    ],
    estimatedCost: '$50-200',
    difficulty: 'intermediate',
    timeRequired: '5-10 hours',
    tier: 'free'
  },
  {
    id: '3',
    title: 'Targeted Facebook Ad Campaign',
    description: 'Create highly targeted Facebook ads to reach your specific audience and generate leads or sales.',
    steps: [
      'Define your audience demographics and interests',
      'Create compelling ad visuals and copy',
      'Set up conversion tracking',
      'Create a dedicated landing page',
      'Monitor and optimize performance daily',
      'A/B test different ad variations'
    ],
    estimatedCost: '$200-500',
    difficulty: 'intermediate',
    timeRequired: '8-12 hours setup, ongoing management',
    tier: 'premium'
  },
  {
    id: '4',
    title: 'Comprehensive SEO Strategy',
    description: 'Improve your website visibility and organic traffic through search engine optimization.',
    steps: [
      'Conduct keyword research for your industry',
      'Audit your current website content',
      'Optimize page titles, meta descriptions, and headings',
      'Create a content calendar based on keywords',
      'Implement technical SEO improvements',
      'Build a backlink acquisition strategy',
      'Track rankings and traffic improvements'
    ],
    estimatedCost: '$300-1,000',
    difficulty: 'advanced',
    timeRequired: '20-30 hours initial setup, ongoing monthly maintenance',
    tier: 'premium'
  },
  {
    id: '5',
    title: 'Integrated Multi-Channel Campaign',
    description: 'Create a cohesive marketing campaign across multiple channels for maximum impact.',
    steps: [
      'Define campaign objectives and KPIs',
      'Create consistent messaging and visual identity',
      'Develop assets for social media, email, paid ads, and website',
      'Implement tracking across all channels',
      'Create a content distribution schedule',
      'Set up retargeting campaigns',
      'Analyze cross-channel performance',
      'Optimize based on channel performance'
    ],
    estimatedCost: '$1,000-5,000',
    difficulty: 'advanced',
    timeRequired: '40-60 hours',
    tier: 'expert'
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    description: 'Essential marketing tools for individuals and small businesses',
    price: 0,
    billingPeriod: 'monthly',
    tier: 'free',
    features: [
      { title: 'Basic marketing recommendations', included: true },
      { title: 'Limited campaign templates', included: true },
      { title: 'General advice based on preferences', included: true },
      { title: 'Save up to 3 campaigns', included: true },
      { title: 'Access to inspiration gallery', included: true },
      { title: 'Mood board creation', included: false },
      { title: 'AI chatbot assistance', included: false },
      { title: 'Custom marketing analysis', included: false },
      { title: 'SWOT analysis generation', included: false },
      { title: 'Priority support', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'Advanced features for growing businesses',
    price: 19.99,
    billingPeriod: 'monthly',
    tier: 'premium',
    mostPopular: true,
    features: [
      { title: 'Everything in Free Plan', included: true },
      { title: 'Advanced marketing recommendations', included: true },
      { title: 'Unlimited campaign templates', included: true },
      { title: 'Mood board creation and analysis', included: true },
      { title: 'AI chatbot assistance', included: true },
      { title: 'Custom marketing analysis', included: true },
      { title: 'Save unlimited campaigns', included: true },
      { title: 'Campaign performance tracking', included: true },
      { title: 'SWOT analysis generation', included: false },
      { title: 'Priority support', included: false }
    ]
  },
  {
    id: 'expert',
    name: 'Expert Plan',
    description: 'Professional marketing suite for businesses of all sizes',
    price: 49.99,
    billingPeriod: 'monthly',
    tier: 'expert',
    features: [
      { title: 'Everything in Premium Plan', included: true },
      { title: 'SWOT analysis generation', included: true },
      { title: 'Competitor analysis', included: true },
      { title: 'Full marketing strategy creation', included: true },
      { title: 'Custom poster and asset creation', included: true },
      { title: 'Detailed audience insights', included: true },
      { title: 'Advanced campaign metrics', included: true },
      { title: 'ROI prediction and analysis', included: true },
      { title: 'Marketing calendar integration', included: true },
      { title: 'Priority support', included: true }
    ]
  }
];

export const inspirationExamples = [
  {
    id: '1',
    title: 'Minimalist Product Launch',
    category: 'product',
    type: 'online',
    imageUrl: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Clean, minimalist approach for a high-end product launch with emphasis on product quality and design.'
  },
  {
    id: '2',
    title: 'Colorful Brand Identity',
    category: 'brand',
    type: 'online',
    imageUrl: 'https://images.pexels.com/photos/5626218/pexels-photo-5626218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Vibrant, playful brand identity for a creative business with a focus on innovation and creativity.'
  },
  {
    id: '3',
    title: 'Local Business Promotion',
    category: 'business',
    type: 'offline',
    imageUrl: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Community-focused campaign for a local business to build loyalty and increase foot traffic.'
  },
  {
    id: '4',
    title: 'Website Relaunch Campaign',
    category: 'website',
    type: 'online',
    imageUrl: 'https://images.pexels.com/photos/5077049/pexels-photo-5077049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Digital campaign to promote a website redesign with improved features and user experience.'
  },
  {
    id: '5',
    title: 'Seasonal Product Promotion',
    category: 'product',
    type: 'both',
    imageUrl: 'https://images.pexels.com/photos/5624977/pexels-photo-5624977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Integrated campaign highlighting seasonal products across digital and physical channels.'
  },
  {
    id: '6',
    title: 'B2B Service Marketing',
    category: 'business',
    type: 'online',
    imageUrl: 'https://images.pexels.com/photos/6804595/pexels-photo-6804595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Professional campaign targeting business clients with emphasis on reliability and expertise.'
  }
];