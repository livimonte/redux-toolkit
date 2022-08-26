import create from 'zustand'
import { devtools } from 'zustand/middleware'

type FilterStoreState = {
  searchFilter: string;
  setSearchFilter: (newValue: string) => void
}

const filterStore = create<FilterStoreState>()(devtools((set, get) => ({
  searchFilter: '',

  setSearchFilter: (newValue) => set({ searchFilter: newValue }, false, { type: 'searchCharacter', newValue })
}), {
  name: 'search-store', // unique name
}))


export { filterStore as useFilterStore }
