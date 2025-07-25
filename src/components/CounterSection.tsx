import { useEffect, useRef, useState } from 'react';
import '../App.css';

interface StatItem {
  number: string;
  label: string;
  value: number;
  suffix?: string;
}

const CounterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRefs = useRef<number[]>([]);

  const stats: StatItem[] = [
    { number: "5000+", label: "Image Processed", value: 5000, suffix: "+" },
    { number: "250+", label: "Fault Detected", value: 250, suffix: "+" },
    { number: "50+", label: "Maintenance Ticket Generated", value: 50, suffix: "+" },
    { number: "100%", label: "Client Satisfaction", value: 100, suffix: "%" },
  ];

  // Initialize animated values
  useEffect(() => {
    setAnimatedValues(new Array(stats.length).fill(0));
  }, []);

  // Enhanced intersection observer with reversible animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCountAnimation();
        } else {
          setIsVisible(false);
          resetCounters();
        }
      },
      {
        threshold: 0.4, // Trigger when 40% of section is visible
        rootMargin: '0px 0px -50px 0px', // Adjust trigger point
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset counters when leaving the section
  const resetCounters = () => {
    // Cancel any ongoing animations
    animationRefs.current.forEach(id => {
      if (id) cancelAnimationFrame(id);
    });
    animationRefs.current = [];
    
    // Reset all counter values to 0
    setAnimatedValues(new Array(stats.length).fill(0));
  };

  // Counter animation function with cleanup
  const startCountAnimation = () => {
    // Reset counters before starting new animation
    resetCounters();
    
    stats.forEach((stat, index) => {
      const targetValue = stat.value;
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);

        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = currentValue;
          return newValues;
        });

        if (progress < 1) {
          const animationId = requestAnimationFrame(animate);
          animationRefs.current[index] = animationId;
        }
      };

      // Add staggered delay for each counter
      setTimeout(() => {
        animate();
      }, index * 200);
    });
  };

  // Format number with suffix
  const formatNumber = (value: number, suffix: string = '') => {
    return `${value}${suffix}`;
  };

  return (
    <div ref={sectionRef} className="counter-section-bg overflow-hidden">
      <div className="overlay">
      <div className="w-full counter-grid mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                isVisible
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
              }}
            >
              <div className="relative w-100">
                {/* Animated number */}
                <div className="text-4xl md:text-5xl font-bold mb-6 relative">
                  <span className="inline-block transition-all duration-300">
                    {formatNumber(animatedValues[index] || 0, stat.suffix)}
                  </span>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 counter-text font-bold opacity-20 blur-sm">
                    {formatNumber(animatedValues[index] || 0, stat.suffix)}
                  </div>
                </div>
                
                {/* Label */}
                <div className="counter-text opacity-90 font-medium tracking-wide">
                  {stat.label}
                </div>
                
                
              </div>
            </div>
          ))}
        </div>
        
        {/* Optional: Add some decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CounterSection;