/*
400
401
403

500
*/

class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.status = 400;
  }
}
class Unauthorize extends Error {
  constructor(message = 'Unauthorize') {
    super(message)
    this.status = 401;
  }
}
class ConflictRequest extends Error {
  constructor(message) {
    super(message)
    this.status = 403;
  }
}
class IntervelServer extends Error {
  constructor(message = 'Interval server error') {
    super(message)
    this.status = 500;
  }
}

module.exports = {
  BadRequest,
  Unauthorize,
  ConflictRequest,
  IntervelServer,
};
