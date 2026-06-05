import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Guide', path: '/guide' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-900/50 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.7)] group-hover:scale-105">
              <img src="/zimdev-brand.png" alt="ZimDev Logo" className="h-12 w-12 object-contain" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              ZimDev
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] ${
                  isActive(link.path) ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/addons" 
              className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${
                isActive('/addons') || isActive('/checkout') ? 'text-cyan-400' : 'text-slate-300'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-cyan-900/50 bg-slate-900/95 backdrop-blur-xl absolute w-full">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium p-2 rounded-lg transition-colors ${
                  isActive(link.path) ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-900/50' : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/addons"
              className="flex items-center gap-2 p-2 text-slate-300 hover:bg-slate-800 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="h-5 w-5 text-cyan-400" />
              <span className="font-medium">Cart</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
