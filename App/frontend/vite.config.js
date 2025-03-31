// Citation for the following file:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cs340_project',
  esbuild: {
    loader: "jsx"
  },
  // server: {
  //   // Use VITE_PORT from your .env, or default to a port if not specified
  //   port: parseInt(process.env.VITE_PORT, 10) || 9367,
  //   host: true,
  //   allowedHosts: ['classwork.engr.oregonstate.edu']
  // }
})
