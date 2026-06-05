import { BookOpen, MessageSquare } from 'lucide-react';

export default function Guide() {
  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-cyan-950 border border-cyan-500/30 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <BookOpen className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How ZimDev Works</h1>
          <p className="text-xl text-slate-400">Your beginner-friendly guide to getting your business online.</p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative">
            <div className="absolute -top-6 -left-6 h-12 w-12 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              1
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 ml-4">Choose Your Package</h2>
            <p className="text-slate-300 leading-relaxed ml-4">
              Browse our packages on the Home page. We offer Starter, Classic, and Pro plans depending on the size of your business. Not sure? The Classic plan is perfect for most small businesses. Select your package and proceed to the cart.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative">
            <div className="absolute -top-6 -left-6 h-12 w-12 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              2
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 ml-4">Review & Add-ons</h2>
            <p className="text-slate-300 leading-relaxed ml-4">
              In your cart, you can review your chosen package. You can also add extras like a custom domain name (e.g., yourname.co.zw) or professional business email. Once you are happy, proceed to checkout.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative">
            <div className="absolute -top-6 -left-6 h-12 w-12 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              3
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 ml-4">Secure EcoCash Payment</h2>
            <p className="text-slate-300 leading-relaxed ml-4">
              We use a manual EcoCash checkout system. The website will automatically open your phone's dialer with the correct merchant code (*151*1*1#). Simply enter the exact amount shown on your checkout page and complete the payment on your phone.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 relative">
            <div className="absolute -top-6 -left-6 h-12 w-12 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              4
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 ml-4">Confirm Details</h2>
            <p className="text-slate-300 leading-relaxed ml-4">
              After paying, return to the checkout page and enter your Sender Name and EcoCash Approval Code. Click send via WhatsApp or Email. Our team will verify the payment and contact you immediately to start building your website!
            </p>
          </div>
        </div>

        <div className="mt-16 bg-cyan-950/30 border border-cyan-900/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-slate-400 mb-6">Our support team is always ready to assist you.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/263786443311" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)]">
              <MessageSquare className="h-5 w-5" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
