import * as React from "react";
import { render, screen } from "@testing-library/react";

import "jest-canvas-mock";

import { Switch, Case, CaseElse, CaseSome, CaseEvery } from "../src";

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
          <Case when={[(x: number) => x === 0]}>
            <div>{"a eq 1"}</div>
          </Case>
          <Case when={[(x: string) => x === "abracadabra"]}>
            <div>
              {
                "what we expect here? normally a typescript error stating that x cannot be a string"
              }
            </div>
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
    const a = "a";
    render(
      <div>
        <Switch value={a}>
          <Case when={"a"}>
            <div data-testid="test-div">{"ok"}</div>T
          </Case>
        </Switch>
      </div>
    );
    expect(screen.getByTestId("test-div").textContent).toBe("ok");
  });

  it("test function - string value", () => {
    const a = "a";
    render(
      <div>
        <Switch value={a}>
          <Case when={[(x: string) => x === "A".toLowerCase()]}>
            <div data-testid="test-div">{"ok"}</div>T
          </Case>
        </Switch>
      </div>
    );
    expect(screen.getByTestId("test-div").textContent).toBe("ok");
  });

  it("test function- expresion array", () => {
    const a = { a: 1 };
    render(
      <div>
        <Switch value={Object.values(a)}>
          <Case
            when={[
              (x: number[]) => {
                return x?.[0] === 1;
              },
            ]}
          >
            <div data-testid="test-div">{"ok"}</div>T
          </Case>
        </Switch>
      </div>
    );
    expect(screen.getByTestId("test-div").textContent).toBe("ok");
  });
});

describe("Basic type check", () => {
  it("inferes when as an array", () => {
    const a = { a: 1 };
    render(
      <div>
        <Switch value={Object.values(a)}>
          <Case when={[(x: number[]) => x?.[0] === 1]}>
            <div data-testid="thediv">{"this text"}</div>
          </Case>
          <Case when={[(x: number[]) => x?.[0] !== 1]}>
            <div data-testid="thediv">{"Neah"}</div>
          </Case>
        </Switch>
      </div>
    );
    const whenArgument = screen.getByTestId("thediv").textContent;
    expect(whenArgument).toBe("this text");
  });
});

describe("joined case", () => {
  it("verifies joined cases", () => {
    const a = 100 - 99;
    render(
      <div>
        <Switch value={a}>
          <Case when={1}>
            <div data-testid="thediv">{"yes way"}</div>
          </Case>
          <Case when={2}>
            <div data-testid="thediv">{"no way"}</div>
          </Case>
          <Case when={[1, (x: number) => [1, 2, 3].includes(x)]}>
            <div data-testid="thediv-fns">{"yes way"}</div>
          </Case>
          <Case when={[3, 1001, (x: number) => [2, 3].includes(x)]}>
            <div data-testid="thediv-fns">{"no way"}</div>
          </Case>
          <Case
            when={[
              0 + 1,
              (f: number) => {
                return !!f;
              },
              (x: number) => [x / x, 2, 3].includes(x),
            ]}
          >
            <div data-testid="thediv-val-fns-fns">{"yes way"}</div>
          </Case>
          <CaseElse>
            <div data-testid="thediv">{"no way"}</div>
          </CaseElse>
        </Switch>
      </div>
    );
    const whenArgument = screen.getByTestId("thediv").textContent;
    expect(whenArgument).toBe("yes way");
    const whenArgument2 = screen.getByTestId("thediv-fns").textContent;
    expect(whenArgument2).toBe("yes way");
    const whenArgument3 = screen.getByTestId("thediv-val-fns-fns").textContent;
    expect(whenArgument3).toBe("yes way");
  });
});

