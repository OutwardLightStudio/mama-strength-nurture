
import React, { useState } from 'react';
import ExerciseCard, { Exercise } from './ExerciseCard';

const exerciseData: Exercise[] = [
  {
    id: "1",
    title: "Gentle Pelvic Floor Recovery",
    category: "Recovery Basics",
    duration: 5,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: ["Floor space", "Can do while nursing"],
    benefits: ["Pelvic floor strength", "Core activation"],
    connectionTips: ["Maintain eye contact with baby and smile while breathing through the exercises"]
  },
  {
    id: "2",
    title: "Standing Baby Cuddle Squats",
    category: "Baby-inclusive",
    duration: 8,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: ["Standing", "Baby carrier or hold"],
    benefits: ["Leg strength", "Posture support"],
    connectionTips: ["Sing a gentle song to baby with each squat, creating a rhythm"]
  },
  {
    id: "3",
    title: "Diastasis Recti Healing",
    category: "Recovery Basics",
    duration: 10,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: ["Floor space", "Quiet environment"],
    benefits: ["Abdominal healing", "Core stability"],
    connectionTips: ["Place baby where they can see you, talk softly about what you're doing"]
  }
];

const categories = [
  "All",
  "Recovery Basics",
  "Full Body Strength",
  "Short Routines",
  "Baby-inclusive"
];

const ExerciseShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredExercises = activeCategory === "All" 
    ? exerciseData 
    : exerciseData.filter(ex => ex.category === activeCategory);
  
  return (
    <section className="py-16 md:py-24 px-6 bg-mama-beige bg-opacity-30">
      <div className="container mx-auto">
        <h2 className="heading-md mb-4 text-center animate-fade-in">Exercise Library Preview</h2>
        <p className="text-body text-center max-w-2xl mx-auto mb-12 animate-fade-in" style={{animationDelay: "0.1s"}}>
          Explore our curated collection of exercises designed specifically for the postpartum journey, with your baby by your side.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-in" style={{animationDelay: "0.2s"}}>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-mama-pink text-mama-dark-text' 
                  : 'bg-white text-mama-light-text hover:bg-mama-light-pink hover:text-mama-dark-text'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExercises.map((exercise, index) => (
            <ExerciseCard 
              key={exercise.id} 
              exercise={exercise} 
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center animate-fade-in" style={{animationDelay: "0.5s"}}>
          <button className="btn-primary">
            Browse all exercises
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExerciseShowcase;
