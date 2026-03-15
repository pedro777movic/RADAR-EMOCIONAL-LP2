'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { personalizedRelationshipDiagnostic } from '@/ai/flows/personalized-relationship-diagnostic-flow';
import { Loader2 } from 'lucide-react';

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
    <Card className="w-full max-w-lg glass border-primary/20 shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
            Passo {step + 1} de {questions.length}
          </span>
          <div className="h-1 w-24 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-xl font-headline leading-tight">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={answers[currentQuestion.id]}
          onValueChange={(val) => setAnswers({ ...answers, [currentQuestion.id]: val })}
          className="space-y-3"
        >
          {currentQuestion.options.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2 rounded-lg border border-white/10 p-4 hover:bg-white/5 transition-colors cursor-pointer">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label htmlFor={opt.value} className="flex-1 cursor-pointer text-base">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Button
          className="w-full mt-8 font-bold h-12"
          disabled={!answers[currentQuestion.id] || loading}
          onClick={handleNext}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analisando seu Radar...
            </>
          ) : (
            step === questions.length - 1 ? 'Gerar Diagnóstico' : 'Próxima Pergunta'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
