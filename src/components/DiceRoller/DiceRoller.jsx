import { useState, useEffect, useRef } from 'react';

const DiceRoller = ({ position, setPosition }) => {
  const [diceCount, setDiceCount] = useState(1);
  const [diceValues, setDiceValues] = useState([null]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollAnimation, setRollAnimation] = useState(0);
  const [size, setSize] = useState({ width: 400, height: 800 });
  const containerRef = useRef(null);
  const resizeHandleRef = useRef(null);
  
  // Import Bangers font
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bangers&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  // Define colors and animations for each number
  const diceStyles = {
    1: { 
      backgroundColor: 'bg-red-500',
      animation: 'animate-bounce'
    },
    2: { 
      backgroundColor: 'bg-blue-500',
      animation: 'animate-pulse'
    },
    3: { 
      backgroundColor: 'bg-green-500',
      animation: 'animate-spin'
    },
    4: { 
      backgroundColor: 'bg-yellow-500',
      animation: 'animate-bounce'
    },
    5: { 
      backgroundColor: 'bg-purple-500',
      animation: 'animate-pulse'
    },
    6: { 
      backgroundColor: 'bg-pink-500',
      animation: 'animate-spin'
    }
  };
  
  // Custom animation for entry
  const entranceAnimations = {
    1: 'animate-slideInFromLeft',
    2: 'animate-slideInFromRight',
    3: 'animate-slideInFromTop',
    4: 'animate-slideInFromBottom',
    5: 'animate-zoomIn',
    6: 'animate-flipIn'
  };
  
  // Colors for rolling animation
  const diceColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500'
  ];
  
  // Update dice values when dice count changes
  useEffect(() => {
    setDiceValues(Array(diceCount).fill(null));
  }, [diceCount]);
  
  // Roll dice function
  const rollDice = () => {
    setIsRolling(true);
    // Reset values to trigger animation
    setDiceValues(Array(diceCount).fill(null));
    
    // Start the color flashing animation
    let colorIndex = 0;
    const flashInterval = setInterval(() => {
      setRollAnimation(colorIndex % diceColors.length);
      colorIndex++;
    }, 100); // Change color every 100ms
    
    // Stop rolling after a delay
    setTimeout(() => {
      clearInterval(flashInterval);
      // Generate random numbers for each dice
      const newValues = Array(diceCount).fill(0).map(() => 
        Math.floor(Math.random() * 6) + 1
      );
      setDiceValues(newValues);
      setIsRolling(false);
    }, 800); // Total rolling time
  };
  
  // Dragging and resizing functionality
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const startDrag = (e) => {
    if (isRolling) return;
    
    setIsDragging(true);
    
    // Calculate the offset from the mouse to the top-left corner of the element
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  const onDrag = (e) => {
    if (!isDragging) return;
    
    // Calculate new position
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;
    
    // Keep inside window bounds
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    newX = Math.max(0, Math.min(newX, window.innerWidth - containerWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - containerHeight));
    
    // Update position
    setPosition({ x: newX, y: newY });
  };
  
  const stopDrag = () => {
    setIsDragging(false);
  };
  
  const startResize = (e) => {
    if (isRolling) return;
    
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };
  
  const onResize = (e) => {
    if (!isResizing) return;
    
    // Calculate new width based on mouse movement
    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;
    const newWidth = Math.max(320, resizeStart.width + deltaX);
    const newHeight = Math.max(320, resizeStart.height + deltaY);
    
    // Update size
    setSize({
      width: newWidth,
      height: newHeight
    });
  };
  
  const stopResize = () => {
    setIsResizing(false);
  };
  
  // Add and remove event listeners for dragging and resizing
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
    } else {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    }
    
    if (isResizing) {
      document.addEventListener('mousemove', onResize);
      document.addEventListener('mouseup', stopResize);
    } else {
      document.removeEventListener('mousemove', onResize);
      document.removeEventListener('mouseup', stopResize);
    }
    
    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('mousemove', onResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isDragging, isResizing]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute bg-white bg-opacity-90 rounded-lg shadow-lg z-10"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'relative'
      }}
    >
      {/* Header - Draggable */}
      <div 
        className="p-3 bg-blue-500 text-white rounded-t-lg text-center cursor-grab"
        onMouseDown={startDrag}
        style={{ fontFamily: "'Bangers', cursive", letterSpacing: "2px", fontSize: "24px" }}
      >
        Dice Roller
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col items-center">
      
      {/* Resize handle */}
      <div
        ref={resizeHandleRef}
        className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-bl cursor-se-resize"
        style={{
          borderTop: '2px solid white',
          borderLeft: '2px solid white',
          transform: 'translate(3px, 3px)'
        }}
        onMouseDown={startResize}
      ></div>
        {/* Dice Selection */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6].map(count => (
            <button
              key={count}
              onClick={() => !isRolling && setDiceCount(count)}
              className={`px-2 py-1 min-w-10 rounded-md font-semibold ${
                diceCount === count ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'
              }`}
              disabled={isRolling}
              style={{ 
                fontFamily: "'Bangers', cursive", 
                letterSpacing: "1px",
                fontSize: "16px"
              }}
            >
              {count}d6
            </button>
          ))}
        </div>
        
        {/* Dice Display */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-20">
          {diceValues.map((value, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-lg shadow flex items-center justify-center border-2 border-gray-300 ${
                isRolling 
                  ? diceColors[rollAnimation] 
                  : value !== null 
                    ? diceStyles[value].backgroundColor
                    : 'bg-white'
              } ${value !== null && !isRolling ? entranceAnimations[value] : ''}`}
            >
              <span 
                className={`text-2xl ${
                  isRolling || value !== null ? 'text-white' : 'text-gray-400'
                } ${value !== null && !isRolling ? diceStyles[value].animation : ''}`}
                style={{ 
                  fontFamily: "'Bangers', cursive", 
                  letterSpacing: "1px" 
                }}
              >
                {isRolling ? '?' : value !== null ? value : 'Roll'}
              </span>
            </div>
          ))}
        </div>
        
        {/* Roll Button */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`py-2 px-6 rounded-lg shadow font-semibold text-white transform -rotate-2 ${
            isRolling ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          style={{ 
            fontFamily: "'Bangers', cursive", 
            letterSpacing: "2px",
            fontSize: "22px"
          }}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
      
      {/* Custom animations CSS */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100%) rotate(-90deg); opacity: 0; }
          100% { transform: translateX(0) rotate(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
          0% { transform: translateX(100%) rotate(90deg); opacity: 0; }
          100% { transform: translateX(0) rotate(0); opacity: 1; }
        }
        @keyframes slideInFromTop {
          0% { transform: translateY(-100%) rotateX(-90deg); opacity: 0; }
          100% { transform: translateY(0) rotateX(0); opacity: 1; }
        }
        @keyframes slideInFromBottom {
          0% { transform: translateY(100%) rotateX(90deg); opacity: 0; }
          100% { transform: translateY(0) rotateX(0); opacity: 1; }
        }
        @keyframes zoomIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes flipIn {
          0% { transform: perspective(400px) rotateY(90deg); opacity: 0; }
          40% { transform: perspective(400px) rotateY(-10deg); }
          70% { transform: perspective(400px) rotateY(10deg); }
          100% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
        }
        .animate-slideInFromLeft { animation: slideInFromLeft 0.5s forwards; }
        .animate-slideInFromRight { animation: slideInFromRight 0.5s forwards; }
        .animate-slideInFromTop { animation: slideInFromTop 0.5s forwards; }
        .animate-slideInFromBottom { animation: slideInFromBottom 0.5s forwards; }
        .animate-zoomIn { animation: zoomIn 0.5s forwards; }
        .animate-flipIn { animation: flipIn 0.5s forwards; }
      `}</style>
    </div>
  );
};

export default DiceRoller;