'use strict';

var component = require('../');

function MyButton(props, children) {
  return component`<button>${props.text}</button>`;
}

// Signal that this is self closing
// TODO: better way to do this
MyButton.isSelfClosing = true;

module.exports = MyButton;
