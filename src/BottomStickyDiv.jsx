import React, { useEffect, useRef } from 'react';

const BottomStickyDiv = () => {
  const divRef = useRef(null);

  // Add fade-in animation when the component mounts
  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.classList.add('fade-in');
    }
  }, []);

  return (
    <div ref={divRef} className="relative fade-in">
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm transition-all duration-500"
      />
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent h-px w-3/4 opacity-75 transition-all duration-500"
      />
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent h-[5px] w-1/4 blur-sm opacity-80 transition-all duration-500"
      />
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-gradient-to-r from-transparent via-sky-300 to-transparent h-px w-1/4 opacity-60 transition-all duration-500"
      />
    </div>
  );
};

export default BottomStickyDiv;
