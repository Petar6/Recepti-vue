<template>
  <div v-if="meal">
    <h1>{{ meal.strMeal }}</h1>
    <img :src="meal.strMealThumb" :alt="meal.strMeal" width="300" />
    <p><strong>Kategorija:</strong> {{ meal.strCategory }}</p>
    <p><strong>Podrijetlo:</strong> {{ meal.strArea }}</p>

    <h2>Upute:</h2>
    <p>{{ meal.strInstructions }}</p>

    <h2>Sastojci:</h2>
    <ul>
      <li v-for="(value, index) in sastojci" :key="index">
        {{ value }}
      </li>
    </ul>

    <div v-if="meal.strYoutube">
      <h2>Video recept:</h2>
      <a :href="meal.strYoutube" target="_blank">Pogledaj na YouTube-u</a>
    </div>
  </div>

  <div v-else>
    <p>Učitavanje detalja...</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const meal = ref<any>(null);
const sastojci = ref<string[]>([]);

onMounted(async () => {
  const id = route.params.id;

  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    meal.value = response.data.meals[0];

    for (let i = 1; i <= 20; i++) {
      const ing = meal.value[`strIngredient${i}`];
      const measure = meal.value[`strMeasure${i}`];
      if (ing && ing.trim()) {
        sastojci.value.push(`${ing} - ${measure}`);
      }
    }
  } catch (error) {
    console.error('Greška kod dohvaćanja recepta:', error);
  }
});
</script>

<style scoped>
img {
  border-radius: 10px;
  margin-bottom: 10px;
}
ul {
  padding-left: 20px;
}
</style>
`
