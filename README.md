# React Conditional Render SwitchCase using Context

## Description

I am preparing a better distribution of this package. Please use the version 0.1.2 for now.

The react-context-switch package provides an easy-to-use and memory-friendly way to conditionally render components in React. Using the **Switch**, **Case**, and **CaseElse** components, developers can cleanly and concisely handle different conditions without the need for messy conditionals.

```js

<Switch value={expression to be evaluated}>
  <Case when={expression or value to strictly equal the switch value}>
    <Component to render if the condition is met>
  </Case>
  <Case when={[function taking switch value as argument and evaluates to true]}>
    <Component to render if the condition is met>
  </Case>
  <CaseElse>
    <Component to render if no condition is met>
  </CaseElse>
</Switch>


```

## Installation

To install, simply run the following command:

```bash
npm install react-context-switch
```

## Usage

The _Switch_ component takes a value prop, which is the value to be evaluated.

The _Case_ component takes a when prop, which can be either a **value** or a **function** that returns a boolean.

To evaluate a "when" prop as a value, simply pass the value to the when prop.

```jsx
let a = 1;
//...
<Switch value={a - 1}>
  <Case when={0}>
    <div>
      <p>{"a-1 equals 0"}</p>
    </div>
  </Case>
</Switch>;
```

To evaluate a "when" prop as a function, pass an array containing the function to the when prop.

```jsx
let a=1;
//...
 <Switch value={a-1}>
   <Case when={[(x) => [0,2,4].includes(x)]}>
	  <p>{'a-1 equals one of 0, 2 or 4'}</p>
  </Case>

```

The _Case_ component's children will be rendered if the when prop matches the value prop of the parent _Switch_ component.

The _CaseElse_ component's children will be rendered if none of the _Case_ components match the value prop of the parent _Switch_ component.

Here is an example of usage:

```jsx
<Switch value={true}>
  <Case when={[() => options.includes("DEFAULT_CONTROLS")]}>
    <DefaultControls />
  </Case>
  <Case when={[() => options.includes("YEAR_PICKER")]}>
    <Calendar />
  </Case>
  <Case when={[() => options.includes("SHOW_BOOKMARK")]}>
    <div>
      <i className="icon-bookmark" />
    </div>
  </Case>
  <CaseElse>
    <FallbackComponent />
  </CaseElse>
</Switch>
```

It is also possible to nest Switch components, allowing for even more powerful and flexible conditional rendering.

```jsx
import React from "react";
import { Switch, Case, CaseElse } from "react-context-switch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch value={new Date().getFullYear()}>
          <Case when={2023}>
            <p>2023</p>
          </Case>
          <Case when={[(x) => x === 2024]}>
            <p>2024</p>
          </Case>
          <CaseElse>
            <Switch value={~~(new Date().getFullYear() / 100)}>
              <Case when={20}>
                <NearFutureComponent />
              </Case>
              <Case when={(x) => [21, 22].includes(x)}>
                <FutureComponent />
              </Case>
              <CaseElse>
                <DistantFutureComponent />
              </CaseElse>
            </Switch>
          </CaseElse>
        </Switch>
      </header>
    </div>
  );
}

function NearFutureComponent() {
  return <div>{"The Near Future is here!"}</div>;
}
function FutureComponent() {
  return <div>{"The Future is here!"}</div>;
}
function DistantFutureComponent() {
  return <div>{"The Distant Future is here!"}</div>;
}

export default App;
```

Please find an example of a complex conditional render on [codesandbox](https://codesandbox.io/s/react-context-switch-an-example-290kxu?file=/src/styles.css)

I use this component extensively in my projects.

This component was inspired from [Mike Talbot's work](https://github.com/miketalbot). Thanks Mike!
