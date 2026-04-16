import heroImage from '@/assets/hero-main.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Premium co-ord set" className="w-full h-full object-cover object-top" />
        {/* Strong gradient overlays for navbar + text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/20 to-foreground/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl space-y-6">
            <p className="text-primary-foreground/70 text-xs tracking-[0.3em] uppercase font-body font-medium">SS26 Collection</p>
            <h1 className="editorial-heading text-primary-foreground text-5xl sm:text-7xl lg:text-8xl">
              Own The<br />Street.
            </h1>
            <p className="text-primary-foreground/80 font-body text-base sm:text-lg max-w-md leading-relaxed">
              Curated co-ords and streetwear sets for those who refuse to blend in. Premium fabrics. Minimal design. Maximum impact.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/shop" className="btn-buy bg-primary-foreground text-foreground">
                Shop Now
              </Link>
              <a href="#collection" className="btn-secondary border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                Explore Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
