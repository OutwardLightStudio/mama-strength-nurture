import React from 'react';
import { Clock, Heart, AlertCircle, Check, Calendar, User, ArrowUpRight } from 'lucide-react';
import { Exercise } from '@/lib/exercises';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

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
        data-testid="exercise-detail-dialog"
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
              data-testid="dialog-close-button"
            >
              Close <ArrowUpRight size={14} />
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseDetailDialog;