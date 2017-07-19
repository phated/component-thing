'use struct';

var bel = require('bel');
var hyperx = require('hyperx');

function scoped() {

  var registry = {};

  function createElement(tag, props, children) {
    if (registry[tag] != null) {
      var component = registry[tag];

      if (typeof component === 'function') {
        if (typeof component.prototype.render === 'function') {
          var inst = new component();
          return inst.render(props, children);
        }

        return component(props, children);
      }
    }

    return bel.createElement(tag, props, children);
  }

  function registerComponent(render) {
    var name = render.name;
    registry[name] = render;
  }

  function customSelfClosing(tag) {
    if (registry[tag] != null) {
      var component = registry[tag];
      // TODO: better way to signal this
      return component.isSelfClosing || false;
    } else {
      return selfClosing(tag);
    }
  }

  var tagger = hyperx(createElement, {
    comments: true,
    selfClosing: customSelfClosing
  });

  tagger.register = registerComponent;

  return tagger;
}

// TODO: use a library and get the option upstreamed
var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

module.exports = scoped();
