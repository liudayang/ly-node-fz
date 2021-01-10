const context = {}

function defineGetter(target, key) {
  context.__defineGetter__(key, function () {
    return this[target][key]
  })
}

function defineSetter(target, key) {
  context.__defineSetter__(key, function (value) {
    this[target][key]=value
    // console.log(Object.keys(this),Object.keys(context),this.__proto__.__proto__===context)

    // console.log(this,context,this===context)
  })
}

defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('response', 'body')
defineSetter('response', 'body')
module.exports = context
