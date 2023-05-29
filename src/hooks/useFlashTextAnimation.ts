import { useEffect, useRef } from 'react';

export const useFlashTextAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const callback: MutationCallback = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          mutation.target.parentElement?.animate(
            [
              { textShadow: '0px 0px 10px #ec4899', color: '#ec4899', transform: 'scale(1.1)' },
              { textShadow: '0px 0px 10px #ec4899', color: '#ec4899', transform: 'scale(1.1)' },
            ],
            {
              duration: 300,
            }
          );
        }
      });
    };
    const observer = new MutationObserver(callback);
    observer.observe(ref.current, {
      characterData: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
};
