
import { useEffect, useState } from 'react';

export function usePlatform() {
  const [platform, setPlatform] = useState<'tg' | 'vk' | 'web'>('web');
  const [user, setUser] = useState<any>(null);

  const tg = (window as any).Telegram?.WebApp;
  const vk = (window as any).vkBridge;

  useEffect(() => {
    if (tg && tg.initData) {
      setPlatform('tg');
      tg.ready();
      tg.expand();
      setUser(tg.initDataUnsafe?.user);
    } else if (vk) {
      setPlatform('vk');
      vk.send("VKWebAppInit")
        .then(() => {
          return vk.send("VKWebAppGetUserInfo");
        })
        .then((data: any) => {
          setUser(data);
          document.body.classList.add('vk-app');
        })
        .catch((err: any) => console.error("VK Init error", err));
    }
  }, []);

  const showAlert = (message: string) => {
    if (platform === 'tg') {
      tg.showAlert(message);
    } else if (platform === 'vk') {
      vk.send("VKWebAppShowWallPostBox", { message: message }); // Just as example, usually use custom toast
      alert(message);
    } else {
      alert(message);
    }
  };

  const showBackButton = (onClick: () => void) => {
    if (platform === 'tg') {
      tg.BackButton.show();
      tg.BackButton.onClick(onClick);
    }
    // VK uses bridge to subscribe to history changes or custom UI
  };

  const hideBackButton = () => {
    if (platform === 'tg') tg.BackButton.hide();
  };

  return {
    platform,
    user,
    showAlert,
    showBackButton,
    hideBackButton,
    tg,
    vk
  };
}
