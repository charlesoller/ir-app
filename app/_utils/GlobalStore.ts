import { proxy, useSnapshot, subscribe } from 'valtio';
import { subscribeKey } from 'valtio/utils'

export { useSnapshot as useGlobalStore, proxy as createGlobalStore, subscribe as subscribeToGlobalStore, subscribeKey as subscribeToGlobalStoreKey };
