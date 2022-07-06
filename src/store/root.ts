import { defineStore } from "pinia";

interface RootState {
  mobileMenu: boolean;
  scene: {};
  view: {};
}

export const useRootStore = defineStore({
  id: "root",
  state: (): RootState => ({
    mobileMenu: false,
    scene: {},
    view: {},
  }),
  actions: {
    toggleMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
    },
    setScene(scene: any) {
      this.scene = scene;
    },
    setView(view: any) {
      this.view = view;
    },
  },
});
