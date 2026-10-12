# @dia-desk/utils

Shared utility functions for Dia Desk applications (API and Web).

## Utilities

### Date Utilities (`src/date.ts`)
- `formatDate(date, format)`: Formats date objects or strings to `'YYYY-MM-DD'`, `'readable'`, or `'ISO'`.
- `getWeekStart(date)`: Returns the Monday start of the week normalized to midnight.
- `getWorkingDays(startDate, endDate)`: Calculates business days (Mon–Fri) between two dates.

### String Utilities (`src/string.ts`)
- `getInitials(name, maxInitials)`: Generates uppercase initials from a name (e.g. `"Prateek Rai"` -> `"PR"`).
- `toTitleCase(str)`: Formats strings to Title Case with snake/kebab-case normalization.
