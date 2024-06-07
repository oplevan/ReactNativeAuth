import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  password: string;
};

type AuthProps = {
  authState?: {token: string | null; authenticated: boolean | null};
  onRegister?: (data: Register) => Promise<any>;
  onLogin?: (credentials: Login) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoading?: boolean;
};

const TOKEN_KEY = 'jwt-token-key';
const API_URL = 'https://api.oplevan.com';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<AuthProps['authState']>({
    token: null,
    authenticated: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const onRegister = async (data: Register) => {
    try {
      setIsLoading(true);
      return await axios.post(`${API_URL}/auth/register`, data);
    } catch (error: any) {
      console.log(error);
      return {
        error: true,
        msg: error.response?.data?.message || 'Registration failed',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (credentials: Login) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      setAuthState({
        token: response.data.token,
        authenticated: true,
      });
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
      return {success: true};
    } catch (error: any) {
      // console.log(JSON.stringify(error.response, null, '\t'));
      return {
        error: true,
        status: error.response.status,
        msg: error.response?.data?.message || 'Login failed',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    // delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    // delete HTTP Headers
    delete axios.defaults.headers.common.Authorization;
    // reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    authState,
    onRegister,
    onLogin,
    onLogout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
