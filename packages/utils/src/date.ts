/**
 * Formats a date into a standardized string format.
 *
 * @param date - The date to format (Date, string, or timestamp)
 * @param format - Desired output format ('YYYY-MM-DD' | 'readable' | 'ISO')
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  format: 'YYYY-MM-DD' | 'readable' | 'ISO' = 'YYYY-MM-DD'
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided to formatDate');
  }

  if (format === 'ISO') {
    return d.toISOString();
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  if (format === 'readable') {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return `${months[d.getMonth()]} ${day}, ${year}`;
  }

  return `${year}-${month}-${day}`;
};

/**
 * Returns the start of the week (Monday) at 00:00:00 for a given date.
 *
 * @param date - Optional reference date (defaults to current date)
 * @returns Date object representing the Monday of the week at midnight
 */
export const getWeekStart = (date: Date | string | number = new Date()): Date => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided to getWeekStart');
  }

  const dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday ...
  // Calculate difference to Monday: if Sunday (0), go back 6 days, else go back (dayOfWeek - 1)
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const weekStart = new Date(d);
  weekStart.setDate(d.getDate() + diffToMonday);
  weekStart.setHours(0, 0, 0, 0);

  return weekStart;
};

/**
 * Calculates the number of working days (Monday - Friday) between two dates inclusive.
 *
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns Number of business/working days
 */
export const getWorkingDays = (
  startDate: Date | string | number,
  endDate: Date | string | number
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date provided to getWorkingDays');
  }

  if (start > end) {
    return 0;
  }

  let count = 0;
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const normalizedEnd = new Date(end);
  normalizedEnd.setHours(0, 0, 0, 0);

  while (current <= normalizedEnd) {
    const day = current.getDay();
    // 0 = Sunday, 6 = Saturday
    if (day !== 0 && day !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};
