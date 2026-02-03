'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export function BackedByStrength() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.2, triggerOnce: true });

  const companyValues = [
    {
      title: 'Accountability',
      description: 'We take ownership of every challenge',
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries in structural solutions',
    },
    {
      title: 'No Shortcuts',
      description: 'Excellence through proper execution',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-concrete-50 to-transparent opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-trd-accent/10 text-trd-accent rounded-full text-sm font-semibold mb-6">
              Our Parent Company
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-concrete-900 mb-6">
              Backed by
              <br />
              <span className="text-trd-accent">Tension Reinforced Developments</span>
            </h2>
            <p className="text-lg text-concrete-600 mb-8 leading-relaxed">
              Established since 2017, Tension Reinforced Developments brings strength, agility,
              and professionalism to every project. We're built on a culture of accountability,
              innovation, and a no-shortcuts mentality that ensures exceptional outcomes.
            </p>

            {/* Company Values */}
            <div className="space-y-4 mb-8">
              {companyValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-trd-accent rounded-full mt-2 mr-4" />
                  <div>
                    <h4 className="font-bold text-concrete-900">{value.title}</h4>
                    <p className="text-concrete-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="#"
                className="inline-flex items-center text-trd-accent hover:text-trd-accent/80
                         transition-colors duration-200 font-semibold"
              >
                Learn more about TRD Group
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for company image */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-industrial-700 to-concrete-800"
                style={{
                  backgroundImage: 'url(/images/company/trd-office.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">2017</div>
                    <div className="text-white/80 text-sm">Established</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                    <div className="text-white/80 text-sm">Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                    <div className="text-white/80 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Element */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-trd-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-industrial-500/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
