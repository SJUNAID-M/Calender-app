# Communication Tracker Application

A React-based Calendar Application for tracking and managing company communications.

## Features

- Dashboard for viewing and managing company communications
- Admin module for company and communication method management
- Calendar view for scheduling and tracking communications
- Reports and analytics for communication insights
- Color-coded notifications for overdue and due communications
- Interactive interface with tooltips and detailed views

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui for UI components
- React Query for data management
- React Hook Form for form handling
- Recharts for analytics
- FullCalendar for calendar view

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd communication-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 in your browser

## Project Structure

```
communication-tracker/
├── src/
│   ├── components/         # Reusable UI components
│   ├── modules/           # Feature-specific modules
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── services/          # API and data services
│   └── app/               # App-wide configurations
├── public/                # Static assets
└── tests/                 # Test files
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run tests
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Deployment

1. Build the application:
```bash
npm run build
```

2. The build output will be in the `dist` directory, ready for deployment to platforms like Vercel, Netlify, or GitHub Pages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
