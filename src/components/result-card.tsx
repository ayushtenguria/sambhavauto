import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type ResultCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export function ResultCard({ icon, title, children }: ResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-3 text-2xl">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
