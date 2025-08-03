import { useEffect, useRef } from 'react';
import { CheckCircle, Bot, Shield, Lightbulb, BarChart3, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Transform } from 'stream';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface WorkflowComponentProps {
  title?: string;
  subtitle?: string;
  steps?: WorkflowStep[];
}

const defaultSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Data Capture",
    description: "Drones capture high-resolution 3D visual, thermal imagery, IoT sensors track real-time field parameters like temperature, load, vibration",
    icon:"./assets/drone-alt.png"
  },
  {
    id: 2,
    title: "Data Validation & Integration",
    description: "Automated verification and geo-tagging of drone and sensor data. Synced to ENRZY cloud for processing",
    icon: "./assets/data.png"
  },
  {
    id: 3,
    title: "AI-Enabled Processing",
    description: "Detects: Vegetation overgrowth • Corrosion or hotspots • Missing or damaged components • Sag and clearance issues Tags",
    icon: "./assets/data-ai.png"
  },
  {
    id: 4,
    title: "Interactive Reporting",
    description: "3D dashboards with filters Custom PDF/Excel reports with annotated visuals Asset-wise health scoring and summaries",
    icon: "./assets/database.png"
  },
  {
    id: 5,
    title: "Maintenance Ticketing",
    description: "Auto-ticket generation for every critical issue Task assignment and after-repair image upload by technician Dashboard reflects",
    icon: "./assets/bug.png"
  }
];

const IconComponent = ({ icon }: { icon: string }) => {
  const iconProps = { className: "w-8 h-8", strokeWidth: 2 };
  
  switch (icon) {
    case 'drone':
      return <Bot {...iconProps} />;
    case 'shield':
      return <Shield {...iconProps} />;
    case 'lightbulb':
      return <Lightbulb {...iconProps} />;
    case 'chart':
      return <BarChart3 {...iconProps} />;
    case 'settings':
      return <Settings {...iconProps} />;
    default:
      return <CheckCircle {...iconProps} />;
  }
};

