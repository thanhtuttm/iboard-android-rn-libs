"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaults = require("./defaults");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AsyncStorage {
  constructor(storageBackend, asOptions) {
    _defineProperty(this, "_backend", void 0);

    _defineProperty(this, "_config", void 0);

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "error", void 0);

    this._backend = storageBackend;
    this._config = asOptions; // off by default

    this.log = _defaults.noop;
    this.error = _defaults.noop;

    if (this._config.logger) {
      this.log = typeof this._config.logger === 'function' ? this._config.logger : _defaults.simpleLogger;
    }

    if (this._config.errorHandler) {
      this.error = typeof this._config.errorHandler === 'function' ? this._config.errorHandler : _defaults.simpleErrorHandler;
    }
  }

  async get(key, opts = null) {
    let value = null;

    try {
      this.log({
        action: 'read-single',
        key: key
      });
      value = await this._backend.getSingle(key, opts);
    } catch (e) {
      this.error(e);
    }

    return value;
  }

  async set(key, value, opts = null) {
    try {
      this.log({
        action: 'save-single',
        key,
        value
      });
      await this._backend.setSingle(key, value, opts);
    } catch (e) {
      this.error(e);
    }
  }

  async getMultiple(keys, opts = null) {
    let values = [];

    try {
      this.log({
        action: 'read-many',
        key: keys
      });
      values = await this._backend.getMany(keys, opts);
    } catch (e) {
      this.error(e);
    }

    return values;
  }

  async setMultiple(keyValues, opts = null) {
    try {
      this.log({
        action: 'save-many',
        value: keyValues
      });
      await this._backend.setMany(keyValues, opts);
    } catch (e) {
      this.error(e);
    }
  }

  async remove(key, opts = null) {
    try {
      this.log({
        action: 'delete-single',
        key
      });
      await this._backend.removeSingle(key, opts);
    } catch (e) {
      this.error(e);
    }
  }

  async removeMultiple(keys, opts = null) {
    try {
      this.log({
        action: 'delete-many',
        key: keys
      });
      await this._backend.removeMany(keys, opts);
    } catch (e) {
      this.error(e);
    }
  }

  async getKeys(opts = null) {
    let keys = [];

    try {
      this.log({
        action: 'keys'
      });
      keys = await this._backend.getKeys(opts);
    } catch (e) {
      this.error(e);
    }

    return keys;
  }

  async clearStorage(opts = null) {
    try {
      this.log({
        action: 'drop'
      });
      await this._backend.dropStorage(opts);
    } catch (e) {
      this.error(e);
    }
  } // todo: think how we could provide additional functions through AS, without returning the instance
  // some kind of extension-like functionality


  instance() {
    return this._backend;
  }

}

