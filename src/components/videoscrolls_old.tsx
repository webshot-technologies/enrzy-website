import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoBackgroundTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoWrapperRef.current || !bgImageRef.current) {
      console.warn("Refs not available, animation setup skipped.");
      return;
    }

    const container = containerRef.current;
    const videoWrapper = videoWrapperRef.current;
    const bgImage = bgImageRef.current;

    const mm = gsap.matchMedia();

    mm.add("all", () => {
      // Set initial states
      gsap.set(videoWrapper, { opacity: 0.2, willChange: 'opacity' });
      gsap.set(bgImage, { scale: 1, opacity: 1, willChange: 'transform, opacity' });
      
      // Define a total scroll length for the pinned section
      // This is a fixed value, which is great for control.
      const totalScrollLength = "2500"; // Can be adjusted

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScrollLength}`, // The entire pin duration
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // The key change is using a timeline with explicit durations
      // and defining a "dead space" tween to hold the animation.
      tl
        // Phase 1: The Transition (A shorter duration)
        .to(bgImage, {
          scale: 1.5,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 1, // This is a relative duration within the timeline
        })
        .to(videoWrapper, {
          opacity: 1,
          ease: 'power2.inOut',
          duration: 1,
        }, 0) // Starts at the same time as the bgImage animation

        // Phase 2: The Hold (A longer duration)
        // This is an "empty" tween that holds the state
        // The total scroll length is 2500. The animation takes up a duration of 1.
        // We'll add another tween with a duration of 4 to hold the state.
        .to({}, { // Empty tween
          duration: 4, // This duration holds the animation state for a longer scroll
        });
      
      // We can also add a subtle parallax to the video to create more depth
      gsap.to(videoWrapper, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScrollLength}`,
          scrub: 1,
        }
      })

    });

    return () => mm.revert();
  }, []);

  return (
    <div className="font-inter text-white relative">
      <section
        ref={containerRef}
        className="relative flex justify-center items-center h-screen overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <div
          ref={bgImageRef}
          className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none"
          style={{
            backgroundImage: "url('/assets/bg-transparent.png')",
            zIndex: 10,
          }}
        />
        <div
          ref={videoWrapperRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            zIndex: 5,
          }}
        >
          <video
            src="/assets/enrzy.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>

        <div className="relative text-center z-20">
          <h1 className="text-5xl md:text-8xl font-bold">Your Headline</h1>
          <p className="mt-4 text-lg md:text-2xl text-white/70">A caption to set the mood.</p>
        </div>
      </section>
      
      {/* Some content below to show the scroll effect */}
      <div className="h-[150vh] bg-neutral-900 flex justify-center items-center">
        <h2 className="text-3xl text-neutral-500">More Content Below</h2>
      </div>
    </div>
  );
};

export default VideoBackgroundTransition;