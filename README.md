# Paid Media Locker

This project is my submission for the Konvo Full Stack Backend Internship Assignment.

The application allows users to upload images, set an unlock price, and share them with others. Users can browse uploaded media, unlock paid content using coins from their wallet, and access all previously purchased content.

The backend is built with Express, TypeScript, Prisma, and PostgreSQL, while the mobile application is developed using React Native with Expo.

---

## Features

### User Authentication
- Register a new account
- Login using JWT authentication
- View wallet balance

### Media
- Upload an image
- Set an unlock price
- Browse all uploaded media
- View locked previews
- Unlock original images after purchase

### Wallet
- Every new user starts with an initial coin balance
- Coins are deducted when purchasing content
- View transaction history

### Security
- JWT-protected APIs
- Duplicate purchase prevention
- Ownership validation before granting access

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Cloudinary

### Mobile App
- React Native (Expo)
- TypeScript
- React Navigation

---

## Project Structure

```
paid-media-locker/
│
├── backend/
├── mobile/
└── README.md
---

# Setup Instructions

## Clone the Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`.

Run database migrations:

```bash
npx prisma migrate dev
```

Start the backend server:

```bash
npm run dev
```

---

## Mobile

```bash
cd mobile
npm install
```

Create a `.env` file using `.env.example`.

Start the Expo application:

```bash
npx expo start

---

## Running the Project

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Mobile

```bash
cd mobile
npm install
cp .env.example .env
npx expo start
```

---

## Project Status

The application supports:

- User registration and login
- Wallet management
- Media upload
- Media browsing
- Paid content unlocking
- Transaction history
- Cloudinary image storage
---

# Security Decisions

This project implements several security measures to protect user accounts and paid content.

### Authentication
- JWT is used to authenticate users.
- Protected routes require a valid authentication token.

### Authorization
- Users can only upload media to their own account.
- Wallet operations are restricted to the authenticated user.
- Purchased media can only be downloaded by users who have unlocked it.

### Purchase Validation
- Duplicate purchases are prevented using a composite unique constraint in the database (`userId`, `mediaId`).
- Users cannot purchase media if they do not have enough coins.

### Password Security
- User passwords are stored as hashed values before being saved to the database.

### Media Storage
- Images are stored on Cloudinary and only the image URLs are stored in the database.

### Future Improvements
For a production deployment, the following improvements would be recommended:
- Private Cloudinary storage with signed URLs.
- Temporary download URLs for purchased content.
- Rate limiting for authentication endpoints.
- Refresh token implementation.
- Audit logging for important actions.