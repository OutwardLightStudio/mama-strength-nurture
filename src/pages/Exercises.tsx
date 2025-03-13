
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ExerciseCard, { Exercise } from '../components/ExerciseCard';
import Footer from '../components/Footer';

const exercises: Exercise[] = [
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
  },
  {
    id: "4",
    title: "Gentle Back Stretch Series",
    category: "Recovery Basics",
    duration: 7,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: ["Floor space", "Support pillow"],
    benefits: ["Back pain relief", "Improved posture"],
    connectionTips: ["Position baby nearby where you can make faces at each other during holds"]
  },
  {
    id: "5",
    title: "Playful Tummy Time Exercises",
    category: "Baby-inclusive",
    duration: 5,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: ["Floor space", "Tummy time for baby"],
    benefits: ["Core strength", "Upper body tone"],
    connectionTips: ["Do your exercises facing baby during their tummy time, creating a mirroring effect"]
  },
  {
    id: "6",
    title: "Quick Standing Core Activation",
    category: "Short Routines",
    duration: 3,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: ["Standing", "No equipment"],
    benefits: ["Core activation", "Posture improvement"],
    connectionTips: ["Hold baby while doing gentle standing exercises, maintaining eye contact"]
  }
];

const categories = ["All", "Recovery Basics", "Full Body Strength", "Short Routines", "Baby-inclusive"];
const durations = ["All", "Under 5 min", "5-10 min", "Over 10 min"];
const requirements = ["All", "Floor space", "Standing", "Can do while nursing", "Baby carrier or hold", "No equipment"];

const Exercises = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDuration, setActiveDuration] = useState("All");
  const [activeRequirement, setActiveRequirement] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredExercises = exercises.filter(exercise => {
    // Filter by category
    if (activeCategory !== "All" && exercise.category !== activeCategory) return false;
    
    // Filter by duration
    if (activeDuration === "Under 5 min" && exercise.duration >= 5) return false;
    if (activeDuration === "5-10 min" && (exercise.duration < 5 || exercise.duration > 10)) return false;
    if (activeDuration === "Over 10 min" && exercise.duration <= 10) return false;
    
    // Filter by requirement
    if (activeRequirement !== "All" && !exercise.requirements.includes(activeRequirement)) return false;
    
    // Filter by search query
    if (searchQuery.trim() !== "" && !exercise.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

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
                    onClick={() => setActiveCategory(category)}
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
                    onClick={() => setActiveDuration(duration)}
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
                    onClick={() => setActiveRequirement(requirement)}
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
