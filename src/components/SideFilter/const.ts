export type TFilterState = {
  brand: string;
  engine: null | number;
  complectation: null | string;
};

export const INITIAL_STATE: TFilterState = {
  brand: 'chery',
  engine: null,
  complectation: null,
};

