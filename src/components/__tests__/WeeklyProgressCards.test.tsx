import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@/lib/db/test-setup';
import WeeklyProgressCards from '../WeeklyProgressCards';
import { exerciseCompletionService } from '@/lib/exercises/ExerciseCompletionService';

// Mock the exerciseCompletionService
vi.mock('@/lib/exercises/ExerciseCompletionService', () => {
  return {
    exerciseCompletionService: {
      getCompletionsInRange: vi.fn()
    }
  };
});

describe('WeeklyProgressCards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state initially', () => {
    // Mock the service to return a promise that never resolves
    vi.mocked(exerciseCompletionService.getCompletionsInRange).mockReturnValue(new Promise(() => {}));
    
    render(<WeeklyProgressCards />);
    
    // Should show loading skeleton placeholders
    expect(screen.getAllByClass('animate-pulse').length).toBeGreaterThan(0);
  });

  it('should display cards for the last 7 days', async () => {
    // Mock the service to return empty completions
    vi.mocked(exerciseCompletionService.getCompletionsInRange).mockResolvedValue([]);
    
    render(<WeeklyProgressCards />);
    
    await waitFor(() => {
      // Should display 7 day cards once loaded
      expect(screen.getAllByRole('listitem').length).toBe(7);
    });
  });

  it('should show checkmarks for days with exercises', async () => {
    // Create a date for 2 days ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    // Mock service to return one completion from 2 days ago
    vi.mocked(exerciseCompletionService.getCompletionsInRange).mockResolvedValue([
      { id: 1, exerciseId: 'test-1', completedAt: twoDaysAgo }
    ]);
    
    render(<WeeklyProgressCards />);
    
    await waitFor(() => {
      // After loading, we should see one card with a check icon
      const checkIcons = screen.getAllByTestId('check-icon');
      expect(checkIcons.length).toBe(1);
    });
  });

  it('should highlight today with a different color', async () => {
    // Mock service to return empty completions
    vi.mocked(exerciseCompletionService.getCompletionsInRange).mockResolvedValue([]);
    
    render(<WeeklyProgressCards />);
    
    await waitFor(() => {
      // Today's card should have the today class
      const todayCard = screen.getByTestId('today-card');
      expect(todayCard).toHaveClass('bg-mama-light-pink');
    });
  });
});