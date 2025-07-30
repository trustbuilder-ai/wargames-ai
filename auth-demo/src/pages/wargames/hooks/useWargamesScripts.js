import { useEffect } from 'react';

const useWargamesScripts = () => {
  useEffect(() => {
    // Track loaded scripts to avoid duplicates
    const loadedScripts = [];

    // Load Tailwind CSS
    const loadTailwind = () => {
      if (!document.querySelector('script[src*="tailwindcss.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.tailwindcss.com';
        script.async = true;
        document.head.appendChild(script);
        loadedScripts.push(script);
        
        // Configure Tailwind to only apply to wargames container
        script.onload = () => {
          if (window.tailwind && window.tailwind.config) {
            window.tailwind.config = {
              ...window.tailwind.config,
              important: '.wargames-challenge-container',
            };
          }
        };
      }
    };

    // Load Flowbite
    const loadFlowbite = () => {
      if (!document.querySelector('script[src*="flowbite"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/flowbite@2.0.0/dist/flowbite.min.js';
        script.async = true;
        document.body.appendChild(script);
        loadedScripts.push(script);
      }
    };

    // Load Lucide Icons
    const loadLucide = () => {
      if (!document.querySelector('script[src*="lucide"]')) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
        script.async = true;
        script.onload = () => {
          if (window.lucide) {
            // Initialize icons after a short delay to ensure DOM is ready
            setTimeout(() => {
              window.lucide.createIcons();
            }, 100);
          }
        };
        document.body.appendChild(script);
        loadedScripts.push(script);
      } else if (window.lucide) {
        // If already loaded, just create icons
        setTimeout(() => {
          window.lucide.createIcons();
        }, 100);
      }
    };

    // Load Google Fonts
    const loadFonts = () => {
      if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = 'https://fonts.googleapis.com';
        document.head.appendChild(link);

        const link2 = document.createElement('link');
        link2.rel = 'preconnect';
        link2.href = 'https://fonts.gstatic.com';
        link2.crossOrigin = 'anonymous';
        document.head.appendChild(link2);

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
        loadedScripts.push(fontLink);
      }
    };

    // Load all scripts
    loadFonts();
    loadTailwind();
    loadFlowbite();
    loadLucide();

    // Re-initialize Lucide icons when DOM changes with debouncing
    let iconUpdateTimeout;
    const observer = new MutationObserver((mutations) => {
      // Check if any mutations actually added new elements that might need icons
      const hasNewElements = mutations.some(mutation => 
        mutation.type === 'childList' && mutation.addedNodes.length > 0
      );
      
      if (hasNewElements && window.lucide) {
        // Debounce icon creation to prevent infinite loops
        clearTimeout(iconUpdateTimeout);
        iconUpdateTimeout = setTimeout(() => {
          window.lucide.createIcons();
        }, 100);
      }
    });

    // Only observe the wargames container, not the entire body
    // Use setTimeout to ensure the container is rendered
    const observerTimeout = setTimeout(() => {
      const wargamesContainer = document.querySelector('.wargames-challenge-container');
      if (wargamesContainer) {
        observer.observe(wargamesContainer, {
          childList: true,
          subtree: true
        });
      }
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(iconUpdateTimeout);
      clearTimeout(observerTimeout);
      observer.disconnect();
      // Note: We don't remove the scripts as they might be used elsewhere
      // and removing them could cause issues
    };
  }, []);
};

export default useWargamesScripts;