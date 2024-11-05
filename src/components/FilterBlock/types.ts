import React from 'react';

export type TFilterOption<T extends string | number> = {
  label: React.ReactNode;
  value: T;
};

