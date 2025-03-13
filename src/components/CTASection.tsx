
import React from 'react';
import SignupForm from './SignupForm';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const CTASection: React.FC = () => {
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
              MamaStrong is currently in development. Join our waitlist to receive early access to our exercise library, parenting resources, and supportive community. Plus, get special bonuses and updates on our progress.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.2s"}}>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="btn-primary">
                    Join the waitlist
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white rounded-2xl shadow-medium max-w-md w-full p-6 animate-fade-in-up">
                  <DialogTitle className="heading-sm mb-4">Join the MamaStrong community</DialogTitle>
                  <SignupForm />
                </DialogContent>
              </Dialog>
              
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
    </section>
  );
};

export default CTASection;
