import React from 'react';
import { Link } from 'react-router-dom';
import { exerciseService, QuickPickType } from '@/lib/exercises';

const QuickPickSection: React.FC = () => {
  const quickPickOptions = exerciseService.quickPickOptions;

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-md mb-4 animate-fade-in">Quick Pick Workouts</h2>
          <p className="text-body animate-fade-in" style={{animationDelay: "0.1s"}}>
            Short on time? We understand. Choose an exercise based on how many minutes you have available right now.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
          {quickPickOptions.map((option, index) => (
            <div key={index} className={`${option.color} rounded-2xl p-6 card-hover`}>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-soft">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold text-mama-dark-text">{option.minutes}</span>
                    <span className="text-xs text-mama-light-text">min</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-mama-dark-text text-center mb-2">
                {option.title}
              </h3>
              
              <p className="text-mama-light-text text-center mb-6">
                {option.description}
              </p>
              
              <Link 
                to={`/quick-pick?type=${option.type}`}
                className="block w-full py-2.5 px-4 bg-white rounded-lg text-mama-dark-text font-medium hover:shadow-soft transition-all text-center"
              >
                Start now
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.3s"}}>
          <h3 className="heading-sm mb-4">Any movement counts</h3>
          <p className="text-body mb-6">
            MamaStrong celebrates all movement, no matter how brief. Our philosophy focuses on consistency over perfection, because we understand the unpredictable nature of motherhood.
          </p>
          <button className="btn-outline">
            Learn about our approach
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickPickSection;
