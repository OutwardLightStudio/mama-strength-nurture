
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import ExerciseShowcase from '../components/ExerciseShowcase';

import ConnectionSection from '../components/ConnectionSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import QuickPick from './QuickPick';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <ExerciseShowcase />
      <QuickPick />
      <ConnectionSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
