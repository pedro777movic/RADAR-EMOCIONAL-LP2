
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ArrowRight, BrainCircuit } from 'lucide-react';

type DiagnosisResultProps = {
  insight: string;
  relevance: string;
};

export function DiagnosisResult({ insight, relevance }: DiagnosisResultProps) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <BrainCircuit className="size-4" />
            Análise Concluída
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Seu Diagnóstico <span className="text-primary">Especializado</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Com base nos sinais identificados, detectamos o seguinte padrão emocional:
          </p>
        </div>

        <Card className="glass border-primary/20 shadow-2xl mb-8 overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Insight da Situação
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed italic">
              "{insight}"
            </div>
            
            <div className="h-px w-full bg-white/10" />
            
            <div className="space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="text-primary size-5" />
                Como o Radar Emocional vai agir:
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {relevance}
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass rounded-xl p-6 border-accent/20 bg-accent/5">
            <p className="text-sm font-medium mb-4">
              Você agora tem a clareza. O próximo passo é o **Reposicionamento**.
            </p>
            <a href="https://pay.cakto.com.br/39e5qza_779133" className="block w-full">
              <Button size="lg" className="w-full md:w-auto px-12 h-14 font-black text-lg animate-glow-pulse">
                Acessar Plano de Ação Completo
                <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Acesso imediato ao aplicativo digital • Diagnóstico completo • Suporte Lunar Attraction
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
