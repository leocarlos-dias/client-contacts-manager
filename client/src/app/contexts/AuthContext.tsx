"use client"
import React, { createContext, useContext, useState } from 'react';

export interface ContactProps {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  registrationDate: string;
  clientId: string
}


export interface ClientProps {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  contacts: ContactProps[]
}

interface AuthContextProps {
  client: ClientProps | null;
  setClient: React.Dispatch<React.SetStateAction<ClientProps | null>>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<ClientProps | null>(null);

  return (
    <AuthContext.Provider value={{ client, setClient }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
