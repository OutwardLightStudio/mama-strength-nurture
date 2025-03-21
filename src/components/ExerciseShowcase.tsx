import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { exerciseService, ExerciseCategory, DurationRange, Exercise } from '@/lib/exercises';
import ExerciseCard from './ExerciseCard';

// Get all categories 
const categories = exerciseService.getAllCategories();

const ExerciseShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | ExerciseCategory>("All");

  const randomExercises = exerciseService.filterExercises(
    {
      category: activeCategory,
      duration: DurationRange.ALL,
      requirement: "All"
    },
    { random: true, limit: 2 }
  );
  
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
              onClick={() => setActiveCategory(category as "All" | ExerciseCategory)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomExercises.map((exercise, index) => (
            <ExerciseCard 
              key={exercise.id} 
              exercise={exercise} 
              index={index}
              showViewButton={true}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center animate-fade-in" style={{animationDelay: "0.5s"}}>
          <Link to="/exercises" className="btn-primary">
            Browse all exercises
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExerciseShowcase;
