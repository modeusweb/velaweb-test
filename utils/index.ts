/**
 * Форматирует цену в валюту (рубли) с учетом локали `ru-RU`.
 * Если значение равно 0, возвращает "0 ₽" без дробных нулей после запятой.
 *
 * @param {number} value - Сумма для форматирования.
 * @returns {string} Отформатированная строка в виде валюты.
 */
export const formatPrice: (value: number) => string = (value) => {
  if (value === 0) {
    return '0 ₽';
  }
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }).format(value);
};
