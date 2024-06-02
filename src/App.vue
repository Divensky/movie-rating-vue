<script setup>
import { ref } from 'vue';
import { items } from './movies.json';
/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
import { StarIcon } from '@heroicons/vue/24/solid';
import NewMovie from './components/NewMovie.vue';

const moviesWithUserRating = items.map((item) => ({
  ...item,
  userRating: null,
}));
const movies = ref(moviesWithUserRating);

const updateRating = (newRating, item) => {
  item.userRating = newRating;
};

const isDisabled = (buttonNumber, userRating) => buttonNumber === userRating;

const isYellow = (buttonNumber, rating, userRating) =>
  userRating ? buttonNumber <= userRating : buttonNumber <= rating;

const hasRating = (rating, userRating) => rating || userRating;

const openModal = ref(false);

const addMovie = () => {
  openModal.value = !openModal.value;
  console.log('clicked add movie', openModal.value);
};

const hideModal = () => (openModal.value = false);
</script>

<template>
  <div class="container">
    <button class="base-button add-movie" @click="addMovie">Add Movie</button>
    <NewMovie
      v-show="openModal"
      v-model:open-modal="openModal"
      @cancel="hideModal"
    ></NewMovie>
    <div class="movies">
      <div v-for="item in movies" :key="item.id" class="movies__item">
        <div class="movies__image-wrapper">
          <img
            :src="item.image"
            :alt="`${item.name} poster`"
            class="movies__image"
          />
          <div class="movies__poster-rating">
            <StarIcon
              :class="[
                'movies__poster-icon',
                { yellowIcon: hasRating(item.rating, item.userRating) },
              ]"
            />
            <div class="movies__poster-rating-num">
              {{ item.userRating ?? item.rating ?? '-' }}
            </div>
          </div>
        </div>
        <div class="movies__text-wrapper">
          <h2 class="movies__title">{{ item.name }}</h2>
          <ul class="movies__genres">
            <li v-for="genre in item.genres" :key="genre" class="movies__genre">
              {{ genre }}
            </li>
          </ul>
          <p>{{ item.description }}</p>
          <p>User rating: {{ item.userRating }}</p>
          <div class="movies__rating-wrapper">
            <span> Rating: ({{ item.rating }}/5) </span>
            <button
              v-for="n in 5"
              @click="updateRating(n, item)"
              :disabled="isDisabled(n, item.userRating)"
              class="movies__star-button"
            >
              <StarIcon
                class="movies__star-icon"
                :class="{
                  yellowIcon: isYellow(n, item.rating, item.userRating),
                }"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 32px;
}

.add-movie {
  display: block;
  margin: 0 0 24px auto;
  background-color: aqua;
  color: white;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(368px, 1fr));
  gap: 16px;
  --border-radius: 8px;
}

.movies__item {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px #ddd;
}

.movies__image-wrapper {
  position: relative;
}

.movies__poster-rating {
  position: absolute;
  top: 12px;
  right: 12px;
}

.movies__poster-rating-num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: brown;
}
.movies__poster-icon {
  height: 36px;
  color: #ddd;
}

.movies__image {
  width: 100%;
  height: 540px;
  object-fit: cover;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.movies__text-wrapper {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 16px;
  flex-grow: 1;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}
.movies__title {
  font-size: larger;
  font-weight: 600;
}

.movies__genres {
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin: 4px 0 16px;
}

.movies__genre {
  background-color: blueviolet;
  color: white;
  border-radius: 16px;
  padding: 2px 8px;
}

.movies__rating-wrapper {
  margin-top: auto;
  padding-top: 12px;
}

.movies__star-button:disabled {
  cursor: not-allowed;
}

.movies__star-icon {
  display: inline;
  height: 16px;
  color: #ddd;
}

.yellowIcon {
  color: gold;
}
</style>
