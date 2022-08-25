import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type State = {
  liked: number[];
  likeCharacter: (id: number) => void;
  searchFilter: string;
  setSearchFilter: (newValue: string) => void
}

const useCharacterStore = create<State>()(devtools(
  persist(
    (set, get) => ({
      liked: [],
      searchFilter: '',

      likeCharacter: (id) => {
        const liked = get().liked

        const shouldLike = !liked.includes(id)

        if (shouldLike) {
          set({ liked: [...liked, id] }, false, { type: 'likeCharacter', id })
        } else {
          set({
            liked: liked.filter((characterId) => characterId !== id)
          }, false, { type: 'unlikeCharacter', id })
        }
      },

      setSearchFilter: (newValue) => set({ searchFilter: newValue }, false, { type: 'searchCharacter', newValue })

    }),
    {
      name: 'character-store', // unique name
    }
  ),
))

export { useCharacterStore }
