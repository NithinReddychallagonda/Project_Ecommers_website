import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="font-display font-extrabold text-xl tracking-[0.2em]">STYLECART</Link>
            <p className="text-primary-foreground/60 font-body text-sm mt-4 leading-relaxed">
              Premium western fashion for those who dare to stand out.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase mb-4">Shop</h4>
            <div className="space-y-2">
              <p className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-primary-foreground transition-colors">Co-ords</p>
              <p className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-primary-foreground transition-colors">Streetwear</p>
              <p className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-primary-foreground transition-colors">Essentials</p>
              <p className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-primary-foreground transition-colors">New Arrivals</p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase mb-4">Help</h4>
            <div className="space-y-2">
              <p className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-primary-foreground transition-colors">Size Guide</p>
              <p className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-primary-foreground transition-colors">Shipping</p>
              <p className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-primary-foreground transition-colors">Returns</p>
              <p className="text-primary-foreground/60 text-sm font-body cursor-pointer hover:text-primary-foreground transition-colors">Contact</p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-widest uppercase mb-4">Follow</h4>
            <div className="flex gap-4">
              <Instagram size={18} className="text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
              <Twitter size={18} className="text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-xs font-body">© 2026 STYLECART. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-primary-foreground/40 text-xs font-body cursor-pointer hover:text-primary-foreground/60 transition-colors">Privacy</span>
            <span className="text-primary-foreground/40 text-xs font-body cursor-pointer hover:text-primary-foreground/60 transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
