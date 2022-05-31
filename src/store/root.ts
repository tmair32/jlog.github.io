import { defineStore } from "pinia";

interface RootState {
  mobileMenu: boolean;
}

export const useRootStore = defineStore({
  id: "root",
  state: (): RootState => ({
    mobileMenu: false,
  }),
  actions: {
    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
    },
  },
});