export default function WorkflowComponent({
  title = "ENRZY Workflow",
  subtitle = "Our comprehensive drone inspection workflow ensures precise data capture, intelligent processing, and actionable insights for infrastructure management.",
  steps = defaultSteps
}: WorkflowComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const timeline = timelineRef.current;
    const mobileTimeline = mobileTimelineRef.current;

    if (!container) return;

    // Desktop Timeline progress animation
  if (timeline) {
  const totalSteps = stepRefs.current.length;

  stepRefs.current.forEach((stepContainer, index) => {
    if (!stepContainer) return;

    const dot = stepContainer.querySelector('.timeline-dot');

    gsap.timeline({
      scrollTrigger: {
        trigger: stepContainer,
        start: 'top center',
        end: 'bottom 75%',
        toggleActions: 'play reverse reverse reset',
        onEnter: () => {
          // Dot animation first
          if (dot) {
            gsap.fromTo(dot, {
              scale: 0
            }, {
              scale: 1,
              backgroundColor: '#F38D26',
              duration: 0.4,
              ease: 'back.out(1.7)'
            });
          }

          // Delay progress bar animation
          const progress = totalSteps > 1 ? ((index + 1) / (totalSteps - 1)) * 100 : 100;
          gsap.to(timeline, {
            '--progress': `${Math.min(progress, 100)}%`,
            duration: 1,
            delay: 0.4,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          // Dot scale down
          if (dot) {
            gsap.to(dot, {
              scale: 0,
              backgroundColor: '#F38D26',
              duration: 0.6,
              ease: 'power1.inOut'
            });
          }

          // Delay progress bar rollback
          const progress = totalSteps > 1 ? (index / (totalSteps - 1)) * 100 : 0;
          gsap.to(timeline, {
            '--progress': `${Math.max(progress, 0)}%`,
            duration: 1,
            delay: 0.1,
            ease: 'power2.out'
          });
        }
      }
    });
  });
}


if (mobileTimeline) {
  const totalSteps = stepRefs.current.length;

  stepRefs.current.forEach((stepContainer, index) => {
    if (!stepContainer) return;

    const dot = stepContainer.querySelector('.mobile-timeline-dot');

    gsap.timeline({
      scrollTrigger: {
        trigger: stepContainer,
        start: 'top 75%',
        end: 'bottom 75%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => {
          // Dot in
          if (dot) {
            gsap.fromTo(dot, {
              scale: 0
            }, {
              scale: 1,
              backgroundColor: '#F38D26',
              duration: 0.4,
              ease: 'back.out(1.7)'
            });
          }

          // Progress bar fill delayed
          const progress = totalSteps > 1 ? ((index + 1) / (totalSteps - 1)) * 100 : 100;
          gsap.to(mobileTimeline, {
            '--progress': `${Math.min(progress, 100)}%`,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          // Dot out
          if (dot) {
            gsap.to(dot, {
              scale: 0,
              backgroundColor: '#F38D26',
              duration: 0.3,
              ease: 'power1.inOut'
            });
          }

          // Delay rollback
          const progress = totalSteps > 1 ? (index / (totalSteps - 1)) * 100 : 0;
          gsap.to(mobileTimeline, {
            '--progress': `${Math.max(progress, 0)}%`,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
          });
        }
      }
    });
  });
}



    // Animate each step
    stepRefs.current.forEach((stepContainer, index) => {
      if (!stepContainer) return;

      const isLeft = index % 2 === 0;
      const stepCard = stepContainer.querySelector('.step-card');
      const dot = stepContainer.querySelector('.timeline-dot');
      const mobileDot = stepContainer.querySelector('.mobile-timeline-dot');
      const icon = stepContainer.querySelector('.icon-container');
      const stepBadge = stepContainer.querySelector('.bg-teal-600');

      // Set initial states for desktop
      if (stepCard) {
        gsap.set(stepCard, {
          x: isLeft ? '-100px' : '100px',
          opacity: 0
        });
      }

      if (dot) {
        gsap.set(dot, {
          scale: 0
        });
      }

      // Set initial states for mobile
      if (mobileDot) {
        gsap.set(mobileDot, {
          scale: 0
        });
      }

      if (icon) {
        gsap.set(icon, { 
          scale: 0, 
          rotation: 360 
        });
      }

      if (stepBadge) {
        gsap.set(stepBadge, {
          scale: 0,
          opacity: 0
        });
      }

      // Create timeline for this step
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepContainer,
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate desktop dot first
      if (dot) {
        tl.to(dot, {
          scale: 1,
          backgroundColor: '#F38D26',
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      }

      // Animate mobile dot
      if (mobileDot) {
        tl.to(mobileDot, {
          scale: 1,
          backgroundColor: '#F38D26',
          duration: 0.3,
          ease: 'back.out(1.7)'
        }, 0);
      }

      // Animate icon
      if (icon) {
        tl.to(icon, {
          scale: 1,
          
          duration: 0.4,
          ease: 'back.out(1.7)'
        }, '-=0.1');
      }

      // Animate step badge
      if (stepBadge) {
        tl.to(stepBadge, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        }, '-=0.2');
      }

      // Then animate card content
      if (stepCard) {
        // For mobile, animate from left
        const mobileStepCard = stepContainer.querySelector('.mobile-step-card');
        if (mobileStepCard) {
          gsap.set(mobileStepCard, {
            x: '-50px',
            opacity: 0
          });
          
          tl.to(mobileStepCard, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.2');
        }

        // Desktop animation
        tl.to(stepCard, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.2');

        // Animate individual elements within the card
        const title = stepCard.querySelector('h3');
        const description = stepCard.querySelector('p');

        if (title) {
          gsap.set(title, { opacity: 0, y: 20 });
          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
          }, '-=0.4');
        }

        if (description) {
          gsap.set(description, { opacity: 0, y: 20 });
          tl.to(description, {
            opacity: 1,
            y: 0,
            duration: .3,
            ease: 'power2.out'
          }, '-=0.3');
        }
      }
    });

    // Header animation
    const headerElements = container.querySelectorAll('.header-element');
    gsap.set(headerElements, { opacity: 0, y: 30 });

    gsap.to(headerElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 100%',
        once: true
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [steps]);

  return (
    <div ref={containerRef} className="workflow-container section-padding px-4 sm:px-6 lg:px-8  min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="header-element inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-100 base-color mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            How we work
          </div>
          <h1 className="header-element flex items-center text-center justify-center gap-3 text-4xl md:text-4xl font-semibold text-base-secondary mb-4">
              <span className='logo-text'><img src="/assets/text_logo.png" style={{ marginTop:'5px'}} alt="df" /></span> Workflow
          </h1>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div 
            ref={timelineRef}
            className="timeline-line hidden md:block absolute left-1/2 transform w-1 bg-gray-300 rounded-full" 
            style={{ 
              '--progress': '0%',
              top: '81px',
              height: '86%',
             
            } as React.CSSProperties}
          />
          
          {/* Timeline Line - Mobile */}
          <div 
            ref={mobileTimelineRef}
            className="timeline-line-mobile md:hidden absolute left-6 w-1 bg-gray-300 rounded-full" 
            style={{ 
              '--progress': '0%',
              top: '122px', 
              height: 'calc(100% - 245px)',
             
            } as React.CSSProperties}
          />

          {/* Workflow Steps */}
          <div className="workflow-steps space-y-24 md:space-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={step.id}
                  ref={el => stepRefs.current[index] = el}
                  className="step-container relative flex items-center"
                >
                  {/* Desktop Timeline Dot */}
                  <div className="timeline-dot hidden md:block absolute left-1/2  w-4 h-4  rounded-full shadow-lg z-20" style={{translate:'-6px'}} />
                  
                  {/* Mobile Timeline Dot */}
                  <div className="mobile-timeline-dot md:hidden absolute left-6  w-4 h-4  rounded-full shadow-lg z-20"  style={{translate:'-5px'}} />
                  
                  {/* Step Content - Desktop Layout */}
                  <div className="hidden md:flex w-full items-center">
                    {/* Left Content */}
                    {isLeft ? (
                      <div className="w-5/12 pr-12 flex items-center border border-1 px-4 py-4 rounded-sm shadow-md">
                        <div className="step-card text-start flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-5/12 flex items-center justify-end">
                        <div className="icon-container w-16 h-16 rounded-2xl flex items-center justify-center text-white opacity-1 " style={{transform:'rotate(0)'}}>
                          <img src={step.icon} alt="" />
                        </div>
                        <div className="text-black text-lg font-semibold px-4 py-2 rounded-full inline-block">
                          Step {step.id}
                        </div>
                      </div>
                    )}

                    {/* Center Timeline Space */}
                    <div className="w-2/12 flex justify-center relative z-10">
                      {/* This space is for the timeline */}
                    </div>

                    {/* Right Content */}
                    {!isLeft ? (
                      <div className="w-5/12 flex items-center text-start border border-1 px-4 py-4 rounded-sm shadow-md">
                        <div className="step-card flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-5/12 flex gap-3 items-center">
                        <div className="icon-container w-16 h-16 rounded-2xl flex items-center justify-center text-white ">
                          <img src={step.icon} alt="" className='ml-0' />
                        </div>
                        <div className="text-black text-lg font-semibold px-4 py-2 rounded-full inline-block">
                          Step {step.id}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step Content - Mobile Layout */}
                  <div className="md:hidden flex w-full pl-16 pr-4">
                    <div className="mobile-step-card w-full">
                      {/* Step Number Badge */}
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 base-color text-sm font-bold px-3 py-1 rounded-full mr-3">
                          Step {step.id}
                        </div>
                        <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-white">
                          <img src={step.icon} alt="" className="w-8 h-8" />
                        </div>
                      </div>
                      
                      {/* Content Card */}
                      <div className="bg-white rounded-lg p-6 shadow-md border">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}