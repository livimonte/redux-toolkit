import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type CharacterStoreState = {
  liked: number[];
  likeCharacter: (id: number) => void;
}

const characterStore = create<CharacterStoreState>()(devtools(persist(
  (set, get) => ({
    liked: [],

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
  })),
  {
    name: 'character-store', // unique name
  }
))


export { characterStore as useCharacterStore }
