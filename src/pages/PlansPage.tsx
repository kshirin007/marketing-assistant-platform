import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/Card';
import { subscriptionPlans } from '../data/mockData';

const PlansPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Choose the Right Plan for Your Business
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          All plans include a 7-day free trial of premium features.
          No credit card required to start.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className="flex">
            <Card className={`flex flex-col w-full ${plan.mostPopular ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''}`}>
              {plan.mostPopular && (
                <div className="bg-primary-500 text-white text-sm font-medium py-1 px-4 rounded-t-xl text-center">
                  Most Popular
                </div>
              )}
              <CardHeader className={`${plan.mostPopular ? 'rounded-t-none' : ''}`}>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{plan.description}</p>
                </div>
                <div className="text-center mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300">/{plan.billingPeriod}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                        {feature.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  fullWidth 
                  variant={plan.tier === 'free' ? 'outline' : 'primary'}
                >
                  {plan.tier === 'free' ? 'Get Started' : 'Start 7-Day Free Trial'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I cancel my subscription anytime?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, you can cancel your subscription at any time. If you cancel during your free trial period, you won't be charged.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What happens after the 7-day trial?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              After your 7-day trial, you'll be automatically switched to the Free plan unless you choose to continue with a paid subscription.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I change plans later?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to the new features.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Do you offer team or enterprise plans?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, we offer custom plans for teams and enterprises. Please contact our sales team for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;