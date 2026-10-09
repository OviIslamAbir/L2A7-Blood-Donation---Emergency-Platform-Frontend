"use client";

import { HelpCircle, Plus, Sparkles } from "lucide-react";
import { motion, MotionConfig, type Variants } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = { question: string; answer: string };


const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineLeft: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function FAQContent({ faqs }: { faqs: FAQ[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-hidden bg-[#05070a] text-white selection:bg-red-500 selection:text-white">

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:55px_55px]" />


          <motion.div
            style={{ x: "-50%" }}
            animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-[-260px] h-[650px] w-[900px] rounded-full bg-red-600/[0.09] blur-[150px]"
          />


          <div className="absolute -left-40 top-[40%] h-[450px] w-[450px] rounded-full bg-red-700/[0.05] blur-[140px]" />
          <div className="absolute -right-40 bottom-[5%] h-[500px] w-[500px] rounded-full bg-rose-600/[0.05] blur-[150px]" />


          <motion.span
            animate={{ y: [0, -18, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[10%] top-[20%] h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.9)]"
          />

          <motion.span
            animate={{ y: [0, 16, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[13%] top-[25%] h-1 w-1 rounded-full bg-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.9)]"
          />

          <motion.span
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[25%] left-[8%] h-1 w-1 rounded-full bg-red-400/70"
          />

          <motion.span
            animate={{ y: [0, -18, 0], opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[18%] right-[10%] h-2 w-2 rounded-full bg-red-500/40"
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

          <motion.section
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="relative text-center"
          >
            {/* Badge */}
            <motion.div variants={heroItem}>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.06)] backdrop-blur-xl"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Frequently Asked Questions
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={heroItem}
              className="text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl"
            >
              Got questions?
              <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-500 bg-clip-text text-transparent">
                We&apos;ve got answers.
              </span>
            </motion.h1>


            <motion.p
              variants={heroItem}
              className="mx-auto mt-6 max-w-xl text-base leading-8 text-zinc-500 sm:text-lg"
            >
              Find quick answers about donors, emergency blood requests,
              notifications, security, and the LifeDrop platform.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mx-auto mt-8 flex items-center justify-center gap-3"
            >
              <motion.span
                variants={lineLeft}
                style={{ originX: 1 }}
                className="h-px w-14 bg-gradient-to-r from-transparent to-red-500/50"
              />

              <motion.span
                animate={{ opacity: [0.5, 1, 0.5], rotate: [0, 15, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-4 w-4 text-red-500" />
              </motion.span>

              <motion.span
                variants={lineLeft}
                style={{ originX: 0 }}
                className="h-px w-14 bg-gradient-to-l from-transparent to-red-500/50"
              />
            </motion.div>
          </motion.section>


          <section className="mt-14 sm:mt-16">
            <Accordion
              className="flex flex-col gap-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-[#0a0d14]/75
                      px-5
                      shadow-lg
                      backdrop-blur-xl
                      transition-[border-color,background-color,box-shadow]
                      duration-500
                      ease-out
                      hover:border-red-500/20
                      hover:bg-[#0c0f16]
                      hover:shadow-[0_15px_50px_rgba(220,38,38,0.07)]
                      sm:px-6
                    "
                  >
                    
                    <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px] origin-bottom scale-y-0 bg-gradient-to-t from-red-600 via-rose-500 to-transparent transition-transform duration-500 group-data-[state=open]:scale-y-100" />

                    
                    <div className="pointer-events-none absolute -right-24 -top-24 h-40 w-40 rounded-full bg-red-500/0 blur-3xl transition-all duration-700 group-data-[state=open]:bg-red-500/10" />

                    <AccordionTrigger className="relative py-6 pr-2 text-left text-base font-bold text-zinc-200 transition-colors duration-300 hover:text-red-400 hover:no-underline sm:text-lg [&>svg]:hidden">
                      <div className="flex w-full items-center gap-4">
                       
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-[11px] font-bold text-zinc-600 transition-all duration-500 group-data-[state=open]:border-red-500/25 group-data-[state=open]:bg-red-500/10 group-data-[state=open]:text-red-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                       
                        <span className="flex-1">{faq.question}</span>

                        
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-zinc-500 transition-all duration-500 group-data-[state=open]:rotate-45 group-data-[state=open]:border-red-500/30 group-data-[state=open]:bg-red-500/10 group-data-[state=open]:text-red-400">
                          <Plus className="h-4 w-4" />
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="relative pb-6 pl-[52px] pr-8 text-sm leading-7 text-zinc-500 sm:text-base">
                      <div className="border-l border-red-500/15 pl-4">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </section>


          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.05] bg-white/[0.02] px-4 py-2 text-xs text-zinc-700">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-red-500"
              />
              LifeDrop Emergency Blood Network
            </div>
          </motion.div>
        </div>
      </main>
    </MotionConfig>
  );
}