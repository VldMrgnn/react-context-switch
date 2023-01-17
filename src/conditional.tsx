import React, { useContext, useState } from "react";

const SwitchContext = React.createContext<any>(undefined);

const ensureArray = (ar: unknown) =>
  Array.isArray(ar) ? ar : [ar].filter((f) => f !== undefined);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function Switch({
  value,
  children,
}: {
  value: any;
  children?: React.ReactNode;
}) {
  const [switchContext] = useState({ cases: {}, value });
  switchContext.value = value;
  return (
    <SwitchContext.Provider value={switchContext}>
      {children}
    </SwitchContext.Provider>
  );
}

export function Case({
  when,
  children,
  execute = noop,
}: {
  when: unknown;
  children?: React.ReactNode;
  execute?: () => void;
}) {
  const toCheck = ensureArray(when);
  const { value, cases } = useContext(SwitchContext);
  const condition = toCheck.some((when) => {
    if (typeof when === "function") {
      return when(value);
    } else {
      return when === value;
    }
  });

  cases[`${when}`] = condition;
  if (condition) {
    execute();
    return <>{children}</>;
  } else {
    return null;
  }
}

export function CaseElse({ children }: { children: React.ReactNode }) {
  const { cases } = useContext(SwitchContext);
  if (!Object.values(cases).some((v) => !!v)) {
    return <>{children}</>;
  }
  return null;
}
