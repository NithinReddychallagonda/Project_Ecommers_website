import { Link } from 'react-router-dom';
import categoryCoords from '@/assets/category-coords.jpg';
import categoryStreetwear from '@/assets/category-streetwear.jpg';
import categoryEssentials from '@/assets/category-essentials.jpg';

const categories = [
  { name: 'Co-ords', image: categoryCoords, to: '/co-ords' },
  { name: 'Streetwear', image: categoryStreetwear, to: '/streetwear' },
  { name: 'Essentials', image: categoryEssentials, to: '/essentials' },
];

const Categories = () => {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">Shop By</p>
          <h2 className="editorial-heading text-4xl sm:text-5xl">Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.to} className="group relative aspect-[3/4] overflow-hidden cursor-pointer block">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover image-zoom" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-widest uppercase text-primary-foreground">
                  {cat.name}
                </h3>
                <span className="text-primary-foreground/70 text-xs tracking-widest uppercase font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
