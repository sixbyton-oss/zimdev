import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, CheckCircle2, ArrowLeft, MessageSquare, Mail, Globe, Building2, Wallet, Landmark, Lock } from 'lucide-react';
import LogoSlider from '../components/LogoSlider';

// Payment methods config
const paymentMethods = [
  {
    id: 'ecocash',
    name: 'EcoCash',
    description: 'Mobile money — Zimbabwe\'s most popular payment method',
    icon: <Smartphone className="h-5 w-5 text-green-400" />,
    available: true,
    badge: null,
    colorClass: 'border-green-500 bg-green-950/20'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Direct bank-to-bank transfer from any local bank',
    icon: <Landmark className="h-5 w-5 text-blue-400" />,
    available: true,
    badge: null,
    colorClass: 'border-blue-500 bg-blue-950/20'
  },
  {
    id: 'innbucks',
    name: 'InnBucks',
    description: 'Quick digital wallet payment via InnBucks app',
    icon: <Wallet className="h-5 w-5 text-orange-400" />,
    available: true,
    badge: null,
    colorClass: 'border-orange-500 bg-orange-950/20'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'International online payments',
    icon: <CreditCard className="h-5 w-5 text-indigo-300" />,
    available: false,
    badge: '🚧 Coming Soon',
    colorClass: 'border-slate-700 opacity-45 cursor-not-allowed'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    description: 'Bitcoin, USDT and other crypto payments',
    icon: <Building2 className="h-5 w-5 text-yellow-400" />,
    available: false,
    badge: '🔧 Under Construction',
    colorClass: 'border-slate-700 opacity-45 cursor-not-allowed'
  }
];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPay, setAgreedToPay] = useState(false);
  
  const [total, setTotal] = useState(0);
  const [plan, setPlan] = useState<{name: string, price: number} | null>(null);
  const [addons, setAddons] = useState<any>(null);

  useEffect(() => {
    if (!location.state?.plan || !location.state.total) {
      navigate('/');
    } else {
      setTotal(location.state.total);
      setPlan(location.state.plan);
      setAddons(location.state.addons);
    }
  }, [location, navigate]);

  // Are both checkboxes checked + payment selected?
  const canProceed = useMemo(() => 
    agreedToTerms && agreedToPay && selectedPaymentMethod !== null && plan !== null
  , [agreedToTerms, agreedToPay, selectedPaymentMethod, plan]);

  // Get the display name of selected payment
  const getSelectedPaymentLabel = () => {
    const found = paymentMethods.find(m => m.id === selectedPaymentMethod);
    return found ? found.name : 'None Selected';
  };

  // Build comprehensive WhatsApp / Email message
  const buildCartMessage = useMemo(() => {
    if (!plan) return '';

    const lines: string[] = [];
    
    // ===== TOP HEADER =====
    lines.push(`\`\`\``);
    lines.push(`       https://zimdev.online`);
    lines.push(`\`\`\``);
    lines.push('');

    // Order title block
    lines.push('━'.repeat(34));
    lines.push('       🔷 NEW ORDER — ZIMDEV 🔷');
    lines.push('━'.repeat(34));
    lines.push('');

    // Base package
    lines.push(`*Package Selected:*`);
    lines.push(`  📦 ${plan.name} Plan (Yearly) — $${plan.price}`);
    lines.push('');

    // Domain if added
    if (addons?.domainAvailable && addons?.domainName && addons?.selectedExtension) {
      lines.push(`*Custom Domain:*`);
      lines.push(`  🌐 ${addons.domainName}${addons.selectedExtension} — $${addons.selectedDomainCategory}/yr`);
      lines.push('');
    }

    // APK if enabled
    if (addons?.apkEnabled) {
      const apkLabel = addons.apkPlatform === 'both' ? 'Android & iOS Mobile Apps' : 'Android (.apk) Mobile App';
      const apkPrice = addons.apkPlatform === 'both' ? '$35/yr' : '$15/yr';
      
      lines.push(`*App Development:*`);
      lines.push(`  ${apkLabel} — ${apkPrice}`);
      lines.push('');
    }

    // Email if enabled
    if (addons?.emailEnabled && addons?.domainAvailable && addons?.domainName && addons?.selectedExtension) {
      const emailUser = addons.emailName || 'custom';
      lines.push(`*Professional Email:*`);
      lines.push(`  ✉️ ${emailUser}@${addons.domainName}${addons.selectedExtension} — $5/month`);
      lines.push('');
    }

    // Grand Total divider + Amount
    lines.push('─'.repeat(35));
    lines.push(`💰 *TOTAL TO PAY: $${total}*`);
    lines.push('─'.repeat(35));
    lines.push('');

    // Payment Method line
    lines.push(`💳 *Payment Method: ${getSelectedPaymentLabel()}*`);
    lines.push('');

    // IMPORTANT BOLD INSTRUCTION
    lines.push('*Send this complete message as it is!*');
    lines.push('');

    // EcoCash payment instructions
    lines.push('── Payment Instructions ──');
    lines.push('');
    lines.push('To pay use ZimDev EcoCash account:');
    lines.push(`  Dial *151*1*1*0786443311#`);
    lines.push(`  for paying USD $${total}`);
    lines.push('');
    lines.push('After completing payment send back:');
    lines.push('  • EcoCash Sender Name:');
    lines.push('  • Approval Code:');
    lines.push('');
    
    // SLAs
    lines.push('━━ Timeline & Support ━━');
    lines.push('⏱ Payment confirmation takes *up to 10 minutes* to be reviewed by our team.');
    lines.push('⏱ Website development takes *up to 26 hours* to be completed.');
    lines.push('');
    lines.push('❓ We will be reaching out with questions regarding your design & content preferences during development!');
    lines.push('');
    lines.push('_Thank you for choosing ZimDev_');

    return lines.join('\n');
  }, [plan, addons, total, selectedPaymentMethod]);

  // Open WhatsApp with pre-written message
  const handleWhatsAppCheckout = () => {
    if (!canProceed || !buildCartMessage.trim()) return;
    
    const encodedMessage = encodeURIComponent(buildCartMessage);
    window.open(`https://wa.me/263786443311?text=${encodedMessage}`, '_blank');
  };

  // Alternative Email option
  const handleEmailCheckout = () => {
    if (!canProceed || !buildCartMessage.trim()) return;
    
    const subject = encodeURIComponent(`New ZimDev Order - ${plan?.name || ''}`);
    const encodedBody = encodeURIComponent(buildCartMessage);
    window.open(`mailto:help@zimdev.online?subject=${subject}&body=${encodedBody}`, '_blank');
  };

  if (!total || !plan) return <div className="min-h-[50vh] flex items-center justify-center text-white">Loading...</div>;

  const domainFull = (addons?.domainAvailable && addons?.domainName && addons?.selectedExtension) 
    ? `${addons.domainName}${addons.selectedExtension}` : null;

  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-cyan-400" />
            Final Checkout
          </h1>
          
          <Link to="/addons" className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Options
          </Link>
        </div>

        {/* =================================================== */}
        {/* FINAL CART PREVIEW                               */}
        {/* =================================================== */}
        <div className="bg-slate-900/80 border border-slate-800 p-7 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] mb-10 relative overflow-hidden">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-72 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

          <h2 className="text-xl font-bold text-white mb-6">Your Final Order</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            
            {/* Plan */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors pointer-events-none">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Base Package</p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-white">{plan.name}</span>
                <span className="text-xs text-slate-500">(Yearly)</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800">
                <span className="text-xl font-extrabold text-white">${plan.price}</span>
              </div>
            </div>

            {/* Domain Box */}
            {domainFull ? (
              <div className="bg-emerald-950/15 border border-emerald-800 rounded-2xl p-5 flex flex-col justify-between pointer-events-none">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Domain</p>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold text-white">{domainFull}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-emerald-900/30">
                  <span className="text-xl font-extrabold text-emerald-300">+${addons.selectedDomainCategory}</span>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-slate-800 bg-slate-950/60 rounded-2xl p-5 flex flex-col opacity-40 pointer-events-none">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Domain</p>
                <span className="text-sm italic text-slate-600">Not selected</span>
                <div className="mt-auto"></div>
              </div>
            )}

            {/* App Box */}
            {(addons?.apkEnabled) ? (
              <div className={`rounded-2xl p-5 flex flex-col justify-between pointer-events-none ${
                addons.apkPlatform === 'both' ? 'bg-purple-950/15 border-purple-800' : 'bg-blue-950/15 border-blue-800'
              }`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">App Development</p>
                <div className="flex items-center gap-2">
                  <Smartphone className={`h-4 w-4 ${addons.apkPlatform === 'both' ? 'text-purple-400' : 'text-blue-400'}`} />
                  <span className="font-bold text-white text-sm">
                    {addons.apkPlatform === 'both' ? 'Android + iOS' : 'Android (.apk)'}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-purple-900/30">
                  <span className={`text-xl font-extrabold ${addons.apkPlatform === 'both' ? 'text-purple-300' : 'text-blue-300'}`}>
                    +${addons.apkPlatform === 'both' ? 35 : 15}
                  </span>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-slate-800 bg-slate-950/60 rounded-2xl p-5 flex flex-col opacity-40 pointer-events-none">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">App Dev</p>
                <span className="text-sm italic text-slate-600">Not selected</span>
                <div className="mt-auto"></div>
              </div>
            )}

            {/* Email Box */}
            {(addons?.emailEnabled && addons?.domainAvailable && addons?.domainName && addons?.selectedExtension) ? (
              <div className="bg-blue-950/15 border border-blue-800 rounded-2xl p-5 flex flex-col justify-between pointer-events-none">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Pro Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="font-bold text-white text-sm truncate">{addons.emailName || 'custom'}@{addons.domainName}{addons.selectedExtension}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-900/30">
                  <span className="text-xl font-extrabold text-blue-300">+$5<span className="text-xs font-normal text-slate-400"> /mo</span></span>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-slate-800 bg-slate-950/60 rounded-2xl p-5 flex flex-col opacity-40 pointer-events-none">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">Email</p>
                <span className="text-sm italic text-slate-600">Not added</span>
                <div className="mt-auto"></div>
              </div>
            )}
          </div>

          {/* GRAND TOTAL BANNER */}
          <div className="relative bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-950 border-2 border-cyan-600/40 rounded-2xl px-8 py-7 shadow-[0_0_35px_rgba(6,182,212,0.18)] flex flex-col items-center justify-center overflow-hidden">
            
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 h-40 w-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl"></div>

            <p className="relative z-10 text-sm font-semibold tracking-widest uppercase text-cyan-200/70 mb-2">Amount Due</p>
            <div className="relative z-10 flex items-baseline gap-1">
              <span className="text-5xl md:text-6xl font-extrabold drop-shadow-[0_0_25px_rgba(34,211,238,0.55)] bg-gradient-to-br from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">${total}</span>
              <span className="text-xl font-medium text-cyan-300/60 mt-2">USD</span>
            </div>
            <p className="relative z-10 text-xs text-slate-400 mt-2">Choose a payment method below to proceed.</p>
          </div>
        </div>


        {/* =================================================== */}
        {/* MAIN CONTENT GRID                                 */}
        {/* =================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* =========================== LEFT: PAYMENT METHODS */}
          <div className="space-y-8">
            
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Wallet className="h-5 w-5 text-cyan-400" />
                Choose Your Payment Method
              </h3>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  
                  /* ---- AVAILABLE METHOD ---- */
                  method.available ? (
                    <label
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`flex items-center justify-between p-5 rounded-xl transition-all duration-200 ${
                        selectedPaymentMethod === method.id 
                          ? `${method.colorClass} border-2 shadow-[0_0_16px_rgba(6,182,212,0.14)]` 
                          : 'border-2 border-slate-700/70 bg-slate-950/50 hover:border-slate-600 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-4 pr-20 sm:pr-28">
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPaymentMethod === method.id}
                          onChange={() => {}}
                          className="w-5 h-5 accent-cyan-500"
                        />
                        <div>
                          <h4 className="font-bold text-base text-white flex items-center gap-2">
                            {method.icon} {method.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">{method.description}</p>
                        </div>
                      </div>
                      
                      {selectedPaymentMethod === method.id && (
                        <span className="absolute right-5 bg-emerald-500/90 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex-shrink-0">
                          ✓ Active
                        </span>
                      )}
                    </label>
                  )

                /* ---- UNAVAILABLE METHOD (DISABLED LOOK) ---- */
                : (
                  <div
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 ${method.colorClass} select-none`}
                  >
                    <div className="flex items-center gap-3 opacity-55">
                      <input type="radio" disabled className="w-5 h-5 cursor-not-allowed opacity-30"/>
                      <div>
                        <h4 className="font-medium text-base text-slate-400 flex items-center gap-2">
                          {method.icon} {method.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{method.description}</p>
                      </div>
                    </div>
                    
                    <span className="bg-yellow-900/60 text-yellow-200/80 text-[11px] font-bold px-2.5 py-1 rounded-full border border-yellow-600/30 whitespace-nowrap">
                      {method.badge}
                    </span>
                  </div>
                )
                ))}
              </div>
            </div>



            {/* ============================ AGREEMENT / NOTE SECTION */}
            <div className="bg-gradient-to-b from-amber-950/15 to-slate-900/60 border border-amber-800/25 p-6 rounded-2xl relative overflow-hidden">
              
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-500/50 to-transparent"></div>

              <h4 className="text-md font-bold text-amber-100 mb-5 flex items-center gap-2 ml-3">
                <Lock className="h-4.5 w-4.5" /> Note — Please confirm below:
              </h4>

              <div className="space-y-4 ml-3">
                
                {/* Checkbox #1: Terms & Policy */}
                <label
                  className="group flex items-start gap-3 cursor-pointer hover:bg-slate-800/30 p-3 -ml-3 rounded-xl transition-colors"
                >
                  <div 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setAgreedToTerms(prev => !prev); 
                    }}
                    className={`flex-shrink-0 mt-0.5 h-[22px] w-[22px] min-w-[22px] rounded border-2 flex items-center justify-center transition-all duration-150 ${
                      agreedToTerms
                        ? 'bg-emerald-500 border-emerald-500 scale-105 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                        : 'border-slate-500 group-hover:border-slate-400 bg-transparent'
                    }`}
                  >
                    {agreedToTerms && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </div>
                  
                  <div className="pt-0.5 leading-snug">
                    <span className={`text-sm font-medium transition-colors ${agreedToTerms ? 'text-white' : 'text-slate-300'}`}>
                      I have read and agree to ZimDev&apos;s{' '}
                      <a href="/policy" target="_blank" rel="noopener noreferrer" className={`underline hover:no-underline font-semibold ${agreedToTerms ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-400 hover:text-cyan-300'}`}>
                        Terms of Service & Refund Policy
                      </a>?
                    </span>
                  </div>
                </label>

                {/* Divider between boxes */}
                <div className="mx-auto max-w-[85%] h-px bg-slate-700/60"></div>

                {/* Checkbox #2: Agree to Pay X amount */}
                <label
                  className="group flex items-start gap-3 cursor-pointer hover:bg-slate-800/30 p-3 -ml-3 rounded-xl transition-colors"
                >
                  <div 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setAgreedToPay(prev => !prev); 
                    }}
                    className={`flex-shrink-0 mt-0.5 h-[22px] w-[22px] min-w-[22px] rounded border-2 flex items-center justify-center transition-all duration-150 ${
                      agreedToPay
                        ? 'bg-emerald-500 border-emerald-500 scale-105 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                        : 'border-slate-500 group-hover:border-slate-400 bg-transparent'
                    }`}
                  >
                    {agreedToPay && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </div>
                  
                  <div className="pt-0.5 leading-snug">
                    <span className={`text-sm font-medium transition-colors ${agreedToPay ? 'text-white' : 'text-slate-300'}`}>
                      I agree to pay the full amount of{' '}
                      <strong className={agreedToPay ? 'text-emerald-300' : 'text-cyan-300'}>${total} USD</strong>{' '}
                      for my order shown above.
                    </span>
                  </div>
                </label>

              </div>

              {/* Visual lock state hint when not yet ready */}
              {!canProceed && (
                <div className="mt-5 mx-3 p-3 bg-slate-950/60 border border-dashed border-amber-800/20 rounded-lg">
                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    🔒 Select a payment method <em>and</em> check both boxes above to unlock the checkout button.
                  </p>
                </div>
              )}
            </div>
          </div>




          {/* ============================== RIGHT: ACTIONS AREA */}
          <div className="lg:col-span-1 space-y-6">

            {/* BIG WHATSAPP BUTTON */}
            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              disabled={!canProceed}
              className={`group w-full py-5 sm:py-6 rounded-2xl transition-all duration-250 flex items-center justify-center gap-3 relative overflow-hidden ${
                canProceed 
                  ? 'bg-green-600 hover:bg-green-500 shadow-[0_0_22px_rgba(22,163,74,0.45)] hover:shadow-[0_0_38px_rgba(22,163,74,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]'
                  : 'bg-slate-800/60 border border-slate-700/40 cursor-not-allowed opacity-45'
              }`}
            >
              <MessageSquare className={`h-7 w-7 transition-transform ${canProceed ? 'animate-pulse' : 'opacity-40'}`} />
              
              <div className="text-left">
                <span className={`block font-extrabold text-lg sm:text-xl ${canProceed ? 'text-white group-hover:brightness-110' : 'text-slate-400'}`}>
                  Checkout on WhatsApp
                </span>
                <span className={`block text-xs font-medium mt-0.5 ${canProceed ? 'text-green-100/75' : 'text-slate-500'}`}>
                  {canProceed 
                    ? `Opens wa.me with order & total → $${total}` 
                    : 'Complete steps above first'
                  }
                </span>
              </div>
              
              {canProceed && (
                <span className="ml-auto inline-flex items-center justify-center bg-green-800/60 border border-green-400/20 text-green-50 font-bold text-sm px-3 py-1 rounded-full">wa.me</span>
              )}
            </button>


            {/* OR Separator */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-slate-700"></div>
              <span className="relative z-10 px-4 bg-transparent text-slate-500 text-xs font-semibold uppercase tracking-widest">or prefer email?</span>
            </div>


            {/* EMAIL BUTTON */}
            <button
              type="button"
              onClick={handleEmailCheckout}
              disabled={!canProceed}
              className={`group w-full py-4 rounded-xl border font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 ${
                canProceed 
                  ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 hover:border-cyan-500/40 text-white hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                  : 'bg-slate-950/30 border-slate-800/30 text-slate-600 cursor-not-allowed opacity-40'
              }`}
            >
              <Mail className="h-5 w-5" />
              <span>Send Confirmation by Email</span>
            </button>


            {/* Small Back link for mobile */}
            <Link 
              to="/addons"
              className="sm:hidden flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm pt-1"
            >
              <ArrowLeft className="h-4 w-4" /> Back to options
            </Link>


            {/* TRUST BOX AT BOTTOM */}
            <div className="mt-8 bg-slate-950/65 border border-slate-800/60 rounded-xl p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-400/60 mb-3"/>
              <p className="text-sm text-slate-400 font-medium">Your data is safe.</p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Order sent securely over WhatsApp or email. No card info stored.
              </p>
            </div>
          </div>
        </div>

      {/* ====== FEATURED / TRUSTED BY — Logo Slider at bottom of checkout ====== */}
      <div className="mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <LogoSlider 
          title="Trusted By"
          speed={32}
          size="compact" 
        />
      </div>

      </div>
    </div>
  );
}
