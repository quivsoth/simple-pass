import { createWithEqualityFn } from 'zustand/traditional';

const initialState = { resultItems: [], };

export const useStore = createWithEqualityFn((set, get) => {
  return Object.assign(initialState, {
    resultItems: [],    
    addItem(result) {      
      const resultItems = get().resultItems;
      set({ resultItems: [...resultItems, result]  });
    },
    updateItem(singleItem) {      
      set({ resultItems: get().resultItems.map((item) => (item.siteId === singleItem.siteId ? { ...item, ...singleItem } : item)) });                         
    },
    // insertItem,
    // deleteItem,
  });
});

export function useReset() {useStore.setState(initialState)}