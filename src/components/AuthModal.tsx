import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!showAuthModal) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Min 6 characters';
    if (mode === 'signup') {
      if (!fullName.trim()) errs.fullName = 'Name is required';
      if (password !== confirmPassword) errs.confirmPassword = 'Passwords don\'t match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Login Successful ✅');
        setShowAuthModal(false);
        resetForm();
      }
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Account created! Welcome to STYLECART ✅');
        setShowAuthModal(false);
        resetForm();
      }
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setErrors({});
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
  };

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 z-[60] backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="bg-background w-full max-w-md p-8 relative animate-fade-in shadow-2xl">
          <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>

          <h2 className="font-display font-bold text-2xl tracking-wider uppercase mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join STYLECART'}
          </h2>
          <p className="text-muted-foreground text-sm font-body mb-8">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
                />
                {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors pr-10"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            </div>

            {mode === 'signup' && (
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
                />
                {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-buy w-full mt-6">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground font-body mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={switchMode} className="text-foreground font-semibold hover:underline">
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
