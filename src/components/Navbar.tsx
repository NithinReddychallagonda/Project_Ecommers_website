import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  Heart,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Shop", to: "/shop" },
  { label: "Co-ords", to: "/co-ords" },
  { label: "Streetwear", to: "/streetwear" },
  { label: "Essentials", to: "/essentials" },
  { label: "AI Recommender", to: "/ai-recommender", icon: true },
];

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, signOut, setShowAuthModal } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const showSolid = scrolled || !isHome;

  const textClass = showSolid ? "text-foreground" : "text-primary-foreground";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`sm:hidden ${textClass}`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden sm:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${textClass} ${location.pathname === item.to ? "after:scale-x-100 after:origin-left" : ""} flex items-center gap-1.5`}
              >
                {item.icon && <Sparkles size={14} className="text-primary" />}
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className={`font-display font-extrabold text-xl sm:text-2xl tracking-[0.2em] transition-colors duration-300 ${textClass}`}
          >
            STYLECART
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              className={`hidden sm:block hover:opacity-60 transition-opacity ${textClass}`}
            >
              <Heart size={18} />
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  to="/user-dashboard"
                  className={`hover:opacity-60 transition-opacity ${textClass}`}
                  title="My Account"
                >
                  <User size={18} />
                </Link>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className={`hover:opacity-60 transition-opacity ${textClass}`}
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className={`hidden sm:block hover:opacity-60 transition-opacity ${textClass}`}
                title="Sign In"
              >
                <User size={18} />
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative hover:opacity-60 transition-opacity ${textClass}`}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-foreground text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden bg-background border-t border-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block nav-link text-foreground text-lg ${location.pathname === item.to ? "after:scale-x-100 after:origin-left" : ""} flex items-center gap-2`}
              >
                {item.icon && <Sparkles size={16} className="text-primary" />}
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/user-dashboard"
                  className="block nav-link text-foreground text-lg"
                >
                  My Account
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block nav-link text-foreground text-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setMobileOpen(false);
                }}
                className="block nav-link text-foreground text-lg"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
