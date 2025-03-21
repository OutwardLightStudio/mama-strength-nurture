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
          
          <div className="flex-grow">
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
                  isFavorite ? "fill-mama-pink text-mama-pink" : "text-mama-pink"
                )} 
              />
            </button>

            {showComplete && (
              <button
                onClick={handleCompleteClick}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  isCompleted ? "bg-mama-blue text-white" : "bg-white text-mama-light-text hover:text-mama-blue"
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
                  isFavorite ? "fill-mama-pink text-mama-pink" : "text-mama-pink"
                )} 
              />
            </button>

            {showComplete && (
              <button
                onClick={handleCompleteClick}
                className={cn(
                  "p-2 bg-white bg-opacity-80 rounded-full transition-colors hover:bg-opacity-100",
                  isCompleted ? "text-mama-blue" : "text-mama-light-text"
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

interface ExerciseDetailDialogProps {
  exercise: Exercise;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (event: React.MouseEvent) => void;
  isCompleted: boolean;
  onCompleteToggle: (event: React.MouseEvent) => void;
  showComplete: boolean;
}

const ExerciseDetailDialog: React.FC<ExerciseDetailDialogProps> = ({
  exercise,
  isOpen,
  onClose,
  isFavorite,
  onFavoriteToggle,
  isCompleted,
  onCompleteToggle,
  showComplete
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="bg-white rounded-2xl shadow-medium max-w-3xl w-full p-0 overflow-hidden daisy-modal"
        aria-describedby={`exercise-${exercise.id}-description`}
      >
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>{exercise.title}</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>

        <div className="relative w-full aspect-video max-h-64 overflow-hidden">
          <img 
            src={exercise.image} 
            alt={`Demonstration of ${exercise.title}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="text-2xl font-semibold">{exercise.title}</h2>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={onFavoriteToggle}
              className="p-2 bg-white bg-opacity-80 rounded-full transition-colors hover:bg-opacity-100 daisy-btn daisy-btn-circle"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                size={20} 
                className={cn(
                  "transition-colors",
                  isFavorite ? "fill-mama-pink text-mama-pink" : "text-mama-pink"
                )} 
              />
            </button>

            {showComplete && (
              <button
                onClick={onCompleteToggle}
                className={cn(
                  "p-2 bg-white bg-opacity-80 rounded-full transition-colors hover:bg-opacity-100 daisy-btn daisy-btn-circle",
                  isCompleted ? "text-mama-blue" : "text-mama-light-text"
                )}
                aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
              >
                <Check size={20} />
              </button>
            )}
          </div>
        </div>
        
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-mama-beige bg-opacity-30 hover:bg-mama-beige text-mama-dark-text">
              {exercise.category}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock size={13} /> {exercise.duration} min
            </Badge>
            {exercise.level && (
              <Badge variant="outline" className="flex items-center gap-1">
                <User size={13} /> {exercise.level}
              </Badge>
            )}
          </div>
        </DialogHeader>
        
        <div id={`exercise-${exercise.id}-description`} className="px-6 py-4 daisy-modal-body">
          {exercise.contraindications && exercise.contraindications.length > 0 && (
            <div className="mb-4 p-3 bg-mama-light-pink rounded-lg border border-mama-pink" role="alert">
              <div className="font-semibold text-mama-dark-text flex items-center mb-1">
                <AlertCircle size={16} className="mr-1.5 text-mama-pink" /> Contraindications
              </div>
              <ul className="text-sm text-mama-dark-text list-disc pl-5">
                {exercise.contraindications.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-mama-dark-text mb-2">Description</h3>
            <p className="text-mama-light-text">{exercise.description}</p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-mama-dark-text mb-2">How to perform</h3>
            <ol className="text-mama-light-text list-decimal pl-5 space-y-2">
              {exercise.steps?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
          
          {exercise.modifications && (
            <>
              <Separator className="my-4" />
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-mama-dark-text mb-2">Modifications</h3>
                <ul className="text-mama-light-text list-disc pl-5 space-y-1">
                  {exercise.modifications.map((mod, idx) => (
                    <li key={idx}>{mod}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
          
          {exercise.connectionTips && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="text-lg font-semibold text-mama-dark-text flex items-center mb-2">
                  <Heart size={16} className="mr-1.5 text-mama-pink" fill="#F9D5CE" /> Baby Connection Tips
                </h3>
                <p className="text-mama-light-text">{exercise.connectionTips}</p>
              </div>
            </>
          )}
        </div>
        
        <DialogFooter className="bg-mama-beige bg-opacity-30 p-4 daisy-modal-footer">
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-mama-light-text flex items-center">
              <Calendar size={14} className="mr-1" />
              {exercise.postpartumPhase ? `Recommended for ${exercise.postpartumPhase}` : 'Suitable for all postpartum phases'}
            </div>
            <button 
              onClick={onClose}
              className="daisy-btn daisy-btn-sm text-xs bg-mama-blue text-mama-dark-text hover:bg-mama-dark-blue px-3 py-1 rounded-full transition-colors flex items-center gap-1"
            >
              Close <ArrowUpRight size={14} />
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseCard;
