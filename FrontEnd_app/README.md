# Cricket Tournament App - Monorepo

A comprehensive Tournament Scoring & Fan Engagement App built with modern web and mobile technologies.

## 🏗️ Architecture

This is a **monorepo** using **Yarn workspaces** with 3 packages:

- **`/packages/shared`** - Shared logic, types, and services
- **`/packages/web`** - React 18 + Vite PWA for fans/organizers
- **`/packages/mobile`** - React Native (Expo) for scorers + fans

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Yarn 1.22+
- For mobile: Expo CLI and iOS/Android simulators

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cricket-tournament-app

# Install dependencies for all packages
yarn install

# Build shared package first
cd packages/shared
yarn build

# Return to root
cd ../..
```

### Development

```bash
# Start web development server
yarn dev:web

# Start mobile development server
yarn dev:mobile

# Run linting across all packages
yarn lint

# Format code across all packages
yarn format

# Type checking across all packages
yarn type-check
```

## 📦 Package Details

### Shared Package (`/packages/shared`)

**Purpose**: Core business logic, types, and services shared between web and mobile.

**Key Features**:
- TypeScript types and Zod schemas for all domain entities
- API client with JWT interceptor
- Authentication service with token storage abstraction
- Shared utilities and constants

**Dependencies**:
- `axios` - HTTP client with interceptors
- `@tanstack/react-query` - Server state management
- `zustand` - Lightweight global state
- `zod` - Schema validation
- `date-fns` - Date utilities
- `socket.io-client` - Real-time updates

### Web Package (`/packages/web`)

**Purpose**: Progressive Web App for fans and tournament organizers.

**Key Features**:
- React 18 with Vite for fast development
- React Router v6 for navigation
- React Query for server state management
- Tailwind CSS + shadcn/ui for styling
- PWA support with service worker
- Real-time match updates via WebSocket
- Responsive design for all devices

**Pages**:
- `/login` - Authentication
- `/tournaments` - Tournament listing
- `/match/:matchId` - Live match view with real-time updates

**Dependencies**:
- `react-router-dom` - Client-side routing
- `@tanstack/react-query-devtools` - Development tools
- `react-hot-toast` - Notifications
- `socket.io-client` - Real-time updates
- `vite-plugin-pwa` - PWA support

### Mobile Package (`/packages/mobile`)

**Purpose**: React Native app for scorers and mobile fans.

**Key Features**:
- Expo for cross-platform development
- React Navigation for mobile navigation
- NativeWind (Tailwind for React Native)
- Offline scoring with SQLite sync
- Push notifications
- Secure token storage
- Real-time updates

**Screens**:
- `LoginScreen` - Authentication
- `TournamentListScreen` - Tournament listing
- `MatchScreen` - Live match view
- `ScoringScreen` - Ball-by-ball scoring interface

**Dependencies**:
- `@react-navigation/native` + `native-stack` - Navigation
- `expo-sqlite` - Offline data storage
- `expo-secure-store` - Secure token storage
- `expo-notifications` - Push notifications
- `nativewind` - Tailwind for React Native
- `react-native-reanimated` - Animations

## 🏏 Domain Model

### Core Entities

**User**
- Roles: admin, organizer, scorer, fan
- Authentication with JWT tokens

**Tournament**
- Status: upcoming, ongoing, completed
- Multiple teams and matches

**Match**
- Status: scheduled, live, completed, cancelled
- Real-time score tracking
- Ball-by-ball events

**BallEvent**
- Types: dot, single, double, triple, four, six, wide, no-ball, wicket, bye, leg-bye
- Wicket types: bowled, caught, lbw, run-out, stumped, etc.
- Real-time commentary

## 🔧 Development Workflow

### Adding New Features

1. **Define types** in `/packages/shared/src/types.ts`
2. **Add API endpoints** in `/packages/shared/src/apiClient.ts`
3. **Implement web UI** in `/packages/web/src/pages/`
4. **Implement mobile UI** in `/packages/mobile/src/screens/`
5. **Update shared logic** as needed

### Code Quality

- **ESLint** + **Prettier** configured for all packages
- **TypeScript** strict mode enabled
- **Path mapping** for clean imports
- **Consistent code style** across packages

### Testing Strategy

- Unit tests for shared logic
- Component tests for UI
- Integration tests for API
- E2E tests for critical flows

## 🚀 Deployment

### Web App

```bash
cd packages/web
yarn build
# Deploy dist/ folder to your hosting provider
```

### Mobile App

```bash
cd packages/mobile
yarn build
# Use Expo EAS Build or build locally
```

## 📱 Features

### For Fans
- Live match viewing with real-time updates
- Tournament browsing and following
- Push notifications for match events
- Offline viewing of completed matches

### For Scorers
- Ball-by-ball scoring interface
- Offline scoring with sync
- Real-time score broadcasting
- Match statistics and analytics

### For Organizers
- Tournament management
- Team and player management
- Match scheduling
- Real-time tournament statistics

## 🔒 Security

- JWT-based authentication
- Secure token storage (localStorage for web, SecureStore for mobile)
- API rate limiting
- Input validation with Zod schemas
- HTTPS enforcement

## 📊 Performance

- React Query for efficient data fetching
- Optimistic updates for better UX
- Code splitting and lazy loading
- PWA caching strategies
- Offline-first mobile experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

Built with ❤️ for cricket enthusiasts worldwide! 