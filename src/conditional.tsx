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
  when: V | (V | ((arg: V) => boolean))[];
  children?: React.ReactNode;
  execute?: typeof noop;
}
interface ArrayCaseProps<V> extends CaseProps<V> {
  when: (V | ((arg: V) => boolean))[];
}

const SwitchContext = React.createContext<SwitchContext<any>>({
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
type TFn = "some" | "every";

function evaluate<V>(
  props: CaseProps<V>,
  value: SwitchProps<V>["value"],
  cases: SwitchContext<V>["cases"],
  fn: TFn
) {
  const toCheck = Array.isArray(props.when) ? props.when : [props.when];
  const condition = (toCheck as Array<V>)[fn]((when_) => {
    if (typeof when_ === "function") {
      return (when_ as (arg: V) => boolean)(value as V);
    } else {
      return when_ === value;
    }
  });
  if (cases) {
    cases[`${props.when}`] = condition;
  }
  return condition;
}
export function Case<V>(props: CaseProps<V>) {
  const { value, cases } = useContext(SwitchContext);
  if (evaluate(props, value, cases, "some")) {
    props?.execute ? props.execute() : noop();
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export function CaseSome<V>(props: ArrayCaseProps<V>) {
  const { value, cases } = useContext(SwitchContext);
  if (evaluate(props, value, cases, "some")) {
    props?.execute ? props.execute() : noop();
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export function CaseEvery<V>(props: ArrayCaseProps<V>) {
  const { value, cases } = useContext(SwitchContext);
  if (evaluate(props, value, cases, "every")) {
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
