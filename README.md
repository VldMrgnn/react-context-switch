# React Conditional Render SwitchCase using Context

## Description

The react-context-switch package provides an easy and friendly way to conditionally render components in React using **Switch**, **Case**, and **CaseElse** components.
This package allows you to cleanly handle different conditions, avoiding messy conditionals.
Additionally, there are also **CaseSome** and **CaseEvery**.
You can think of this package as a technique wrapped in a component.

A basic **SwitchCase** construct:

```code

<Switch value={ "switch value" expression }>
  <Case when={[ "when" expression to be evaluated against "switch value" expression, ...]}>
    <Component to render if the condition is met>
  </Case>
  ...
  <CaseElse>
    <Component to render if no conditions are met>
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
| **Switch** | The parent component that holds the cases and evaluates the expression | value | The expression to be evaluated by the cases | `<Switch value={expression}>` |
| **Case** | Renders the children if the "when" prop matches the "value" prop of the parent **Switch** component | when | A single value or a function that returns a boolean, or an array of values or functions to be compared/called with the "value" prop of the parent **Switch** component | `<Case when={expression}>` or `<Case when={[expression1, expression2, ... ]}>`  |
| **CaseElse** | Renders the children if none of the **Case**, **CaseSome** and **CaseEvery** components match the "value" prop of the parent **Switch** component | - | - | `<CaseElse>` |
|| ...or more specialized:   |  |  |  |
| **CaseSome** | Renders the children if at least one of the "when" prop matches the "value" prop of the parent **Switch** component | when | An array of values or functions that returns a boolean, compared/called with the "value" prop of the parent **Switch** component | `<CaseSome when={[expression1, expression2, ...]}>` |
| **CaseEvery** | Renders the children if all of the "when" prop matches the "value" prop of the parent **Switch** component | when | An array of values or functions that returns a boolean, compared/called with the "value" prop of the parent **Switch** component | `<CaseEvery when={[expression1, expression2, ...]}>` |

About "when" prop:

1. When multiple conditions have to be checked, then an array of values or functions should be passed to the "when" prop of the **Case**, **CaseSome** or **CaseEvery** component. They will be destructured and evaluated one by one.

   ```<Case when=[e,f,...]>```

2. If you want to check a single condition, then passing an array to the "when" prop of the **Case** component is optional. Just evaluate the condition directly.

    ```<Case when ={e}>``` is the same as ```<Case when={[e]}>```

3. **Case** accepts both a single expression or an array of expressions.

    ```<Case when ={e}>``` or ```<Case when=[e,f,...]>```.

4. **CaseSome** and **CaseEvery** are accepting only an array of values or functions

    ```<CaseSome when=[e,f,...]>```.

    *e*, *f*, etc. can be either a value or a function that returns a boolean.

We can describe the above rules as follows:

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

```jsx
let a=1;
let b=0;
//...
 <Switch value={a-1}>
   <Case when={[0, b, (x)=> x===b , (x) => [0,2,4].includes(x)]}>
	  <p>{'a-1 validates any of: equals 0, equals b, equals one of 0, 2 or 4'}</p>
  </Case>
  <CaseSome when={[0, b, (x)=> x===b , (x) => [0,2,4].includes(x)]}>
    <p>{`a-1 validates at least one of: equals 0, equals b, equals one of 0, 2 or 4. Same as Case`}</p>
  </CaseSome>
  <CaseEvery when={[0, b, (x)=> x===b , (x) => [0,2,4].includes(x)]}>
    <p>{`a-1 validates all of: equals 0, equals b, equals one of 0, 2 or 4.`}</p>
  </CaseEvery>
  <CaseElse>
    <p>{'This renders if none of above renders'}</p>
  </CaseElse>
</Switch>
```

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

As you can see it is also possible to nest **Switch** components, allowing for even more powerful and flexible conditional rendering.

Please find an example of a complex conditional render on [codesandbox](https://codesandbox.io/s/react-context-switch-an-example-290kxu)

I use **Switch** **Case** **CaseElse** extensively in my projects. I hope you'll find them useful too.

## Acknowledgment

This component was inspired from [Mike Talbot](https://github.com/miketalbot)'s work.
