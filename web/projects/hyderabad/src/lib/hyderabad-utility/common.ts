import { isEmpty, isNil } from 'ramda';

export function getComponentNameFromConstructor(name: string): string {
  return name.replace('Component', '');
}

export const isNilOrEmpty = (val: any): boolean => isNil(val) || isEmpty(val);
