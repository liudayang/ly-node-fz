const response = {
  _body: undefined,
  set body(_body) {
    this._body = _body
    this.res.statusCode=200
    // console.log(789)
  },
  get body() {
    return this._body
  }
}
module.exports = response
