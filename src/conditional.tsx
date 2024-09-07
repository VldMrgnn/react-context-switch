import React, { useContext, useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

interface SwitchContextType<T> {
  value: T;
  cases?: Record<string, boolean>;
}

interface SwitchProps<T> {
  value: T;
  children: React.ReactNode;
}

interface CaseProps<T> {
  when: T | ((value: T) => boolean);
  mounted?: boolean;
  children?: React.ReactNode;
  execute?: () => void;
}

type TEvalName = "some" | "every";

const SwitchContext = React.createContext<SwitchContextType<any>>({
  value: undefined,
  cases: {},
});

export function Switch<T>({ value, children }: SwitchProps<T>) {
  const contextValue = useMemo(() => ({ value, cases: {} }), [value]);

  return (
    <SwitchContext.Provider value={contextValue}>
      {children}
    </SwitchContext.Provider>
  );
}

function evaluate<T>(props: CaseProps<T>, fn: TEvalName, value: T): boolean {
  const { when } = props;

  const conditions = Array.isArray(when) ? when : [when];

  return conditions[fn]((condition) =>
    typeof condition === "function"
      ? (condition as (value: T) => boolean)(value)
      : condition === value
  );
}

export function Case<T>(props: CaseProps<T>): React.ReactElement | null {
  const { value, cases } = useContext(SwitchContext);
  const condition = evaluate(props, "some", value);

  if (cases) cases[String(props.when)] = condition;

  if (condition) {
    props.execute?.();
    return <>{props.children}</>;
  }

  return props.mounted ? (
    <div style={{ display: "none" }}>{props.children}</div>
  ) : null;
}

function createCaseComponent<T>(evalType: TEvalName) {
  return function CaseComponent(
    props: CaseProps<T>
  ): React.ReactElement | null {
    const { value, cases } = useContext(SwitchContext);
    const condition = evaluate(props, evalType, value);

    if (cases) cases[String(props.when)] = condition;

    if (condition) {
      props.execute?.();
      return <>{props.children}</>;
    }

    return null;
  };
}

export const CaseSome = createCaseComponent("some");
export const CaseEvery = createCaseComponent("every");

export function CaseElse({ children }: { children: React.ReactNode }) {
  const { cases } = useContext(SwitchContext);
  const isAnyCaseMatched = Object.values(cases || {}).some(Boolean);

  return !isAnyCaseMatched ? <>{children}</> : null;
}
