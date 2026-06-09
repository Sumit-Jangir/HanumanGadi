"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { singletonStore, singletonPersistor } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import PageLoader from "@/components/ui/PageLoader";
import useAuthStore from "@/lib/stores/authStore";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const { checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <Provider store={singletonStore}>
      <PersistGate loading={<PageLoader />} persistor={singletonPersistor}>
        {children}
        <Toaster position="bottom-center" richColors closeButton />
      </PersistGate>
    </Provider>
  );
};

export default Providers;

