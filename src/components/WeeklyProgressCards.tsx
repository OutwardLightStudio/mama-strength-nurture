import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { exerciseCompletionService, CompletedExercise } from '@/lib/exercises/ExerciseCompletionService';

interface WeeklyProgressCardsProps {
  className?: string;
}

interface DayStatus {
  date: Date;
  hasExercises: boolean;
  dayName: string;
  dayNumber: string;
  isToday: boolean;
}

const WeeklyProgressCards: React.FC<WeeklyProgressCardsProps> = ({ className }) => {
  const [days, setDays] = useState<DayStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLastSevenDays() {
      setLoading(true);
      try {
        // Generate array of the last 7 days
        const lastSevenDays: DayStatus[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Date 7 days ago
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 6);

        // Get all completions from the past 7 days
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const completions = await exerciseCompletionService.getCompletionsInRange(startDate, tomorrow);
        
        // Group completions by date (using date string as key)
        const completionsByDate = completions.reduce((acc, completion) => {
          const dateStr = completion.completedAt.toDateString();
          if (!acc[dateStr]) {
            acc[dateStr] = [];
          }
          acc[dateStr].push(completion);
          return acc;
        }, {} as Record<string, CompletedExercise[]>);

        // Generate data for each day
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          
          const dateStr = date.toDateString();
          const isToday = date.toDateString() === today.toDateString();
          
          lastSevenDays.push({
            date,
            hasExercises: !!completionsByDate[dateStr]?.length,
            dayName: date.toLocaleDateString(undefined, { weekday: 'short' }),
            dayNumber: date.getDate().toString(),
            isToday
          });
        }

        setDays(lastSevenDays);
      } catch (error) {
        console.error('Failed to fetch weekly progress:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLastSevenDays();
  }, []);

  if (loading) {
    return (
      <div className={cn("flex justify-center space-x-2 py-4", className)}>
        {[...Array(7)].map((_, i) => (
          <div 
            key={i}
            className="w-12 h-16 bg-mama-beige bg-opacity-20 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex justify-between space-x-2", className)}>
      {days.map((day, index) => (
        <div 
          key={index}
          role="listitem"
          data-testid={day.isToday ? "today-card" : `day-card-${index}`}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg p-2 transition-all w-12",
            day.isToday 
              ? "bg-mama-light-pink" 
              : day.hasExercises 
                ? "bg-mama-light-blue" 
                : "bg-mama-beige bg-opacity-20"
          )}
          aria-label={`${day.dayName} ${day.dayNumber}${day.hasExercises ? ', exercises completed' : ''}`}
        >
          <span className={cn(
            "text-xs font-medium",
            day.isToday 
              ? "text-mama-dark-text" 
              : "text-mama-light-text"
          )}>
            {day.dayName}
          </span>
          <span className={cn(
            "text-lg font-medium",
            day.isToday 
              ? "text-mama-dark-text" 
              : "text-mama-light-text"
          )}>
            {day.dayNumber}
          </span>
          {day.hasExercises && (
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center mt-1",
              day.isToday 
                ? "bg-mama-pink text-white" 
                : "bg-mama-blue text-white"
            )}>
              <Check size={14} aria-hidden="true" data-testid="check-icon" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeeklyProgressCards;