import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HealthNotice from '@/components/HealthNotice';
import ExerciseCard from '@/components/ExerciseCard';
import { Check, RefreshCw, ArrowLeft } from 'lucide-react';
import { exerciseService, Exercise, QuickPickType } from '@/lib/exercises';

const QuickPick: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [option, setOption] = useState(exerciseService.quickPickOptions[0]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const typeParam = params.get('type');

  // Function to load exercises for a given quick pick type
  const loadExercisesForQuickPick = (quickPickType: QuickPickType, randomize: boolean = false) => {
    const selectedExercises = exerciseService.findExercisesForQuickPick(quickPickType, randomize);
    setExercises(selectedExercises);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parse the type from URL query params
    if (typeParam) {
      const quickPickType = typeParam as QuickPickType;
      const quickPickOption = exerciseService.getQuickPickOption(quickPickType);
      if (quickPickOption) {
        setOption(quickPickOption);
      }
      
      // Load exercises for the selected quick pick type
      loadExercisesForQuickPick(quickPickType as QuickPickType);
    } else {
      // Default to micro workouts when no type is specified
      loadExercisesForQuickPick(QuickPickType.MICRO);
    }
  }, [location.search, typeParam]);

  // Function to handle button clicks and update the URL
  const handleQuickPickSelection = (selectedOption: typeof option) => {
    setOption(selectedOption);
    navigate(`/quick-pick?type=${selectedOption.type}`);
  };

  // Function to clear the workout and return to quick pick options
  const handleClearWorkout = () => {
    navigate('/quick-pick');
  };

  // Function to refresh the exercises with new random selections
  const handleRefreshExercises = () => {
    if (typeParam) {
      loadExercisesForQuickPick(typeParam as QuickPickType, true);
    }
  };

  // Calculate total duration
  const totalDuration = exerciseService.getTotalDuration(exercises);

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
          
          <HealthNotice 
            description="Listen to your body and only do what feels right for you. All exercises should be avoided if you have:"
            footer="Each exercise may have additional specific contraindications. Check the full exercise details before beginning."
          />
          
          {!typeParam && (
            <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in" style={{animationDelay: "0.1s"}}>
              {exerciseService.quickPickOptions.map((timeOption) => (
                <button 
                  key={timeOption.minutes}
                  className={`w-36 h-40 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    option.minutes === timeOption.minutes
                      ? 'bg-mama-pink shadow-soft-lg transform scale-105'
                      : 'bg-white shadow-soft hover:transform hover:scale-105'
                  }`}
                  onClick={() => handleQuickPickSelection(timeOption)}
                  aria-label={`Select ${timeOption.title} workout for ${timeOption.minutes} minutes`}
                >
                  <div className="text-4xl font-bold mb-2 text-mama-dark-text">{timeOption.minutes}</div>
                  <div className="text-xs text-mama-light-text mb-4">minutes</div>
                  <p className={option.minutes === timeOption.minutes ? "text-mama-dark-text" : "text-mama-light-text"}>
                    {timeOption.title}
                  </p>
                </button>
              ))}
            </div>
          )}
          
          {option && exercises.length > 0 && typeParam && (
            <div className="max-w-3xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={handleClearWorkout}
                  className="flex items-center text-mama-light-text hover:text-mama-dark-text transition-colors"
                  aria-label="Back to quick pick options"
                >
                  <ArrowLeft size={18} className="mr-1" />
                  <span>Choose different time</span>
                </button>
                
                <button 
                  onClick={handleRefreshExercises}
                  className="flex items-center text-mama-light-text hover:text-mama-dark-text transition-colors"
                  aria-label="Get new random exercises"
                >
                  <RefreshCw size={18} className="mr-1" />
                  <span>New workout</span>
                </button>
              </div>
              
              <div className="bg-white rounded-2xl shadow-soft p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-mama-dark-text">{option.title} Workout</h2>
                  <div className="flex items-center text-mama-light-text text-sm">
                    <span>Total: {totalDuration} min</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {exercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      showComplete={true}
                      showViewButton={true}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-mama-light-blue rounded-2xl p-6 text-center mb-4">
                <h3 className="text-lg font-medium text-mama-dark-text">Didn't find what you're looking for?</h3>
                <p className="text-mama-light-text mb-4">
                  Browse our full exercise library to find the perfect movement for you and your baby.
                </p>
                <Link to="/exercises" className="btn-outline inline-flex items-center justify-center">
                  Browse all exercises
                </Link>
              </div>
            </div>
          )}
          
          {option && exercises.length === 0 && (
            <div className="text-center py-12 animate-fade-in" style={{animationDelay: "0.2s"}}>
              <h3 className="text-lg font-medium text-mama-dark-text mb-2">No exercises found</h3>
              <p className="text-mama-light-text mb-4">We couldn't find exercises that fit within {option.minutes} minutes</p>
              <button 
                className="btn-outline" 
                onClick={() => navigate('/quick-pick')}
              >
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
