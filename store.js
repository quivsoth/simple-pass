import { createWithEqualityFn } from 'zustand/traditional';

const initialState = {
  items: [],
};

// export const useStore = createWithEqualityFn((set, get) => {
//   return Object.assign(initialState, {
//     items: [],
//     addItem(text) {
//       const items = get().items;
//       set({ items: [...items, { text, id: Math.random() }] });
//     },
//   });
// });

export const useStore = createWithEqualityFn((set, get) => {
    return Object.assign(initialState, {
      items: [],
      addItem(item) {
        const items = get().items;
        set({ items: [...items, { item }] });
      },
    });
  });

export function useReset() {
  useStore.setState(initialState);
}
