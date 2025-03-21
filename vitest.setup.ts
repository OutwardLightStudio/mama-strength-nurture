import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock virtual modules for PWA
vi.mock('virtual:pwa-register/react', () => {
  return {
    useRegisterSW: vi.fn().mockImplementation((options) => {
      // Call the callbacks immediately for testing
      setTimeout(() => {
        options?.onOfflineReady?.();
        options?.onNeedRefresh?.();
        options?.onRegistered?.(undefined);
      }, 0);
      
      return {
        registerSW: vi.fn(),
        offlineReady: [false, vi.fn()],
        needRefresh: [false, vi.fn()],
        updateServiceWorker: vi.fn()
      };
    })
  };
});