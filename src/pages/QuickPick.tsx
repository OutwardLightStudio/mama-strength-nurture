import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock, Heart, Check, AlertCircle } from 'lucide-react';
import { 
  Exercise, 
  exercises, 
  findExercisesForTimeLimit, 
  getTotalDuration, 
  defaultContraindications
} from '@/lib/exercises';

const QuickPick = () => {
  const timeOptions = [2, 5, 10];
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showContraindicationsInfo, setShowContraindicationsInfo] = useState(false);
  
  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    // Use our library function to find exercises that fit within the time limit
    setSelectedExercises(findExercisesForTimeLimit(exercises, time));
  };
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in">
            <h1 className="heading-md mb-4">Quick Pick Workouts</h1>
            <p className="text-body">
              Select how much time you have available right now, and we'll customize a quick workout for you.
            </p>
          </div>
          
          <div className="bg-mama-light-pink p-4 rounded-lg mb-8 animate-fade-in" style={{animationDelay: "0.05s"}}>
            <div className="flex items-start">
              <AlertCircle className="text-mama-pink mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-medium text-mama-dark-text mb-1">Health and Safety Notice</h3>
                <p className="text-sm text-mama-dark-text mb-2">
                  Listen to your body and only do what feels right for you. All exercises should be avoided if you have:
                </p>
                <ul className="text-sm text-mama-dark-text list-disc pl-5 mb-2">
                  {defaultContraindications.slice(0, 3).map((contraindication, index) => (
                    <li key={index}>{contraindication}</li>
                  ))}
                  {!showContraindicationsInfo && defaultContraindications.length > 3 && (
                    <li>
                      <button 
                        className="text-mama-pink font-medium hover:underline"
                        onClick={() => setShowContraindicationsInfo(true)}
                      >
                        See all contraindications...
                      </button>
                    </li>
                  )}
                </ul>
                {showContraindicationsInfo && (
                  <>
                    <ul className="text-sm text-mama-dark-text list-disc pl-5 mb-2">
                      {defaultContraindications.slice(3).map((contraindication, index) => (
                        <li key={index + 3}>{contraindication}</li>
                      ))}
                    </ul>
                    <button 
                      className="text-sm text-mama-pink font-medium hover:underline"
                      onClick={() => setShowContraindicationsInfo(false)}
                    >
                      Show less
                    </button>
                  </>
                )}
                <p className="text-sm text-mama-dark-text mt-2">
                  Each exercise may have additional specific contraindications. Check the full exercise details before beginning.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in" style={{animationDelay: "0.1s"}}>
            {timeOptions.map((time) => (
              <button 
                key={time}
                className={`w-32 h-40 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  selectedTime === time
                    ? 'bg-mama-pink shadow-soft-lg transform scale-105'
                    : 'bg-white shadow-soft hover:transform hover:scale-105'
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                <div className="text-4xl font-bold mb-2 text-mama-dark-text">{time}</div>
                <div className="text-xs text-mama-light-text mb-4">minutes</div>
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
                    <span>Total: {getTotalDuration(selectedExercises)} min</span>
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
                          {exercise.contraindications && exercise.contraindications.length > 0 && (
                            <span className="text-xs text-mama-pink ml-2 flex items-center">
                              <AlertCircle size={12} className="mr-0.5" /> Contraindications
                            </span>
                          )}
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
