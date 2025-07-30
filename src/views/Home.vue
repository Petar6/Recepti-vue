<template>
  <div>
    <h1>Pretraži recepte</h1>

    <div style="position: relative; display: block; width: 100%; max-width: 600px;">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Upiši naziv jela..."
        @keyup.enter="fetchMeals"
        style="width: 100%;"
      />
      <ul v-if="suggestions.length" class="autocomplete-list">
        <li
          v-for="meal in suggestions"
          :key="meal.idMeal"
          @click="selectSuggestion(meal.strMeal)"
        >
          {{ meal.strMeal }}
        </li>
      </ul>
    </div>

    <button @click="fetchMeals">Pretraži</button>

    <p v-if="loading">Učitavanje...</p>

    <h2 v-if="!searchQuery && meals.length">Najbolji recepti</h2>
    <h2 v-else-if="searchQuery">Rezultati za "{{ searchQuery }}"</h2>

    <section v-if="meals && meals.length" class="meal-grid">
      <article
        v-for="meal in meals.filter(m => m.strMealThumb && m.strMeal)"
        :key="meal.idMeal"
      >
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
        <h4>{{ meal.strMeal }}</h4>

        <button @click="toggleFavorite(meal)">
          {{ isFavorite(meal) ? 'Ukloni iz favorita' : 'Dodaj u favorite' }}
        </button>

        <router-link :to="`/recept/${meal.idMeal}`" role="button">Detalji</router-link>
      </article>
    </section>

    <div v-else-if="searchQuery && !loading">
      <p>Nema rezultata za "{{ searchQuery }}"</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useFavorites } from '@/composables/useFavorites'
import type { Meal } from '@/composables/useFavorites'

const searchQuery = ref('')
const meals = ref<Meal[]>([])
const loading = ref(false)
const suggestions = ref<Meal[]>([])

const { isFavorite, toggleFavorite } = useFavorites()

const fetchMeals = async () => {
  suggestions.value = []
  loading.value = true

  try {
    const query = searchQuery.value || 'a'
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    )
    meals.value = response.data.meals || []
  } catch (error) {
    console.error('Greška prilikom dohvaćanja jela:', error)
    meals.value = []
  } finally {
    loading.value = false
  }
}

const fetchSuggestions = async () => {
  const query = searchQuery.value.trim()
  if (query.length < 3) {
    suggestions.value = []
    return
  }

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    )
    suggestions.value = response.data.meals
      ? response.data.meals
          .filter((meal: Meal) =>
            meal.strMeal.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
      : []
  } catch (error) {
    console.error('Greška pri dohvaćanju prijedloga:', error)
    suggestions.value = []
  }
}

const selectSuggestion = (mealName: string) => {
  searchQuery.value = mealName
  suggestions.value = []
  fetchMeals()
}

watch(searchQuery, () => {
  fetchSuggestions()
})

onMounted(() => {
  fetchMeals()
})
</script>

<style scoped>
.meal-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}

article {
  flex: 0 1 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background: var(--pico-background-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

button {
  margin-top: 0.5rem;
}

.autocomplete-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 100%;
  background: white;
  position: absolute;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.autocomplete-list li {
  padding: 0.5rem;
  cursor: pointer;
}

.autocomplete-list li:hover {
  background: #f0f0f0;
}
</style>
