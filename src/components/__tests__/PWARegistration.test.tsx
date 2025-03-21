import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { PWARegistration } from '../PWARegistration';
import * as toastModule from '../ui/use-toast';

// Mock the virtual:pwa-register/react module
vi.mock('virtual:pwa-register/react', () => {
  return {
    useRegisterSW: vi.fn().mockImplementation((options) => {
      // Call the callbacks immediately for testing
      if (options?.onOfflineReady) {
        setTimeout(() => options.onOfflineReady(), 0);
      }
      if (options?.onNeedRefresh) {
        setTimeout(() => options.onNeedRefresh(), 0);
      }
      
      return {
        registerSW: vi.fn(),
        offlineReady: [false, vi.fn()],
        needRefresh: [false, vi.fn()],
        updateServiceWorker: vi.fn()
      };
    })
  };
});

// Mock toast module
vi.mock('../ui/use-toast', () => ({
  toast: vi.fn()
}));

describe('PWARegistration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<PWARegistration />);
    expect(container).toBeDefined();
  });

  it('registers service worker hooks', async () => {
    render(<PWARegistration />);
    
    // Wait for the next tick to allow the callbacks to be executed
    await act(() => new Promise(resolve => setTimeout(resolve, 10)));
    
    // Check if toast was called at least once for each notification
    expect(toastModule.toast).toHaveBeenCalled();
    
    // Check if one of the calls was for offline ready
    const offlineReadyCall = vi.mocked(toastModule.toast).mock.calls.some(
      call => call[0].title === 'App ready for offline use'
    );
    expect(offlineReadyCall).toBe(true);
    
    // Check if one of the calls was for new content
    const newContentCall = vi.mocked(toastModule.toast).mock.calls.some(
      call => call[0].title === 'New content available'
    );
    expect(newContentCall).toBe(true);
  });
});