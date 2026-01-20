
export enum FunnelStage {
  AWARENESS = 'Awareness',
  INTEREST = 'Interest',
  DESIRE = 'Desire',
  ACTION = 'Action'
}

export interface MarketingAction {
  id: string;
  title: string;
  description: string;
  channels: string[];
  stage: FunnelStage;
  day: number; // 1 to 28
}

export interface WeekPlan {
  weekNumber: number;
  mainTheme: string;
  objective: string;
  actions: MarketingAction[];
}
