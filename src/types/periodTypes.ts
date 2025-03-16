import { Suggestion } from "./suggestion";

export interface PeriodOption {
    label: string;
    multiplier: number;
}

export interface TagWithPeriod {
    suggestion: Suggestion;
    period: PeriodOption;
  }