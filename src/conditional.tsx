import React, { useContext, useState } from "react";
import { noop } from "./util";

interface SwitchContext<T> {
  value: T;
  cases?: { [key: string]: boolean };
  children?: React.ReactNode;
}
interface SwitchProps<V> {
  value: V;
  children: React.ReactNode;
}

interface CaseProps<V> {
  when: V | ((arg: V) => boolean)[];
  children?: React.ReactNode;
  execute?: typeof noop;
}

const SwitchContext = React.createContext<SwitchContext<unknown>>({
  value: undefined,
  cases: {},
});
export function Switch<V>(props: SwitchProps<V>) {
  const [switchContext] = useState<SwitchContext<V>>({
    value: props.value,
    cases: {},
  });
  return (
    <SwitchContext.Provider value={switchContext as SwitchContext<V>}>
      {props.children}
    </SwitchContext.Provider>
  );
}

export function Case<V>(props: CaseProps<V>) {
  const toCheck = Array.isArray(props.when) ? props.when : [props.when];
  const { value, cases } = useContext(SwitchContext);
  const condition = toCheck.some((when_) => {
    if (typeof when_ === "function") {
      return (when_ as (arg: V) => boolean)(value as V);
    } else {
      return when_ === value;
    }
  });
  if (cases) {
    cases[`${props.when}`] = condition;
  }
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
