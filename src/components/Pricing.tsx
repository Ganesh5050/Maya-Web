import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'Perfect for freelancers and small projects',
    icon: Zap,
    gradient: 'from-blue-400 to-cyan-500',
    features: [
      '5 AI-generated websites',
      'Basic 3D animations',
      'Glass UI components',
      'Community support',
      'Export to HTML/CSS',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: 79,
    period: 'month',
    description: 'Ideal for agencies and growing businesses',
    icon: Star,
    gradient: 'from-purple-400 to-pink-500',
    features: [
      'Unlimited AI websites',
      'Advanced 3D physics',
      'Custom animations',
      'Priority support',
      'Team collaboration',
      'White-label export',
      'Advanced analytics',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 199,
    period: 'month',
    description: 'For large teams and custom solutions',
    icon: Crown,
    gradient: 'from-yellow-400 to-orange-500',
    features: [
      'Everything in Professional',
      'Custom AI training',
      'Dedicated support',
      'Custom integrations',
      'On-premise deployment',
      'Advanced security',
      'Custom components',
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Flexible Pricing</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Choose your
            <span className="holographic"> perfect plan</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startups to enterprises, we have a plan that grows with your needs.
            All plans include our revolutionary AI and 3D capabilities.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: plan.popular ? 1.02 : 1.05 }}
                className={`relative group ${
                  plan.popular 
                    ? 'lg:scale-105' 
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-semibold text-primary-foreground">
                      Most Popular
                    </div>
                  </motion.div>
                )}

                {/* Card */}
                <div className={`h-full glass rounded-3xl p-8 hover:shadow-glow-accent transition-all duration-500 ${
                  plan.popular 
                    ? 'border-primary/30 shadow-glow-primary' 
                    : ''
                }`}>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} p-4 mx-auto mb-4 shadow-lg`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-1">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant={plan.popular ? "hero" : "glass"}
                    size="lg"
                    className="w-full"
                  >
                    {plan.popular ? 'Start Free Trial' : 'Get Started'}
                  </Button>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{
                    background: `linear-gradient(135deg, transparent, ${
                      plan.gradient.includes('blue') ? 'hsl(200 100% 60% / 0.1)' :
                      plan.gradient.includes('purple') ? 'hsl(290 100% 65% / 0.1)' :
                      'hsl(45 100% 65% / 0.1)'
                    }, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              Compare All Features
            </Button>
            <Button variant="ghost" size="lg">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;