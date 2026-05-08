# DEV@Deakin Web Application

## Overview
This project is a peer support platform for Deakin students, built with **React**, **Next.js**, and **Firebase**. It demonstrates advanced front-end concepts such as **Streaming SSR with Suspense**, **Server Components**, and custom state management. 

The platform allows users to post questions and articles, engage in discussions through a comment system, and utilize AI assistance for technical troubleshooting.

## Key Features
* **Dynamic Questions & Filtering**: A refactored architecture using Next.js dynamic routes and search params to fetch filtered content directly on the server.
* **AI Integration (Premium)**: Side-by-side AI consulting powered by **Gemini** via the Firebase API. Conversations are context-aware and stored in Firestore for persistent history.
* **Advanced Discussion System**: Supports profile pictures, likes, and editing timestamps.
* **Responsive UI with Theme Support**: Fully implemented **Light/Dark mode** utilizing Tailwind CSS's theme configurations and CSS variables.
* **Premium Subscription Model**: Includes a custom-built modal system implemented with **React Portals** to escape DOM boundaries for a cleaner overlay architecture.

## Technical Details

### Stack

* **Framework**: Next.js (React)
* **Styling**: Tailwind CSS
* **Backend & Auth**: Firebase
* **Database**: Cloud Firestore
* **AI Engine**: Gemini
* **Validation**: Zod
* **Deployment**: Netlify

### Performance
The app leverages **React Suspense** to improve perceived performance. By wrapping heavy data-fetching components in Suspense boundaries, the app can stream chunks of the page from the server and display fallback skeletons while content loads.

### Custom State Management
* **`useForm` Hook**: A custom-developed hook created to standardize repetitive form-style state management and validation patterns.
* **`UserContext` with Reducer**: Manages client-side authentication state using a `useReducer` and `Context` API, with Firebase serving as the single source of truth.

### Validation & Security
* **Zod Integration**: Implements a clean, schema-based client-side validation system. A parent `UserSchema` is utilized to derive smaller, specific schemas for login, signup, and password resets.
* **Auth Guards**: Higher-order client components that protect private routes and manage post-login redirects.

## Installation & Setup
1. **Clone the repository**:
   ```bash
   git clone [https://github.com/Rory-CD/SIT313-full-stack-frontend.git](https://github.com/Rory-CD/SIT313-full-stack-frontend.git)
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file with your Firebase and Gemini API credentials.

4. **Run the development server**:
   ```bash
   npm run dev
   ```