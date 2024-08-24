// src/hooks/useSessionCheck.js
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAppSelector } from "./useAppSelector";

const useSessionCheck = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const router = useRouter();
  const userSession = useAppSelector((state) => state.session.session);

  useEffect(() => {
    const checkSession = async () => {
      if (userSession) {
        setIsSessionActive(true);
        router.push('(tabs)'); // Redirect to the home screen if session exists
      } else {
        setIsSessionActive(false);
        router.push('(onboarding)/signin'); // Redirect to the login screen if no session exists
      }
    };

    checkSession();
  }, [userSession, router]);

  return [isSessionActive];
};

export default useSessionCheck;
