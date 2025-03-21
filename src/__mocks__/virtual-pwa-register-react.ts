import React, { Ref } from 'react';

export interface RegisterSWOptions {
  immediate?: boolean;
  onNeedRefresh?: () => void;
  onOfflineReady?: () => void;
  onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
  onRegisterError?: (error: Error) => void;
}

export function useRegisterSW(options?: RegisterSWOptions) {
  // Call the callbacks immediately for testing purposes
  setTimeout(() => {
    options?.onOfflineReady?.();
    options?.onNeedRefresh?.();
    options?.onRegistered?.(undefined);
  }, 0);

  return {
    registerSW: () => Promise.resolve(),
    offlineReady: [React.useRef(false), (value: boolean) => {}] as [Ref<boolean>, (value: boolean) => void],
    needRefresh: [React.useRef(false), (value: boolean) => {}] as [Ref<boolean>, (value: boolean) => void],
    updateServiceWorker: (reloadPage?: boolean) => Promise.resolve()
  };
}