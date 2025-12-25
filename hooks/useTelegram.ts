
import { useEffect, useState } from 'react';

const tg = (window as any).Telegram?.WebApp;

export function useTelegram() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      setUser(tg.initDataUnsafe?.user);
    }
  }, []);

  const onClose = () => {
    tg?.close();
  };

  const onToggleButton = () => {
    if (tg?.MainButton.isVisible) {
      tg?.MainButton.hide();
    } else {
      tg?.MainButton.show();
    }
  };

  const setMainButton = (text: string, onClick: () => void) => {
    if (!tg) return;
    tg.MainButton.setText(text);
    tg.MainButton.onClick(onClick);
    tg.MainButton.show();
  };

  const hideMainButton = () => {
    tg?.MainButton.hide();
  };

  const showBackButton = (onClick: () => void) => {
    if (!tg) return;
    tg.BackButton.show();
    tg.BackButton.onClick(onClick);
  };

  const hideBackButton = () => {
    tg?.BackButton.hide();
  };

  const showAlert = (message: string) => {
    tg?.showAlert(message);
  };

  return {
    tg,
    user,
    onClose,
    onToggleButton,
    setMainButton,
    hideMainButton,
    showBackButton,
    hideBackButton,
    showAlert,
    themeParams: tg?.themeParams,
  };
}
