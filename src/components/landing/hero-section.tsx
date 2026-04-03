'use client';
import { Button } from '@/components/ui/button';
import { ArrowDown, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';

type HeroSectionProps = {
  onStartQuiz: () => void;
};

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <section className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-background"></div>
      <div
        className="absolute -left-1/4 top-0 h-1/2 w-1/2 animate-orb-pulse rounded-full bg-purple-500/30 opacity-50 blur-3xl"
        style={{ animationDelay: '2s' }}
      ></div>
      <div className="absolute -right-1/4 bottom-0 h-1/2 w-1/2 animate-orb-pulse rounded-full bg-cyan-500/30 opacity-50 blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Ele está online.
          <br />
          <span className="text-primary">Mas não está com você.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted-foreground md:text-xl leading-relaxed"
        >
          Existe um padrão invisível que faz homens se afastarem…
          <br />
          Mesmo quando ainda sentem algo. Este artigo revela o porquê.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Button 
            size="lg" 
            onClick={onStartQuiz}
            className="animate-glow-pulse font-bold tracking-wider shadow-[0_0_20px_theme(colors.primary/0.5)] transition-shadow hover:shadow-[0_0_30px_theme(colors.primary/0.8)] h-14 px-8 text-lg"
          >
            Iniciar Protocolo de Reação
            <MoveRight className="ml-2 h-6 w-6" />
          </Button>
          <p className="text-xs text-muted-foreground">Tempo estimado: 1 minuto</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Continuar lendo</span>
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
