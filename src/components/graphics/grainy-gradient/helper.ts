const hexToRgba = <T extends string>(hex: T): [number, number, number, number] => {
  const clean = hex.replace('#', '');
  const fullHex =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  return [
    Number.parseInt(fullHex.slice(0, 2), 16) / 255,
    Number.parseInt(fullHex.slice(2, 4), 16) / 255,
    Number.parseInt(fullHex.slice(4, 6), 16) / 255,
    1,
  ];
};

export { hexToRgba };
