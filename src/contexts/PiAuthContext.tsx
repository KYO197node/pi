import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthUser = {
  accessToken: string;
  uid: string;
  username: string;
} | null;

type PiAuthContextType = {
  user: AuthUser;
  login: () => Promise<void>;
  isLoading: boolean;
};

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined);

export function PiAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    try {
      setIsLoading(true);
      const auth = await Pi.authenticate(['username', 'payments'], onIncompletePaymentFound);
      setUser(auth);
    } catch (err) {
      console.error('Pi Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onIncompletePaymentFound = (payment: any) => {
    console.log('Incomplete payment found:', payment);
    // Handle incomplete payment
  };

  return (
    <PiAuthContext.Provider value={{ user, login, isLoading }}>
      {children}
    </PiAuthContext.Provider>
  );
}

export function usePiAuth() {
  const context = useContext(PiAuthContext);
  if (context === undefined) {
    throw new Error('usePiAuth must be used within a PiAuthProvider');
  }
  return context;
}