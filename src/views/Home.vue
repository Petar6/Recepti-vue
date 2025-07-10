<template>
  <div>
    <h1>Pretraži recepte</h1>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Upiši naziv jela..."
      @keyup.enter="fetchMeals"
    />
    <button @click="fetchMeals">Pretraži</button>

    <section v-if="meals.length > 0" class="meal-grid">
      <article v-for="meal in meals.filter(m => m.strMealThumb && m.strMeal)" :key="meal.idMeal">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
        <h4>{{ meal.strMeal }}</h4>
        <router-link :to="`/recept/${meal.idMeal}`" role="button">Detalji</router-link>
      </article>
    </section>

    <div v-else-if="searchQuery && !loading">
      <p>Nema rezultata za "{{ searchQuery }}"</p>
    </div>

    <div v-if="loading">
      <p>Učitavanje...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const searchQuery = ref('');
const meals = ref<any[]>([]);
const loading = ref(false);

const fetchMeals = async () => {
  if (!searchQuery.value) return;
  loading.value = true;

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery.value}`
    );
    meals.value = response.data.meals || [];
  } catch (error) {
    console.error('Greška prilikom dohvaćanja jela:', error);
    meals.value = [];
  } finally {
    loading.value = false;
  }
};
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
