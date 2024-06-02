<script setup lang="ts">
import { ref, watch } from 'vue';

const openModal = defineModel('openModal', { type: Boolean });

const genres = ['Drama', 'Crime', 'Action', 'Comedy', 'Romance'];

const modalRef = ref(null);

watch(
  () => openModal.value,
  () => {
    if (modalRef.value) {
      if (openModal.value) {
        console.log('should show');
        modalRef.value.showModal();
      } else {
        console.log('should close');
        modalRef.value.close();
        openModal.value = false;
      }
    }
  },
);

const closeModal = () => {
  console.log('closing modal');
  if (modalRef.value) {
    modalRef.value.close();
    openModal.value = false;
  }
};

const newMovie = ref({
  id: 0,
  name: '',
  description: '',
  image: '',
  rating: '',
  genres: [],
  inTheaters: false,
});

const name = ref('');
</script>

<template>
  <dialog ref="modalRef" class="new-movie">
    <h2 class="new-movie__title">Add New Movie</h2>
    <form method="dialog" class="new-movie__form">
      <label>
        Name (required)
        <input v-model="name" class="new-movie__input" required />
      </label>
      <label
        >Description
        <textarea class="new-movie__input"></textarea>
      </label>
      <label
        >Image
        <input class="new-movie__input" />
      </label>
      <label
        >Genre (required)
        <select class="new-movie__input" multiple required>
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
        <input type="checkbox" />
      </label>
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
