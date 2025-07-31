import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../HeroSection.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HeroBanner = () => {
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    // Initialize animations after component mounts
    const initAnimations = () => {
      // Text animation
      gsap.from('.banner-txt h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.banner-txt p', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
      });

      gsap.from('.banner-txt .button', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
      });

      // Background animation on scroll
      gsap.to(bannerRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        opacity: 0.7,
        scale: 1.1
      });
    };

    // Handle video autoplay
    const playVideos = () => {
      const playPromise = videoRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented:', error);
          // Add play button overlay or other fallback
        });
      }

      const mobilePlayPromise = mobileVideoRef.current?.play();
      if (mobilePlayPromise !== undefined) {
        mobilePlayPromise.catch(error => {
          console.log('Mobile autoplay prevented:', error);
        });
      }
    };

    // Initialize everything
    initAnimations();
    playVideos();

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="home-banner-wrap" ref={bannerRef}>
      <div className="home-banner-trigger"></div>
      <div className="home-banner">
        <div className="container">
          <div className="banner-txt">
            <h1 className="banner-head">
              <span>Integrated Drone Solutions</span>Enabling Large-Scale Impact
            </h1>
            <p className="comm-txt">Enhancing Productivity, People, And Planet</p>
            <a className="button" href="https://aereo.io/solutions/" target="_self" rel="noopener noreferrer">
              Explore<span></span>
            </a>
          </div>
        </div>
        
        {/* Videos */}
        <div className="home-video">
          <div className="banner-video">
            {/* Desktop Video */}
            <video
              ref={videoRef}
              className="desktop-video"
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
            >
              <source 
                src="https://aereo.io/wp-content/uploads/2023/10/banner.webm" 
                type="video/webm" 
              />
            </video>
            
            {/* Mobile Video */}
            <video
              ref={mobileVideoRef}
              className="mobile-video"
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
            >
              <source 
                src="https://aereo.io/wp-content/uploads/2023/10/banner-mob.mp4" 
                type="video/mp4" 
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;