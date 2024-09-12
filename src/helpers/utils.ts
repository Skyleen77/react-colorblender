export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export const round = (
  number: number,
  digits = 0,
  base = Math.pow(10, digits),
): number => {
  return Math.round(base * number) / base + 0;
};

export const roundColor = <T extends object>(obj: T): T => {
  let roundedObj = {} as T;

  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];
    if (typeof value === 'number') {
      roundedObj[key as keyof T] = round(value) as unknown as T[keyof T];
    } else {
      roundedObj[key as keyof T] = value;
    }
  });

  return roundedObj;
};

export function cn(
  ...classes: (string | number | null | boolean | undefined)[]
) {
  return classes.filter(Boolean).join(' ');
}

export function convertStringColorToArray(input: string) {
  const sanitizedInput = input.replace(/,/g, '.');
  const result = sanitizedInput.match(/-?\d+(\.\d+)?/g);
  return result ? result.map(Number) : [];
}

export const limitValue = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};
