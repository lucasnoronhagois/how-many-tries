# How Many Tries 🎯

Attempt simulator based on success percentage with real-time local simulation.

## 📋 Description

This application allows you to simulate how many attempts are needed to achieve something based on a provided success percentage. The project runs **5 simultaneous simulations** and calculates the average number of attempts needed.

## 🏗️ Project Structure

```
how-many-tries/
├── frontend/          # React application with Vite and TypeScript
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── locales/       # Internationalization system
│   │   └── App.tsx        # Main component
│   └── package.json
├── backend/           # Express API with TypeScript (local development)
├── vercel.json       # Vercel configuration
└── README.md
```

## ⚡ Features

- 🎲 **Local simulation** - No external API dependency
- 📊 **5 simultaneous simulations** - More accurate results
- ⏱️ **Loading bar** - 2-second visual feedback
- 🌐 **Language support** - Portuguese and English
- 📱 **Responsive interface** - Works on all devices
- 🎨 **Modern design** - Intuitive and beautiful interface

## 🚀 Vercel Deployment

The project is **optimized for Vercel deployment** as a frontend-only application.

### Automatic Deployment

1. **Fork** this repository
2. **Connect** to [Vercel](https://vercel.com)
3. **Import** the project
4. **Automatic deployment**! 🎉

### Vercel Configuration

The `vercel.json` is configured for:
- ✅ Frontend-only build
- ✅ Ignore backend and unnecessary files
- ✅ Correct routing for SPA

## 🌐 Language System

The project supports **Portuguese** and **English** with instant switching.

### Features:
- ✅ **Instant switching** between PT/EN
- ✅ **Persistence** of choice in localStorage
- ✅ **Complete interface** translated
- ✅ **Localized number formatting**
- ✅ **Responsive** on all devices

### How to use:
1. Click the **🌐 PT/EN** button in the top right corner
2. The interface changes instantly
3. Your preference is automatically saved

## 🛠️ Local Development

### Installation

```bash
# Clone the repository
git clone https://github.com/lucasnoronhagois/how-many-tries.git
cd how-many-tries

# Install frontend dependencies
cd frontend
npm install
```

### Running

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## 📊 How It Works

1. **Enter** a success percentage (0.01% to 100%)
2. **Configure** maximum attempts (optional)
3. **Click** "Simulate 5 Attempts"
4. **Wait** for the loading bar (2 seconds)
5. **See** the results:
   - Average attempts needed
   - Number of successes/failures
   - Details of each simulation
   - Theoretical probability

## 🎯 Usage Examples

- **50% success**: ~2 attempts on average
- **25% success**: ~4 attempts on average
- **10% success**: ~10 attempts on average
- **1% success**: ~100 attempts on average
- **0.1% success**: ~1000 attempts on average

## 🛡️ Recent Fixes

### ✅ Logic Problem Resolved
- **Before**: Simulations incorrectly marked as successful
- **After**: Logic corrected to verify real success
- **Result**: Accurate calculations and reliable results

## 🛠️ Technologies

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Pure CSS with responsive design
- **Internationalization**: Custom i18n system
- **Deployment**: Vercel (frontend-only)
- **Development**: Node.js, npm

## 📚 Additional Documentation

- 📖 [Deploy Guide](./VERCEL_DEPLOY.md)
- 🌐 [Language System](./LANGUAGE_SYSTEM.md)
- 🏗️ [Project Structure](./PROJECT_STRUCTURE_EN.md)
- 🇧🇷 [README in Portuguese](./README.md)
