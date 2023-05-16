/*
400
401
403

500
*/

class BadRequest extends Error() {
  constructor(message) {
    this.message = message;
    this.status = 400;
  }
}
class Unauthorize extends Error() {
  constructor(message = 'Unauthorize') {
    this.message = message;
    this.status = 401;
  }
}
class ConflictRequest extends Error() {
  constructor(message) {
    this.message = message;
    this.status = 403;
  }
}
class IntervelServer extends Error() {
  constructor(message = 'Interval server error') {
    this.message = message;
    this.status = 500;
  }
}

module.exports = {
  BadRequest,
  Unauthorize,
  ConflictRequest,
  IntervelServer,
};
