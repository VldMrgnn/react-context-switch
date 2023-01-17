
# React Conditional Render SwitchCase using Context

## Description

The component is very simple, and it is very easy to use.
It's also memory friendly, and it doesn't create any unnecessary re-render.

It solves a lot of messy code that can be created when using the traditional conditional rendering.

## Installation

```bash
npm install react-context-switch
```

## Usage

```Switch value ={condition}``` - the value to be evaluated

```Case when ={value to meet the condition}``` - render if the condition is met

```Case when = {[function to meet the condition]}``` - render if the condition is met

```CaseElse``` - render if no condition is met

### An example

```jsx
import React from 'react';
import { Switch, Case, CaseElse } from 'react-context-switch';
import './App.css';

function NearFutureComponent() {
  return <div>{'The Near Future is here!'}</div>;
}
function FutureComponent() {
  return <div>{'The Future is here!'}</div>;
}
function DistantFutureComponent() {
  return <div>{'The Distant Future is here!'}</div>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch value={new Date().getFullYear()}>
          <Case when={2023}>
            {/* 
            evaluate the condition as a value i.e. "new Date().getFullYear() === 2021"
          */}
            <p>2023</p>
          </Case>
          <Case when={[(x: number) => x === 2024]}>
            {/*
            evaluate the condition as a function's result 
            where the input is the result of the value prop of the Switch parent component.
            in this case the function takes the result of "new Date().getFullYear()" as input
            and returns a boolean value.
          */}
            <p>2024</p>
          </Case>
          <CaseElse>
            {/* If there is no match to the parent Switch, the "CaseElse" block is rendered */}
            {/* We can nest switches */}
            <Switch value={~~(new Date().getFullYear() / 100)}>
              <Case when={20}>
                {/* as a value */}
                <NearFutureComponent />
              </Case>
              <Case when={(x:number)=> [21,22].includes(x)}>
                {/* as a function */}
                <FutureComponent />
              </Case>
              <CaseElse>
                {/* as a default */}
                <DistantFutureComponent />
              </CaseElse>
            </Switch>
          </CaseElse>
        </Switch>
      </header>
    </div>
  );
}

export default App;

```

I use this component extensively in my projects, and I thought it would be a good idea to share it with the community.

This component was inspired from [Mike Talbot's work](https://github.com/miketalbot). Thanks Mike!
Enjoy!