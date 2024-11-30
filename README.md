
# Rent Home App

## Description

The **Rent Home App** is a modern web application designed to help users browse, rent, and manage rental properties. The app is built with a focus on performance, scalability, and ease of use. It uses the latest technologies like **Next.js**, **MongoDB**, **Prisma**, **Tailwind CSS**, and **NextAuth** to provide a seamless experience.

## Features

- User authentication using **NextAuth** (supports various providers)
- Property listings with search and filter functionality
- User profile management (view and edit properties)
- Responsive design for mobile and desktop
- Integrated with **MongoDB** for data storage
- ORM support using **Prisma**
- Tailwind CSS for fast and efficient styling

## Tech Stack

- **Next.js** - React-based framework for building fast, server-rendered apps.
- **MongoDB** - NoSQL database to store rental property data and user information.
- **Prisma** - ORM for interacting with the MongoDB database.
- **Tailwind CSS** - Utility-first CSS framework for rapid styling.
- **NextAuth** - Authentication library for Next.js apps.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (you can use a local or cloud instance)

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rent-home-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd rent-home-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables. Create a `.env.local` file in the root of the project and add the following:
   ```env
   MONGODB_URI=your-mongodb-uri
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

   Replace `your-mongodb-uri` with your MongoDB connection string and `your-nextauth-secret` with a secret key for NextAuth.

5. Set up Prisma:
   ```bash
   npx prisma migrate dev
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Usage

1. **Sign Up / Log In**: Create an account or log in using **NextAuth**. You can use various authentication providers like Google, Facebook, or email.
2. **Browse Properties**: View rental listings, filter by various criteria (price, location, etc.).
3. **Manage Profile**: Update your profile details and manage your rental preferences.

## License

This project is licensed under the MIT License.