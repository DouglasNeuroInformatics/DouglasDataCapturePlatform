import React, { useReducer } from 'react';

interface Step {
  name: string;
  element: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
}

interface State {
  currentIndex: number;
  maxIndex: number;
}

interface Action {
  type: 'increment' | 'decrement';
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      if (state.currentIndex !== state.maxIndex) {
        return { ...state, currentIndex: state.currentIndex + 1 };
      }
      return state;
    case 'decrement':
      if (state.currentIndex !== 0) {
        return { ...state, currentIndex: state.currentIndex - 1 };
      }
      return state;
  }
};

const Stepper = ({ steps }: StepperProps) => {
  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    maxIndex: steps.length - 1
  });

  return (
    <div className="flex w-full flex-col">
      <div className="flex">
        {steps.map((step, index) => (
          <div className="flex items-center" key={index}>
            <div className="flex">
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
                <span className="text-slate-300">{index}</span>
              </div>
              <span>{step.name}</span>
            </div>
            <hr className="mx-3 w-5 border-black" />
          </div>
        ))}
      </div>
      <div>{steps.at(state.currentIndex)?.element}</div>
      <div>
        <button className="btn-primary mr-2" onClick={() => dispatch({ type: 'decrement' })}>
          Back
        </button>
        <button className="btn-primary" onClick={() => dispatch({ type: 'increment' })}>
          Next
        </button>
      </div>
    </div>
  );
};

export { Stepper as default, type StepperProps };
