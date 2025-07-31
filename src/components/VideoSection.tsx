import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroVideoBoxRef = useRef<HTMLDivElement>(null);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set([".hero-title-line", ".hero-subtitle", heroVideoBoxRef.current], {
      y: 50,
      opacity: 0,
    });
    
    tl.to(".hero-title-line", {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
    })
    .to(".hero-subtitle", {
      y: 0,
      opacity: 1,
      duration: 0.8,
    }, "-=0.5")
    .to(heroVideoBoxRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
    }, "-=0.6");
  }, []);

  // Handle video playback safely
  const handleVideoPlayback = (shouldPlay: boolean) => {
    if (!backgroundVideoRef.current) return;
    
    try {
      if (shouldPlay) {
        backgroundVideoRef.current.play().catch(console.error);
      } else {
        backgroundVideoRef.current.pause();
        backgroundVideoRef.current.currentTime = 0;
      }
    } catch (error) {
      console.error('Video playback error:', error);
    }
  };

  // Scroll effect - only on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrolledPastThreshold = scrollY > 50;
      const newScrolledState = scrolledPastThreshold && !isScrolled;
      const newUnscrolledState = !scrolledPastThreshold && isScrolled;

      if (newScrolledState || newUnscrolledState) {
        setIsScrolled(scrolledPastThreshold);
        handleVideoPlayback(scrolledPastThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled, isMobile]);

  // Auto-play on mobile if needed
  useEffect(() => {
    if (isMobile && backgroundVideoRef.current) {
      handleVideoPlayback(true);
    }
  }, [isMobile]);

  return (
    <div data-lag="1" className="relative min-h-screen overflow-hidden flex">
      {/* Background Video - Only render on desktop */}
      {!isMobile && (
        <video
          ref={backgroundVideoRef}
          src='assets/enrzy.mp4'
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
        />
      )}

      {/* Dark Overlay - Only show on desktop when scrolled */}
      {!isMobile && (
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-1000 ${
          isScrolled ? 'opacity-60' : 'opacity-0'
        }`} />
      )}

      {/* Content Container */}
      <div 
        ref={heroContentRef}
        className={`relative z-10 h-full w-full  flex flex-col items-center justify-between px-4 ${
          !isMobile ? 'transition-all duration-[1500ms] ease-out' : ''
        } ${
          isScrolled && !isMobile ? 'opacity-0 transform translate-y-[-30px] scale-95' : ''
        }`}
      >
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto mt-6">
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight">
            <span className="hero-title-line block">Revolutionize</span>
            <span className="hero-title-line block text-gray-400">
              Power <span className=""> Prospects</span>
            </span>
            <span className="hero-title-line block">
              Asset <span className="text-gray-400">Management</span>
            </span>
          </h1>

          <p className="hero-subtitle text-base md:text-base mt-6 max-w-2xl mx-auto leading-relaxed mb-6">
            ENRZY Empowers Utilities To Detect Faults Early, Automate Maintenance, And Visualize Every Asset In 3D — Ensuring Higher Uptime, Lower Risk, And Smarter Decisions.
          </p>
        </div>

        {/* Small Video Box */}
        <div 
          ref={heroVideoBoxRef}
          className={`relative mt-4 ${
            !isMobile ? 'transition-all duration-[1500ms] ease-in-out' : ''
          } ${
            isScrolled && !isMobile ? 'opacity-0 transform translate-y-[30px] pointer-events-none' : ''
          }`}
        >
          <video
            ref={videoRef}
            src='./assets/enrzy.mp4'
            className="w-[20rem] h-[12rem] object-cover rounded-lg shadow-2xl"
            muted
            loop
            playsInline
            autoPlay
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;