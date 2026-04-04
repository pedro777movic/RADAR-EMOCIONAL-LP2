import { MotionWrapper } from './motion-wrapper';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, ShieldAlert, MessageSquareCode, Sparkles, Magnet } from 'lucide-react';

const benefits = [
  {
    icon: <Eye className="size-8 text-primary" />,
    text: 'O padrão invisível que está fazendo ele esfriar e perder o interesse',
  },
  {
    icon: <ShieldAlert className="size-8 text-primary" />,
    text: 'O Protocolo de Resgate: o que fazer nos próximos 3 dias para reativar nele desejo e interesse',
  },
  {
    icon: <MessageSquareCode className="size-8 text-primary" />,
    text: 'Scripts de Mensagens: o que escrever para sempre deixá-lo interessado e recíproco',
  },
  {
    icon: <Sparkles className="size-8 text-primary" />,
    text: 'Como recriar curiosidade naturalmente sem se esforçar',
  },
  {
    icon: <Magnet className="size-8 text-primary" />,
    text: 'Como fazer ele voltar a buscar você ativamente',
  },
];

export function BenefitsSection() {
  return (
    <section className="w-full py-20 sm:py-32">
      <div className="container mx-auto max-6xl px-4">
        <MotionWrapper>
          <div className="text-center">
            <p className="font-headline text-lg text-primary">Pequenas mudanças. Impacto profundo.</p>
            <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              O Que Você Vai Descobrir
            </h2>
          </div>
        </MotionWrapper>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <MotionWrapper
              key={index}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_theme(colors.primary/0.3)]">
                <CardHeader className="flex flex-col items-center text-center">
                  {benefit.icon}
                  <CardTitle className="mt-4 text-lg font-medium">{benefit.text}</CardTitle>
                </CardHeader>
              </Card>
            </MotionWrapper>
          ))}
        </div>
        <MotionWrapper>
          <p className="mt-16 text-center font-headline text-xl text-muted-foreground">
            Simples. Aplicável. Psicológico.
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
}
