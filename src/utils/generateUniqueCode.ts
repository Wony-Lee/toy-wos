export function generateUniqueCode(): string {
  return Array.from({ length: 6 }, () =>
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(
      Math.floor(Math.random() * 36),
    ),
  ).join('');
}
