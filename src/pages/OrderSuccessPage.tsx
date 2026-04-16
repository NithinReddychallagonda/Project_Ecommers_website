import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';

const OrderSuccessPage = () => {
  const [params] = useSearchParams();
  const orderNumber = params.get('order') || 'N/A';

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  const deliveryStr = estimatedDelivery.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="pt-20 min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="editorial-heading text-3xl sm:text-4xl">Order Placed! 🎉</h1>
          <p className="text-muted-foreground font-body">Thank you for shopping with STYLECART</p>
        </div>

        <div className="bg-secondary p-6 space-y-4 text-left">
          <div className="flex items-center gap-3">
            <Package size={18} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Order ID</p>
              <p className="font-display font-bold text-lg">{orderNumber}</p>
            </div>
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Estimated Delivery</p>
            <p className="font-display font-semibold">{deliveryStr}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-body">
          You'll receive an order confirmation email shortly with tracking details.
        </p>

        <Link to="/shop" className="btn-buy inline-flex items-center gap-2">
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
      <Footer />
    </main>
  );
};

export default OrderSuccessPage;
