import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock, Heart, Check } from 'lucide-react';
import { Exercise } from '../components/ExerciseCard';

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

const QuickPick = () => {
  const timeOptions = [2, 5, 10];
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  
  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    
    const filtered = exercises.filter(ex => ex.duration <= time);
    filtered.sort((a, b) => b.duration - a.duration);
    
    let remainingTime = time;
    const selected: Exercise[] = [];
    
    for (const exercise of filtered) {
      if (exercise.duration <= remainingTime) {
        selected.push(exercise);
        remainingTime -= exercise.duration;
      }
      
      if (remainingTime === 0) break;
    }
    
    setSelectedExercises(selected);
  };
  
  const getTotalDuration = () => {
    return selectedExercises.reduce((total, ex) => total + ex.duration, 0);
  };
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
            <h1 className="heading-md mb-4">Quick Pick Workouts</h1>
            <p className="text-body">
              Select how much time you have available right now, and we'll customize a quick workout for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{animationDelay: "0.1s"}}>
            {timeOptions.map((time) => (
              <button
                key={time}
                className={`p-6 rounded-2xl flex flex-col items-center justify-center transition-all card-hover ${
                  selectedTime === time
                    ? 'bg-mama-pink shadow-medium'
                    : 'bg-white border border-mama-beige hover:border-mama-pink'
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                <div className="flex items-center justify-center mb-2">
                  <Clock size={20} className={selectedTime === time ? "text-mama-dark-text" : "text-mama-light-text"} />
                  <span className={`text-2xl font-bold ml-2 ${selectedTime === time ? "text-mama-dark-text" : "text-mama-light-text"}`}>
                    {time} min
                  </span>
                </div>
                <p className={selectedTime === time ? "text-mama-dark-text" : "text-mama-light-text"}>
                  {time === 2 ? "Micro Movement" : time === 5 ? "Quick Reset" : "Mini Session"}
                </p>
              </button>
            ))}
          </div>
          
          {selectedTime && selectedExercises.length > 0 && (
            <div className="max-w-3xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-mama-dark-text">Your Quick Workout</h2>
                  <div className="flex items-center text-mama-light-text text-sm">
                    <Clock size={16} className="mr-1" />
                    <span>Total: {getTotalDuration()} min</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedExercises.map((exercise, index) => (
                    <div 
                      key={exercise.id}
                      className="flex items-center p-4 rounded-xl bg-mama-beige bg-opacity-30 hover:bg-opacity-50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={exercise.image} 
                          alt={exercise.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-mama-dark-text font-medium">{exercise.title}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-white px-2 py-0.5 rounded text-mama-light-text">
                            {exercise.category}
                          </span>
                          <span className="text-xs text-mama-light-text ml-2 flex items-center">
                            <Clock size={12} className="mr-0.5" /> {exercise.duration} min
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center ml-2">
                        <div className="mr-2" aria-label="Connection tip available">
                          <Heart size={18} className="text-mama-pink" />
                        </div>
                        <button className="text-xs bg-mama-blue px-2 py-1 rounded-full text-mama-dark-text">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button className="btn-primary flex items-center">
                    Start Workout <Check size={18} className="ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="bg-mama-light-blue rounded-2xl p-6 text-center">
                <h3 className="text-lg font-medium text-mama-dark-text mb-2">Didn't find what you're looking for?</h3>
                <p className="text-mama-light-text mb-4">
                  Browse our full exercise library to find the perfect movement for you and your baby.
                </p>
                <button className="btn-outline">
                  Browse all exercises
                </button>
              </div>
            </div>
          )}
          
          {selectedTime && selectedExercises.length === 0 && (
            <div className="text-center py-12 animate-fade-in" style={{animationDelay: "0.2s"}}>
              <h3 className="text-lg font-medium text-mama-dark-text mb-2">No exercises found</h3>
              <p className="text-mama-light-text mb-4">We couldn't find exercises that fit within {selectedTime} minutes</p>
              <button className="btn-outline" onClick={() => setSelectedTime(null)}>
                Try a different time
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuickPick;
