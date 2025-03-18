import React from 'react';
import { Clock, Heart, AlertCircle } from 'lucide-react';
import { Exercise } from '@/lib/exercises';

export interface ExerciseListItemProps {
  exercise: Exercise;
  onComplete?: (id: string) => void;
  isCompleted?: boolean;
  onView?: (exercise: Exercise) => void;
  showViewButton?: boolean;
  actionComponent?: React.ReactNode;
}

/**
 * A component for displaying an exercise in a list format with various actions
 * Used in both QuickPick and Schedule pages
 */
const ExerciseListItem: React.FC<ExerciseListItemProps> = ({
  exercise,
  onComplete,
  isCompleted = false,
  onView,
  showViewButton = false,
  actionComponent
}) => {
  return (
    <div 
      className={`flex items-center p-4 rounded-xl transition-all ${
        isCompleted
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
      
      <div className="flex items-center ml-2">
        <div className="mr-2" aria-label="Connection tip available">
          <Heart size={18} className="text-mama-pink" />
        </div>
        
        {/* Right side action area - can be customized by parent */}
        {actionComponent || (
          <>
            {showViewButton && (
              <button 
                className="text-xs bg-mama-blue px-2 py-1 rounded-full text-mama-dark-text"
                onClick={() => onView?.(exercise)}
                aria-label={`View ${exercise.title}`}
              >
                View
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExerciseListItem;