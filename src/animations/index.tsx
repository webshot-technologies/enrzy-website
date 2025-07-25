import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initAnimations = () => {
  // We'll add section animations here
};

export const animateHeroSection = () => {
  gsap.from(".hero-section h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".hero-section p", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });
  gsap.from(".hero-section .cta-button", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
    ease: "power3.out",
  });
};

export const animateFeaturesSection = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".features-section",
      start: "top 75%",
    },
  });

  tl.from(".features-section .section-title", {
    opacity: 0,
    y: 50,
    duration: 0.6,
  })
    .from(
      ".features-section .section-subtitle",
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
      },
      "-=0.3"
    )
    .from(".feature-card", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1)",
    });
};

export const animateCounterSection = () => {
  gsap.from(".counter-section .counter-item", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".counter-section",
      start: "top 75%",
    },
    ease: "elastic.out(1, 0.5)",
  });
};

export const animateWhyEnrzySection = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".why-enrzy-section",
      start: "top 65%",
    },
  });

  tl.from(".why-enrzy-section .left-content", {
    opacity: 0,
    x: -50,
    duration: 0.8,
  }).from(
    ".why-enrzy-section .right-content",
    {
      opacity: 0,
      x: 50,
      duration: 0.8,
    },
    "-=0.4"
  );
};

export const animateIndustriesSection = () => {
  gsap.from(".industries-section .industry-card", {
    opacity: 0,
    y: 60,
    duration: 0.7,
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".industries-section",
      start: "top 70%",
    },
  });
};

export const animateWorkflowTimeline = () => {
  gsap.from(".workflow-timeline .timeline-item", {
    opacity: 0,
    x: -80,
    duration: 0.8,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".workflow-timeline",
      start: "top 65%",
    },
    ease: "back.out(1)",
  });
};