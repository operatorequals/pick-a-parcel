import { useEffect, useRef, useState } from 'react';

export const useVisibleComponents = (options = {}) => {
  const [visibleComponents, setVisibleComponents] = useState(new Set());
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target;

          setVisibleComponents((prev) => {
            const updated = new Set(prev);

            if (entry.isIntersecting) {
              updated.add(index); // Add index if visible
            } else {
              updated.delete(index); // Remove index if not visible
            }

            // Only update if the size has changed
            return updated.size !== prev.size ? updated : prev;
          });
        });
      },
      options
    );

    const effectCleanup = refs.current
    // Observe the elements
    Object.values(refs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // Clean up the observer on unmount
      Object.values(effectCleanup).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [options]);

  return [refs,
  Array.from(visibleComponents).sort((a, b) => a.id >= b.id)
  ]; // Convert Set to Array for easier use
};
