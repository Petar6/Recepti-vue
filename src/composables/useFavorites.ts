import { ref, watch } from 'vue'

export type Meal = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

const FAVORITES_KEY = 'favoriteMeals'

const favorites = ref<Meal[]>(loadFavorites())

function loadFavorites(): Meal[] {
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : []
}

watch(favorites, (newVal) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newVal))
}, { deep: true })

export function useFavorites() {
  const isFavorite = (meal: Meal) =>
    favorites.value.some((fav) => fav.idMeal === meal.idMeal)

  const toggleFavorite = (meal: Meal) => {
    if (isFavorite(meal)) {
      favorites.value = favorites.value.filter(
        (fav) => fav.idMeal !== meal.idMeal
      )
    } else {
      favorites.value.push(meal)
    }
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite
  }
}
