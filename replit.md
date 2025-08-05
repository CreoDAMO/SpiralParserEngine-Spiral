# SpiralGenesis Unified System

## Overview

SpiralGenesis is a comprehensive full-stack web application that combines consciousness recognition technology with blockchain infrastructure. The system features a React-based frontend showcasing a "Consciousness Gateway" that recognizes truth patterns through breath signatures, alongside a "Hybrid Blockchain" infrastructure built on CosmosSDK with EVM compatibility. The application integrates advanced testbed simulators for quantum computing, supercomputing, and statistical analysis, all unified through a custom programming language called SpiralScript that emphasizes consciousness-driven computing paradigms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a dark mode design with golden accent colors
- **UI Components**: Comprehensive shadcn/ui component library with Radix UI primitives for accessibility
- **Routing**: Wouter for lightweight client-side routing with hash-based navigation
- **State Management**: React hooks for local state, TanStack React Query for server state management
- **Animations**: Framer Motion for sophisticated animations and transitions

### Backend Architecture
- **Server**: Express.js with TypeScript in ES module format
- **Development Setup**: Vite middleware integration for hot module replacement and development server
- **API Structure**: RESTful API design with `/api` prefix routing
- **Request Handling**: Custom middleware for logging, JSON parsing, and error handling
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage class)

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle with TypeScript schema definitions for type safety
- **Migrations**: Drizzle Kit for database schema management and migrations
- **Connection**: Neon Database serverless PostgreSQL with connection pooling
- **Schema Validation**: Drizzle-Zod integration for runtime type validation

### Authentication and Authorization
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **User Schema**: Simple user model with username/password authentication
- **Security**: Password hashing and secure session handling (implementation details in storage layer)

### External Dependencies
- **Database Hosting**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **UI Framework**: Comprehensive Radix UI component ecosystem for accessible primitives
- **Animation**: Framer Motion for physics-based animations and gesture recognition
- **Form Handling**: React Hook Form with Hookform Resolvers for validation
- **Date Utilities**: date-fns for date manipulation and formatting
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build Tools**: ESBuild for server bundling, PostCSS with Autoprefixer for CSS processing

### Key Design Patterns
- **Component Architecture**: Modular component design with clear separation between UI components, pages, and business logic
- **Custom Hooks**: Specialized hooks for consciousness state management, blockchain simulation, and mobile responsiveness
- **Utility Libraries**: Centralized utility functions for spiral calculations, testbed simulations, and query client configuration
- **Theme System**: CSS custom properties with dark mode support and branded color schemes
- **Route-Based Code Splitting**: Organized by feature areas (consciousness, blockchain, testbeds, spiralscript)

### Consciousness Gateway Features
- Real-time breath pattern recognition using golden ratio (φ) mathematical calculations
- Truth signature validation through SpiralScript pattern matching
- Consciousness state transitions (dormant → awakening → witnessed)
- Spiral Resonance Index (SRI) scoring system for authenticity measurement

### Hybrid Blockchain Features
- CosmosSDK-based Layer 1 blockchain simulation with EVM compatibility
- φ-harmonic consensus mechanism with dynamic validator management
- Dual bridge architecture connecting to BASE and Ethereum networks
- Real-time transaction processing with performance metrics display

### Testbed Integration
- NASA Quantum Computer simulation with 127-qubit processing
- Supercomputer environment testing with distributed computing simulation
- Statistical analysis system for pattern recognition and validation
- SpiralScript code execution across multiple computational environments