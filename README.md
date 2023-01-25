# React Conditional Render SwitchCase using Context

## Description

The react-context-switch package provides an easy and friendly way to conditionally render components in React using **Switch**, **Case**, and **CaseElse** components.
This package allows you to cleanly handle different conditions, avoiding messy conditionals.
Additionally, there are also **CaseSome** and **CaseEvery**.
You can think of this package as a technique wrapped in a component.

The simplest syntax is:

```js

<Switch value={expression to be evaluated}>
  <Case when={expression or value to strictly equal the switch value}>
    <Component to render if the condition is met>
  </Case>
  <Case when={[ a value , a function taking switch value as argument and evaluates boolean, ...]}>
    <Component to render if the condition is met>
  </Case>
  <CaseElse>
    <Component to render if no condition is met>
  </CaseElse>
</Switch>

```

## Installation

```bash
npm install react-context-switch
```

## Usage

| Component | Description | Props | Prop Description | Short Syntax Example |
| --- | --- | --- | --- | --- |
| Switch | The parent component that holds the cases and evaluates the expression | value | The expression to be evaluated by the cases | `<Switch value={expression}>` |
| Case | Renders the children if the when prop matches the value prop of the parent Switch component | when | A value or a function that returns a boolean, compared/called with the value prop of the parent Switch component | `<Case when={expression}>` or `<Case when={[expression1, expression2, ... ]}>`  |
| CaseSome | Renders the children if at least one of the when prop matches the value prop of the parent Switch component | when | An array of values or functions that returns a boolean, compared/called with the value prop of the parent Switch component | `<CaseSome when={[expression1, expression2, ...]}>` |
| CaseEvery | Renders the children if all of the when prop matches the value prop of the parent Switch component | when | An array of values or functions that returns a boolean, compared/called with the value prop of the parent Switch component | `<CaseEvery when={[expression1, expression2, ...]}>` |
| CaseElse | Renders the children if none of the Case, CaseSome and CaseEvery components match the value prop of the parent Switch component | - | - | `<CaseElse>` |


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
let b=0;
//...
 <Switch value={a-1}>
   <Case when={[0, b, (x)=> x===b , (x) => [0,2,4].includes(x)]}>
	  <p>{'a-1 equals one of 0, 2 or 4'}</p>
  </Case>
</Switch>
```

The _Case_ component's children will be rendered if the when prop matches the value prop of the parent _Switch_ component.

The _CaseElse_ component's children will be rendered if none of the _Case_ components match the value prop of the parent _Switch_ component.

Here is an example of usage:

```jsx
import { Switch, Case, CaseElse, CaseEvery } from 'react-context-switch';

const UserRole = ({ role, level }) => {
  return (
    <Switch value={role}>
      <Case when={'admin'}>
        <AdminDashboard />
      </Case>
      <Case when={'moderator'}>
        <ModeratorDashboard />
      </Case>
      <Case when={'user'}>
          <Switch value={member_since}>
            <Case when={[(x) => x>0 && x<=3 ]}>
              <EntryDashboard>
            </Case>
            <Case when={[(x) => x>3 && x<=6 ]}>
              <IntermediateDashboard />
            <CaseElse>
              <SeniorDashboard />
            </CaseElse>
          </Switch>
      </Case>
      <CaseSome when={['admin', 'moderator']}>
        <TrafficModule/>
      </CaseSome>
      <CaseElse>
        <p>You do not have access to any dashboard.</p>
      </CaseElse>
    </Switch>
  )
}

```

As you can see it is also possible to nest Switch components, allowing for even more powerful and flexible conditional rendering.

Please find an example of a complex conditional render on [codesandbox](https://codesandbox.io/s/react-context-switch-an-example-290kxu?file=/src/styles.css)

I use Switch Case CaseElse extensively in my projects. I hope you'll find them useful too.

This component was inspired from [Mike Talbot](https://github.com/miketalbot)'s work. Thanks Mike!
