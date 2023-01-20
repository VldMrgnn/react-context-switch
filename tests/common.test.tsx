import * as React from "react";
import { render, screen } from "@testing-library/react";

import "jest-canvas-mock";

import { Switch, Case, CaseElse } from "../src";

describe("Startup", () => {
  it("renders without crashing", () => {
    render(
      <div>
        <Switch value={1}>
          <Case when={1}>
            <div data-testid="a">1</div>
          </Case>
          <Case when={2}>
            <div data-testid="a">2</div>
          </Case>
          <CaseElse>
            <div data-testid="a">else</div>
          </CaseElse>
        </Switch>
      </div>
    );
    expect(screen.getByTestId("a").textContent).toBe("1");
  });
});

describe("Basic type check", () => {
  it("inferes the type ", () => {
    const a = 1;
    render(
      <div>
        <Switch value={a - 1}>
          <Case when={1}>
            <div>{"a eq 2"}</div>
          </Case>
          <Case when={[(x) => x === 0]}>
            <div>{"a eq 1"}</div>
          </Case>
          <Case when={[(x:string) => x === 'abracadabra']}>
            <div>{"what we expect here? normally a typescript error stating that x cannot be a string"}</div>
          </Case>
          <CaseElse>
            <div>{"a in neither 2 nor 1"}</div>
          </CaseElse>
        </Switch>
      </div>
    );
    expect(screen.getByText("a eq 1").textContent).toBe("a eq 1");
  });
});

describe("Single case short tests", () => {
  it("test value - string value", () => {
    const a:string = "a";
    render(
      <div>
        <Switch value={a}>
          <Case when={'a'}>
           <div data-testid='test-div'>{"ok"}</div>T
          </Case>
        </Switch>
      </div>
    );
    expect(screen.getByTestId('test-div').textContent).toBe("ok");
  });

  it("test function - string value", () => {
    const a:string = "a";
    render(
      <div>
        <Switch value={a}>
          <Case when={[(x) => x === "A".toLowerCase()]}>
          <div data-testid='test-div'>{"ok"}</div>T
          </Case>
        </Switch>
      </div>
    );
    expect(screen.getByTestId('test-div').textContent).toBe("ok");
  });

  it("test function- expresion array", () => {
    const a = { a: 1 };
    render(
      <div>
        <Switch value={Object.values(a)}>
          <Case when={[(x:number[]) => { return x?.[0] === 1}]}>
            <div data-testid='test-div'>{"ok"}</div>T
          </Case>
        </Switch>
      </div>
    );
    expect(screen.getByTestId('test-div').textContent).toBe("ok");
  });
 
  
});

describe("Basic type check", () => {
  it("inferes when as an array", () => {
    const a = { a: 1 };
    render(
      <div>
        <Switch value={Object.values(a)}>
          <Case when={[(x:number[]) => x?.[0] === 1]}>
            <div data-testid="thediv">{"this text"}</div>
          </Case>
          <Case when={[(x:number[]) => x?.[0] !== 1]}>
            <div data-testid="thediv">{"Neah"}</div>
          </Case>
        </Switch>
      </div>
    );
    const whenArgument = screen.getByTestId("thediv").textContent;
    expect(whenArgument).toBe("this text");
  });
});
