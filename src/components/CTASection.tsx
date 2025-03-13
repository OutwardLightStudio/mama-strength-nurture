
import React, { useState } from 'react';
import SignupForm from './SignupForm';

const CTASection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  return (
    <section className="py-16 md:py-24 px-6 bg-mama-pink bg-opacity-10">
      <div className="container mx-auto">
        <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto relative">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-mama-pink rounded-full opacity-10 animate-pulse-soft"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-mama-blue rounded-full opacity-10 animate-pulse-soft" style={{animationDelay: "1s"}}></div>
          
          <div className="relative z-10 text-center">
            <h2 className="heading-md mb-6 animate-fade-in">
              Be the first to know when we launch
            </h2>
            
            <p className="text-body mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.1s"}}>
              MamaStrong is currently in development. Join our waitlist to receive early access, special bonuses, and updates on our progress.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.2s"}}>
              <button 
                className="btn-primary"
                onClick={() => setIsFormOpen(true)}
              >
                Join the waitlist
              </button>
              
              <button className="btn-outline">
                Learn more
              </button>
            </div>
            
            <p className="text-mama-light-text text-sm mt-6 animate-fade-in" style={{animationDelay: "0.3s"}}>
              Estimated launch: Summer 2023
            </p>
          </div>
        </div>
      </div>
      
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-medium max-w-md w-full p-6 animate-fade-in-up">
            <h2 className="heading-sm mb-4">Join the MamaStrong community</h2>
            <SignupForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default CTASection;
