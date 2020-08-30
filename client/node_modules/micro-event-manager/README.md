# micro-event-manager

[![npm version](https://img.shields.io/npm/v/micro-event-manager.svg?style=flat-square)](https://www.npmjs.com/package/micro-event-manager)

A tiny event manager library based on publish-subscribe pattern.

## Installation

```sh
yarn add micro-event-manager
```

## Usage

```js
import eventManager from 'micro-event-manager';

// first subscribe to an event, it will return an unique key
const key = eventManager.subscribe('log', () => {
  console.log('executed');
});

// trigger the event, the second argument is optional
eventManager.publish('log', 'data');

// you can use the generated key to unsubscribe the event
eventManager.unSubscribe('log', key);

// when you are not sure if the subscription happens before the publishment
// and you want to make sure any published events should be triggered, you can use this function to subscribe
eventManager.ensureTriggeredAndSubscribe('log', () => {
  console.log('executed');
});
```
