import {
   createSlice,
   createAsyncThunk,
   type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";
import { setTheme } from "../theme/themeSlice.ts";
import { setStatusIdle } from "../data/backendDataSlice.ts";
import { useAppSelector } from "@/hooks.ts";

interface User {
   userId: string;
   userName: string;
   userEmail: string;
   role: "ADMIN" | "SUPERVISOR" | "CASHIER";
   permissions: string[];
   createdDate: string;
   profileImgUrl: string;
   isAccountIsActive: boolean;
   isAccountNotLocked: boolean;
   accountIsActive: boolean;
   accountNotLocked: boolean;
}

interface IsAuth {
   user: User | null;
   token: string;
   isAuthenticate: boolean;
   isLoading: boolean;
   error: string | null;
}

interface LoginCredentials {
   userId: string;
   password: string;
}

interface LoginPayload {
   user: User;
   token: string;
}

interface LoginResponse {
   timestamp: string;
   status: number;
   message: string;
   data: {
      user: User;
      token: string;
   };
}

const savedAuth = localStorage.getItem("auth");

const initialState: IsAuth = savedAuth
   ? JSON.parse(savedAuth)
   : {
        user: null,
        token: "",
        isAuthenticate: false,
        isLoading: false,
        error: null,
     };

interface UserData {
   id: number;
   tasks: string[];
   // fetchProtectedData API ကနေ ပြန်လာမယ့် တကယ့် Data Structure အတိုင်း ထည့်သွင်းပါ
}

export const loginUser = createAsyncThunk<
   LoginPayload,
   LoginCredentials,
   { rejectValue: string }
>("auth/loginUser", async (credential, { rejectWithValue, dispatch }) => {
   try {
      const response = await fetch("http://localhost:8080/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(credential),
         // credentials: "include", // when credentials data need to sent
      });
      if (!response.ok) {
         const errorData = await response.json();
         return rejectWithValue(
            errorData.message || "Login Failure: Server Error."
         );
      }

      const responseBody: LoginResponse = await response.json();
      const { user, token } = responseBody.data;

      dispatch(setStatusIdle())
      
      localStorage.setItem("authToken", token);

      return {
         user: user,
         token: token,
      } as LoginPayload;


      //for backend manage cookie
      // const data: { user: User } = await response.json();

      // return {
      //    user: data.user,
      //    token: "SESSION_MANAGED_BY_COOKIE",
      // } as LoginPayload;
   } catch (error) {
      return rejectWithValue("A network or unexpected error occurred.");
   }
});

export const fetchProtectedData = createAsyncThunk<
   UserData,
   void,
   { rejectValue: string }
>("data/fetchProtectedData", async (_, { rejectWithValue, dispatch }) => {
   const token = localStorage.getItem("authToken");

   if (!token) {
      return rejectWithValue("Authentication Token not found. Please log in.");
   }

   try {
      const response = await fetch("/api/protected/data", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });

      if (response.status === 401) {
         dispatch(logoutUser());
         return rejectWithValue("Session Expired. Please re-login.");
      }

      if (!response.ok) {
         const errorData = await response.json();
         return rejectWithValue(errorData.message || "Failed to fetch data.");
      }

      const data: UserData = await response.json();
      return data;
   } catch (error) {
      return rejectWithValue("A network error occurred while fetching data.");
   }
});

export const checkAuthStatus = createAsyncThunk<
   LoginPayload,
   void,
   { rejectValue: string }
>("auth/checkAuthStatus", async (_, { rejectWithValue }) => {
   const token = localStorage.getItem("authToken");

   if (!token) {
      return rejectWithValue("No stored session token.");
   }

   try {
      const response = await fetch("http://localhost:8080/api/me", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });

      if (!response.ok) {
         localStorage.removeItem("authToken");
         return rejectWithValue("Session invalid or expired.");
      }

      const data: { user: User } = await response.json();

      return {
         user: data.user,
         token: token,
      } as LoginPayload;
   } catch (error) {
      localStorage.removeItem("authToken");
      return rejectWithValue("Failed to refresh session.");
   }
});

export const logoutUser = createAsyncThunk(
   "auth/logoutUser",
   async (_, { dispatch }) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("auth");

      // dispatch(setTheme("light"));
      return true;
   }
);

export const authCheck = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(
            loginUser.fulfilled,
            (state, action: PayloadAction<LoginPayload>) => {
               state.user = action.payload.user;
               state.token = action.payload.token;
               state.isAuthenticate = true;
               state.isLoading = false;
               localStorage.setItem(
                  "auth",
                  JSON.stringify({
                     user: action.payload.user,
                     token: action.payload.token,
                     isAuthenticate: true,
                  })
               );
            }
         )
         .addCase(loginUser.rejected, (state, action) => {
            state.user = null;
            state.token = "";
            state.isAuthenticate = false;
            state.isLoading = false;
            state.error = (action.payload as string) || "Login attempt failed.";
         })
         .addCase(checkAuthStatus.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticate = true;
            state.isLoading = false;
         })
         .addCase(checkAuthStatus.rejected, (state) => {
            state.user = null;
            state.token = "";
            state.isAuthenticate = false;
            state.isLoading = false;
         })
         .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.token = "";
            state.isAuthenticate = false;
            state.isLoading = false;
            state.error = null;
         })
         .addCase(logoutUser.rejected, (state) => {
            state.isLoading = false;
            state.error = "Logout failed.";
         });
   },
});

// export const { LogOut } = authCheck.actions;
export const auth = (state: RootState) => state.auth;
export const token = (state: RootState) => state.auth.token;
export default authCheck.reducer;

//for backend cookie  token

// // Browser ပြန်ဖွင့်တိုင်း လုပ်ရမယ့် Session စစ်ဆေးတဲ့ API Call
// fetch('/api/login', { credentials: 'include' })

// -------------------------------------------------------------

// for Local storage token

// const token = localStorage.getItem('authToken');

// const response = await fetch('/api/protected/data', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         // Token ကို Header ထဲမှာ ထည့်သွင်းခြင်း
//         'Authorization': `Bearer ${token}`,
//     },
// });
