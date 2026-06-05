import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 20,
    period: 'year',
    description: 'Perfect for small local businesses starting out online.',
    features: [
      '1 Page Professional Website',
      'Mobile Responsive Design',
      'Basic SEO Setup',
      '1 Year Free Hosting',
      'WhatsApp Integration',
      'Free SSL Certificate'
    ],
    recommended: false,
    badge: null
  },
  {
    name: 'Classic',
    price: 35,
    period: 'year',
    description: 'Great for growing businesses needing more presence.',
    features: [
      'Up to 5 Pages',
      'Mobile Responsive Design',
      'Advanced SEO Setup',
      '1 Year Free Hosting',
      'Contact Form Integration',
      'Social Media Links',
      'Google Analytics Setup',
      'Free SSL Certificate'
    ],
    recommended: true,
    badge: 'Most Popular'
  },
  {
    name: 'Pro',
    price: 50,
    period: 'year',
    description: 'For established businesses wanting full features.',
    features: [
      'Up to 10 Pages',
      'Custom Unique Design',
      'Full SEO Optimization',
      '1 Year Free Hosting',
      'Priority Support',
      'Blog/News Section Included',
      'Advanced Analytics Dashboard',
      'Custom Animations & Effects',
      'Free SSL + CDN'
    ],
    recommended: false,
    badge: 'Best Value'
  }
];

export default function Packages() {
  const navigate = useNavigate();

  const selectPlan = (plan: typeof plans[0]) => {
    navigate('/addons', { state: { plan, total: plan.price } });
  };

  return (
    <div className="pt-6 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12 pt-4">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 drop-shadow-[0_0_15px_rgba(255,255,255,0.08)]">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_25px_rgba(34,211,238,0.45)]">Development Package</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed text-center">
            All packages include professional design, mobile optimization, and 1 year of hosting. No hidden fees.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { icon: '🔒', label: 'SSL Secure' },
              { icon: '📱', label: 'Mobile Ready' },
              { icon: '⚡', label: 'Fast Delivery' },
              { icon: '🇿🇼', label: 'Local Support' }
            ].map((badge) => (
              <span key={badge.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-900/40 text-sm text-slate-200">
                <span>{badge.icon}</span> {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative flex flex-col p-7 sm:p-8 rounded-3xl transition-all duration-300 ${
                plan.recommended 
                  ? 'bg-slate-900 border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)] md:-translate-y-3 scale-[1.02]' 
                  : 'bg-slate-950 border border-slate-800 hover:border-cyan-500/60 hover:shadow-[0_0_22px_rgba(6,182,212,0.12)]'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 font-bold text-xs tracking-wide uppercase rounded-full shadow-md ${
                  plan.badge === 'Most Popular' 
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                    : 'bg-purple-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.5)]'
                }`}>
                  {plan.badge}
                </div>
              )}
              
              {/* Plan Header */}
              <div className="mb-8 pb-6 border-b border-slate-800">
                <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                <p className="text-slate-400 h-14">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold drop-shadow-[0_0_18px_rgba(255,255,255,0.05)] bg-gradient-to-br from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">${plan.price}</span>
                  <span className="text-slate-400 font-medium text-lg">/{plan.period}</span>
                </div>
                
                <p className={`text-xs mt-2 ${plan.recommended ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {plan.recommended ? '✓ Billed yearly' : 'Billed yearly — no contract'}
                </p>
              </div>
              
              {/* Features */}
              <ul className="space-y-3.5 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li 
                    key={i} 
                    className={`flex items-start gap-3 ${
                      plan.recommended ? 'text-slate-200' : 'text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${
                      plan.recommended ? 'text-green-400' : 'text-cyan-400'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <button
                onClick={() => selectPlan(plan)}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 group ${
                  plan.recommended
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_18px_rgba(6,182,212,0.4)] hover:shadow-[0_0_28px_rgba(6,182,212,0.65)] hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-slate-800 hover:bg-slate-700 text-white hover:shadow-[0_0_14px_rgba(255,255,255,0.06)] hover:-translate-y-0.5'
                }`}
              >
                Select {plan.name}
                <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* What's Next Teaser */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900 border border-slate-800 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(6,182,212,0.08),transparent_70%)]"></div>
            
            <h3 className="text-xl font-bold text-white mb-4 relative z-10">After you pick a package...</h3>
            
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <span className="flex items-center gap-2 px-4 py-2 bg-cyan-950/40 border border-cyan-700/30 rounded-full text-sm text-cyan-100">
                ✅ Package Selected
              </span>
              <ChevronRight className="h-4 w-4 text-slate-600 hidden sm:block" />
              <span className="flex items-center gap-2 px-4 py-2 bg-blue-950/30 border border-blue-700/20 rounded-full text-sm text-blue-200">
                → Add Domain / Email / App
              </span>
              <ChevronRight className="h-4 w-4 text-slate-600 hidden sm:block" />
              <span className="flex items-center gap-2 px-4 py-2 bg-purple-950/20 border border-purple-700/20 rounded-full text-sm text-purple-200">
                → Checkout on WhatsApp
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-6 relative z-10">
              Quick, simple, and completely online with EcoCash payment 💚
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}