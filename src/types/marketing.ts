export type MarketingTarget = 'product' | 'business' | 'brand' | 'website';

export type MarketingType = 'online' | 'offline';

export type CampaignType = 'post' | 'campaign';

export type BudgetLevel = 'low' | 'medium' | 'high' | 'not-sure';

export type SubscriptionTier = 'free' | 'premium' | 'expert';

export interface MarketingPreferences {
  target: MarketingTarget;
  type: MarketingType;
  campaignType: CampaignType;
  budget: BudgetLevel;
}

export interface MarketingRecommendation {
  id: string;
  title: string;
  description: string;
  steps: string[];
  estimatedCost: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeRequired: string;
  tier: SubscriptionTier;
}

export interface SubscriptionFeature {
  title: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: SubscriptionFeature[];
  tier: SubscriptionTier;
  mostPopular?: boolean;
}