describe("CaseElse", () => {
  it("verifies CaseElse", async () => {
    const a = 100 - 90;
    render(
      <div>
        <Switch value={a}>
          <Case when={1}>
            <div data-testid="thediv">{"yes way"}</div>
          </Case>
          <Case when={2}>
            <div data-testid="thediv">{"no way"}</div>
          </Case>
          <Case when={[1, (x: number) => [1, 2, 3].includes(x)]}>
            <div data-testid="thediv-fns">{"yes way"}</div>
          </Case>
          <Case when={[3, 1001, (x: number) => [2, 3].includes(x)]}>
            <div data-testid="thediv-fns">{"no way"}</div>
          </Case>
          <Case
            when={[
              0 + 1,
              (f: number) => {
                return !f;
              },
              (x: number) => [(x / 3) * x, 2, 3].includes(x),
            ]}
          >
            <div data-testid="thediv-val-fns-fns">{"yes way"}</div>
          </Case>
          <CaseElse>
            <div data-testid="the-case-else-div">{"else way"}</div>
          </CaseElse>
        </Switch>
      </div>
    );
    const whenArgument = await screen.queryAllByTestId("thediv");
    expect(whenArgument.length).toBe(0);

    const whenArgument2 = await screen.queryAllByTestId("thediv-fns");
    expect(whenArgument2.length).toBe(0);

    const whenArgument3 = await screen.queryAllByTestId("thediv-val-fns-fns");
    expect(whenArgument3.length).toBe(0);

    const whenArgument4 = await screen.getByTestId("the-case-else-div")
      .textContent;
    expect(whenArgument4).toBe("else way");
  });
  // TODO:
  // it("verifies CaseElse with Some", async () => {});
  // it("verifies CaseElse with Every", async () => {});
});
describe("Some, Everey", () => {
  it("verifies SOME", () => {
    const a = 100 - 99;
    render(
      <div>
        <Switch value={a}>
          {/* @ts-ignore  -- it should raise typescript error */}
          <CaseSome when={1}>
            <div data-testid="thediv">{"yes way"}</div>
          </CaseSome>
          <CaseSome
            when={[
              1,
              (x: number) => {
                return [1, 2, 3].includes(x);
              },
            ]}
          >
            <div data-testid="thediv-fns">{"yes way"}</div>
          </CaseSome>
          <CaseSome when={[3, 1001, (x: number) => [2, 3].includes(x)]}>
            <div data-testid="thediv-fns">{"no way"}</div>
          </CaseSome>
          <CaseSome
            when={[
              0 + 1,
              (f: number) => {
                return !!f;
              },
              (x: number) => [x / x, 2, 3].includes(x),
            ]}
          >
            <div data-testid="thediv-val-fns-fns">{"yes way"}</div>
          </CaseSome>
          <CaseElse>
            <div data-testid="thediv">{"no way"}</div>
          </CaseElse>
        </Switch>
      </div>
    );
    const whenArgument2 = screen.getByTestId("thediv-fns").textContent;
    expect(whenArgument2).toBe("yes way");
    const whenArgument3 = screen.getByTestId("thediv-val-fns-fns").textContent;
    expect(whenArgument3).toBe("yes way");
  });

  it("verifies EVERY", () => {
    const a = 100 - 99;
    render(
      <div>
        <Switch value={a}>
          {/* @ts-ignore  -- it should raise typescript error */}
          <CaseEvery when={1}>
            <div data-testid="thediv">{"yes way"}</div>
          </CaseEvery>
          <CaseEvery when={[1, (x: number) => [1, 2, 3].includes(x)]}>
            <div data-testid="thediv-fns">{"yes way"}</div>
          </CaseEvery>
          <CaseEvery when={[3, 1001, (x: number) => [1, 2, 3].includes(x)]}>
            <div data-testid="thediv-fns-one-2fail-1pass">{"no way"}</div>
          </CaseEvery>
          <CaseEvery
            when={[
              0 + 1,
              (f: number) => {
                return !!f;
              },
              (x: number) => [x / x, 2, 3].includes(x),
            ]}
          >
            <div data-testid="thediv-val-fns-fns">{"yes way"}</div>
          </CaseEvery>
          <CaseElse>
            <div data-testid="thediv">{"no way"}</div>
          </CaseElse>
        </Switch>
      </div>
    );
    const whenArgument2 = screen.getByTestId("thediv-fns").textContent;
    expect(whenArgument2).toBe("yes way");
    const whenArgument3 = screen.getByTestId("thediv-val-fns-fns").textContent;
    expect(whenArgument3).toBe("yes way");
    expect(screen.queryAllByTestId("thediv-fns-one-2fail-1pass").length).toBe(
      0
    );
  });
  it("test other types", () => {
    const a = { a: 1, b: 2 };
    render(
      <div>
        <Switch value={a}>
          <CaseSome
            when={[
              (x: typeof a) => {
                const zzz = JSON.stringify({ a: 1, b: 2 });
                const yyy = JSON.stringify(x);
                return zzz === yyy;
              },
              (x: any) => {
                return x.a === 1;
              },
            ]}
          >
            <div data-testid="thediv">{"yes way"}</div>
          </CaseSome>
          <Case when={{ a: 1, b: 2, c: 3 }}>
            <div data-testid="thediv-fns">{"no way"}</div>
          </Case>
          <Case when={{ a: 1, b: 2, c: 3, d: 4 }}>
            <div data-testid="thediv-fns-one-2fail-1pass">{"no way"}</div>
          </Case>
          <CaseElse>
            <div data-testid="thediv">{"no way"}</div>
          </CaseElse>
        </Switch>
      </div>
    );
    const whenArgument2 = screen.getByTestId("thediv").textContent;
    expect(whenArgument2).toBe("yes way");
    expect(screen.queryAllByTestId("thediv-fns").length).toBe(0);
    expect(screen.queryAllByTestId("thediv-fns-one-2fail-1pass").length).toBe(
      0
    );
  });
});

// TODO:
// describe("Mix cases and default", () => {});

describe("runs a single case as a function", () => {
  it("runs a single case when as a function", () => {
    const a = 1;
    render(
      <div>
        <Switch value={a as number}>
          {/* still doesn't infer x as number */}
          <Case when={(x: any) => x === 1}>
            <div data-testid="thediv">{"yes way"}</div>
          </Case>
          <Case when={[1, (x: any) => [1, 2, 3].includes(x)]}>
            <div data-testid="thediv-fns">{"yes way"}</div>
          </Case>
        </Switch>
      </div>
    );
    const whenArgument = screen.getByTestId("thediv").textContent;
    expect(whenArgument).toBe("yes way");
    const whenArgument2 = screen.queryByTestId("thediv-fns")?.textContent;
    expect(whenArgument2).toBe("yes way");
  });
});
