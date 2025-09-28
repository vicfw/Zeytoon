# Zeytoon App

A modern Next.js application built with the latest technologies and best practices.

## 🚀 Technologies Used

- **Next.js 15** - Latest version with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Query (TanStack Query)** - Powerful data fetching and caching
- **Axios** - HTTP client with interceptors

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── providers/         # Context providers
│   │   └── query-provider.tsx
│   └── ui/               # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/                  # Utilities and configuration
│   ├── query-client.ts   # React Query configuration
│   └── utils.ts          # Utility functions
└── services/             # API services
    ├── index.ts          # Axios configuration
    └── api.ts            # API service functions
```

## 🛠️ Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.sample .env.local
   ```

   Edit `.env.local` with your API base URL:

   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### API Configuration

The axios instance is configured in `src/services/index.ts` with:

- Base URL: `${baseUrl}/api/v1/`
- Request/response interceptors
- Automatic token handling
- Error handling
- Development logging

### React Query Configuration

React Query is configured in `src/lib/query-client.ts` with:

- 5-minute stale time
- 10-minute garbage collection time
- Automatic retry logic
- Exponential backoff
- Query key factories

### shadcn/ui Components

Components are installed and ready to use:

- Button
- Card
- Input
- Add more with: `npx shadcn@latest add [component-name]`

## 📚 Usage Examples

### Making API Calls

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { userService, queryKeys } from "@/services/api";

// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: queryKeys.users.lists(),
  queryFn: userService.getUsers,
});

// Mutate data
const mutation = useMutation({
  mutationFn: userService.createUser,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
  },
});
```

### Using UI Components

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Styling

The project uses Tailwind CSS with shadcn/ui components. You can:

- Customize the theme in `tailwind.config.js`
- Add custom CSS in `src/app/globals.css`
- Use Tailwind utility classes throughout your components

## 🔍 Development Tools

- **React Query Devtools** - Available in development mode
- **TypeScript** - Full type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting (if configured)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The app is ready for deployment on platforms like:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📝 Next Steps

1. Set up your API endpoints
2. Add authentication if needed
3. Create your application pages
4. Add more shadcn/ui components as needed
5. Implement your business logic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy coding! 🎉**