var _default = AsyncStorage;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Bc3luY1N0b3JhZ2UudHMiXSwibmFtZXMiOlsiQXN5bmNTdG9yYWdlIiwiY29uc3RydWN0b3IiLCJzdG9yYWdlQmFja2VuZCIsImFzT3B0aW9ucyIsIl9iYWNrZW5kIiwiX2NvbmZpZyIsImxvZyIsIm5vb3AiLCJlcnJvciIsImxvZ2dlciIsInNpbXBsZUxvZ2dlciIsImVycm9ySGFuZGxlciIsInNpbXBsZUVycm9ySGFuZGxlciIsImdldCIsImtleSIsIm9wdHMiLCJ2YWx1ZSIsImFjdGlvbiIsImdldFNpbmdsZSIsImUiLCJzZXQiLCJzZXRTaW5nbGUiLCJnZXRNdWx0aXBsZSIsImtleXMiLCJ2YWx1ZXMiLCJnZXRNYW55Iiwic2V0TXVsdGlwbGUiLCJrZXlWYWx1ZXMiLCJzZXRNYW55IiwicmVtb3ZlIiwicmVtb3ZlU2luZ2xlIiwicmVtb3ZlTXVsdGlwbGUiLCJyZW1vdmVNYW55IiwiZ2V0S2V5cyIsImNsZWFyU3RvcmFnZSIsImRyb3BTdG9yYWdlIiwiaW5zdGFuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQVNBLE1BQU1BLFlBQU4sQ0FBeUU7QUFNdkVDLEVBQUFBLFdBQVcsQ0FBQ0MsY0FBRCxFQUFzQkMsU0FBdEIsRUFBaUQ7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDMUQsU0FBS0MsUUFBTCxHQUFnQkYsY0FBaEI7QUFDQSxTQUFLRyxPQUFMLEdBQWVGLFNBQWYsQ0FGMEQsQ0FJMUQ7O0FBQ0EsU0FBS0csR0FBTCxHQUFXQyxjQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhRCxjQUFiOztBQUVBLFFBQUksS0FBS0YsT0FBTCxDQUFhSSxNQUFqQixFQUF5QjtBQUN2QixXQUFLSCxHQUFMLEdBQ0UsT0FBTyxLQUFLRCxPQUFMLENBQWFJLE1BQXBCLEtBQStCLFVBQS9CLEdBQ0ksS0FBS0osT0FBTCxDQUFhSSxNQURqQixHQUVJQyxzQkFITjtBQUlEOztBQUVELFFBQUksS0FBS0wsT0FBTCxDQUFhTSxZQUFqQixFQUEr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RVM7QUFGRSxPQUFUO0FBSUEsWUFBTSxLQUFLbkIsUUFBTCxDQUFjNEIsVUFBZCxDQUF5QlQsSUFBekIsRUFBK0JSLElBQS9CLENBQU47QUFDRCxLQU5ELENBTUUsT0FBT0ksQ0FBUCxFQUFVO0FBQ1YsV0FBS1gsS0FBTCxDQUFXVyxDQUFYO0FBQ0Q7QUFDRjs7QUFFRCxRQUFNYyxPQUFOLENBQWNsQixJQUFvQixHQUFHLElBQXJDLEVBQW1FO0FBQ2pFLFFBQUlRLElBQW1CLEdBQUcsRUFBMUI7O0FBRUEsUUFBSTtBQUNGLFdBQUtqQixHQUFMLENBQVM7QUFDUFcsUUFBQUEsTUFBTSxFQUFFO0FBREQsT0FBVDtBQUdBTSxNQUFBQSxJQUFJLEdBQUcsTUFBTSxLQUFLbkIsUUFBTCxDQUFjNkIsT0FBZCxDQUFzQmxCLElBQXRCLENBQWI7QUFDRCxLQUxELENBS0UsT0FBT0ksQ0FBUCxFQUFVO0FBQ1YsV0FBS1gsS0FBTCxDQUFXVyxDQUFYO0FBQ0Q7O0FBRUQsV0FBT0ksSUFBUDtBQUNEOztBQUVELFFBQU1XLFlBQU4sQ0FBbUJuQixJQUFvQixHQUFHLElBQTFDLEVBQStEO0FBQzdELFFBQUk7QUFDRixXQUFLVCxHQUFMLENBQVM7QUFDUFcsUUFBQUEsTUFBTSxFQUFFO0FBREQsT0FBVDtBQUdBLFlBQU0sS0FBS2IsUUFBTCxDQUFjK0IsV0FBZCxDQUEwQnBCLElBQTFCLENBQU47QUFDRCxLQUxELENBS0UsT0FBT0ksQ0FBUCxFQUFVO0FBQ1YsV0FBS1gsS0FBTCxDQUFXVyxDQUFYO0FBQ0Q7QUFDRixHQWxKc0UsQ0FvSnZFO0FBQ0E7OztBQUNBaUIsRUFBQUEsUUFBUSxHQUFRO0FBQ2QsV0FBTyxLQUFLaEMsUUFBWjtBQUNEOztBQXhKc0U7O2VBMkoxREosWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2ltcGxlRXJyb3JIYW5kbGVyLCBzaW1wbGVMb2dnZXIsIG5vb3B9IGZyb20gJy4vZGVmYXVsdHMnO1xuaW1wb3J0IHtcbiAgRmFjdG9yeU9wdGlvbnMsXG4gIElTdG9yYWdlQmFja2VuZCxcbiAgTG9nZ2VyQWN0aW9uLFxuICBTdG9yYWdlTW9kZWwsXG4gIFN0b3JhZ2VPcHRpb25zLFxufSBmcm9tICcuLi90eXBlcyc7XG5cbmNsYXNzIEFzeW5jU3RvcmFnZTxTVFIgZXh0ZW5kcyBJU3RvcmFnZUJhY2tlbmQsIFZBTCA9IFN0b3JhZ2VNb2RlbDxTVFI+PiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2JhY2tlbmQ6IFNUUjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBGYWN0b3J5T3B0aW9ucztcbiAgcHJpdmF0ZSByZWFkb25seSBsb2c6IChhY3Rpb246IExvZ2dlckFjdGlvbikgPT4gdm9pZDtcbiAgcHJpdmF0ZSByZWFkb25seSBlcnJvcjogKGU6IEVycm9yIHwgc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHN0b3JhZ2VCYWNrZW5kOiBTVFIsIGFzT3B0aW9uczogRmFjdG9yeU9wdGlvbnMpIHtcbiAgICB0aGlzLl9iYWNrZW5kID0gc3RvcmFnZUJhY2tlbmQ7XG4gICAgdGhpcy5fY29uZmlnID0gYXNPcHRpb25zO1xuXG4gICAgLy8gb2ZmIGJ5IGRlZmF1bHRcbiAgICB0aGlzLmxvZyA9IG5vb3A7XG4gICAgdGhpcy5lcnJvciA9IG5vb3A7XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2cgPVxuICAgICAgICB0eXBlb2YgdGhpcy5fY29uZmlnLmxvZ2dlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gdGhpcy5fY29uZmlnLmxvZ2dlclxuICAgICAgICAgIDogc2ltcGxlTG9nZ2VyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb25maWcuZXJyb3JIYW5kbGVyKSB7XG4gICAgICB0aGlzLmVycm9yID1cbiAgICAgICAgdHlwZW9mIHRoaXMuX2NvbmZpZy5lcnJvckhhbmRsZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHRoaXMuX2NvbmZpZy5lcnJvckhhbmRsZXJcbiAgICAgICAgICA6IHNpbXBsZUVycm9ySGFuZGxlcjtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXQoa2V5OiBzdHJpbmcsIG9wdHM6IFN0b3JhZ2VPcHRpb25zID0gbnVsbCk6IFByb21pc2U8VkFMIHwgbnVsbD4ge1xuICAgIGxldCB2YWx1ZSA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nKHtcbiAgICAgICAgYWN0aW9uOiAncmVhZC1zaW5nbGUnLFxuICAgICAgICBrZXk6IGtleSxcbiAgICAgIH0pO1xuICAgICAgdmFsdWUgPSBhd2FpdCB0aGlzLl9iYWNrZW5kLmdldFNpbmdsZShrZXksIG9wdHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuZXJyb3IoZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgYXN5bmMgc2V0KFxuICAgIGtleTogc3RyaW5nLFxuICAgIHZhbHVlOiBWQUwsXG4gICAgb3B0czogU3RvcmFnZU9wdGlvbnMgPSBudWxsLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2coe1xuICAgICAgICBhY3Rpb246ICdzYXZlLXNpbmdsZScsXG4gICAgICAgIGtleSxcbiAgICAgICAgdmFsdWUsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHRoaXMuX2JhY2tlbmQuc2V0U2luZ2xlKGtleSwgdmFsdWUsIG9wdHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuZXJyb3IoZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0TXVsdGlwbGUoXG4gICAga2V5czogQXJyYXk8c3RyaW5nPixcbiAgICBvcHRzOiBTdG9yYWdlT3B0aW9ucyA9IG51bGwsXG4gICk6IFByb21pc2U8QXJyYXk8VkFMIHwgbnVsbD4+IHtcbiAgICBsZXQgdmFsdWVzOiBBcnJheTxWQUwgfCBudWxsPiA9IFtdO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nKHtcbiAgICAgICAgYWN0aW9uOiAncmVhZC1tYW55JyxcbiAgICAgICAga2V5OiBrZXlzLFxuICAgICAgfSk7XG4gICAgICB2YWx1ZXMgPSBhd2FpdCB0aGlzLl9iYWNrZW5kLmdldE1hbnkoa2V5cywgb3B0cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5lcnJvcihlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG5cbiAgYXN5bmMgc2V0TXVsdGlwbGUoXG4gICAga2V5VmFsdWVzOiBBcnJheTx7W2tleTogc3RyaW5nXTogVkFMfT4sXG4gICAgb3B0czogU3RvcmFnZU9wdGlvbnMgPSBudWxsLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2coe1xuICAgICAgICBhY3Rpb246ICdzYXZlLW1hbnknLFxuICAgICAgICB2YWx1ZToga2V5VmFsdWVzLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCB0aGlzLl9iYWNrZW5kLnNldE1hbnkoa2V5VmFsdWVzLCBvcHRzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmVycm9yKGUpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlbW92ZShrZXk6IHN0cmluZywgb3B0czogU3RvcmFnZU9wdGlvbnMgPSBudWxsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nKHtcbiAgICAgICAgYWN0aW9uOiAnZGVsZXRlLXNpbmdsZScsXG4gICAgICAgIGtleSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdGhpcy5fYmFja2VuZC5yZW1vdmVTaW5nbGUoa2V5LCBvcHRzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmVycm9yKGUpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlbW92ZU11bHRpcGxlKFxuICAgIGtleXM6IEFycmF5PHN0cmluZz4sXG4gICAgb3B0czogU3RvcmFnZU9wdGlvbnMgPSBudWxsLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2coe1xuICAgICAgICBhY3Rpb246ICdkZWxldGUtbWFueScsXG4gICAgICAgIGtleToga2V5cyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdGhpcy5fYmFja2VuZC5yZW1vdmVNYW55KGtleXMsIG9wdHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuZXJyb3IoZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0S2V5cyhvcHRzOiBTdG9yYWdlT3B0aW9ucyA9IG51bGwpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgICBsZXQga2V5czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nKHtcbiAgICAgICAgYWN0aW9uOiAna2V5cycsXG4gICAgICB9KTtcbiAgICAgIGtleXMgPSBhd2FpdCB0aGlzLl9iYWNrZW5kLmdldEtleXMob3B0cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5lcnJvcihlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG4gIGFzeW5jIGNsZWFyU3RvcmFnZShvcHRzOiBTdG9yYWdlT3B0aW9ucyA9IG51bGwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2coe1xuICAgICAgICBhY3Rpb246ICdkcm9wJyxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdGhpcy5fYmFja2VuZC5kcm9wU3RvcmFnZShvcHRzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmVycm9yKGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRvZG86IHRoaW5rIGhvdyB3ZSBjb3VsZCBwcm92aWRlIGFkZGl0aW9uYWwgZnVuY3Rpb25zIHRocm91Z2ggQVMsIHdpdGhvdXQgcmV0dXJuaW5nIHRoZSBpbnN0YW5jZVxuICAvLyBzb21lIGtpbmQgb2YgZXh0ZW5zaW9uLWxpa2UgZnVuY3Rpb25hbGl0eVxuICBpbnN0YW5jZSgpOiBTVFIge1xuICAgIHJldHVybiB0aGlzLl9iYWNrZW5kO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzeW5jU3RvcmFnZTtcbiJdfQ==