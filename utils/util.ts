//- utils/util.ts

export const Capitalize = (val: string): string => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
