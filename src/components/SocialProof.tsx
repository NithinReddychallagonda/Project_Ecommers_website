import { Star } from 'lucide-react';
import { reviews } from '@/data/products';

const SocialProof = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3">What They Say</p>
          <h2 className="editorial-heading text-4xl sm:text-5xl">Real People. Real Style.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-background p-6 space-y-4">
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

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-background px-6 py-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-foreground text-foreground" />
              ))}
            </div>
            <span className="font-body text-sm font-medium">4.8/5 from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
