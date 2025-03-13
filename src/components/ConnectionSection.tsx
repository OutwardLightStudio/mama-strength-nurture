
import React from 'react';
import { Heart } from 'lucide-react';

const ConnectionSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-mama-light-blue bg-opacity-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-no-repeat bg-center opacity-5 bg-cover"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-mama-pink bg-opacity-20 rounded-full mb-6 animate-pulse-soft">
            <Heart size={24} className="text-mama-pink" />
          </div>
          
          <h2 className="heading-md mb-6 animate-fade-in">Strengthen your body while deepening your bond</h2>
          
          <p className="text-body mb-10 animate-fade-in" style={{animationDelay: "0.1s"}}>
            Every exercise in MamaStrong includes specific suggestions for maintaining connection with your baby. We believe that movement time can also be bonding time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-soft animate-fade-in" style={{animationDelay: "0.2s"}}>
              <h3 className="text-lg font-semibold text-mama-dark-text mb-3">Eye Contact</h3>
              <p className="text-mama-light-text text-sm">
                Learn positions that allow you to maintain eye contact with your baby, creating moments of connection during your workout.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft animate-fade-in" style={{animationDelay: "0.3s"}}>
              <h3 className="text-lg font-semibold text-mama-dark-text mb-3">Songs & Rhymes</h3>
              <p className="text-mama-light-text text-sm">
                Exercises paired with simple songs and rhymes that engage your baby while you build strength.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft animate-fade-in" style={{animationDelay: "0.4s"}}>
              <h3 className="text-lg font-semibold text-mama-dark-text mb-3">Touch & Inclusion</h3>
              <p className="text-mama-light-text text-sm">
                Movements that incorporate gentle touch and physical connection, making your baby feel included.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-soft max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.5s"}}>
            <p className="italic text-mama-dark-text mb-4">
              "The connection tips transformed my exercise time from something I felt guilty about to a special bonding moment with my daughter. It's the highlight of our day."
            </p>
            <p className="font-medium text-mama-dark-text">Sarah M., mother of a 7-month-old</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectionSection;
