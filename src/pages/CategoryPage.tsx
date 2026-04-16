import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer';

type SortOption = 'trending' | 'price-low' | 'price-high';

const categoryMeta: Record<string, { title: string; subtitle: string }> = {
  shop: { title: 'All Products', subtitle: 'Our complete collection of premium fashion' },
  'co-ords': { title: 'Co-ords', subtitle: 'Matching sets crafted for effortless style' },
  streetwear: { title: 'Streetwear', subtitle: 'Bold pieces for the urban wardrobe' },
  essentials: { title: 'Essentials', subtitle: 'Timeless basics, premium quality' },
};

const CategoryPage = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const [sort, setSort] = useState<SortOption>('trending');
  const [sizeFilter, setSizeFilter] = useState<string>('');

  const cat = location.pathname.replace('/', '') || 'shop';
  const meta = categoryMeta[cat] || categoryMeta.shop;

  const filtered = useMemo(() => {
    let items = cat === 'shop' ? [...products] : products.filter(p => p.category === cat);
    if (sizeFilter) {
      items = items.filter(p => p.sizes.includes(sizeFilter));
    }
    switch (sort) {
      case 'price-low': return items.sort((a, b) => a.price - b.price);
      case 'price-high': return items.sort((a, b) => b.price - a.price);
      default: return items.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [cat, sort, sizeFilter]);

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <main className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-secondary py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">Collection</p>
          <h1 className="editorial-heading text-4xl sm:text-5xl lg:text-6xl">{meta.title}</h1>
          <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto">{meta.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs tracking-widest uppercase font-display font-semibold text-muted-foreground">Size:</span>
            <button
              onClick={() => setSizeFilter('')}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium border transition-all ${
                !sizeFilter ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'
              }`}
            >
              All
            </button>
            {allSizes.map(s => (
              <button
                key={s}
                onClick={() => setSizeFilter(sizeFilter === s ? '' : s)}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium border transition-all ${
                  sizeFilter === s ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="appearance-none bg-transparent border border-border px-4 py-2 pr-8 text-xs tracking-widest uppercase font-display font-medium cursor-pointer focus:outline-none focus:border-foreground"
            >
              <option value="trending">Trending</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground font-body mb-6">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product, index) => (
            <div
              key={product.id}
              className="group product-card-hover fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
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

                {product.tag && (
                  <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] tracking-widest uppercase font-bold
                    ${product.tag === 'Best Seller' ? 'bg-foreground text-background' : ''}
                    ${product.tag === 'Limited Stock' ? 'bg-destructive text-destructive-foreground' : ''}
                    ${product.tag === 'New Drop' ? 'bg-accent text-accent-foreground' : ''}
                  `}>
                    {product.tag}
                  </span>
                )}

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

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body text-lg">No products found for this filter.</p>
            <button onClick={() => { setSizeFilter(''); setSort('trending'); }} className="btn-secondary mt-4">
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default CategoryPage;
