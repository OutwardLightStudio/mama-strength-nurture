import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExerciseCard from '@/components/ExerciseCard';
import { Calendar, Trash2, Info } from 'lucide-react';
import { exerciseService } from '@/lib/exercises';
import { exerciseCompletionService } from '@/lib/exercises/ExerciseCompletionService';
import { Exercise, ExerciseCategory } from '@/lib/exercises/types';

interface CompletedExerciseWithDetails {
  id: number;
  exerciseId: string;
  completedAt: Date;
  exercise: Exercise;
}

const History = () => {
  const [completedExercises, setCompletedExercises] = useState<CompletedExerciseWithDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30); // Default to last 30 days
    return { start, end };
  });
  
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  // Add state for confirmation dialog
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  // Fetch completed exercises
  useEffect(() => {
    async function fetchCompletions() {
      setLoading(true);
      try {
        const completions = await exerciseCompletionService.getCompletionsInRange(
          dateRange.start,
          dateRange.end
        );
        
        // Fetch exercise details for each completion
        const detailedCompletions = await Promise.all(
          completions.map(async completion => {
            const exercise = exerciseService.getExerciseById(completion.exerciseId);
            return {
              id: completion.id,
              exerciseId: completion.exerciseId,
              completedAt: completion.completedAt,
              exercise: exercise || {
                id: completion.exerciseId,
                title: 'Unknown Exercise',
                description: 'This exercise could not be found',
                category: ExerciseCategory.RECOVERY_BASICS,
                duration: 0,
                image: '/placeholder.svg',
                contraindications: [],
                requirement: 'None',
                requirements: [],
                benefits: [],
                connectionTips: []
              }
            };
          })
        );
        
        // Sort by completion date, most recent first
        const sorted = detailedCompletions.sort((a, b) => 
          b.completedAt.getTime() - a.completedAt.getTime()
        );
        
        setCompletedExercises(sorted);
      } catch (error) {
        console.error('Failed to fetch completion history:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCompletions();
  }, [dateRange]);

  // Handle removing a completion
  const handleRemoveCompletion = async (id: number) => {
    try {
      // Delete the completion record directly using the id
      await exerciseCompletionService.deleteCompletionById(id);
      
      // Update the local state to remove the deleted item
      setCompletedExercises(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to remove completion:', error);
    }
  };

  // Handle clearing all history
  const handleClearAllHistory = async () => {
    try {
      await exerciseCompletionService.clearAllCompletions();
      setCompletedExercises([]);
      setShowClearConfirmation(false);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  // Group exercises by date
  const exercisesByDate = completedExercises.reduce((acc, item) => {
    const date = item.completedAt.toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, CompletedExerciseWithDetails[]>);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateString === today) {
      return 'Today';
    } else if (dateString === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  };
  
  // Calculate statistics
  const totalCompleted = completedExercises.length;
  const uniqueDays = Object.keys(exercisesByDate).length;
  const mostActiveDay = Object.entries(exercisesByDate)
    .sort((a, b) => b[1].length - a[1].length)[0]?.[0] || 'None';

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 px-6 pb-16">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in">
            <h1 className="heading-md mb-4">Your Exercise History</h1>
            <p className="text-body">
              Track your movement journey and see your consistency over time.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-mama-dark-text flex items-center">
                <Calendar size={20} className="mr-2" />
                {currentMonth} {currentYear}
              </h2>
              <div className="flex space-x-2">
                <button 
                  className="btn-outline py-1 px-3 text-sm"
                  onClick={() => {
                    const end = new Date();
                    const start = new Date();
                    start.setDate(start.getDate() - 30);
                    setDateRange({ start, end });
                  }}
                >
                  Last 30 Days
                </button>
                <button 
                  className="btn-outline py-1 px-3 text-sm"
                  onClick={() => {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(start.getMonth() - 3);
                    setDateRange({ start, end });
                  }}
                >
                  Last 3 Months
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mama-pink"></div>
              </div>
            ) : totalCompleted > 0 ? (
              <div className="space-y-8">
                {Object.entries(exercisesByDate).map(([date, exercises]) => (
                  <div key={date} className="border-t border-mama-beige pt-4 first:border-t-0 first:pt-0">
                    <h3 className="text-lg font-medium text-mama-dark-text mb-4">
                      {formatDate(date)}
                    </h3>
                    
                    <div className="space-y-4">
                      {exercises.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="flex-grow">
                            <ExerciseCard
                              key={`${item.id}-${item.exerciseId}`}
                              exercise={item.exercise}
                              variant="compact"
                            />
                          </div>
                          <div className="ml-2 flex flex-col items-end">
                            <span className="text-xs text-mama-light-text mb-1">
                              {item.completedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <button
                              onClick={() => handleRemoveCompletion(item.id)}
                              className="p-2 text-mama-light-text hover:text-mama-pink transition-colors"
                              aria-label="Remove from history"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-mama-beige bg-opacity-10 rounded-xl">
                <p className="text-mama-light-text mb-4">No completed exercises yet</p>
                <button 
                  className="btn-primary"
                  onClick={() => window.location.href = '/exercises'}
                >
                  Find exercises to do
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-lg font-medium text-mama-dark-text mb-3">Your Progress</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-mama-light-text">Total Exercises</span>
                <span className="text-xl font-medium text-mama-dark-text">{totalCompleted}</span>
              </div>
              <div className="w-full bg-mama-beige h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-mama-pink h-full rounded-full" 
                  style={{ width: `${Math.min(100, (uniqueDays / 30) * 100)}%` }}
                ></div>
              </div>
              <p className="mt-4 text-sm text-mama-light-text">
                You've moved your body on {uniqueDays} days in this period.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft">
              <h3 className="text-lg font-medium text-mama-dark-text mb-3">Consistency</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-mama-light-text">Most Active Day</span>
                <span className="text-xl font-medium text-mama-dark-text">
                  {mostActiveDay !== 'None' ? formatDate(mostActiveDay) : 'None'}
                </span>
              </div>
              <p className="text-sm text-mama-light-text">
                Try to maintain a consistent movement routine for the best results. Even just a few minutes each day makes a difference.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-soft flex flex-col">
              <h3 className="text-lg font-medium text-mama-dark-text mb-3 flex items-center">
                <Info size={18} className="mr-2" />
                About Your Data
              </h3>
              <p className="text-sm text-mama-light-text flex-grow">
                Your exercise history is stored locally on your device. You can remove individual records by clicking the trash icon, or clear all history below.
              </p>
              <button 
                className="mt-4 text-mama-pink hover:text-mama-dark-text transition-colors text-sm"
                onClick={() => setShowClearConfirmation(true)}
                aria-label="Clear all history"
              >
                Clear all history
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Clear history confirmation dialog */}
      {showClearConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-mama-dark-text mb-3">Clear Exercise History</h3>
            <p className="text-mama-light-text mb-6">
              Are you sure you want to clear your entire exercise history? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="btn-outline"
                onClick={() => setShowClearConfirmation(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary bg-mama-pink text-white"
                onClick={handleClearAllHistory}
              >
                Clear All History
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default History;