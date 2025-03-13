import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ExerciseCard from '../components/ExerciseCard';
import Footer from '../components/Footer';
import { 
  exercises, 
  getAllCategories, 
  getAllDurationRanges, 
  getAllRequirements, 
  filterExercises,
  ExerciseFilters,
  DurationRange,
  ExerciseRequirement,
  ExerciseCategory
} from '@/lib/exercises';

// Get the filter options from our exercise library
const categories = getAllCategories();
const durations = getAllDurationRanges();
const requirements = getAllRequirements();

const Exercises = () => {
  const [activeCategory, setActiveCategory] = useState<ExerciseCategory | "All">("All");
  const [activeDuration, setActiveDuration] = useState<DurationRange>(DurationRange.ALL);
  const [activeRequirement, setActiveRequirement] = useState<ExerciseRequirement | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Create the filters object
  const filters: ExerciseFilters = {
    category: activeCategory,
    duration: activeDuration,
    requirement: activeRequirement,
    searchQuery
  };
  
  // Use our filterExercises utility function
  const filteredExercises = filterExercises(exercises, filters);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
            <h1 className="heading-md mb-4">Exercise Library</h1>
            <p className="text-body">
              Explore our collection of exercises designed specifically for postpartum recovery and strength building, with your baby by your side.
            </p>
          </div>
          
          <div className="mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-96 px-4 py-2 rounded-lg border border-mama-beige focus:border-mama-pink focus:ring focus:ring-mama-pink focus:ring-opacity-30 transition-all outline-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-mama-dark-text">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeCategory === category 
                        ? 'bg-mama-pink text-mama-dark-text' 
                        : 'bg-white text-mama-light-text hover:bg-mama-light-pink hover:text-mama-dark-text'
                    }`}
                    onClick={() => setActiveCategory(category as ExerciseCategory)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-mama-dark-text">Duration</h3>
              <div className="flex flex-wrap gap-2">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeDuration === duration 
                        ? 'bg-mama-pink text-mama-dark-text' 
                        : 'bg-white text-mama-light-text hover:bg-mama-light-pink hover:text-mama-dark-text'
                    }`}
                    onClick={() => setActiveDuration(duration as DurationRange)}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-mama-dark-text">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {requirements.map((requirement) => (
                  <button
                    key={requirement}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeRequirement === requirement 
                        ? 'bg-mama-pink text-mama-dark-text' 
                        : 'bg-white text-mama-light-text hover:bg-mama-light-pink hover:text-mama-dark-text'
                    }`}
                    onClick={() => setActiveRequirement(requirement as ExerciseRequirement)}
                  >
                    {requirement}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise, index) => (
                <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium text-mama-dark-text mb-2">No exercises found</h3>
                <p className="text-mama-light-text">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Exercises;
