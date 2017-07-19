'use strict';

var component = require('../');

// TODO: where should this go?
component.register(require('./my-button'));
component.register(require('./my-nano'));

var out = component`<div>
  <MyButton text="Mellow" />
  World
  <Button text="cool">
    <h1>Test</h1>
  </Button>
</div>`;

console.log(out);

document.body.appendChild(out);
