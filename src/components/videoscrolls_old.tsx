import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoScrollScaler: React.FC = () => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoWrapper = videoWrapperRef.current;
    const videoBox = videoBoxRef.current;
    const video = videoRef.current;
    const heroVideoBox = document.getElementById('hero-video-box');

    if (!videoWrapper || !videoBox || !heroVideoBox || !video) return;

    const ctx = gsap.context(() => {
      const wrapperRect = videoWrapper.getBoundingClientRect();
      const heroRect = heroVideoBox.getBoundingClientRect();

      // Set initial style for videoBox - ensure it's positioned absolutely without initial CSS transform: translate
      gsap.set(videoBox, {
        width: heroRect.width,
        height: heroRect.height,
        x: heroRect.left - wrapperRect.left, // Position relative to wrapper's top-left
        y: heroRect.top - wrapperRect.top,
        borderRadius: "8px",
        scale: 1,
        transformOrigin: "center center",
        position: 'absolute'
      });

      // Initially set the background of the videoWrapper to transparent
      // We will animate it to black during the scroll.
      gsap.set(videoWrapper, { backgroundColor: 'rgba(0,0,0,0)' }); // Start transparent

      // Fade hero box + scale our new one during scroll
      ScrollTrigger.create({
        trigger: heroVideoBox.closest('.hero-section') || heroVideoBox,
        start: "bottom center",
        end: "bottom top",
        scrub: true,
        onUpdate: ({ progress }) => {
          heroVideoBox.style.opacity = String(1 - progress);
          gsap.set(videoBox, {
            scale: 1 + progress * 0.2,
            transformOrigin: "center center"
          });
        },
        onLeave: () => {
          heroVideoBox.style.opacity = '0';
        }
      });

      // Transition from small box to full section
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapper,
          start: "top top",
          end: "+=200%", // Adjust this value to control scroll duration of the transition
          scrub: true,
          pin: true,
          pinSpacing: true,
          onEnter: () => {
            heroVideoBox.style.opacity = '0';
            video.play().catch(() => {});
          },
          onLeaveBack: () => {
            video.pause();
            video.currentTime = 0;
          }
        }
      });

      mainTl.to(videoBox, {
        width: "100%",
        height: "100%",
        x: 0,
        y: 0,
        scale: 1,
        borderRadius: 0,
        ease: "power2.inOut",
        duration: 1 // Duration for this segment of the scrubbed timeline
      });

      // Animate the background of the videoWrapper from transparent to black
      mainTl.to(videoWrapper, {
        backgroundColor: 'rgba(0,0,0,1)', // End black
        ease: "power1.in", // Smooth in
        duration: 0.5 // Start fading in slightly later or quicker
      }, "<0.2"); // Start this background animation slightly after the videoBox starts expanding

    }, videoWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={videoWrapperRef}
      id="video-section-scaler"
      // REMOVE bg-black from here. GSAP will manage the background color.
      className="video-scroll-section relative flex justify-center items-center min-h-screen overflow-hidden"
      style={{ zIndex: 10 }} // Keep zIndex
    >
      <div
        ref={videoBoxRef}
        className="absolute shadow-2xl overflow-hidden"
        // Ensure no transform: translate in initial CSS style here
      >
        <video
          ref={videoRef}
          src="/assets/enrzy.mp4"
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default VideoScrollScaler;