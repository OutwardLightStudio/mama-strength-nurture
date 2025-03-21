import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import '@/lib/db/test-setup';
import ExerciseCard from '../ExerciseCard';
import { exercisePreferencesService } from '@/lib/exercises/ExercisePreferencesService';
import { exerciseCompletionService } from '@/lib/exercises/ExerciseCompletionService';
import { Exercise, ExerciseBenefit, ExerciseCategory, ExerciseContraindication, ExerciseRequirement } from '@/lib/exercises';

// Mock the services
vi.mock('@/lib/exercises/ExercisePreferencesService', () => ({
  exercisePreferencesService: {
    isFavorite: vi.fn(),
    setFavorite: vi.fn()
  }
}));

vi.mock('@/lib/exercises/ExerciseCompletionService', () => ({
  exerciseCompletionService: {
    getTodaysCompletion: vi.fn(),
    getCompletionById: vi.fn(),
    recordCompletion: vi.fn(),
    deleteCompletionById: vi.fn()
  }
}));

// Mock exercise data
const mockExercise: Exercise = {
  id: 'test-exercise-1',
  requirements: [ExerciseRequirement.CHAIR],
  benefits: [ExerciseBenefit.FLEXIBILITY],
  title: 'Test Exercise',
  description: 'A test exercise description',
  category: ExerciseCategory.CARDIO,
  duration: 10,
  image: '/placeholder.svg',
  steps: ['Step 1', 'Step 2'],
  contraindications: [ExerciseContraindication.BACK_PAIN],
  modifications: ['Modification 1'],
  connectionTips: ['Connection tip',],
  postpartumPhase: ['Early postpartum',]
};

describe('ExerciseCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementations
    vi.mocked(exercisePreferencesService.isFavorite).mockResolvedValue(false);
    vi.mocked(exercisePreferencesService.setFavorite).mockResolvedValue(true);
    vi.mocked(exerciseCompletionService.getTodaysCompletion).mockResolvedValue(null);
    vi.mocked(exerciseCompletionService.recordCompletion).mockResolvedValue(1);
    vi.mocked(exerciseCompletionService.getCompletionById).mockResolvedValue({
      id: 1,
      exerciseId: mockExercise.id,
      completedAt: new Date()
    });
  });

  it('renders exercise card with basic information', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    
    expect(screen.getByText(mockExercise.title)).toBeInTheDocument();
    expect(screen.getByText(mockExercise.category)).toBeInTheDocument();
    expect(screen.getByText(`${mockExercise.duration} min`)).toBeInTheDocument();
  });

  it('shows contraindication warning when exercise has contraindications', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    
    expect(screen.getByText('Contraindications')).toBeInTheDocument();
  });

  it('renders in compact variant correctly', () => {
    const { container } = render(<ExerciseCard exercise={mockExercise} variant="compact" />);
    
    // Find the outermost div in the compact variant
    const compactContainer = container.querySelector('div');
    expect(compactContainer).toHaveClass('flex', 'items-center');
  });

  it('toggles favorite status when heart button is clicked', async () => {
    render(<ExerciseCard exercise={mockExercise} />);
    
    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);
    
    await waitFor(() => {
      expect(exercisePreferencesService.setFavorite).toHaveBeenCalledWith(mockExercise.id, true);
    });
  });

  it('shows completion status when showComplete is true', () => {
    render(<ExerciseCard exercise={mockExercise} showComplete={true} />);
    
    expect(screen.getByLabelText('Mark as complete')).toBeInTheDocument();
  });

  it('toggles completion status when check button is clicked', async () => {
    render(<ExerciseCard exercise={mockExercise} showComplete={true} />);
    
    const completeButton = screen.getByLabelText('Mark as complete');
    fireEvent.click(completeButton);
    
    await waitFor(() => {
      expect(exerciseCompletionService.recordCompletion).toHaveBeenCalledWith(mockExercise.id);
    });
  });

  describe('ExerciseDetailDialog integration', () => {
    it('opens dialog when view button is clicked', async () => {
      render(<ExerciseCard exercise={mockExercise} showViewButton={true} />);
      
      const viewButton = screen.getByLabelText(`View ${mockExercise.title}`);
      fireEvent.click(viewButton);
      
      await waitFor(() => {
        const dialog = screen.getByTestId('exercise-detail-dialog');
        expect(dialog).toBeInTheDocument();
      });
    });

    it('shows all exercise details in dialog', async () => {
      render(<ExerciseCard exercise={mockExercise} showViewButton={true} />);
      
      const viewButton = screen.getByLabelText(`View ${mockExercise.title}`);
      fireEvent.click(viewButton);
      
      await waitFor(() => {
        const dialog = screen.getByTestId('exercise-detail-dialog');
        expect(dialog).toBeInTheDocument();
        
        // Check specific sections using headings
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('How to perform')).toBeInTheDocument();
        expect(screen.getByText('Modifications')).toBeInTheDocument();
        expect(screen.getByText('Baby Connection Tips')).toBeInTheDocument();
        
        // Check content
        expect(screen.getByText(mockExercise.steps[0])).toBeInTheDocument();
        expect(screen.getByText(mockExercise.modifications[0])).toBeInTheDocument();
        mockExercise.connectionTips.forEach((tip) => {
          expect(screen.getByText(tip)).toBeInTheDocument();
        });
      });
    });

    it('closes dialog when close button is clicked', async () => {
      render(<ExerciseCard exercise={mockExercise} showViewButton={true} />);
      
      const viewButton = screen.getByLabelText(`View ${mockExercise.title}`);
      fireEvent.click(viewButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('exercise-detail-dialog')).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('dialog-close-button');
      fireEvent.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByTestId('exercise-detail-dialog')).not.toBeInTheDocument();
      });
    });

    it('maintains favorite and completion status in dialog', async () => {
      // Mock exercise as favorite
      vi.mocked(exercisePreferencesService.isFavorite).mockResolvedValue(true);
      
      render(<ExerciseCard exercise={mockExercise} showViewButton={true} showComplete={true} />);
      
      // Open dialog
      fireEvent.click(screen.getByText('View Details'));
      
      await waitFor(() => {
        // Verify favorite status is maintained in dialog
        const favoriteButton = screen.getAllByLabelText('Remove from favorites');
        expect(favoriteButton.length).toBeGreaterThan(0);
      });
    });
  });
});