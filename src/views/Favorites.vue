<template>
  <div>
    <h1>Favoriti</h1>

    <section v-if="favorites.length > 0" class="meal-grid">
      <article v-for="meal in favorites" :key="meal.idMeal">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
        <h4>{{ meal.strMeal }}</h4>
        <router-link :to="`/recept/${meal.idMeal}`" role="button">Detalji</router-link>
        <button @click="toggleFavorite(meal)">Ukloni iz favorita</button>
      </article>
    </section>

    <div v-else>
      <p>Trenutno nema favorita.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFavorites } from '@/composables/useFavorites'

const { favorites, toggleFavorite } = useFavorites()
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
</style>
