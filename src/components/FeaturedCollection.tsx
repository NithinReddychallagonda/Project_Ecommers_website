import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const FeaturedCollection = () => {
  const { addToCart } = useCart();

  return (
    <section id="collection" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">Curated For You</p>
          <h2 className="editorial-heading text-4xl sm:text-5xl">Trending Now</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group product-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover image-zoom"
                    loading="lazy"
                  />
                </div>

                {/* Tag */}
                {product.tag && (
                  <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] tracking-widest uppercase font-bold
                    ${product.tag === 'Best Seller' ? 'bg-foreground text-background' : ''}
                    ${product.tag === 'Limited Stock' ? 'bg-destructive text-destructive-foreground' : ''}
                    ${product.tag === 'New Drop' ? 'bg-accent text-accent-foreground' : ''}
                  `}>
                    {product.tag}
                  </span>
                )}

                {/* Quick add on hover */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product, 'M');
                  }}
                  className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <ShoppingBag size={14} /> Quick Add
                </button>
              </Link>

              <div className="mt-4 space-y-1">
                <h3 className="font-display font-semibold text-sm sm:text-base">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-body font-semibold">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through text-sm">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                {product.stock <= 5 && (
                  <p className="text-destructive text-xs font-medium urgency-pulse">Only {product.stock} left</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
