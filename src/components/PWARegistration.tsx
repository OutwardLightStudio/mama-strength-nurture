import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

export function PWARegistration() {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  const {
    registerSW,
    offlineReady: swOfflineReady,
    needRefresh: swNeedRefresh,
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
    onOfflineReady() {
      setOfflineReady(true);
      toast({
        title: "App ready for offline use",
        description: "MamaStrong can now be used without an internet connection.",
      });
    },
    onNeedRefresh() {
      setNeedRefresh(true);
      toast({
        title: "New content available",
        description: "Click the update button to get the latest version.",
        action: (
          <Button
            variant="default"
            onClick={() => updateServiceWorker(true)}
          >
            Update
          </Button>
        ),
      });
    }
  });

  return null; // This component doesn't render anything visible
}