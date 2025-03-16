import { create } from 'zustand';
import { TagWithPeriod } from '../types/periodTypes';
type TagType = string | TagWithPeriod;

interface FormulaState {
  tags: TagType[];
  setTags: (newTags: TagType[]) => void;
}

export const useFormulaStore = create<FormulaState>((set) => ({
  tags: [], 
  setTags: (newTags) => set({ tags: newTags }), 
}));
