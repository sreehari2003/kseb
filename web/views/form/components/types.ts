export type NextState = {
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
};
