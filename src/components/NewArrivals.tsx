import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const NewArrivals = () => {
  const { addToCart } = useCart();
  const newProducts = products.filter(p => p.tag === 'New Drop').slice(0, 4);

  if (newProducts.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">Just Dropped</p>
            <h2 className="editorial-heading text-4xl sm:text-5xl">New Arrivals</h2>
          </div>
          <Link to="/shop" className="nav-link text-foreground hidden sm:inline-block">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.map((product, index) => (
            <div
              key={product.id}
              className="group product-card-hover fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-background">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover image-zoom" loading="lazy" />
                </div>
                <span className="absolute top-3 left-3 px-3 py-1 text-[10px] tracking-widest uppercase font-bold bg-accent text-accent-foreground">
                  New Drop
                </span>
                <button
                  onClick={(e) => { e.preventDefault(); addToCart(product, 'M'); }}
                  className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <ShoppingBag size={14} /> Quick Add
                </button>
              </Link>
              <div className="mt-4 space-y-1">
                <h3 className="font-display font-semibold text-sm sm:text-base">{product.name}</h3>
                <span className="font-body font-semibold">₹{product.price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
