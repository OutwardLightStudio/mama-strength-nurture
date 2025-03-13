
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SignupForm from './SignupForm';

const HeroSection: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <section className="pt-32 pb-16 md:py-40 px-6 relative overflow-hidden bg-gradient-to-b from-mama-light-pink to-white">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-no-repeat bg-right-top lg:bg-right opacity-5 bg-cover"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1 bg-mama-blue rounded-full text-mama-dark-text text-sm font-medium mb-6 animate-fade-in">
            Join our community of strong mamas
          </span>
          
          <h1 className="heading-lg mb-6 animate-fade-in" style={{animationDelay: "0.1s"}}>
            Strength & connection for mothers and babies
          </h1>
          
          <p className="text-body mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Build strength while nurturing the bond with your little one. MamaStrong offers exercises designed for busy mothers, with your baby by your side.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <button 
              className="btn-primary flex items-center justify-center gap-2"
              onClick={() => setIsSignupOpen(true)}
            >
              Join the waitlist <ArrowRight size={18} />
            </button>
            <button className="btn-outline">
              Browse exercises
            </button>
          </div>
          
          <div className="mt-10 flex items-center space-x-6 text-mama-light-text animate-fade-in" style={{animationDelay: "0.4s"}}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-mama-pink flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-medium text-mama-dark-text">{i}0+</span>
                </div>
              ))}
            </div>
            <p className="text-sm">Joined by over <span className="text-mama-dark-text font-medium">150+ mamas</span> this month</p>
          </div>
        </div>
      </div>
      
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-medium max-w-md w-full p-6 animate-fade-in-up">
            <h2 className="heading-sm mb-4">Join the MamaStrong community</h2>
            <SignupForm onClose={() => setIsSignupOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
