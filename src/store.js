import { createWithEqualityFn } from 'zustand/traditional';

const initialState = { resultItems: [], counter: 0,};

export const useCounter = createWithEqualityFn((set) => {
  return {
      counter: 10,
      incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
  };
});



export const useStore = createWithEqualityFn((set, get) => {
  return Object.assign(initialState, {
    resultItems: [],
    counter : 0,    
    countUp() {    
      const counter = get().counter;
      set({counter: counter + 1 })
      console.log(counter);  
    },
    addItem(result) {      
      const resultItems = get().resultItems;
      set({ resultItems: [...resultItems, result]  });
    },
    getItems() {      
      const resultItems = get().resultItems;
      console.log(resultItems);
    },
    updateItem(singleItem) {      
      set({ resultItems: get().resultItems.map((item) => (item.siteId === singleItem.siteId ? { ...item, ...singleItem } : item)) });                         
    },
    deleteItem(siteId) {         
      const resultItems = get().resultItems;      
      let filteredList = resultItems.filter(item => { return item.siteId != siteId });         
      set({ resultItems: filteredList});      
    },
  });
});

export function useReset() {useStore.setState(initialState)}