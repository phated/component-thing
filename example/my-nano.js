'use strict';

var Nanocomponent = require('nanocomponent')
var html = require('../')

function Button () {
  if (!(this instanceof Button)) return new Button()
  Nanocomponent.call(this)
}
Button.prototype = Object.create(Nanocomponent.prototype)

Button.prototype._render = function (props, children) {
  return html`
    <div>
      ${children}
      <button>
        ${props.text}
      </button>
    </div>
  `
}

module.exports = Button;
