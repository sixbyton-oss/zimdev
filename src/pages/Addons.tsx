import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, CheckCircle2, ArrowLeft, ArrowRight, Smartphone, Mail, Globe } from 'lucide-react';

// Domain data organized by price tier
const domainsByPrice = {
  3: [
    '.xyz', '.online', '.store', '.live', 
    '.site', '.best', '.space', '.one', '.it.com'
  ],
  5: ['.cc', '.art', '.fyi', '.cloud']
};

  type AddonState = {
    selectedDomainCategory: number | null; // null | 3 | 5 (price)
    selectedExtension: string | null;
    domainName: string;
    domainAvailable: boolean | null; // null = not searched yet
    searching: boolean;
    apkEnabled: boolean;
    apkPlatform: 'android' | 'both'; // android only, or both + iOS
    emailEnabled: boolean;
    emailName: string;
  };

export default function Addons() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [plan, setPlan] = useState<{name: string, price: number} | null>(null);
  const [addons, setAddons] = useState<AddonState>({
    selectedDomainCategory: null,
    selectedExtension: null,
    domainName: '',
    domainAvailable: null,
    searching: false,
    apkEnabled: false,
    emailEnabled: false,
    emailName: '',
    apkPlatform: 'android'
  });

  useEffect(() => {
    if (!location.state?.plan || !location.state.total) {
      navigate('/');
    } else {
      setPlan(location.state.plan);
      // Preserve any existing addon state if coming back
      if (location.state.addons) {
        setAddons(prev => ({ ...prev, ...location.state.addons }));
      }
    }
  }, [location, navigate]);

  // Domain Category Selection
  const selectDomainCategory = (price: number) => {
    setAddons(prev => ({
      ...prev,
      selectedDomainCategory: prev.selectedDomainCategory === price ? null : price,
      selectedExtension: null,
      domainName: '',
      domainAvailable: null
    }));
  };

  // Extension Selection
  const selectExtension = (ext: string) => {
    setAddons(prev => ({
      ...prev,
      selectedExtension: ext,
      domainName: '',
      domainAvailable: null
    }));
  };

  // Simulated Domain Availability Checker
  const checkDomainAvailability = () => {
    if (!addons.domainName.trim()) return;
    
    setAddons(prev => ({ ...prev, searching: true }));
    
    // Simulate AI/domain scan
    // NOTE: This is a visual-only simulation. A real implementation would need a backend API 
    // to query WHOIS or a domain registry database. Without such an API, we cannot truly 
    // verify domain availability in a static website.
    setTimeout(() => {
      setAddons(prev => ({
        ...prev,
        searching: false,
        domainAvailable: true  // Always available (visual simulation only)
      }));
    }, 1500);
  };

  const setApkPlatform = (platform: 'android' | 'both') => {
    setAddons(prev => ({ ...prev, apkPlatform: platform }));
  };

  // Toggle APK on/off with the custom switch
  const handleApkToggle = () => {
    setAddons(prev => ({ 
      ...prev, 
      apkEnabled: !prev.apkEnabled,
      apkPlatform: !prev.apkEnabled ? 'android' : prev.apkPlatform
    }));
  };
  
  // Email can only be enabled if domain is selected & available
  const toggleEmail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // prevent bubbling from outer div click
    setAddons(prev => ({ 
      ...prev, 
      emailEnabled: (!prev.domainAvailable || !prev.selectedExtension) ? false : !prev.emailEnabled,
      emailName: prev.emailName || 'info'
    }));
  };

  // Calculate Total
  const calculateTotal = () => {
    let total = plan?.price || 0;
    
    // Domain
    if (addons.domainAvailable && addons.selectedExtension && addons.selectedDomainCategory) {
      total += addons.selectedDomainCategory;
    }
    // APK: Android only = $15/yr, Both (Android + iOS) = $35/yr
    if (addons.apkEnabled) {
      total += 15; // Base: Android
      if (addons.apkPlatform === 'both') total += 20; // Extra: iOS
    }
    // Email
    if (addons.emailEnabled && addons.domainAvailable && addons.selectedExtension) total += 5; // $5/month
    
    return total;
  };

  const handleContinueToCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!plan) {
      // Fallback: redirect to home if somehow no plan loaded
      navigate('/');
      return;
    }

    // Build clean serializable data for route state
    const finalCartData = {
      plan,
      addons: { 
        selectedDomainCategory: addons.selectedDomainCategory,
        selectedExtension: addons.selectedExtension,
        domainName: addons.domainName,
        domainAvailable: addons.domainAvailable,
        apkEnabled: addons.apkEnabled,
        apkPlatform: addons.apkPlatform,
        emailEnabled: addons.emailEnabled,
        emailName: addons.emailName
      },
      total: calculateTotal()
    };
    
    navigate('/checkout', { state: finalCartData, replace: false });
  };

  if (!plan) return <div className="min-h-[50vh] flex items-center justify-center text-white">Loading...</div>;

  const totalPrice = calculateTotal();
  const hasChanges = (
    addons.domainAvailable || 
    addons.apkEnabled || 
    addons.emailEnabled ||
    addons.selectedDomainCategory !== null
  );

  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <Globe className="h-8 w-8 text-cyan-400" />
            Additional Options
          </h1>
          <Link to="/" className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            Change Package
          </Link>
        </div>

        {/* Selected Plan Banner */}
        <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-900/50 p-6 rounded-2xl mb-8 flex justify-between items-center shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div>
            <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Selected Package</p>
            <h2 className="text-xl font-bold text-white">{plan.name} Plan</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase">Base Price</p>
            <span className="text-2xl font-bold text-white">${plan.price}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative pointer-events-auto" style={{ zIndex: 20 }}>
          
          {/* Left Column: All Addon Options */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* ====== DOMAIN SELECTION SECTION ====== */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-6 w-6 text-cyan-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Custom Domain Name</h2>
                  <p className="text-sm text-slate-400">Optional — Make your site look professional with your own address</p>
                </div>
              </div>

              {!addons.selectedDomainCategory ? (
                /* Price Tier Selection */
                <div className="space-y-4">
                  {/* $3 Tier */}
                  <button 
                    onClick={() => selectDomainCategory(3)}
                    className="w-full flex items-center justify-between p-5 rounded-xl border border-slate-700 hover:border-cyan-500 hover:bg-cyan-950/20 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <h3 className="font-bold text-white group-hover:text-cyan-400">$<span className="text-lg">3</span>/year TLDs</h3>
                        <p className="text-sm text-slate-400 mt-1">9 extensions available</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {domainsByPrice[3].map(ext => (
                          <span key={ext} className="bg-slate-800 text-slate-300 text-xs font-medium px-2 py-0.5 rounded">{ext}</span>
                        ))}
                      </div>
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    </div>
                  </button>

                  {/* $5 Tier */}
                  <button 
                    onClick={() => selectDomainCategory(5)}
                    className="w-full flex items-center justify-between p-5 rounded-xl border border-slate-700 hover:border-purple-500 hover:bg-purple-950/20 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <h3 className="font-bold text-white group-hover:text-purple-400">$<span className="text-lg">5</span>/year Premium TLDs</h3>
                        <p className="text-sm text-slate-400 mt-1">4 premium extensions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {domainsByPrice[5].map(ext => (
                          <span key={ext} className="bg-slate-800 text-slate-300 text-xs font-medium px-2 py-0.5 rounded">{ext}</span>
                        ))}
                      </div>
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                      setAddons(prev => ({ ...prev, selectedDomainCategory: null, selectedExtension: null, domainName: '', domainAvailable: null }));
                    }}
                    className="w-full py-3 rounded-lg text-slate-500 hover:text-slate-300 transition-colors text-sm"
                  >
                    Skip — Continue without custom domain
                  </button>
                </div>
              ) : addons.selectedExtension ? (
                /* Name Input & Availability Checker */
                <div className="space-y-4">
                  <button 
                    onClick={() => setAddons(prev => ({ ...prev, selectedExtension: null, domainName: '', domainAvailable: null }))}
                    className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mb-2"
                  >
                    ← Change extension
                  </button>

                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-700">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Your domain prefix:
                    </label>
                    
                    <div className="flex items-stretch gap-0 bg-slate-900 border border-slate-600 focus-within:border-cyan-500 rounded-lg overflow-hidden transition-colors">
                      <input 
                        type="text" 
                        value={addons.domainName}
                        onChange={(e) => setAddons(prev => ({ ...prev, domainName: e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase(), domainAvailable: null }))}
                        placeholder="mybusiness"
                        className="flex-grow bg-transparent px-4 py-3 text-white placeholder:text-slate-500 outline-none"
                      />
                      <div className="bg-slate-800 px-4 py-3 flex items-center text-slate-300 font-medium whitespace-nowrap min-w-max">
                        {addons.selectedExtension}
                      </div>
                    </div>

                    <button
                      onClick={checkDomainAvailability}
                      disabled={!addons.domainName.trim() || addons.searching}
                      className={`mt-4 w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                        addons.domainAvailable === true ? 'bg-green-600' :
                        addons.domainAvailable === false ? 'bg-red-600' :
                        !addons.domainName.trim() ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 
                        'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      }`}
                    >
                      {addons.searching ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-slate-300 border-t-transparent rounded-full"></div>
                          Scanning availability...
                        </>
                      ) : addons.domainAvailable === true ? (
                        <>
                          <CheckCircle2 className="h-5 w-5" /> Available!
                        </>
                      ) : addons.domainAvailable === false ? (
                        <>❌ Already Taken — Try another name</>
                      ) : (
                        <>
                          <Search className="h-5 w-5" /> Check Availability
                        </>
                      )}
                    </button>

                    {addons.domainAvailable === true && (
                      <div className="mt-4 p-4 bg-green-950/30 border border-green-700 rounded-lg flex items-start justify-between">
                        <div>
                          <p className="text-green-400 font-semibold flex items-center gap-2">
                            ✓ Domain is Available!
                          </p>
                          <p className="text-slate-300 mt-1"><strong>{addons.domainName}{addons.selectedExtension}</strong> can be added for ${addons.selectedDomainCategory}/year</p>
                        </div>
                        <div className="bg-green-600/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full animate-pulse">
                          +${addons.selectedDomainCategory}/yr
                        </div>
                      </div>
                    )}

                    {/* Disclaimer about domain check */}
                    {(addons.domainAvailable === true || addons.domainAvailable === false) && (
                      <p className="text-[11px] text-slate-500 mt-3 italic text-center leading-relaxed">
                        ⓘ This is a visual demonstration only. Final domain registration & availability will be confirmed by our team during setup.
                      </p>
                    )}

                    {addons.domainAvailable === false && (
                      <div className="mt-4 p-4 bg-red-950/20 border border-red-900 rounded-lg">
                        <p className="text-red-400 font-medium">⚠ This domain name is already taken. Try a different name or choose a different extension.</p>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => setAddons(prev => ({
                      ...prev, 
                      selectedDomainCategory: null, 
                      selectedExtension: null, 
                      domainName: '', 
                      domainAvailable: null 
                    }))}
                    className="w-full py-3 rounded-lg text-slate-500 hover:text-slate-300 transition-colors text-sm border-t border-slate-800 pt-3 mt-3"
                  >
                    Remove domain choice
                  </button>
                </div>
              ) : (
                /* Extension Picker */
                <div className="space-y-3">
                  <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                    Selected ${addons.selectedDomainCategory}/yr tier — Choose your extension:
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {domainsByPrice[addons.selectedDomainCategory as keyof typeof domainsByPrice]?.map((ext) => (
                      <button
                        key={ext}
                        onClick={() => selectExtension(ext)}
                        className={`py-3 px-4 rounded-xl border font-mono text-lg font-bold transition-all ${
                          addons.selectedExtension === ext
                            ? `border-cyan-500 ${addons.selectedDomainCategory === 3 ? 'bg-cyan-950/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]' : 'bg-purple-950/30 text-purple-400'}`
                            : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {ext}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setAddons(prev => ({
                        ...prev, 
                        selectedDomainCategory: null, 
                        selectedExtension: null, 
                        domainName: '', 
                        domainAvailable: null 
                      }));
                    }}
                    className="w-full py-3 rounded-lg text-slate-500 hover:text-slate-300 transition-colors text-sm mt-3 border-t border-slate-800 pt-3"
                  >
                    ← Back to all tiers
                  </button>
                </div>
              )}
            </div>

            {/* ====== APK / APP DEVELOPMENT ADD-ON SECTION ====== */}
            <div className="bg-slate-900/80 border p-6 sm:p-8 rounded-2xl transition-all" style={{ borderColor: addons.apkEnabled ? '#06b6d4' : undefined, boxShadow: addons.apkEnabled ? '0 0 18px rgba(6,182,212,0.12)' : undefined }}>
              
              {/* Header Row — Info on left, Toggle switch on right */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-6 pb-6 border-b border-slate-800">
                
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`p-3 rounded-xl transition-all duration-300 ${addons.apkEnabled ? 'bg-cyan-950 shadow-[0_0_12px_rgba(6,182,212,0.25)]' : 'bg-slate-800'}`}>
                    <Smartphone className={`h-7 w-7 transition-colors duration-300 ${addons.apkEnabled ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]' : 'text-slate-400'}`} />
                  </div>
                  
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                      App Development
                      {addons.apkEnabled && 
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-black shadow-[0_0_6px_rgba(16,185,129,0.5)] animate-pulse">
                          ON
                        </span>
                      }
                    </h3>
                    <p className="text-sm text-slate-400 mt-0.5 truncate">Convert your website into a native mobile application</p>
                  </div>
                </div>

                {/* ════════ THE COOL TOGGLE SWITCH ════════ */}
                <label className="switch shrink-0 mr-1.5 mt-1 sm:mt-0" onClick={(e) => e.stopPropagation()}>
                  <input 
                    className="cb" 
                    type="checkbox" 
                    checked={addons.apkEnabled} 
                    onChange={handleApkToggle}
                  />
                  <span className="toggle">
                    <span className="left">off</span>
                    <span className="right">on</span>
                  </span>
                </label>

              </div>


              {/* ═══════ EXPANDED CONTENT WHEN TOGGLED ON ═══════ */}
              {addons.apkEnabled && (
                <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                  
                  {/* Platform Selector */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-700">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Select Platform(s):</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      
                      {/* Android Option */}
                      <button type="button" onClick={() => setApkPlatform('android')} className={`py-3 px-4 rounded-lg text-left transition-all ${addons.apkPlatform === 'android' ? 'border-2 border-green-500 bg-green-950/20 text-white font-bold shadow-[0_0_10px rgba(34,197,94,0.2)]' : 'border border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'}`}>
                        <span className="flex items-center gap-2 mb-1">🤖 Android (.apk)</span>
                        <span className="block text-xs opacity-70">Default — $15/yr</span>
                        {addons.apkPlatform === 'android' && <span className="inline-block mt-1.5 text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-bold">SELECTED</span>}
                      </button>

                      {/* Both Android + iOS */}
                      <button type="button" onClick={() => setApkPlatform('both')} className={`py-3 px-4 rounded-lg text-left transition-all ${addons.apkPlatform === 'both' ? 'border-2 border-purple-500 bg-purple-950/20 text-white font-bold shadow-[0_0_10px rgba(168,85,247,0.2)]' : 'border border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500'}`}>
                        <span className="flex items-center gap-2 mb-1">🤖 + 🍎 Android & iOS</span>
                        <span className="block text-xs opacity-70">+$20 extra = $35/yr</span>
                        {addons.apkPlatform === 'both' && <span className="inline-block mt-1.5 text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">SELECTED</span>}
                      </button>

                    </div>

                    {addons.apkPlatform === 'both' && (
                      <div className="mt-3 flex items-start gap-2 bg-purple-950/10 p-3 rounded-lg border border-purple-900/25">
                        <span className="text-purple-400 mt-0.5">💡</span>
                        <p className="text-xs text-purple-200 leading-relaxed">You'll receive <strong>both</strong> an Android APK and an iOS-compatible build (.ipa or App Store submission package). Extra $20 covers Apple App Store distribution requirements.</p>
                      </div>
                    )}
                  </div>

                  {/* Feature List */}
                  <div className="p-4 bg-cyan-950/10 border border-cyan-900/30 rounded-lg">
                    <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">What's Included:</p>
                    <ul className="space-y-1.5 text-sm text-slate-300">
                      <li>{addons.apkPlatform === 'both' ? '✅' : '📱'} Native mobile app wrapper with your website content</li>
                      <li>{addons.apkPlatform === 'both' ? '✅' : ''} Push notification system{addons.apkPlatform === 'both' ? ' (Cross-platform)' : ''}</li>
                      <li>{addons.apkPlatform === 'both' ? '✅' : '📦'} Downloadable install file (.apk){addons.apkPlatform === 'both' ? ' + .ipa' : ''}</li>
                      <li>{addons.apkPlatform === 'both' ? '✅' : '🎨'} App icon & splash screen branding</li>
                      {addons.apkPlatform === 'both' && <li>✅ App Store listing assets (iOS)</li>}
                      <li>✅ 1 year of updates included</li>
                    </ul>
                  </div>

                  {/* Price display inside expanded area */}
                  <div className="flex items-center justify-between px-4 py-3 bg-emerald-950/10 border border-emerald-900/25 rounded-lg">
                    <span className="text-sm font-medium text-emerald-300">
                      Total for this add-on:
                    </span>
                    <span className="text-xl font-extrabold text-emerald-300">
                      +${addons.apkPlatform === 'both' ? 35 : 15}
                      <span className="text-xs font-normal text-slate-500 ml-1">/yr</span>
                    </span>
                  </div>
                </div>
              )}

              {/* ══════ WHEN OFF: subtle hint ══════ */}
              {!addons.apkEnabled && (
                <div className="text-center py-2">
                  <p className="text-xs text-slate-600 italic">
                    Tap the toggle above to enable this add-on
                  </p>
                </div>
              )}

              {/* ================================ THE STYLE FOR THE TOGGLE SWITCH ================================ */}
              <style>{`
                /* 
                 * Uiverse-inspired On/Off Toggle Switch
                 * Matches ZimDev dark neon blue theme
                 */
                .switch {
                  --width: 84px;
                  --height: 42px;
                  position: relative;
                  display: inline-flex;
                  align-items: center;
                  cursor: pointer;
                }

                .switch .cb {
                  appearance: none;
                  -webkit-appearance: none;
                  width: var(--width);
                  height: var(--height);
                  background: transparent;
                  margin: 0;
                  outline: none;
                  position: relative;
                  z-index: 2;
                  cursor: pointer;
                }

                .toggle {
                  position: absolute;
                  inset: 0;
                  overflow: hidden;
                  border-radius: 999px;
                  box-shadow:
                    inset 0 0 0 2px rgba(148,163,184,0.25),
                    0 2px 8px rgba(0,0,0,0.15);
                  background: #1e293b; /* slate-800 */
                  transition: all .45s cubic-bezier(.22,1,.36,1);
                }
                
                .toggle::before {
                  content:"";
                  position: absolute;
                  top: calc(50% - 19px);
                  left: 2px;
                  width: 36px;
                  height: 36px;
                  border-radius: 999px;
                  background: #64748b; /* slate-500 */
                  transition: all .45s cubic-bezier(.22,1,.36,1);
                  transform: translateX(0) scale(0.95);
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .toggle .left,
                .toggle .right {
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  font-size: 11px;
                  font-weight: 900;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  color: #475569; /* slate-600 */
                  transition: all .35s ease;
                  z-index: 1;
                  user-select: none;
                  -webkit-user-select: none;
                }

                /* "off" label */
                .toggle .left {
                  left: 14px;
                  opacity: 1;
                }

                /* "on" label */
                .toggle .right {
                  right: 13px;
                  opacity: 0.35;
                }

                /* ===== CHECKED STATE (ON) ===== */
                .cb:checked ~ .toggle {
                  background: linear-gradient(135deg, #0891b2, #06b6d4); /* cyan gradient */
                  box-shadow:
                    0 0 16px rgba(6,182,212,0.35),
                    0 0 32px rgba(6,182,212,0.15),
                    inset 0 0 0 0 transparent;
                }

                .cb:checked ~ .toggle::before {
                  transform: translateX(calc(var(--width) - 40px)) scale(1);
                  background: white;
                  box-shadow: 
                    0 0 10px rgba(255,255,255,0.6),
                    0 2px 4px rgba(0,0,0,0.15),
                    0 0 20px rgba(6,182,212,0.4);
                }

                .cb:checked ~ .toggle .left  { opacity: 0.25; }
                .cb:checked ~ .toggle .right { 
                  opacity: 1; 
                  color: white; 
                  filter: drop-shadow(0 0 4px rgba(255,255,255,0.5));
                }

                /* HOVER EFFECTS */
                .cb:not(:checked):hover ~ .toggle {
                  box-shadow:
                    inset 0 0 0 2px rgba(100,116,139,0.4),
                    0 4px 12px rgba(0,0,0,0.2);
                }
                .cb:not(:checked):hover ~ .toggle::before {
                  background: #94a3b8; /* slate-400 */
                }

                /* FOCUS RING FOR ACCESSIBILITY */
                .cb:focus-visible ~ .toggle {
                  box-shadow: 0 0 0 3px rgba(6,182,212,0.4);
                }
              `}</style>
            </div>

            {/* ====== PROFESSIONAL EMAIL ADD-ON SECTION ====== */}
            {(addons.domainAvailable && addons.domainName && addons.selectedExtension) ? (
              /* Email CAN be added — Domain is confirmed */
              <div 
                onClick={toggleEmail}
                className={`bg-slate-900/80 border p-6 rounded-2xl cursor-pointer transition-all ${
                  addons.emailEnabled ? 'border-cyan-500 bg-cyan-950/15 shadow-[0_0_18px_rgba(6,182,212,0.12)]' : 'border-slate-800 hover:border-cyan-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${addons.emailEnabled ? 'bg-cyan-950' : 'bg-slate-800'}`}>
                      <Mail className={`h-7 w-7 transition-colors ${addons.emailEnabled ? 'text-cyan-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Professional Email
                        {addons.emailEnabled && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                      </h3>
                      <p className="text-sm text-slate-400 mt-0.5">
                        Uses your custom domain: <strong className="text-cyan-300">{addons.domainName}{addons.selectedExtension}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-extrabold transition-colors ${addons.emailEnabled ? 'text-cyan-400' : 'text-slate-300'}`}>+$5</span>
                    <span className="text-sm text-slate-500 block">per month</span>
                  </div>
                </div>

                {addons.emailEnabled && (
                  <div className="mt-5 space-y-3">
                    {/* Live Preview of what the email looks like */}
                    <div className="bg-emerald-950/20 border border-emerald-700/30 p-4 rounded-xl">
                      <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Your email will be:</p>
                      <div className="flex items-center gap-2 text-lg font-mono text-white">
                        <input
                          type="text"
                          value={addons.emailName}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setAddons(prev => ({ ...prev, emailName: e.target.value.replace(/[^a-zA-Z0-9._%+-]/g, '') }))}
                          placeholder="custom"
                          className="bg-transparent border-b border-emerald-500 focus:outline-none min-w-[100px] text-emerald-300 placeholder:text-emerald-500"
                        />
                        <span className="text-slate-300">@</span>
                        <span className="font-bold text-white">{addons.domainName}<span className="text-cyan-400">{addons.selectedExtension}</span></span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 flex items-start gap-1.5">
                      💡 Click the blue prefix above to customize (e.g., info, hello, support). The @domain is locked to your chosen package.
                    </p>
                    
                    {/* Toggle off button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddons(prev => ({ ...prev, emailEnabled: false }));
                      }}
                      className="w-full py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-950/10 border border-red-900/25 transition-colors"
                    >
                      ✕ Remove email add-on
                    </button>
                  </div>
                )}

                {!addons.emailEnabled && (
                  <p className="mt-3 text-sm text-slate-400 flex items-center gap-1.5">
                    Tap here to enable professional email at your <span className="text-cyan-300">{addons.domainName}{addons.selectedExtension}</span> address.
                  </p>
                )}
              </div>
            ) : (
              /* Email LOCKED — No domain selected yet */
              <div className="bg-slate-950/60 border border-dashed border-slate-700 p-6 rounded-2xl relative overflow-hidden opacity-70">
                {/* Lock overlay hint */}
                <div className="absolute top-0 right-0 m-3 px-2 py-0.5 bg-yellow-900/60 text-yellow-400 text-[11px] font-bold rounded-full tracking-wide z-10">
                  🔒 Requires Domain
                </div>
                
                <div className="flex items-center gap-4 opacity-60 select-none">
                  <div className="p-3 rounded-xl bg-slate-800">
                    <Mail className="h-7 w-7 text-slate-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-400 line-through decoration-slate-600">Professional Email</h3>
                    <p className="text-sm text-slate-500 mt-0.5">$5/month — Custom @{addons.selectedExtension || 'domain.com'} address</p>
                  </div>
                </div>

                {!addons.selectedDomainCategory ? (
                  // User hasn't picked ANY domain tier yet
                  <div className="mt-5 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <p className="text-sm text-slate-400 leading-relaxed">
                      📌 First choose a **Domain** from the options above. Once you search and confirm an available domain, this option unlocks automatically.
                    </p>
                    <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
                      <div className="absolute left-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-0"></div>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 text-center">Select & confirm a domain to unlock ↑</p>
                  </div>
                ) : addons.selectedExtension ? (
                  // User has chosen extension but hasn't searched/confirmed availability yet
                  <div className="mt-5 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <p className="text-sm text-slate-400 leading-relaxed">
                      ⏳ You've chosen the <strong>{addons.selectedExtension}</strong> extension. Now type a name and click "**Check Availability**". Once it's available, you can activate this email option!
                    </p>
                  </div>
                ) : null
              }
            </div>
            )}

          </div>

          {/* Right Column: Running Cart Summary */}
          <div className="lg:col-span-1 relative" style={{ zIndex: 30 }}>
            <div className="bg-slate-900 border border-slate-700 p-6 sm:p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] sticky top-28 pointer-events-auto relative" style={{ zIndex: 40 }}>
              <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Your Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {/* Base Plan */}
                <div className="flex justify-between text-slate-200">
                  <span>{plan.name} Plan <span className="text-xs text-slate-500">(Yearly)</span></span>
                  <span className="font-semibold">${plan.price}</span>
                </div>

                {/* Domain Line Item */}
                {addons.domainAvailable && addons.selectedExtension && addons.domainName && addons.selectedDomainCategory ? (
                  <div className="flex justify-between text-emerald-300 text-sm bg-emerald-950/10 px-3 py-2 rounded-lg border border-emerald-900/30">
                    <span><Globe className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5"/>Domain {addons.domainName}{addons.selectedExtension}</span>
                    <span>+${addons.selectedDomainCategory}</span>
                  </div>
                ) : null}

                {/* APK / App Development Line Item */}
                {addons.apkEnabled ? (
                  <div className="flex justify-between text-cyan-300 text-sm bg-cyan-950/10 px-3 py-2 rounded-lg border border-cyan-900/30">
                    <span><Smartphone className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5"/>App ({addons.apkPlatform === 'both' ? 'Android + iOS' : 'Android'})</span>
                    <span>+${addons.apkPlatform === 'both' ? 35 : 15}</span>
                  </div>
                ) : null}

                {/* Email Line Item */}
                {addons.emailEnabled && addons.domainAvailable && addons.domainName && addons.selectedExtension ? (
                  <div className="flex justify-between text-blue-300 text-sm bg-blue-950/10 px-3 py-2 rounded-lg border border-blue-900/30">
                    <span><Mail className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5"/>Pro Email: {addons.emailName || 'custom'}@{addons.domainName}{addons.selectedExtension}</span>
                    <span>+$5/mo</span>
                  </div>
                ) : null}

                {/* Empty State / None Selected */}
                {!hasChanges && (
                  <p className="text-sm text-slate-500 italic text-center py-4">No extras added yet.</p>
                )}
              </div>
              
              <div className="border-t border-slate-700 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-white">Total Due</span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_14px_rgba(34,211,238,0.55)]">
                      ${totalPrice}
                    </span>
                    <span className="block text-[10px] text-slate-500 tracking-wide uppercase text-right mt-0.5">USD per year</span>
                  </div>
                </div>
              </div>

              <button 
                type="button"
                onClick={handleContinueToCheckout}
                className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg transition-all duration-300 shadow-[0_0_22px_rgba(6,182,212,0.45)] hover:shadow-[0_0_32px_rgba(6,182,212,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-400/30"
                style={{ position: 'relative', zIndex: 50 }}
              >
                Continue to Final Checkout
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <p className="text-xs text-slate-600 text-center mt-4 leading-relaxed">
                You'll review payment options on the next step.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
