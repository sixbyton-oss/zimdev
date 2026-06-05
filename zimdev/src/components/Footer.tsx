import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-cyan-900/50 bg-slate-950/90 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src="/zimdev-brand.png" alt="ZimDev Logo" className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                ZimDev
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6">
              Empowering local businesses in Zimbabwe with affordable, professional website and app development packages.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/guide" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Guide & Tutorials</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/policy" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Terms & Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-slate-400">help@zimdev.online</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-slate-400">+263 78 644 3311 (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-slate-400">Harare, Zimbabwe</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-cyan-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ZimDev. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Built for Zimbabwe <span className="text-cyan-500">🇿🇼</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
