
import React from 'react';
import { Clock, Heart, Calendar, List, BookOpen, Users } from 'lucide-react';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <List size={24} className="text-mama-pink" />,
      title: "Exercise Library",
      description: "Access a curated library of postpartum-friendly exercises designed for recovery and strength building.",
      delay: "0s"
    },
    {
      icon: <Clock size={24} className="text-mama-pink" />,
      title: "Quick Pick Workouts",
      description: "Choose exercises based on the time you have available - even if it's just 2, 5, or 10 minutes.",
      delay: "0.1s"
    },
    {
      icon: <Heart size={24} className="text-mama-pink" />,
      title: "Connection Focus",
      description: "Every exercise includes suggestions for maintaining connection with your baby throughout your movement.",
      delay: "0.2s"
    },
    {
      icon: <Calendar size={24} className="text-mama-pink" />,
      title: "Flexible Scheduling",
      description: "Celebrate consistency rather than streaks, because we understand that interruptions are normal.",
      delay: "0.3s"
    },
    {
      icon: <BookOpen size={24} className="text-mama-pink" />,
      title: "Resource Library",
      description: "Access helpful articles and resources for every stage of motherhood, from infancy through the teenage years.",
      delay: "0.4s"
    },
    {
      icon: <Users size={24} className="text-mama-pink" />,
      title: "Support Network",
      description: "Connect with other mothers in our community to share experiences, advice, and support so you never feel alone.",
      delay: "0.5s"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="heading-md mb-4 animate-fade-in">Designed for real motherhood</h2>
          <p className="text-body animate-fade-in" style={{animationDelay: "0.1s"}}>
            MamaStrong recognizes the unique challenges of motherhood at every stage. Our approach prioritizes physical wellbeing, educational resources, and community support throughout your entire journey as a mother.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-mama-light-pink bg-opacity-30 rounded-2xl p-6 card-hover animate-fade-in" 
              style={{animationDelay: feature.delay}}
            >
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-soft">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-mama-dark-text mb-2">{feature.title}</h3>
              <p className="text-mama-light-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
