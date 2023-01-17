import React from "react";
export declare function Switch({ value, children, }: {
    value: any;
    children?: React.ReactNode;
}): JSX.Element;
export declare function Case({ when, children, execute, }: {
    when: unknown;
    children?: React.ReactNode;
    execute?: () => void;
}): JSX.Element | null;
export declare function CaseElse({ children }: {
    children: React.ReactNode;
}): JSX.Element | null;
