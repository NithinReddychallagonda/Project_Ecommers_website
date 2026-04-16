import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, DollarSign, ShoppingBag, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/api/client';
import { toast } from 'sonner';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_city: string;
  payment_method: string;
  status: string;
  total_amount: number;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
};

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/admin-login');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  const fetchOrders = async () => {
    // TODO: Fetch orders from backend API
    // For now, show placeholder data
    try {
      // This would be replaced with: const { users } = await apiClient.getUsers();
      setOrders([]);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const updateStatus = async (orderId: string, status: string) => {
    // TODO: Update order status in backend API
    toast.success(`Order marked as ${status}`);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  if (authLoading || loading) {
    return <main className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></main>;
  }

  if (!isAdmin) return null;

  const totalRevenue = orders.reduce((s, o) => s + o.total_amount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl tracking-wider uppercase">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm font-body">STYLECART Management</p>
          </div>
          <button onClick={() => { signOut(); navigate('/'); }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: ShoppingBag },
            { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign },
            { label: 'Pending', value: pendingOrders, icon: Package },
            { label: 'Products', value: 14, icon: Users },
          ].map(stat => (
            <div key={stat.label} className="border border-border p-6 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <stat.icon size={16} />
                <span className="text-xs font-body uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="font-display font-bold text-2xl">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div className="border border-border">
          <div className="p-4 border-b border-border">
            <h2 className="font-display font-bold text-sm tracking-wider uppercase">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider">Order</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider">City</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider">Payment</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No orders yet</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="p-4 font-semibold">{order.order_number}</td>
                      <td className="p-4">{order.customer_name}</td>
                      <td className="p-4 text-muted-foreground">{order.customer_city}</td>
                      <td className="p-4 font-semibold">₹{order.total_amount.toLocaleString()}</td>
                      <td className="p-4 uppercase text-xs">{order.payment_method}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[order.status] || 'bg-secondary text-foreground'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order.id, e.target.value)}
                          className="text-xs border border-border bg-transparent px-2 py-1 focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
