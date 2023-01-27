import React, { Fragment, useContext, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

interface SwitchContext<T> {
  value: T;
  cases?: { [key: string]: boolean };
  children?: React.ReactNode;
}
interface SwitchProps<T> {
  value: SwitchContext<T>["value"] | never;
  children: React.ReactNode;
  valueType: T;
}
interface CaseProps<T> {
  when: T extends any[]
    ? T extends (x: infer U) => any
      ? (x: U) => boolean
      : T
    : T extends (x: infer U) => any
    ? (x: U) => boolean
    : T;

  children?: React.ReactNode;
  execute?: typeof noop;
}
interface ArrayCaseProps<T> {
  when: T extends any[]
    ? T extends (x: infer U) => any
      ? (x: U) => boolean
      : T
    : never;

  children?: React.ReactNode;
  execute?: typeof noop;
}
type TEvalName = "some" | "every";

const SwitchContext = React.createContext({} as SwitchContext<any>);

export function Switch<T, C>({
  value,
  children,
}: {
  value: SwitchProps<T>["value"];
  children: SwitchProps<C>["children"];
}) {
  const [switchContext] = useState({ cases: {}, value });
  switchContext.value = value;
  return (
    <SwitchContext.Provider value={switchContext}>
      {children}
    </SwitchContext.Provider>
  );
}
function evaluate<T>(
  props: CaseProps<T> | ArrayCaseProps<T>,
  fn: TEvalName,
  value: SwitchContext<T>["value"]
) {
  type TValue = typeof value;
  const toCheck = (
    Array.isArray(props.when)
      ? props.when
      : [props.when].filter((x) => x !== undefined)
  ) as (TValue | ((arg?: TValue) => boolean))[];

  return toCheck[fn]((when) => {
    if (typeof when === "function") {
      const fnw = when as (arg?: TValue) => boolean;
      return fnw(value as TValue);
    } else {
      const fnw = when as TValue;
      return fnw === value;
    }
  });
}
export function Case<T>(props: CaseProps<T>): React.ReactElement | null {
  const { value, cases } = useContext(SwitchContext);
  const condition = evaluate(props, "some", value);
  if (cases) cases[`${props.when}`] = condition;

  if (condition) {
    props?.execute ? props.execute() : noop();
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export function CaseSome<T>(props: ArrayCaseProps<T>) {
  const { value, cases } = useContext(SwitchContext);
  const condition = evaluate(props, "some", value);
  if (cases) cases[`${props.when}`] = condition;

  if (condition) {
    props?.execute ? props.execute() : noop();
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export function CaseEvery<T>(props: ArrayCaseProps<T>) {
  const { value, cases } = useContext(SwitchContext);
  const condition = evaluate(props, "every", value);
  if (cases) cases[`${props.when}`] = condition;

  if (condition) {
    props?.execute ? props.execute() : noop();
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export function CaseElse({ children }: { children: React.ReactNode }) {
  const { cases } = useContext(SwitchContext);
  if (!Object.values(cases || []).some((v) => !!v)) {
    return <>{children}</>;
  }
  return null;
}
