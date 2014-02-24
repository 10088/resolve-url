// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var url  = require("url")
var test = require("tape")

var resolveUrl = require("../")

"use strict"

test("resolveUrl", function(t) {

  t.plan(7)

  t.equal(typeof resolveUrl, "function", "is a function")

  t["throws"](resolveUrl, /at least one argument/, "throws with no arguments")

  // Resolve like Node.js’ `url.resolve` would in series
  function testResolve() {
    var expected = window.location.toString()
    for (var index = 0, length = arguments.length; index < length; index++) {
      expected = url.resolve(expected, arguments[index])
    }
    t.equal(resolveUrl.apply(null, arguments), expected, arguments[index-1])
  }

  testResolve("remove")

  testResolve("/static/scripts/app.js")

  testResolve("/static/scripts/app.js", "../source-maps/app.js.map")

  testResolve("/static/scripts/app.js", "../source-maps/app.js.map", "../coffee/app.coffee")

  testResolve("//cdn.example.com/jquery.js")

})
