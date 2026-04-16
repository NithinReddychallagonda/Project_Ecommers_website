import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, RotateCcw, Shield, Minus, Plus, ChevronLeft } from 'lucide-react';
import { products, reviews } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-body mb-8">
          <ChevronLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="aspect-[3/4] overflow-hidden bg-secondary group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="space-y-6 lg:py-8">
            {product.tag && (
              <span className={`inline-block px-3 py-1 text-[10px] tracking-widest uppercase font-bold
                ${product.tag === 'Best Seller' ? 'bg-foreground text-background' : ''}
                ${product.tag === 'Limited Stock' ? 'bg-destructive text-destructive-foreground' : ''}
                ${product.tag === 'New Drop' ? 'bg-accent text-accent-foreground' : ''}
              `}>
                {product.tag}
              </span>
            )}

            <h1 className="editorial-heading text-3xl sm:text-4xl">{product.name}</h1>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(product.rating) ? 'fill-foreground text-foreground' : 'text-border'} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-body">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-2xl">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-muted-foreground line-through text-lg">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-destructive text-sm font-bold">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>

            <div>
              <p className="font-display font-semibold text-xs tracking-widest uppercase mb-3">Size</p>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`w-12 h-12 border text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && !selectedSize && <p className="text-destructive text-xs mt-2">Please select a size</p>}
            </div>

            <div>
              <p className="font-display font-semibold text-xs tracking-widest uppercase mb-3">Quantity</p>
              <div className="inline-flex items-center border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-12 h-10 flex items-center justify-center font-medium text-sm border-x border-border">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {product.stock <= 5 && (
              <p className="text-destructive text-sm font-semibold urgency-pulse">
                🔥 Only {product.stock} left in stock — order soon!
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={handleAddToCart} className="btn-secondary flex-1" disabled={!selectedSize}>
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn-buy flex-1" disabled={!selectedSize}>
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={18} className="text-muted-foreground" />
                <span className="text-xs font-body text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw size={18} className="text-muted-foreground" />
                <span className="text-xs font-body text-muted-foreground">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield size={18} className="text-muted-foreground" />
                <span className="text-xs font-body text-muted-foreground">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-16">
          <h2 className="editorial-heading text-3xl mb-10">Customer Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-secondary p-6 space-y-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">"{review.text}"</p>
                <p className="font-display font-semibold text-sm">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProductPage;
