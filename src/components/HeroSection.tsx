import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the plugins once
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HeroSection() {
  const headingRefs = useRef<HTMLDivElement[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  headingRefs.current = [];
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

  const scrollToVideo = () => {
    // Only perform smooth scroll on desktop
    if (window.matchMedia('(min-width: 768px)').matches && videoSectionRef.current) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: videoSectionRef.current,
          offsetY: 0,
        },
        ease: 'power2.inOut',
      });
    }
  };

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    let videoTimeline: gsap.core.Timeline | undefined;

    // Scroll-triggered animations for heading lines
    headingRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
          rotationX: 45,
          transformOrigin: '50% 100%',
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Enhanced load animation for the box
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1.5,
          delay: 1,
          ease: 'elastic.out(1, 0.8)',
        }
      );
    }

    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 2,
          ease: 'power2.out',
        }
      );
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: 3,
      });
    }

    // Video section animations
    if (videoSectionRef.current && videoContainerRef.current) {
      // Define a timeline for the scroll-based video animation
      videoTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: isDesktop ? 'top top' : 'top 70%', // Start animation when top of section hits top of viewport on desktop
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          snap: isDesktop ? true : false, // Only snap on desktop
          onEnter: () => {
            if (videoRef.current) videoRef.current.play().catch(console.error);
          },
          onLeave: () => {
            if (videoRef.current) videoRef.current.pause();
          },
          onEnterBack: () => {
            if (videoRef.current) videoRef.current.play().catch(console.error);
          },
          onLeaveBack: () => {
            if (videoRef.current) videoRef.current.pause();
          },
        },
      });

      // Video container scale animation
      videoTimeline.fromTo(
        videoContainerRef.current,
        {
          scale: isDesktop ? 0.7 : 1, // Start slightly smaller on desktop
          opacity: isDesktop ? 0 : 1, // Fade in from transparent on desktop
          borderRadius: isDesktop ? '50px' : '20px', // More dramatic border-radius on desktop
          rotationY: isDesktop ? 15 : 0, // 3D rotation on desktop
        },
        {
          scale: 1,
          opacity: 1,
          borderRadius: '20px',
          rotationY: 0,
          duration: 1.5,
          ease: 'power3.out',
        }
      );

      // Additional hover effects for video container (desktop only)
      if (isDesktop && videoContainerRef.current) {
        const videoContainer = videoContainerRef.current;
        const scaleHover = gsap.to(videoContainer, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
          paused: true,
        });
        videoContainer.addEventListener('mouseenter', () => scaleHover.play());
        videoContainer.addEventListener('mouseleave', () => scaleHover.reverse());
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (videoSectionRef.current && isDesktop) {
        // Clean up the hover listeners
        const videoContainer = videoSectionRef.current;
        if (videoContainer) {
          videoContainer.removeEventListener('mouseenter', () => {});
          videoContainer.removeEventListener('mouseleave', () => {});
        }
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 md:px-0 relative snap-start">
        <div className="space-y-4 md:space-y-6 mb-8">
          <div ref={addToRefs}>
            <h1 className="text-3xl md:text-6xl font-bold text-black leading-tight">FROM</h1>
          </div>
          <div ref={addToRefs}>
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">
              <span className="text-gray-500">FINDING</span> PROSPECTS
            </h1>
          </div>
          <div ref={addToRefs}>
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">TO CONVERTING</h1>
          </div>
          <div ref={addToRefs}>
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">
              THEM INTO <span className="text-gray-500">PAYING</span>
            </h1>
          </div>
          <div ref={addToRefs}>
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">CUSTOMERS</h1>
          </div>
        </div>

        <div ref={addToRefs} className="mt-8 md:mt-12 max-w-3xl text-gray-600 text-base md:text-lg px-4 leading-relaxed">
          ENRZY empowers utilities to detect faults early, automate maintenance, and visualize every asset in 3D — ensuring higher uptime, lower risk, and smarter decisions.
        </div>

        {/* Enhanced Logo/Image */}
        <div ref={boxRef} className="mt-12 md:mt-16">
          <div className="relative">
            <img src="assets/favicon.png" alt="ENRZY Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} onClick={scrollToVideo} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center group-hover:border-gray-600 transition-colors">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 group-hover:bg-gray-600 transition-colors"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoSectionRef} className="min-h-screen flex items-center justify-center px-4 md:px-8 bg-white snap-start">
        <div className="max-w-6xl mx-auto text-center">
          {/* Video Container - Responsive width */}
          <div
            ref={videoContainerRef}
            className="relative overflow-hidden rounded-2xl shadow-2xl bg-black aspect-[16/9] w-[90%] md:w-[80%] mx-auto"
          >
            <video ref={videoRef} src="assets/enrzy.mp4" className="w-full h-full object-cover" loop muted playsInline preload="metadata">
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>
    </>
  );
}