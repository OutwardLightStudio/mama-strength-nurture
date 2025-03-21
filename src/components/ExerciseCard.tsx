import React, { useEffect, useState, useCallback } from 'react';
import { Clock, Heart, AlertCircle, Check, Calendar, User, ArrowUpRight } from 'lucide-react';
import { Exercise } from '@/lib/exercises';
import { cn } from '@/lib/utils';
import { exercisePreferencesService } from '@/lib/exercises/ExercisePreferencesService';
import { exerciseCompletionService, CompletedExercise } from '@/lib/exercises/ExerciseCompletionService';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import ExerciseDetailDialog from './ExerciseDetailDialog';

interface ExerciseCardProps {
  exercise: Exercise;
  index?: number;
  showComplete?: boolean;
  onView?: (exercise: Exercise) => void;
  showViewButton?: boolean;
  actionComponent?: React.ReactNode;
  variant?: 'default' | 'compact';
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  index = 0,
  showComplete = false,
  onView,
  showViewButton = false,
  actionComponent,
  variant = 'default'
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionId, setCompletionId] = useState<number | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadCompletionStatus = useCallback(async () => {
    try {
      const todaysCompletion = await exerciseCompletionService.getTodaysCompletion(exercise.id);
      if (todaysCompletion?.id) {
        setCompletionId(todaysCompletion.id);
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
        setCompletionId(undefined);
      }
    } catch (error) {
      console.error('Failed to load completion status:', error);
    }
  }, [exercise.id]);

  useEffect(() => {
    // Load initial favorite status
    exercisePreferencesService.isFavorite(exercise.id)
      .then(status => setIsFavorite(status))
      .catch(error => console.error('Failed to load favorite status:', error));

    // Load completion status
    if (showComplete) {
      loadCompletionStatus();
    }
  }, [exercise.id, showComplete, loadCompletionStatus]);

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent any parent click handlers from firing
    try {
      const success = await exercisePreferencesService.setFavorite(exercise.id, !isFavorite);
      if (success) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
    }
  };

  const handleCompleteClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      if (isCompleted && completionId) {
        // Remove specific completion by ID
        const success = await exerciseCompletionService.deleteCompletionById(completionId);
        if (success) {
          setIsCompleted(false);
          setCompletionId(undefined);
        }
      } else {
        // Record new completion
        const newCompletionId = await exerciseCompletionService.recordCompletion(exercise.id);
        
        if (newCompletionId === undefined) {
          // Exercise was already completed today
          toast({
            title: "Already Completed Today",
            description: "This exercise has already been recorded for today.",
            variant: "default"
          });
          // Refresh completion status to show the existing completion
          await loadCompletionStatus();
        } else {
          const completion = await exerciseCompletionService.getCompletionById(newCompletionId);
          if (completion) {
            setCompletionId(newCompletionId);
            setIsCompleted(true);
          }
        }
      }
    } catch (error) {
      console.error('Failed to toggle completion status:', error);
      toast({
        title: "Error",
        description: "Failed to update exercise completion status.",
        variant: "destructive"
      });
    }
  };

  const handleViewClick = () => {
    if (onView) {
      onView(exercise);
    } else {
      setIsDialogOpen(true);
    }
  };

  if (variant === 'compact') {
    return (
      <>
        <div 
          className={cn(
            "flex items-center p-4 rounded-xl transition-all",
            isCompleted ? "bg-mama-light-blue" : "bg-mama-beige bg-opacity-30 hover:bg-opacity-50"
          )}
        >
          <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0">
            <img 
              src={exercise.image} 
              alt={exercise.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-mama-dark-text font-medium">{exercise.title}</h3>
            <div className="flex items-center mt-1 flex-wrap gap-1">
              <span className="text-xs bg-white px-2 py-0.5 rounded text-mama-light-text">
                {exercise.category}
              </span>
              <span className="text-xs text-mama-light-text flex items-center">
                <Clock size={12} className="mr-0.5" /> {exercise.duration} min
              </span>
              {exercise.contraindications && exercise.contraindications.length > 0 && (
                <span className="text-xs text-mama-pink flex items-center" role="alert">
                  <AlertCircle size={12} className="mr-0.5" /> Contraindications
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center ml-2 gap-2">
            <button 
              onClick={handleFavoriteClick}
              className="transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                size={18} 
                className={cn(
                  "transition-colors",
                  isFavorite ? "fill-mama-dark-pink text-mama-dark-pink" : "text-mama-dark-pink"
                )} 
              />
            </button>

            {showComplete && (
              <button
                onClick={handleCompleteClick}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  isCompleted ? "bg-mama-dark-blue text-white" : "bg-white text-mama-dark-blue hover:text-mama-dark-blue"
                )}
                aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
              >
                <Check size={16} />
              </button>
            )}
            
            {actionComponent || (
              showViewButton && (
                <button 
                  className="text-xs bg-mama-blue px-2 py-1 rounded-full text-mama-dark-text"
                  onClick={handleViewClick}
                  aria-label={`View ${exercise.title}`}
                >
                  View
                </button>
              )
            )}
          </div>
        </div>
        
        {/* Exercise Detail Dialog */}
        <ExerciseDetailDialog 
          exercise={exercise} 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          isFavorite={isFavorite}
          onFavoriteToggle={handleFavoriteClick}
          isCompleted={isCompleted}
          onCompleteToggle={handleCompleteClick}
          showComplete={showComplete}
        />
      </>
    );
  }

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="aspect-w-16 aspect-h-9 relative">
          <img 
            src={exercise.image} 
            alt={exercise.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button 
              onClick={handleFavoriteClick}
              className="p-2 bg-white bg-opacity-80 rounded-full transition-colors hover:bg-opacity-100"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                size={18} 
                className={cn(
                  "transition-colors",
                  isFavorite ? "fill-mama-dark-pink text-mama-dark-pink" : "text-mama-dark-pink"
                )} 
              />
            </button>

            {showComplete && (
              <button
                onClick={handleCompleteClick}
                className={cn(
                  "p-2 bg-white bg-opacity-80 rounded-full transition-colors hover:bg-opacity-100",
                  isCompleted ? "text-mama-dark-blue" : "text-mama-dark-blue"
                )}
                aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
              >
                <Check size={18} />
              </button>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-mama-dark-text mb-2">{exercise.title}</h3>
          
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <span className="text-xs bg-mama-beige bg-opacity-30 px-2 py-0.5 rounded">
              {exercise.category}
            </span>
            <span className="text-xs text-mama-light-text flex items-center">
              <Clock size={12} className="mr-0.5" /> {exercise.duration} min
            </span>
            {exercise.contraindications && exercise.contraindications.length > 0 && (
              <span className="text-xs text-mama-pink flex items-center" role="alert">
                <AlertCircle size={12} className="mr-0.5" /> Contraindications
              </span>
            )}
          </div>
          
          <p className="text-sm text-mama-light-text line-clamp-2">{exercise.description}</p>

          {(actionComponent || showViewButton) && (
            <div className="mt-4">
              {actionComponent || (
                <button 
                  className="text-sm bg-mama-blue px-3 py-1.5 rounded-full text-mama-dark-text hover:bg-mama-dark-blue transition-colors"
                  onClick={handleViewClick}
                  aria-label={`View ${exercise.title}`}
                >
                  View Details
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Exercise Detail Dialog */}
      <ExerciseDetailDialog 
        exercise={exercise} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteClick}
        isCompleted={isCompleted}
        onCompleteToggle={handleCompleteClick}
        showComplete={showComplete}
      />
    </>
  );
};

export default ExerciseCard;
