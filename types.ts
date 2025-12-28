
export interface Teil1Answers {
  anzahlPersonen: string;
  davonKinder: string;
  ort: string;
  zahlungsweise: 'Bar' | 'Kreditkarte' | '';
  reisetermin: string;
}

export type Teil1Results = {
  [key in keyof Teil1Answers]?: boolean;
}

export interface Score {
  teil1: number;
  teil2: number;
  total: number;
  maxPoints: number;
  percentage: number;
  passed: boolean;
}

export interface Teil2Feedback {
  persian: string;
  musterbrief?: string;
}
