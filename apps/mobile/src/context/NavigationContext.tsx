import { createContext, useContext } from "react";
import type { ScreenName } from "../types";

type NavigationContextValue = {
  navigate: (screen: ScreenName) => void;
};

const NavigationContext = createContext<NavigationContextValue>({
  navigate: () => {}
});

export const NavigationProvider = NavigationContext.Provider;

export function useAppNavigation() {
  return useContext(NavigationContext);
}
