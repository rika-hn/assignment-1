// jest.setup.js
import "@testing-library/jest-dom";
import dotenv from "dotenv";

// .env.test を読み込む
dotenv.config({ path: ".env.test" });

// Jest 実行環境に import.meta.env を注入
globalThis.import = {
  meta: {
    env: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
    },
  },
};
