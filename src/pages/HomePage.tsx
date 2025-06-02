import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Palette, MessageSquare, FileCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 pb-10 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Smart Marketing <span className="text-primary-600 dark:text-primary-400">Made Simple</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Your AI-powered marketing assistant to help grow your business, product, brand, or website.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/marketing-type">
            <Button size="lg" variant="primary" className="group">
              Start Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </Link>
          <Link to="/plans">
            <Button size="lg" variant="outline">
              Explore Plans
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Unlock Your Marketing Potential
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From campaign creation to mood boards and AI assistance, we have everything you need to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card hover>
            <CardHeader>
              <div className="bg-primary-100 dark:bg-primary-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <CardTitle>Personalized Campaigns</CardTitle>
              <CardDescription>
                Get customized marketing recommendations based on your specific needs and budget.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card hover>
            <CardHeader>
              <div className="bg-secondary-100 dark:bg-secondary-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <CardTitle>Mood Board Creator</CardTitle>
              <CardDescription>
                Visualize your brand's look and feel with our intuitive mood board tools.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card hover>
            <CardHeader>
              <div className="bg-accent-100 dark:bg-accent-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <CardTitle>AI Marketing Assistant</CardTitle>
              <CardDescription>
                Get real-time guidance and answers to all your marketing questions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card hover>
            <CardHeader>
              <div className="bg-success-100 dark:bg-success-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <CardTitle>Ready-to-Use Templates</CardTitle>
              <CardDescription>
                Save time with professionally designed marketing templates for any purpose.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Getting started is easy. Just follow these simple steps.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Answer Simple Questions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us what you're marketing, your preferences, and your budget.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Get Personalized Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive tailored marketing strategies and campaign ideas.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Implement and Succeed</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Follow our step-by-step guides to launch successful campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800 rounded-2xl py-12 px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
          <p className="text-lg mb-8 text-white/90">
            Start with our free plan or try Premium features free for 7 days. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/marketing-type">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 focus-visible:ring-white">
                Start For Free
              </Button>
            </Link>
            <Link to="/plans">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 focus-visible:ring-white">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;