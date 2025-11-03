"use client";

import { Badge } from "@/components/ui/badge";
import { MacbookScroll } from "@/components/ui/macbook";
import { motion } from "framer-motion"; // Ensure correct import

export default function Example() {
  return (
    <section className="w-full pt-2 md:pt-4">
      {" "}
      {/* Consistent vertical padding */}
      <div className="mx-auto px-2 sm:px-4">
        {" "}
        {/* Consistent content width */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Left Card - 60% on desktop, full width on mobile */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-xl shadow-md border border-white/10 relative p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden"
          >
            <div className="hidden lg:block">
              <MacbookScroll
                title={<span>Protege tus operaciones. Simplifica tu flujo de trabajo.</span>}
                src={`/linear.webp`} // Assuming this path is valid
                showGradient={false}
              />
            </div>

            {/* Mobile version - Weekly Activity Card */}
            <div className="sm:hidden">
              <div className="backdrop-blur-sm rounded-xl p-6 border border-white/10">
                {" "}
                {/* Added border */}
                  {/* Weekly Activity Graph */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Actividad semanal
                  </h3>

                  {/* Graph Container - Simplified for clarity, keeping original SVG structure */}
                  <div className="relative h-48 rounded-lg p-4">
                    {/* Original SVG content for graph */}
                    <svg className="w-full h-full" viewBox="0 0 300 150">
                      {/* Background Grid */}
                      <defs>
                        <pattern
                          id="grid"
                          width="50"
                          height="30"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 50 0 L 0 0 0 30"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Area Fill */}
                      <path
                        d="M 0 85 Q 25 75 50 95 T 100 80 T 150 90 T 200 70 T 250 85 T 300 80 L 300 150 L 0 150 Z"
                        fill="rgba(7, 217, 217, 0.2)"
                        stroke="none"
                      />

                      {/* Line */}
                      <path
                        d="M 0 85 Q 25 75 50 95 T 100 80 T 150 90 T 200 70 T 250 85 T 300 80"
                        fill="none"
                        stroke="#07D9D9"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Highlight for Thu */}
                      <line
                        x1="150"
                        y1="0"
                        x2="150"
                        y2="150"
                        stroke="rgba(7, 217, 217, 0.3)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <circle
                        cx="150"
                        cy="90"
                        r="4"
                        fill="#07D9D9"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* X-axis Labels */}
                    <div className="flex justify-between text-xs text-white/60 mt-2">
                      <span>Lun</span>
                      <span>Mar</span>
                      <span>Mié</span>
                      <span className="text-[#07D9D9] font-semibold">
                        Jue
                      </span>
                      <span>Vie</span>
                      <span>Sáb</span>
                      <span>Dom</span>
                    </div>
                  </div>
                </div>
                {/* Monitor Users Section */}
                <div className="flex items-start space-x-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      Monitorea a tus usuarios
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Sigue su recorrido, mejora su productividad y garantiza cada acción en tiempo real.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card - 40% on desktop, full width on mobile */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl shadow-md border border-white/10 relative p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#07D9D9] to-[#0596A6] flex items-center justify-center mb-6"
            >
              <span className="text-white text-4xl font-bold">🔒</span>{" "}
              {/* Placeholder icon */}
            </motion.div>
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl font-bold text-white mb-3"
            >
              Seguridad de nivel empresarial
            </motion.h3>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/70 leading-relaxed"
            >
              Construida con los más altos estándares para proteger tus datos y la privacidad de tus clientes.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


