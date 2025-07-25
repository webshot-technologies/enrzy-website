import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Database, Brain, BarChart3, Wrench } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const WorkflowTimeline = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  const workflowData = [
    {
      id: 1,
      title: "Data Capture",
      description: "Drones capture high-resolution 3D visual, thermal imagery. IoT sensors track real-time field parameters like temperature, load, vibration",
      icon: Plane,
      position: "right"
    },
    {
      id: 2,
      title: "Data Validation & Integration", 
      description: "Automated verification and geo-tagging of drone and sensor data. Synced to ENRZY cloud for processing",
      icon: Database,
      position: "left"
    },
    {
      id: 3,
      title: "AI-Enabled Processing",
      description: "Detects: Vegetation overgrowth o Corrosion or hotspots o Missing or damaged components o Sag and clearance issues Tags",
      icon: Brain,
      position: "right"
    },
    {
      id: 4,
      title: "Interactive Reporting",
      description: "3D dashboards with filters Custom PDF/Excel reports with annotated visuals Asset-wise health scoring and summaries",
      icon: BarChart3,
      position: "left"
    },
    {
      id: 5,
      title: "Maintenance Ticketing",
      description: "Auto-ticket generation for every critical issue Task assignment and after-repair image upload by technician Dashboard reflects",
      icon: Wrench,
      position: "right"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const timeline = timelineRef.current;
    const progress = progressRef.current;

    if (!container || !timeline || !progress) return;

    let currentStep = 0;
    const totalSteps = workflowData.length;

    // Set initial progress bar state
    gsap.set(progress, { scaleY: 0 });

    // Animate each step with meter bar progression
    workflowData.forEach((step, index) => {
      const stepElement = container.querySelector(`[data-step="${step.id}"]`);
      const iconElement = stepElement?.querySelector('.step-icon');
      const contentElement = stepElement?.querySelector('.step-content');
      const timelinePoint = stepElement?.querySelector('.timeline-point');

      if (stepElement && iconElement && contentElement && timelinePoint) {
        // Set initial states
        gsap.set([iconElement, contentElement], { 
          opacity: 0,
          x: step.position === "right" ? 100 : -100,
          scale: 0.8
        });
        
        gsap.set(timelinePoint, { 
          scale: 0,
          backgroundColor: "#e5e7eb"
        });

        // Create animation timeline for this step
        const stepTl = gsap.timeline({
          scrollTrigger: {
            trigger: stepElement,
            start: "top 70%",
            end: "center 50%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              currentStep = Math.max(currentStep, index + 1);
              // Animate meter bar to current step level
              gsap.to(progress, {
                scaleY: currentStep / totalSteps,
                duration: 0.8,
                ease: "power2.out"
              });
            },
            onLeaveBack: () => {
              currentStep = Math.max(0, index);
              // Animate meter bar back
              gsap.to(progress, {
                scaleY: currentStep / totalSteps,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          }
        });

        stepTl
          .to(timelinePoint, {
            scale: 1,
            backgroundColor: "#f97316",
            duration: 0.5,
            ease: "back.out(1.7)"
          })
          .to([iconElement, contentElement], {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.3");

        // Add hover effects
        stepElement.addEventListener('mouseenter', () => {
          gsap.to(iconElement, { scale: 1.1, duration: 0.3 });
          gsap.to(timelinePoint, { scale: 1.2, duration: 0.3 });
        });

        stepElement.addEventListener('mouseleave', () => {
          gsap.to(iconElement, { scale: 1, duration: 0.3 });
          gsap.to(timelinePoint, { scale: 1, duration: 0.3 });
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const StepIcon = ({ icon: Icon, className }) => (
    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-lg ${className}`}>
      <Icon size={28} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            How we work
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ENRZY Workflow
          </h1>
        </div>

        {/* Workflow Steps */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
          {/* Central Timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 rounded-full">
            <div 
              ref={timelineRef}
              className="w-full bg-gradient-to-b from-orange-400 to-orange-600 rounded-full origin-top"
              style={{ transformOrigin: "top" }}
            />
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-orange-500 to-orange-700 rounded-full origin-top"
              style={{ transformOrigin: "top", transform: "scaleY(0)" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-32">
            {workflowData.map((step, index) => (
              <div
                key={step.id}
                data-step={step.id}
                className={`relative flex items-center ${
                  step.position === "right" ? "justify-start" : "justify-end"
                } cursor-pointer group`}
              >
                {/* Timeline Point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="timeline-point w-6 h-6 bg-gray-300 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Content */}
                <div className={`w-5/12 ${step.position === "right" ? "ml-16" : "mr-16"}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                    <div className={`flex items-start gap-6 ${step.position === "left" ? "flex-row-reverse" : ""}`}>
                      {/* Icon */}
                      <div className="step-icon flex-shrink-0">
                        <StepIcon icon={step.icon} />
                      </div>

                      {/* Content */}
                      <div className="step-content flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-lg font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                            Step {step.id}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Number Badge */}
                <div className={`absolute top-4 ${step.position === "right" ? "left-4" : "right-4"}`}>
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 cursor-pointer">
            <span>Start Your Journey</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTimeline;