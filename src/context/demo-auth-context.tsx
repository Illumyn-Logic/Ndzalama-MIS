'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers, type UserRole, type DemoUser } from '@/lib/offline-data';

interface DemoAuthContextType {
  currentUser: DemoUser;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  isRoleSwitcherOpen: boolean;
  setIsRoleSwitcherOpen: (open: boolean) => void;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ndzalama_demo_role';

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('visitor');
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as UserRole;
    if (saved && demoUsers[saved]) {
      setCurrentRole(saved);
    }
  }, []);

  const switchRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    localStorage.setItem(STORAGE_KEY, newRole);
  };

  const currentUser = demoUsers[currentRole] || demoUsers.visitor;

  return (
    <DemoAuthContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        isRoleSwitcherOpen,
        setIsRoleSwitcherOpen,
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
}
