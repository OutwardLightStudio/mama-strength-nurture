import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Clock, Heart, Check, AlertCircle } from 'lucide-react';
import { Exercise, exercises, defaultContraindications } from '@/lib/exercises';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const currentMonth = new Date().toLocaleString('default', { month: 'long' });
const currentYear = new Date().getFullYear();

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [showContraindicationsInfo, setShowContraindicationsInfo] = useState(false);
  
  const weekData = days.map((day, index) => {
    const exerciseCount = Math.floor(Math.random() * 3);
    const dayProgress = Math.random();
    return {
      day,
      index,
      exerciseCount,
      progress: exerciseCount > 0 ? dayProgress : 0,
      suggested: index === selectedDay - 1 ? exercises : exercises.slice(0, exerciseCount),
    };
  });
  
  const handleCompleteExercise = (id: string) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(exId => exId !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 px-6 pb-16">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in">
            <h1 className="heading-md mb-4">Your Movement Schedule</h1>
            <p className="text-body">
              A gentle plan for incorporating movement into your day, with flexibility for life's interruptions.
            </p>
          </div>
          
          <div className="bg-mama-light-pink p-4 rounded-lg mb-8 animate-fade-in" style={{animationDelay: "0.05s"}}>
            <div className="flex items-start">
              <AlertCircle className="text-mama-pink mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-medium text-mama-dark-text mb-1">Health and Safety Reminder</h3>
                <p className="text-sm text-mama-dark-text mb-2">
                  Your wellbeing comes first. Before starting any scheduled exercises, remember that all movements should be avoided if you have:
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
                  Listen to your body and modify exercises as needed. It's perfectly okay to skip a day when necessary.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-mama-dark-text flex items-center">
                <Calendar size={20} className="mr-2" />
                {currentMonth} {currentYear}
              </h2>
              <div className="flex space-x-2">
                <button className="btn-outline py-1 px-3 text-sm">Today</button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-6">
              {weekData.map((data, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                    selectedDay === index + 1 
                      ? 'bg-mama-light-pink shadow-soft' 
                      : 'hover:bg-mama-beige hover:bg-opacity-30'
                  }`}
                  onClick={() => setSelectedDay(index + 1)}
                >
                  <span className={`text-lg font-medium ${
                    selectedDay === index + 1 ? 'text-mama-dark-text' : 'text-mama-light-text'
                  }`}>
                    {data.day}
                  </span>
                  <span className={`text-xs ${
                    selectedDay === index + 1 ? 'text-mama-dark-text' : 'text-mama-light-text'
                  }`}>
                    {data.exerciseCount} exercises
                  </span>
                  {data.exerciseCount > 0 && (
                    <div className="w-full bg-white bg-opacity-50 h-1 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-mama-blue rounded-full" 
                        style={{ width: `${data.progress * 100}%` }}
                      ></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-mama-beige pt-6">
              <h3 className="text-lg font-medium text-mama-dark-text mb-4">
                Suggested exercises for {days[selectedDay - 1]}
              </h3>
              
              {weekData[selectedDay - 1].suggested.length > 0 ? (
                <div className="space-y-4">
                  {weekData[selectedDay - 1].suggested.map((exercise) => (
                    <div 
                      key={exercise.id}
                      className={`flex items-center p-4 rounded-xl transition-all ${
                        completedExercises.includes(exercise.id)
                          ? 'bg-mama-light-blue'
                          : 'bg-mama-beige bg-opacity-30 hover:bg-opacity-50'
                      }`}
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
                        <button 
                          className={`text-xs px-2 py-1 rounded-full flex items-center ${
                            completedExercises.includes(exercise.id)
                              ? 'bg-mama-blue text-mama-dark-text'
                              : 'bg-white text-mama-dark-text'
                          }`}
                          onClick={() => handleCompleteExercise(exercise.id)}
                        >
                          {completedExercises.includes(exercise.id) ? (
                            <>
                              <Check size={12} className="mr-1" /> Completed
                            </>
                          ) : (
                            'Mark Complete'
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-mama-beige bg-opacity-10 rounded-xl">
                  <p className="text-mama-light-text mb-4">No exercises scheduled for this day</p>
                  <button className="btn-primary">
                    Add exercises
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-lg font-medium text-mama-dark-text mb-3">Your Progress</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-mama-light-text">This week</span>
                <span className="text-xl font-medium text-mama-dark-text">4/7 days</span>
              </div>
              <div className="w-full bg-mama-beige h-2 rounded-full overflow-hidden">
                <div className="bg-mama-pink h-full rounded-full" style={{ width: '57%' }}></div>
              </div>
              <p className="mt-4 text-sm text-mama-light-text">
                Great job! You've moved your body 4 days this week.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-lg font-medium text-mama-dark-text mb-3">Favorite Exercises</h3>
              <ul className="space-y-2">
                {exercises.slice(0, 3).map((exercise) => (
                  <li key={exercise.id} className="flex items-center">
                    <div className="w-8 h-8 rounded overflow-hidden mr-2 flex-shrink-0">
                      <img 
                        src={exercise.image} 
                        alt={exercise.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-mama-dark-text">{exercise.title}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 text-mama-dark-text font-medium text-sm hover:text-mama-pink transition-colors">
                View all favorites
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-lg font-medium text-mama-dark-text mb-3">Quick Pick</h3>
              <p className="text-sm text-mama-light-text mb-4">
                Only have a few minutes? Choose a workout based on available time:
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-mama-light-pink rounded-lg text-mama-dark-text font-medium hover:bg-mama-pink transition-all">
                  2 minute workout
                </button>
                <button className="w-full px-4 py-2 bg-mama-light-blue rounded-lg text-mama-dark-text font-medium hover:bg-mama-blue transition-all">
                  5 minute workout
                </button>
                <button className="w-full px-4 py-2 bg-mama-beige rounded-lg text-mama-dark-text font-medium hover:bg-opacity-70 transition-all">
                  10 minute workout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Schedule;
