import HeroSection from '@/components/HeroSection';
import FeaturedCollection from '@/components/FeaturedCollection';
import NewArrivals from '@/components/NewArrivals';
import SocialProof from '@/components/SocialProof';
import Categories from '@/components/Categories';
import UrgencyBanner from '@/components/UrgencyBanner';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main>
      <HeroSection />
      <UrgencyBanner />
      <FeaturedCollection />
      <NewArrivals />
      <Categories />
      <SocialProof />
      <UrgencyBanner />
      <Footer />
    </main>
  );
};

export default Index;
