import { useEffect, useRef, useState } from 'react';

export const useVisibleComponents = (options = {}) => {
  const [visibleComponents, setVisibleComponents] = useState([]);
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target;
          if (entry.isIntersecting) {
            setVisibleComponents((prev) => [...new Set([...prev, index])]);
          } else {
            setVisibleComponents((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      options
    );

    const cleanupEffect = refs.current
    Object.entries(refs.current).forEach(([id, ref]) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.entries(cleanupEffect).forEach(([id, ref]) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [options, setVisibleComponents]);

  return [refs, visibleComponents];
};
