import { create } from "zustand";
import axios from "axios";

// Determine API base URL based on environment
const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api/auth"
  : "/api/auth";

// Send cookies with each request (important for sessions/auth)
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Signup failed:", error?.response?.data);
      set({
        error: error?.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    console.log("Attempting login with:", { email, password });
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      console.log("Login success:", response.data);
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
      return true; // ✅ Indicate success
    } catch (error) {
      console.error("Login failed:", error?.response?.data);
      set({
        error: error?.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      return false; // ✅ Indicate failure
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      console.error("Logout failed:", error?.response?.data);
      set({
        error: "Error logging out",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      console.error("Email verification failed:", error?.response?.data);
      set({
        error: error?.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.warn("User not authenticated:", error?.response?.data);
      set({
        error: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      console.error("Forgot password failed:", error?.response?.data);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      console.error("Reset password failed:", error?.response?.data);
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
