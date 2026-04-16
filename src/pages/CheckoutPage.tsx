import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Truck, RotateCcw, Shield, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/api/client';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

const steps = ['Address', 'Payment', 'Review'];

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  // Autofill from profile
  useEffect(() => {
    if (profile) {
      setForm(prev => ({
        ...prev,
        name: profile.full_name || prev.name,
        phone: profile.phone || prev.phone,
        address: profile.address || prev.address,
        city: profile.city || prev.city,
        pincode: profile.pincode || prev.pincode,
      }));
    }
  }, [profile]);

  if (items.length === 0) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground font-body">Your cart is empty</p>
          <button onClick={() => navigate('/shop')} className="btn-secondary text-xs">Continue Shopping</button>
        </div>
      </main>
    );
  }

  const validateStep = () => {
    if (step === 0) {
      if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.pincode.trim()) {
        toast.error('Please fill in all fields');
        return false;
      }
      if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) {
        toast.error('Enter a valid 10-digit phone number');
        return false;
      }
      if (!/^\d{6}$/.test(form.pincode.replace(/\s/g, ''))) {
        toast.error('Enter a valid 6-digit pincode');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(s => Math.min(s + 1, 2));
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      // Generate order number
      const orderNum = `SC-${Date.now()}`;
      
      // Prepare order data
      const orderData = {
        order_number: orderNum,
        customer_name: form.name,
        customer_phone: form.phone,
        customer_address: form.address,
        customer_city: form.city,
        customer_pincode: form.pincode,
        payment_method: form.paymentMethod,
        total_amount: totalPrice,
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.image,
          size: item.size,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };

      // TODO: Send order to backend API
      // const response = await apiClient.createOrder(orderData);
      
      // For now, just save locally and redirect
      localStorage.setItem(`order-${orderNum}`, JSON.stringify(orderData));

      // Save address to profile if logged in
      if (user) {
        try {
          await apiClient.updateProfile({
            phone: form.phone,
            address: form.address,
            city: form.city,
            pincode: form.pincode,
          });
        } catch (err) {
          console.log('Profile update failed, but order will continue:', err);
        }
      }

      clearCart();
      navigate(`/order-success?order=${orderNum}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order. Please try again.');
    }
    setLoading(false);
  };

  const shippingFree = totalPrice >= 2999;

  return (
    <main className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-body mb-8">
          <ChevronLeft size={16} /> {step > 0 ? 'Back' : 'Back to Cart'}
        </button>

        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i <= step ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground'
                }`}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-xs mt-2 font-body text-muted-foreground">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-px mx-2 mb-5 ${i < step ? 'bg-foreground' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2 space-y-6">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl tracking-wider uppercase">Delivery Address</h2>
                <input
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
                />
                <textarea
                  placeholder="Address *"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  rows={3}
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors resize-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="City *"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
                  />
                  <input
                    placeholder="Pincode *"
                    value={form.pincode}
                    onChange={e => setForm({ ...form, pincode: e.target.value })}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm font-body focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <button onClick={nextStep} className="btn-buy w-full mt-4">Continue to Payment</button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display font-bold text-xl tracking-wider uppercase">Payment Method</h2>
                {[
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive your order' },
                  { id: 'upi', label: 'UPI / Online Payment', desc: 'Pay via UPI, cards, or net banking' },
                ].map(method => (
                  <label key={method.id} className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    form.paymentMethod === method.id ? 'border-foreground bg-secondary' : 'border-border hover:border-muted-foreground'
                  }`}>
                    <div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      form.paymentMethod === method.id ? 'border-foreground' : 'border-border'
                    }`}>
                      {form.paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm">{method.label}</p>
                      <p className="text-xs text-muted-foreground font-body">{method.desc}</p>
                    </div>
                  </label>
                ))}
                <button onClick={nextStep} className="btn-buy w-full mt-4">Review Order</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display font-bold text-xl tracking-wider uppercase">Order Review</h2>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-4 bg-secondary">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover" />
                      <div className="flex-1">
                        <p className="font-display font-semibold text-sm">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Size: {item.size} · Qty: {item.quantity}</p>
                        <p className="font-body font-semibold text-sm mt-1">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary p-4 space-y-2">
                  <h3 className="font-display font-semibold text-sm uppercase tracking-wider">Delivering to</h3>
                  <p className="text-sm font-body">{form.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{form.address}, {form.city} - {form.pincode}</p>
                  <p className="text-xs text-muted-foreground font-body">Phone: {form.phone}</p>
                </div>

                <p className="text-sm font-body">
                  <span className="text-muted-foreground">Payment: </span>
                  <span className="font-semibold">{form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI / Online'}</span>
                </p>

                <button onClick={placeOrder} disabled={loading} className="btn-buy w-full">
                  {loading ? 'Placing Order...' : `Place Order · ₹${totalPrice.toLocaleString()}`}
                </button>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="space-y-4">
            <div className="border border-border p-6 space-y-4">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase">Order Summary</h3>
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shippingFree ? 'text-green-600' : ''}>{shippingFree ? 'FREE' : '₹99'}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-display font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(totalPrice + (shippingFree ? 0 : 99)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                <Truck size={16} /> Free shipping above ₹2,999
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                <RotateCcw size={16} /> Easy 7-day returns
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                <Shield size={16} /> 100% secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CheckoutPage;
