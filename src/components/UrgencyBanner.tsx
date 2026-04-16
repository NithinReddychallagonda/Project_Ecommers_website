import { Flame } from 'lucide-react';

const UrgencyBanner = () => {
  return (
    <section className="bg-foreground py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
        <Flame size={16} className="text-destructive urgency-pulse" />
        <p className="text-background text-xs sm:text-sm tracking-widest uppercase font-display font-semibold">
          Limited Stock — Selling Fast — Don't Miss Out
        </p>
        <Flame size={16} className="text-destructive urgency-pulse" />
      </div>
    </section>
  );
};

export default UrgencyBanner;
