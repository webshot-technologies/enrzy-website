import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const section = sectionRef.current;
  const videoContainer = videoContainerRef.current;

  // Entrance animation
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
    .from('.hero-title-line', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    })
    .from('.hero-subtitle', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '>0.1')
    .from('.hero-video-container', {
      y: 60,
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: 'back.out(1.7)',
    }, '>0.2');

  // Smooth scroll-triggered video box expansion
  if (videoContainer) {
    gsap.to(videoContainer, {
      scrollTrigger: {
        trigger: videoContainer,
        start: 'top center',
        end: 'bottom bottom',
        scrub: 3, // smooth delayed scroll sync
      },
      width: '90vw',
      height: '43vw',
      borderRadius: '2rem',
    
      ease: "expoScale(0.5,7,none)",
    });
  }

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  return (
    <div
      ref={heroSectionRef}
      className="relative flex flex-col items-center justify-center  overflow-hidden text-center text-gray-900"
      style={{  }}
    >
      <div ref={sectionRef} className="max-w-7xl w-full mx-auto flex flex-col items-center  mb-10">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="hero-title-line block">Revolutionize</span>
          <span className="hero-title-line block base-color">
            Power <span className=" base-color">Prospects</span>
          </span>
          <span className="hero-title-line block">
            Asset <span className="base-color">Management</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-gray-600 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">
          ENRZY empowers utilities to detect faults early, automate maintenance, and visualize every asset in 3D — ensuring higher uptime, lower risk, and smarter decisions.
        </p>

        {/* Video Container */}
        <div
          ref={videoContainerRef}
          className="hero-video-container relative mt-16 rounded-lg  flex items-center justify-center overflow-hidden"
          style={{
            minHeight: '100px',
            minWidth: '200px',
            willChange: 'width, height, border-radius, transform',
          }}
        >
          <video
            src="/assets/enrzy.mp4"
            muted
            playsInline
            autoPlay
            loop
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Spacer inside pinned section to allow scroll */}
      {/* <div style={{ height: '100vh' }} /> */}
    </div>
  );
};

export default HeroSection;
