# SpendWise

SpendWise is a lightweight expense tracker built with React and Vite. It helps users record daily expenses, filter transactions, and review spending patterns over time.

## Features

- Add, edit, and delete expenses.
- Store expenses in browser `localStorage`.
- Search transactions by title or description.
- Filter by category, date, or custom date range.
- Sort by newest, oldest, highest amount, or lowest amount.
- View daily, monthly, and total transaction summaries.
- Review category and six-month spending charts.
- Responsive desktop and mobile navigation.
- Accessible modal form with validation and keyboard escape support.

## Tech stack

- React 19
- Vite
- Recharts
- Lucide React
- Tailwind CSS v4 tooling

## Getting started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

The development server runs on the local Vite URL shown in the terminal.

## Available commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
```

## Project structure

```text
src/
├── App.jsx                         # Application state and main layout
├── index.css                       # Design tokens and global styles
├── main.jsx                        # React entry point
├── data/
│   └── expenses.js                 # Initial sample expenses
└── components/
    ├── Navbar.jsx                  # Main navigation
    ├── SummaryCard.jsx              # Summary statistics
    ├── ExpenseFilters.jsx           # Search, filter, and sort controls
    ├── ExpenseList.jsx              # Transaction ledger
    ├── AddExpenseForm.jsx           # Add and edit expense modal
    ├── AnalyticsSection.jsx         # Reports and analytics summary
    ├── CategorySpendingChart.jsx    # Category breakdown chart
    └── MonthlySpendingChart.jsx     # Monthly spending chart
```

## Data and persistence

Expenses are saved in `localStorage` under the key `spendwise-expenses`. The initial sample data is loaded from `src/data/expenses.js` when no saved data exists.

Each expense contains:

- `id`
- `name`
- `amount`
- `category`
- `date`
- `description` (optional)
- `icon`

Supported categories are `Food`, `Transport`, `Shopping`, `Bills`, and `Others`.

There is currently no backend or account system, so data is limited to the browser where it was entered.

## Design notes

The interface uses a ledger-first layout with a restrained, warm paper palette. Transactions are the primary working surface, while analytics remain available alongside them on larger screens and below them on smaller screens.

The main navigation uses URL hash anchors for `#dashboard`, `#transactions`, and `#reports`. The active underline follows the selected section.
