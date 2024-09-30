import { of } from 'rxjs';
import { Movie, MovieService } from './movie.service';

export const mockMovieService = {
  getMovies: jest.fn().mockReturnValue(
    of([
      { id: 1, title: 'Inception', reviews: [] },
      { id: 2, title: 'The Dark Knight', reviews: [{comment:'good',rating: 5, user:'test'}] },
    ])
  ),
  getMovieById: jest.fn((id: number) =>
    of({ id, title: id === 1 ? 'Inception' : 'The Dark Knight', reviews: [] })
  ),
  addReview: jest.fn().mockReturnValue(of({})),
};
