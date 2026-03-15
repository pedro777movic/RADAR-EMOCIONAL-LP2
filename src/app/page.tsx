
'use client';

import { useRef, useState, useEffect } from 'react';
import { HeroSection } from '@/components/landing/hero-section';
import { RecognitionSection } from '@/components/landing/recognition-section';
import { TruthSection } from '@/components/landing/truth-section';
import { MechanismSection } from '@/components/landing/mechanism-section';
import { BenefitsSection } from '@/components/landing/benefits-section';
import { TargetAudienceSection } from '@/components/landing/target-audience-section';
import { CtaSection } from '@/components/landing/cta-section';
import { GuaranteeSection } from '@/components/landing/guarantee-section';
import { AboutSection } from '@/components/landing/about-section';
import { Footer } from '@/components/landing/footer';
import { GuidedReadingProgress } from '@/components/guided-reading/guided-reading-progress';
import { RadarQuiz } from '@/components/quiz/radar-quiz';
import { DiagnosisResult } from '@/components/quiz/diagnosis-result';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState<'advertorial' | 'quiz' | 'result'>('advertorial');
  const [diagnosisData, setDiagnosisData] = useState<{ empatheticInsight: string; programRelevance: string } | null>(null);

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view !== 'advertorial') return;

    const sections = [
      { ref: section1Ref, progress: 25 },
      { ref: section2Ref, progress: 50 },
      { ref: section3Ref, progress: 75 },
      { ref: section4Ref, progress: 100 },
    ];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.ref.current === entry.target);
            if (section) {
              setProgress((prev) => Math.max(prev, section.progress));
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => observer.disconnect();
  }, [view]);

  const handleStartQuiz = () => {
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (data: { empatheticInsight: string; programRelevance: string }) => {
    setDiagnosisData(data);
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        {view === 'advertorial' && (
          <motion.div
            key="advertorial"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center overflow-x-hidden"
          >
            <GuidedReadingProgress progress={progress} />
            <HeroSection onStartQuiz={handleStartQuiz} />
            <div ref={section1Ref} className="w-full">
              <RecognitionSection />
            </div>
            <div ref={section2Ref} className="w-full">
              <TruthSection />
              <MechanismSection />
            </div>
            <div ref={section3Ref} className="w-full">
              <BenefitsSection />
              <TargetAudienceSection />
            </div>
            <div ref={section4Ref} className="w-full">
              <CtaSection onStartQuiz={handleStartQuiz} />
              <GuaranteeSection />
              <AboutSection />
            </div>
            <Footer />
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-screen w-full items-center justify-center p-4"
          >
            <RadarQuiz onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {view === 'result' && diagnosisData && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full flex-col items-center"
          >
            <DiagnosisResult 
              insight={diagnosisData.empatheticInsight} 
              relevance={diagnosisData.programRelevance} 
            />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
