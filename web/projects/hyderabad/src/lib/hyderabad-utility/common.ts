import { chain, fromPairs, isEmpty, isNil, map, toPairs, type } from 'ramda';

export function getComponentNameFromConstructor(name: string): string {
  return name.replace('Component', '');
}

export const isNilOrEmpty = (val: any): boolean => isNil(val) || isEmpty(val);

/**
 * Flatten object as
 * flattenObj({a:1, b:{c:3}, d:{e:{f:6}, g:[{h:8, i:9}, 0]}}) => {"a": 1, "b.c": 3, "d.e.f": 6, "d.g.0.h": 8, "d.g.0.i": 9, "d.g.1": 0}
 */

export const flattenObj = (obj: any) => {
  const go = (objGo: []) =>
    chain(([k, v]) => {
      if (type(v) === 'Object' || type(v) === 'Array') {
        return map(([k_, v_]) => [`${k}.${k_}`, v_], go(v));
      } else {
        return [[k, v]];
      }
    }, toPairs(objGo));

  return fromPairs(go(obj));
};
