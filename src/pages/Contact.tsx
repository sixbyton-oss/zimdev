import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Have questions about our packages? Need help getting started? Our friendly local support team is here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            
            <a href="https://wa.me/263786443311" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-green-500/50 transition-all group">
              <div className="p-3 bg-green-950 rounded-xl border border-green-500/30 group-hover:shadow-[0_0_15px_rgba(22,163,74,0.3)] transition-all">
                <Phone className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">WhatsApp Support</h3>
                <p className="text-slate-400 mb-2">Fastest response time for quick questions.</p>
                <p className="text-green-400 font-medium">+263 78 644 3311</p>
              </div>
            </a>

            <a href="mailto:help@zimdev.online" className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all group">
              <div className="p-3 bg-cyan-950 rounded-xl border border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                <Mail className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                <p className="text-slate-400 mb-2">For detailed inquiries and project details.</p>
                <p className="text-cyan-400 font-medium">help@zimdev.online</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <Clock className="h-6 w-6 text-slate-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Business Hours</h3>
                <p className="text-slate-400">Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p className="text-slate-400">Saturday: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <MapPin className="h-6 w-6 text-slate-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Location</h3>
                <p className="text-slate-400">Harare, Zimbabwe</p>
                <p className="text-sm text-slate-500 mt-1">We operate online to keep our prices affordable for you!</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Form (Visual only, redirects to mailto) */}
          <div className="bg-slate-900 border border-cyan-900/50 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full"></div>
            
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Send us a message</h2>
            
            <form 
              className="space-y-4 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const msg = formData.get('message');
                window.location.href = `mailto:help@zimdev.online?subject=Inquiry from ${name}&body=${msg}`;
              }}
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                <textarea 
                  name="message"
                  required
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2 mt-4"
              >
                Send Message
                <MessageSquare className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
