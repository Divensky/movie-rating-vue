<script setup lang="ts">
import { ref, watch } from 'vue';
import { validate, Movie } from '../utils/validate';

const openModal = defineModel('openModal', { type: Boolean });
const emit = defineEmits(['addMovie']);

const genres = ['Drama', 'Crime', 'Action', 'Comedy', 'Romance'];

const modalRef = ref(null);

watch(
  () => openModal.value,
  () => {
    if (modalRef.value) {
      if (openModal.value) {
        modalRef.value.showModal();
      } else {
        modalRef.value.close();
      }
    }
  },
);

const closeModal = () => {
  clearForm();
  validationError.value = '';
  if (modalRef.value) {
    modalRef.value.close();
    openModal.value = false;
  }
};

const name = ref('');
const description = ref('');
const image = ref('');
const genre = ref([]);
const isInTheaters = ref(false);

const validationError = ref('');

const clearForm = () => {
  name.value = '';
  description.value = '';
  image.value = '';
  genre.value = [];
  isInTheaters.value = false;
};

const createNewMovie = () => {
  const newMovie: Movie = {
    name: name.value,
    description: description.value,
    image: image.value,
    genres: genre.value,
    inTheaters: isInTheaters.value,
  };
  validationError.value = validate(newMovie);
  if (validationError.value === '') {
    newMovie.id = Math.floor(Math.random() * 1000000);
    modalRef.value.close();
    openModal.value = false;
    clearForm();
    emit('addMovie', newMovie);
  }
};
</script>

<template>
  <dialog ref="modalRef" class="new-movie">
    <h2 class="new-movie__title">Add New Movie</h2>
    <form
      method="dialog"
      class="new-movie__form"
      @submit.prevent="createNewMovie"
    >
      <label>
        Name (required)
        <input v-model="name" class="new-movie__input" required />
      </label>
      <label
        >Description
        <textarea v-model="description" class="new-movie__input"></textarea>
      </label>
      <label
        >Image
        <input v-model="image" class="new-movie__input" />
      </label>
      <label
        >Genre (required)
        <select v-model="genre" class="new-movie__input" multiple required>
          <option
            v-for="genre in genres"
            :key="genre"
            :value="genre"
            class="new-movie__option"
          >
            {{ genre }}
          </option>
        </select>
      </label>
      <label
        >In theaters
        <input
          type="checkbox"
          v-model="isInTheaters"
          true-value="true"
          false-value="false"
        />
      </label>
      <div
        v-if="validationError.length > 1"
        class="new-movie__validation-error"
      >
        {{ validationError }}
      </div>
      <div class="new-movie__button-container">
        <button
          type="button"
          class="base-button new-movie__cancel-btn"
          @click="closeModal"
        >
          Cancel
        </button>
        <button type="submit" class="base-button new-movie__create-btn">
          Create
        </button>
      </div>
    </form>
  </dialog>
</template>

<style lang="scss">
.new-movie {
  display: grid;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 0 4px #ddd;

  &::backdrop {
    background-image: linear-gradient(
      45deg,
      magenta,
      rebeccapurple,
      dodgerblue,
      green
    );
    opacity: 0.75;
  }

  &__title {
    font-size: larger;
    font-weight: 600;
    text-align: center;
  }
  &__form {
    display: grid;
    min-width: 400px;
  }

  &__input {
    display: block;
    box-sizing: border-box;
    padding: 4px 8px;
    width: 100%;
    background-color: rgb(121, 121, 212);
    color: white;
    border: 1px solid darkblue;
    border-radius: 4px;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      background-color: cornflowerblue;
      border: 2px solid darkblue;
      outline: none;
    }
  }

  &__option {
    padding: 1px 8px;
    margin: 0 -8px 0 -8px;
    border-radius: 4px;

    &:hover {
      background-color: lightskyblue;
    }
  }
  &__validation-error {
    padding: 4px 8px;
    border-radius: 4px;
    background-color: orangered;
  }
  &__button-container {
    display: flex;
    justify-content: space-between;
  }

  &__cancel-btn {
    background-color: #ddd;
  }

  &__create-btn {
    background-color: aqua;
    color: white;
  }
}
</style>
