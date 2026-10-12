/**
 * Extracts uppercase initials from a full name.
 *
 * @param name - The full name or string to extract initials from
 * @param maxInitials - Maximum number of initials to return (default: 2)
 * @returns Initials in uppercase (e.g., "PR" for "Prateek Rai")
 */
export const getInitials = (name: string, maxInitials: number = 2): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '';
  }

  return parts
    .slice(0, maxInitials)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
};

/**
 * Converts a string to Title Case.
 * Handles spaces, underscores, and hyphens gracefully.
 *
 * @param str - The input string (e.g., "full_time" or "hello world")
 * @returns The title-cased string (e.g., "Full Time" or "Hello World")
 */
export const toTitleCase = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
