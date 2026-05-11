# DEV@Deakin Web Application

<img width="600" height="452" alt="Home" src="https://github.com/user-attachments/assets/77f866c0-d859-47f1-a59a-241dd9b87385" />


## Overview
This project is a peer support platform for Deakin students, built with **React**, **Next.js**, and **Firebase**. It demonstrates advanced front-end concepts such as **Streaming SSR with Suspense**, **Server Components**, and custom state management. 

The platform allows users to post questions and articles, engage in discussions through a comment system, and utilize AI assistance for technical troubleshooting.

## Key Features
### Dynamic Questions & Filtering
A refactored architecture using Next.js dynamic routes and search params to fetch filtered content directly on the server.

<img width="600" height="532" alt="Questions" src="https://github.com/user-attachments/assets/6d6cf00b-8458-4563-831b-43e47a7e3c6c" />

### AI Integration (Premium)
Side-by-side AI consulting powered by **Gemini** via the Firebase API. Conversations are context-aware and stored in Firestore for persistent history.

<img width="800" height="522" alt="image" src="https://github.com/user-attachments/assets/d88105c7-a3e5-4ce4-846e-e9cc8acf4773" />

### Rich Text Editing with TipTap
Versatile rich text editing, including paragraph styles, code blocks with syntax-highlighting, and embedded YouTube videos. 

<img width="600" height="458" alt="image" src="https://github.com/user-attachments/assets/9a584bfc-4341-414f-bdc7-2863aad06af8" />

### Responsive UI with Theme Support

Fully implemented **Light/Dark mode** utilizing Tailwind CSS's theme configurations and CSS variables.

<img width="600" height="353" alt="image" src="https://github.com/user-attachments/assets/f23c29a8-dd1a-499e-9194-f993abfbcacc" />

### Premium Subscription Model

Signup includes a custom-built modal system implemented with **React Portals** to escape DOM boundaries for a cleaner overlay architecture.

<img width="600" height="483" alt="image" src="https://github.com/user-attachments/assets/4f46e1e3-48d7-460d-9b6e-e844a1a5ada6" />

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
