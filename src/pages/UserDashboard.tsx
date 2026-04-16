import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, MapPin, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

interface OrderWithItems {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  payment_method: string;
  items: { product_name: string; size: string; quantity: number; price: number; product_image: string | null }[];
}

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
};

const UserDashboard = () => {
  const { user, profile, loading: authLoading, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'orders' | 'profile'>('orders');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: '', phone: '', address: '', city: '', pincode: '' });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        pincode: profile.pincode || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    // TODO: Fetch orders from backend API
    // For now, load from localStorage (orders saved during checkout)
    try {
      const localOrders: OrderWithItems[] = [];
      // This would be replaced with API call to backend
      setOrders(localOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(form);
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (authLoading || !user) {
    return <main className="min-h-screen flex items-center justify-center pt-20"><p className="text-muted-foreground">Loading...</p></main>;
  }

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl tracking-wider uppercase">
              Welcome back, {profile?.full_name || 'User'}
            </h1>
            <p className="text-muted-foreground text-sm font-body">{user.email}</p>
          </div>
          <button
            onClick={() => { signOut(); navigate('/'); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-border mb-8">
          {[
            { key: 'orders' as const, label: 'My Orders', icon: Package },
            { key: 'profile' as const, label: 'Profile', icon: User },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 pb-3 text-sm font-body transition-colors border-b-2 -mb-px ${
                tab === t.key ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === 'orders' && (
          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground font-body text-sm">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Package size={40} className="mx-auto text-muted-foreground" />
                <p className="text-muted-foreground font-body">No orders yet</p>
                <button onClick={() => navigate('/shop')} className="btn-buy text-xs">Start Shopping</button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="border border-border p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold text-sm">{order.order_number}</p>
                      <p className="text-xs text-muted-foreground font-body">
                        {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-body ${statusColor[order.status] || 'bg-secondary text-foreground'}`}>
                      {order.status}
                    </span>
                  </div>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.product_image && (
                        <img src={item.product_image} alt={item.product_name} className="w-12 h-14 object-cover" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-body">{item.product_name}</p>
                        <p className="text-xs text-muted-foreground font-body">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-body font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground font-body uppercase">{order.payment_method}</p>
                    <p className="font-display font-bold">₹{order.total_amount.toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile Tab */}
        {tab === 'profile' && (
          <div className="max-w-md space-y-6">
            <div className="space-y-4">
              {editing ? (
                <>
                  {[
                    { key: 'full_name', label: 'Full Name' },
                    { key: 'phone', label: 'Phone' },
                    { key: 'address', label: 'Address' },
                    { key: 'city', label: 'City' },
                    { key: 'pincode', label: 'Pincode' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">{f.label}</label>
                      <input
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors mt-1"
                      />
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSaveProfile} className="btn-buy text-xs">Save</button>
                    <button onClick={() => setEditing(false)} className="btn-secondary text-xs">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    {[
                      { label: 'Name', value: profile?.full_name },
                      { label: 'Email', value: user.email },
                      { label: 'Phone', value: profile?.phone },
                      { label: 'Address', value: profile?.address },
                      { label: 'City', value: profile?.city },
                      { label: 'Pincode', value: profile?.pincode },
                    ].map(f => (
                      <div key={f.label} className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-xs text-muted-foreground font-body uppercase tracking-wider">{f.label}</span>
                        <span className="text-sm font-body">{f.value || '—'}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setEditing(true)} className="btn-secondary text-xs flex items-center gap-2 mt-4">
                    <MapPin size={14} /> Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default UserDashboard;
