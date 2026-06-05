import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ArrowRight, PlusCircle, CheckCircle2, HelpCircle } from 'lucide-react';

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<{name: string, price: number} | null>(null);
  const [addons, setAddons] = useState({
    domain: false,
    email: false,
    app: false
  });

  useEffect(() => {
    if (location.state?.plan) {
      setPlan(location.state.plan);
    } else {
      // If no plan selected, just default to Starter so they can see something, 
      // or we could redirect to home. Let's redirect to home if no plan.
      // But for testing purposes if they just navigate to /cart, let's give them a default
      setPlan({ name: 'Starter', price: 20 });
    }
  }, [location]);

  const toggleAddon = (key: keyof typeof addons) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotal = () => {
    let total = plan?.price || 0;
    if (addons.domain) total += 15;
    if (addons.email) total += 10;
    if (addons.app) total += 150;
    return total;
  };

  const handleContinue = () => {
    navigate('/checkout', { 
      state: { 
        plan, 
        addons, 
        total: calculateTotal() 
      } 
    });
  };

  if (!plan) return <div className="min-h-[50vh] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-cyan-400" />
            Cart Review
          </h1>
          <Link to="/guide" className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            <HelpCircle className="h-4 w-4" />
            Need help?
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Plan */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Selected Package</h2>
                  <p className="text-cyan-400 font-medium">{plan.name} Plan (Yearly)</p>
                </div>
                <div className="text-2xl font-bold text-white">${plan.price}</div>
              </div>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mt-2">
                <ArrowLeft className="h-4 w-4" />
                Change Package
              </Link>
            </div>

            {/* Add-ons */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <h2 className="text-xl font-bold text-white mb-6">Optional Add-ons</h2>
              
              <div className="space-y-4">
                {/* Domain Add-on */}
                <div 
                  onClick={() => toggleAddon('domain')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    addons.domain ? 'bg-cyan-950/30 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {addons.domain ? <CheckCircle2 className="h-6 w-6 text-cyan-400" /> : <PlusCircle className="h-6 w-6 text-slate-500" />}
                    <div>
                      <h3 className="text-white font-medium">Custom Domain Name</h3>
                      <p className="text-sm text-slate-400">e.g., yourbusiness.co.zw (.com / .co.zw)</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-white">+$15<span className="text-xs text-slate-400 font-normal">/yr</span></div>
                </div>

                {/* Email Add-on */}
                <div 
                  onClick={() => toggleAddon('email')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    addons.email ? 'bg-cyan-950/30 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {addons.email ? <CheckCircle2 className="h-6 w-6 text-cyan-400" /> : <PlusCircle className="h-6 w-6 text-slate-500" />}
                    <div>
                      <h3 className="text-white font-medium">Professional Email</h3>
                      <p className="text-sm text-slate-400">e.g., info@yourbusiness.co.zw</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-white">+$10<span className="text-xs text-slate-400 font-normal">/yr</span></div>
                </div>

                {/* App Add-on */}
                <div 
                  onClick={() => toggleAddon('app')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    addons.app ? 'bg-cyan-950/30 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {addons.app ? <CheckCircle2 className="h-6 w-6 text-cyan-400" /> : <PlusCircle className="h-6 w-6 text-slate-500" />}
                    <div>
                      <h3 className="text-white font-medium">Basic Android App</h3>
                      <p className="text-sm text-slate-400">Convert your website into a mobile app</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-white">+$150<span className="text-xs text-slate-400 font-normal">/one-time</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] sticky top-28">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>{plan.name} Plan</span>
                  <span>${plan.price}</span>
                </div>
                {addons.domain && (
                  <div className="flex justify-between text-slate-300 text-sm">
                    <span>Custom Domain</span>
                    <span>$15</span>
                  </div>
                )}
                {addons.email && (
                  <div className="flex justify-between text-slate-300 text-sm">
                    <span>Pro Email</span>
                    <span>$10</span>
                  </div>
                )}
                {addons.app && (
                  <div className="flex justify-between text-slate-300 text-sm">
                    <span>Basic App</span>
                    <span>$150</span>
                  </div>
                )}
              </div>
              
              <div className="border-t border-slate-700 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    ${calculateTotal()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">No hidden fees.</p>
              </div>

              <button 
                onClick={handleContinue}
                className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Continue to Checkout
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="mt-4 flex justify-center">
                <Link to="/guide" className="sm:hidden flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                  <HelpCircle className="h-4 w-4" />
                  Need help?
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
