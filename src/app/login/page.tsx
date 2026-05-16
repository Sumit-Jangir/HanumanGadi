"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { isLoginOpen, openLogin } = useAuthStore();

  useEffect(() => {
    // Open the login modal as soon as the user hits this route
    openLogin();
  }, [openLogin]);

  useEffect(() => {
    // If the login modal is closed (either they logged in or clicked X), redirect to home
    if (!isLoginOpen) {
      router.push("/");
    }
  }, [isLoginOpen, router]);

  return null; // Do NOT show a separate login page UI
}
