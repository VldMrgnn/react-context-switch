import React, { useContext, useState } from "react";
import { noop } from "./util";

interface SwitchContext<T> {
  value: T;
  cases?: { [key: string]: boolean };
  children?: React.ReactNode;
}
interface SwitchProps<V> {
  value: SwitchContext<V>["value"];
  children: React.ReactNode;
}
type SwitchValue<V> = SwitchProps<V>["value"];

interface CaseProps<V> {
  when:
    | SwitchValue<V>
    | ((arg: SwitchValue<V>) => boolean)
    | (SwitchValue<V> | ((arg: SwitchValue<V>) => boolean))[];
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

export function Case<V>(props: CaseProps<V>) {
  const { value, cases } = useContext(SwitchContext);
  const toCheck = Array.isArray(props.when) ? props.when : [props.when];
  const condition = (toCheck as Array<V>).some((when_) => {
    if (typeof when_ === "function") {
      return when_(value as V);
    } else {
      return when_ === value;
    }
  });

  if (cases) cases[`${props.when}`] = condition;

  if (condition) {
    props?.execute ? props.execute() : noop();
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export function CaseSome<V>(props: ArrayCaseProps<V>) {
  const { value, cases } = useContext(SwitchContext);
  const toCheck = Array.isArray(props.when) ? props.when : [props.when];
  const condition = (toCheck as Array<V>).some((when_) => {
    if (typeof when_ === "function") {
      return when_(value as V);
    } else {
      return when_ === value;
    }
  });

  if (cases) cases[`${props.when}`] = condition;

  if (condition) {
    props?.execute ? props.execute() : noop();
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export function CaseEvery<V>(props: ArrayCaseProps<V>) {
  const { value, cases } = useContext(SwitchContext);
  const toCheck = Array.isArray(props.when) ? props.when : [props.when];
  const condition = (toCheck as Array<V>).every((when_) => {
    if (typeof when_ === "function") {
      return when_(value as V);
    } else {
      return when_ === value;
    }
  });

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
