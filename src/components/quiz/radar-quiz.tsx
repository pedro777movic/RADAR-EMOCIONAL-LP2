
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { personalizedRelationshipDiagnostic } from '@/ai/flows/personalized-relationship-diagnostic-flow';
import { Loader2, BrainCircuit } from 'lucide-react';

const questions = [
  {
    id: 'frequency',
    question: 'Com que frequência vocês se falavam antes da mudança?',
    options: [
      { label: 'Todo dia, o dia todo', value: 'frequencia alta' },
      { label: 'Algumas vezes por dia', value: 'frequencia moderada' },
      { label: 'Apenas aos finais de semana', value: 'frequencia baixa' },
    ],
  },
  {
    id: 'behavior',
    question: 'Qual a principal mudança que você notou?',
    options: [
      { label: 'Demora muito para responder', value: 'respostas lentas' },
      { label: 'Respostas curtas e secas', value: 'desinteresse verbal' },
      { label: 'Não visualiza mais meus stories', value: 'afastamento visual' },
      { label: 'Parou de propor encontros', value: 'falta de iniciativa' },
    ],
  },
  {
    id: 'investment',
    question: 'Quem costuma iniciar as conversas agora?',
    options: [
      { label: 'Sempre eu', value: 'investimento unilateral' },
      { label: 'Ele inicia, mas some depois', value: 'investimento intermitente' },
      { label: 'Ninguém mais fala nada', value: 'silêncio total' },
    ],
  },
  {
    id: 'last_interaction',
    question: 'Como foi a última interação de vocês?',
    options: [
      { label: 'Tivemos uma discussão', value: 'conflito recente' },
      { label: 'Foi normal, mas ele esfriou logo após', value: 'esfriamento súbito' },
      { label: 'Visualizou e não respondeu', value: 'vácuo total' },
    ],
  },
];

type RadarQuizProps = {
  onComplete: (data: { empatheticInsight: string; programRelevance: string }) => void;
};

export function RadarQuiz({ onComplete }: RadarQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const situation = Object.entries(answers)
          .map(([id, val]) => `${questions.find(q => q.id === id)?.question}: ${val}`)
          .join('. ');
        
        const result = await personalizedRelationshipDiagnostic({ userSituation: situation });
        onComplete(result);
      } catch (error) {
        console.error('Erro ao gerar diagnóstico:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const currentQuestion = questions[step];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="glass border-primary/20 shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BrainCircuit className="size-4 text-primary" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
                Módulo de Diagnóstico
              </span>
            </div>
            <span className="text-xs font-mono text-primary">
              {Math.round(((step + 1) / questions.length) * 100)}%
            </span>
          </div>
          <CardTitle className="text-2xl font-headline leading-tight">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={(val) => setAnswers({ ...answers, [currentQuestion.id]: val })}
            className="space-y-4"
          >
            {currentQuestion.options.map((opt) => (
              <div 
                key={opt.value} 
                className={`flex items-center space-x-3 rounded-xl border p-5 transition-all cursor-pointer ${
                  answers[currentQuestion.id] === opt.value 
                  ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.1)]' 
                  : 'border-white/10 hover:bg-white/5'
                }`}
                onClick={() => setAnswers({ ...answers, [currentQuestion.id]: opt.value })}
              >
                <RadioGroupItem value={opt.value} id={opt.value} className="sr-only" />
                <div className={`size-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  answers[currentQuestion.id] === opt.value ? 'border-primary bg-primary' : 'border-muted'
                }`}>
                  {answers[currentQuestion.id] === opt.value && <div className="size-1.5 rounded-full bg-background" />}
                </div>
                <Label htmlFor={opt.value} className="flex-1 cursor-pointer text-base font-medium">
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            className="w-full mt-10 font-bold h-14 text-lg"
            disabled={!answers[currentQuestion.id] || loading}
            onClick={handleNext}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processando análise...
              </>
            ) : (
              step === questions.length - 1 ? 'Gerar Diagnóstico' : 'Confirmar Resposta'
            )}
          </Button>
          
          <p className="text-center mt-6 text-[10px] text-muted-foreground uppercase tracking-widest">
            Sua privacidade é nossa prioridade absoluta
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
