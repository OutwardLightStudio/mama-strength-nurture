import React from 'react';
import { Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { Exercise } from '@/lib/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, index }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-soft overflow-hidden h-full card-hover animate-fade-in"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        <img 
          src={exercise.image}
          alt={exercise.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-xs font-medium text-mama-dark-text">
            {exercise.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center text-mama-light-text text-sm mb-2">
          <Clock size={14} className="mr-1" />
          <span>{exercise.duration} minutes</span>
        </div>
        
        <h3 className="text-lg font-semibold text-mama-dark-text mb-2">{exercise.title}</h3>
        
        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-mama-light-text mb-1">Requirements</h4>
            <div className="flex flex-wrap gap-1">
              {exercise.requirements.map((req, i) => (
                <span key={i} className="text-xs bg-mama-beige px-2 py-1 rounded-md text-mama-dark-text">
                  {req}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-wider text-mama-light-text mb-1">Benefits</h4>
            <div className="flex flex-wrap gap-1">
              {exercise.benefits.map((benefit, i) => (
                <span key={i} className="text-xs bg-mama-light-blue px-2 py-1 rounded-md text-mama-dark-text">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          
          {exercise.contraindications && exercise.contraindications.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-mama-light-text mb-1 flex items-center">
                <AlertCircle size={12} className="mr-1 text-mama-pink" />
                Contraindications
              </h4>
              <div className="flex flex-wrap gap-1">
                {exercise.contraindications.slice(0, 3).map((contraindication, i) => (
                  <span key={i} className="text-xs bg-mama-light-pink px-2 py-1 rounded-md text-mama-dark-text">
                    {contraindication}
                  </span>
                ))}
                {exercise.contraindications.length > 3 && (
                  <span className="text-xs bg-mama-light-pink px-2 py-1 rounded-md text-mama-dark-text">
                    +{exercise.contraindications.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-mama-beige">
          <h4 className="text-xs uppercase tracking-wider text-mama-light-text mb-2">Connection Tip</h4>
          <p className="text-sm text-mama-dark-text italic">"{exercise.connectionTips[0]}"</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
