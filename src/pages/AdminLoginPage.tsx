import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/api/client';
import { toast } from 'sonner';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await apiClient.adminLogin(email, password);
      apiClient.setToken(response.token);
      toast.success('Welcome Admin');
      navigate('/admin');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm p-8 space-y-6">
        <div className="text-center">
          <h1 className="font-display font-bold text-xl tracking-widest uppercase">Admin Access</h1>
          <p className="text-muted-foreground text-xs font-body mt-2">STYLECART Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
            required
          />
          <button type="submit" disabled={loading} className="btn-buy w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLoginPage;
