'use babel';
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */


/**
 * Like a CompositeDisposable, but in addition to Disposable instances it can
 * also accept plain functions and Rx subscriptions.
 */
export default class UniversalDisposable {

  constructor(...teardowns) {
    this.teardowns = new Set();
    this.disposed = false;
    if (teardowns.length) {
      this.add(...teardowns);
    }
  }

  add(...teardowns) {
    if (this.disposed) {
      throw new Error('Cannot add to an already disposed UniversalDisposable!');
    }
    for (let i = 0; i < teardowns.length; i++) {
      assertTeardown(teardowns[i]);
      this.teardowns.add(teardowns[i]);
    }
  }

  remove(teardown){
    if (!this.disposed) {
      this.teardowns.delete(teardown);
    }
  }

  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      this.teardowns.forEach(teardown => {
        if (typeof teardown.dispose === 'function') {
          teardown.dispose();
        } else if (typeof teardown.unsubscribe === 'function') {
          teardown.unsubscribe();
        } else if (typeof teardown === 'function') {
          teardown();
        }
      });
      this.teardowns = null;
    }
  }

  unsubscribe(){
    this.dispose();
  }

  clear() {
    if (!this.disposed) {
      this.teardowns.clear();
    }
  }
}

function assertTeardown(teardown) {
  if (
    typeof teardown.dispose === 'function' ||
    typeof teardown.unsubscribe === 'function' ||
    typeof teardown === 'function'
  ) {
    return;
  }
  throw new TypeError('Arguments to UniversalDisposable.add must be disposable');
}
