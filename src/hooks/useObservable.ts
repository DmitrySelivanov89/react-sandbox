import { useSyncExternalStore, useCallback, useRef } from 'react';
import { Observable } from 'rxjs';

export type ObservableValueType<T> = T extends Observable<infer X> ? X : never;

export function useObservable<U extends Observable<any>>(
  source$: U,
  initialValue: ObservableValueType<U>
): ObservableValueType<U>;
export function useObservable<U extends Observable<any>>(
  source$: U
): ObservableValueType<U> | undefined;
export function useObservable<U extends Observable<any>>(
  source$: U,
  initialValue?: ObservableValueType<U>
) {
  const buffer = useRef(initialValue);

  /** Memoized callback to only resubscribe
   * - on consumer component mount/remount
   * - on source$ reference change
   */
  const subscribeToStore = useCallback(
    (onStoreChange: () => void) => {
      const subscription = source$.subscribe((newValue) => {
        buffer.current = newValue;
        onStoreChange();
      });
      return () => subscription.unsubscribe();
    },
    [source$]
  );

  /** Get value snapshot on client side */
  const getSnapshot = () => buffer.current;
  /** Get value snapshot on server side */
  const getServerSnapshot = getSnapshot;

  const value = useSyncExternalStore(
    subscribeToStore,
    getSnapshot,
    getServerSnapshot
  );

  return value;
}
