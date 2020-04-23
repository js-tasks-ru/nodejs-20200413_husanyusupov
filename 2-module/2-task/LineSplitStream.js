const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._buffer = '';
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString();

    if (str.includes(os.EOL)) {
      const parts = chunk.toString().split(os.EOL);
      callback(null, this._buffer + parts[0]);
      this._buffer = parts[1];
    } else {
      this._buffer = this._buffer + str;
      callback();
    }
  }

  _flush(callback) {
    callback(null, this._buffer);
  }
}

module.exports = LineSplitStream;
