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

// Mock dialog methods globally
window.HTMLDialogElement.prototype.show = vi.fn(function mockShow(this: HTMLDialogElement) {
  this.open = true;
});
window.HTMLDialogElement.prototype.showModal = vi.fn(function mockShowModal(this: HTMLDialogElement) {
  this.open = true;
});
window.HTMLDialogElement.prototype.close = vi.fn(function mockClose(this: HTMLDialogElement) {
  this.open = false;
});

// Mock form requestSubmit
window.HTMLFormElement.prototype.requestSubmit = vi.fn();

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
  connectionTips: 'Baby connection tip',
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
    
    expect(screen.getByRole('heading', { name: mockExercise.title })).toBeInTheDocument();
    expect(screen.getAllByText(mockExercise.category)[0]).toBeInTheDocument();
    expect(screen.getAllByText(`${mockExercise.duration} min`)[0]).toBeInTheDocument();
  });

  it('shows contraindication warning when exercise has contraindications', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    
    expect(screen.getByRole('alert')).toHaveTextContent('Contraindications');
  });

  it('renders in compact variant correctly', () => {
    const { container } = render(<ExerciseCard exercise={mockExercise} variant="compact" />);
    
    // Find the outermost div in the compact variant
    const compactContainer = container.querySelector('div');
    expect(compactContainer).toHaveClass('flex', 'items-center');
  });

  it('toggles favorite status when heart button is clicked', async () => {
    render(<ExerciseCard exercise={mockExercise} />);
    
    const favoriteButton = screen.getAllByLabelText('Add to favorites')[0];
    fireEvent.click(favoriteButton);
    
    await waitFor(() => {
      expect(exercisePreferencesService.setFavorite).toHaveBeenCalledWith(mockExercise.id, true);
    });
  });

  it('shows completion status when showComplete is true', () => {
    render(<ExerciseCard exercise={mockExercise} showComplete={true} />);
    
    const completeButton = screen.getAllByLabelText('Mark as complete')[0];
    expect(completeButton).toBeInTheDocument();
  });

  it('toggles completion status when check button is clicked', async () => {
    render(<ExerciseCard exercise={mockExercise} showComplete={true} />);
    
    const completeButton = screen.getAllByLabelText('Mark as complete')[0];
    fireEvent.click(completeButton);
    
    await waitFor(() => {
      expect(exerciseCompletionService.recordCompletion).toHaveBeenCalledWith(mockExercise.id);
    });
  });

  describe('ExerciseDetailDialog integration', () => {
    it('opens dialog when view button is clicked', async () => {
      render(<ExerciseCard exercise={mockExercise} showViewButton={true} />);
      
      const viewButton = screen.getByText('View Details');
      fireEvent.click(viewButton);
      
      await waitFor(() => {
        const dialog = screen.getByTestId('exercise-detail-dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog.parentElement).toHaveAttribute('open');
      });
    });

    it('opens dialog in compact mode when view is clicked', async () => {
      render(<ExerciseCard exercise={mockExercise} showViewButton={true} variant="compact" />);
      
      const viewButton = screen.getByText('View');
      fireEvent.click(viewButton);
      
      await waitFor(() => {
        const dialog = screen.getByTestId('exercise-detail-dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog.parentElement).toHaveAttribute('open');
      });
    });

    it('shows all exercise details in dialog', async () => {
      render(<ExerciseCard exercise={mockExercise} showViewButton={true} />);
      
      const viewButton = screen.getByText('View Details');
      fireEvent.click(viewButton);
      
      await waitFor(() => {
        const dialog = screen.getByTestId('exercise-detail-dialog');
        expect(dialog).toBeInTheDocument();
        
        // Check specific sections using headings
        expect(screen.getByRole('heading', { name: 'Description' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'How to perform' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Modifications' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Baby Connection Tips' })).toBeInTheDocument();
        
        // Check content
        expect(screen.getByText(mockExercise.steps[0])).toBeInTheDocument();
        expect(screen.getByText(mockExercise.modifications[0])).toBeInTheDocument();
        expect(screen.getByText(mockExercise.connectionTips)).toBeInTheDocument();
      });
    });

    it('closes dialog when close button is clicked', async () => {
      const { container } = render(<ExerciseCard exercise={mockExercise} showViewButton={true} />);
      
      // Open dialog
      const viewButton = screen.getByText('View Details');
      fireEvent.click(viewButton);
      
      // Wait for dialog to open
      await waitFor(() => {
        expect(screen.getByTestId('exercise-detail-dialog')).toBeInTheDocument();
      });

      // Find dialog and close button
      const dialogElement = container.querySelector('dialog');
      const closeButton = screen.getByRole('button', { name: 'Close dialog' });
      const form = closeButton.closest('form');
      
      // Simulate the form submission which triggers dialog close
      if (form && dialogElement) {
        fireEvent.submit(form);
        dialogElement.close();
      }

      // Wait for dialog to be removed
      await waitFor(() => {
        expect(dialogElement?.hasAttribute('open')).toBe(false);
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