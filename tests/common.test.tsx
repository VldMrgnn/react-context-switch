import * as React from "react";
import { render } from "@testing-library/react";

import "jest-canvas-mock";

import { Switch, Case, CaseElse } from "../src";

describe("Common render", () => {
  it("renders without crashing", () => {
    render(
      <div>
        <Switch value={1}>
          <Case when={1}>
            <div>1</div>
          </Case>
          <Case when={2}>
            <div>2</div>
          </Case>
          <CaseElse>
            <div>else</div>
          </CaseElse>
        </Switch>
      </div>
    );
  });
});
