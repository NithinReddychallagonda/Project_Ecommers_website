import { X, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/30 z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 animate-slide-in shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display font-bold text-lg tracking-wider uppercase">Cart ({totalItems})</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-foreground hover:opacity-60 transition-opacity">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body text-sm">Your cart is empty</p>
              <button onClick={() => setIsCartOpen(false)} className="btn-secondary mt-6 text-xs">Continue Shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover" />
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-sm">{item.product.name}</h3>
                  <p className="text-muted-foreground text-xs mt-1">Size: {item.size}</p>
                  <p className="font-body font-semibold text-sm mt-1">₹{item.product.price.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="w-6 h-6 border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="w-6 h-6 border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-muted-foreground hover:text-foreground transition-colors self-start">
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Subtotal</span>
              <span className="font-display font-bold text-lg">₹{totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">Free shipping on orders above ₹2,999</p>
            <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="btn-buy w-full flex items-center justify-center gap-2">
              Checkout <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
