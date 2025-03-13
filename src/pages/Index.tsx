
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import ExerciseShowcase from '../components/ExerciseShowcase';
import QuickPickSection from '../components/QuickPickSection';
import ConnectionSection from '../components/ConnectionSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <ExerciseShowcase />
      <QuickPickSection />
      <ConnectionSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
