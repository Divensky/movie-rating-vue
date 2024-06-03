export type Movie = {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  rating?: string;
  genres?: string[];
  inTheaters?: boolean;
};

export function validate(movie: Movie) {
  let validationError = '';
  if (!movie.name || movie.name.length < 2) {
    validationError +=
      'Movie name should be filled in and should be longer than 2 characters';
  }
  if (!movie.genres || movie.genres.length < 1) {
    validationError += 'At least one genre should be selected';
  }
  return validationError;
}
