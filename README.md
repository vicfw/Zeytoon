# Zeytoon - Currency Exchange Dashboard

A modern, responsive currency exchange dashboard built with Next.js 15, featuring real-time currency rates, interactive charts, and a beautiful Persian RTL interface.

## 🌟 Features

### Core Functionality

- **Real-time Currency Rates**: Live updates for FIAT and CRYPTO currencies
- **Interactive Charts**: 30-day price history with detailed statistics
- **Currency Details Dialog**: Comprehensive currency information with price trends
- **Search & Filter**: Advanced search capabilities across all currencies
- **Authentication System**: Secure login with phone number and password
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### UI/UX Features

- **Persian RTL Support**: Complete right-to-left layout with Persian fonts
- **Modern Design**: Clean, professional interface with smooth animations
- **Dark/Light Mode**: Theme switching capability
- **Accessibility**: WCAG compliant with keyboard navigation
- **Loading States**: Elegant loading indicators and error handling

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching and caching
- **Tailwind CSS**: Utility-first styling with custom design system
- **Radix UI**: Accessible, unstyled UI components
- **Lucide Icons**: Beautiful, consistent iconography

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nextjs-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   NEXT_PUBLIC_API_VERSION=1.0.0
   NEXT_PUBLIC_API_PASSWORD=your_secure_password
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (auth)/            # Authentication routes
│   │   │   └── login/         # Login page with auto-authentication
│   │   ├── (main)/            # Main application routes
│   │   │   ├── _components/   # Page-specific components
│   │   │   │   ├── currency-table.tsx
│   │   │   │   └── currency-details-dialog.tsx
│   │   │   ├── layout.tsx     # Main layout
│   │   │   └── page.tsx       # Home page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI component library
│   │   ├── icons/            # Custom icons
│   │   ├── sidebar.tsx       # Navigation sidebar
│   │   └── header.tsx        # Application header
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── services/             # API services
│   │   ├── currency/         # Currency-related API calls
│   │   └── user/             # User-related API calls
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### State Management & Data Fetching

- **TanStack Query**: Server state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Styling & UI

- **Tailwind CSS**: Utility-first styling
- **Class Variance Authority**: Component variants
- **Tailwind Merge**: Class merging utility
- **Custom Design System**: Persian RTL support

### Development Tools

- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Turbopack**: Fast bundling (Next.js 15)

## 🎨 Design System

### Color Palette

- **Primary**: `#006cea` (Blue)
- **Secondary**: `#298ffe` (Light Blue)
- **Background**: `#f6f7fa` (Light Gray)
- **Foreground**: `#262626` (Dark Gray)
- **Sidebar**: `#ffffff` (White)

### Typography

- **Primary Font**: Vazir (Persian)
- **Monospace**: Geist Mono
- **RTL Support**: Complete right-to-left layout

### Components

- **Sidebar**: Collapsible navigation with icon support
- **Tables**: Sortable, paginated data tables
- **Charts**: Interactive price history charts
- **Dialogs**: Modal dialogs with loading states
- **Forms**: Validated forms with error handling

## 🔐 Authentication System

### Login Flow

The application features an automated authentication system with the following characteristics:

- **Phone-based Authentication**: Uses Iranian phone number format (+98)
- **Automatic Login**: Pre-configured credentials for seamless access
- **Token Management**: Secure JWT token storage in HTTP-only cookies
- **Session Persistence**: 7-day token expiration with automatic renewal
- **Error Handling**: Graceful fallback with retry mechanisms

### Authentication Features

- **Persian UI**: Complete RTL login interface
- **Loading States**: Elegant loading indicators during authentication
- **Error Recovery**: User-friendly error messages with retry options
- **Auto-redirect**: Automatic navigation to dashboard after successful login
- **Session Management**: Secure logout with complete data cleanup

### Environment Configuration

```env
NEXT_PUBLIC_API_PASSWORD=your_secure_password
```

### Login Credentials (Development)

- **Phone Prefix**: +98 (Iran)
- **Phone Number**: 09361101775
- **Password**: Environment variable
- **Firebase Token**: 23141 (development token)

## 📊 API Integration

### Authentication Endpoints

- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Token verification

### Currency Endpoints

- `GET /currencies` - Get all currencies
- `GET /currencies/list` - Get filtered currencies
- `GET /currencies/{id}` - Get specific currency
- `GET /currencies/prices` - Get current prices
- `GET /currencies/{code}/price-history` - Get price history

### Data Flow

1. **React Query** manages server state
2. **Custom hooks** provide typed API access
3. **Error boundaries** handle failures gracefully
4. **Loading states** provide user feedback
5. **Authentication** secures all API requests

## 🌍 Internationalization

### Persian Support

- **RTL Layout**: Complete right-to-left interface
- **Persian Fonts**: Vazir font family
- **Persian Numbers**: Automatic number conversion
- **Shamsi Dates**: Persian calendar support
- **Persian Validation**: Mobile number and format validation

### Localization Features

- Persian placeholder text
- RTL-optimized spacing
- Persian error messages
- Cultural date formatting

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### Component Guidelines

- Use TypeScript interfaces for props
- Implement proper error boundaries
- Follow accessibility guidelines
- Use semantic HTML elements
- Implement loading and error states

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_API_VERSION=1.0.0
```

### Performance Optimization

- **Turbopack**: Fast development builds
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: React Query caching strategy

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Component testing with Jest
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end user flows
- **Accessibility Tests**: WCAG compliance

### Running Tests

```bash
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:a11y    # Run accessibility tests
```

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards

- Follow TypeScript best practices
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure accessibility compliance
- Test on multiple devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Radix UI**: For accessible components
- **Tailwind CSS**: For the utility-first approach
- **Lucide**: For beautiful icons
- **Persian Community**: For RTL support inspiration

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ for the Persian community**
