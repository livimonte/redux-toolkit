import create from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  liked: number[];
  likeCharacter: (id: number) => void;
}

const useCharacterStore = create(
  persist<State>(
    (set, get) => ({
      liked: [],

      likeCharacter: (id: number) => {
        const liked = get().liked

        const shouldLike = !liked.includes(id)

        if (shouldLike) {
          useCharacterStore.setState({liked: [...liked, id]})
        } else {
          useCharacterStore.setState({
            liked: liked.filter((characterId) => characterId !== id)
          })
        }
      },
    }),
    {
      name: 'character-store', // unique name
    }
  )
)

export { useCharacterStore }
