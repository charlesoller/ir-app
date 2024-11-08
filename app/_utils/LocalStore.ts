"use client"

import { useRef } from 'react';
import { proxy, useSnapshot, Snapshot } from 'valtio';

type ProxyType<T> = T & { readonly [P in keyof T]: T[P] };

/**
 * Creates a proxy store that can be use locally
 * @param {Object} defaultData the default data for the store
 * @returns {[Object, Proxy]} [snapshot, proxy] array with snapshot of proxy, and proxy itself
 * -
 * @example <caption>First param is readonly and should start with "_"</caption>
 * const [_data, $data] = useLocalStore({param1: 1, param2: 2})
 * @example <caption>Second param is the actual store and can be murated directly starts with "$"</caption>
 * $data.param1 = 3;
 */

const useLocalStore = <T extends object>(defaultData: T): [Snapshot<T>, ProxyType<T>] => {
  const ref = useRef<ProxyType<T>>();

  if (!ref.current) {
    ref.current = proxy(defaultData) as ProxyType<T>;
  }

  return [useSnapshot(ref.current), ref.current];
};

export { useLocalStore };
