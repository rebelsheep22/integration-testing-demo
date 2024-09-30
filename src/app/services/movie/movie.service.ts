import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Movie {
  id: number;
  title: string;
  reviews: Review[];
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: Movie[] = [
    { id: 1, title: 'Inception', reviews: [] },
    { id: 2, title: 'The Dark Knight', reviews: [] },
    { id: 3, title: 'Interstellar', reviews: [] },
    { id: 4, title: 'Dunkirk', reviews: [] },
    { id: 5, title: 'Tenet', reviews: [] },
  ];

  getMovies(searchTerm:string): Observable<Movie[]> {
    if (!searchTerm) {
      return of(this.movies);
    }
    return of(this.movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }

  getMovieById(id: number): Observable<Movie> {
    const movie = this.movies.find(movie => movie.id === id);
    return of(movie!);
  }

  addReview(movieId: number, review: { user: string; rating: number; comment: string }): Observable<Movie> {
    const movie = this.movies.find(movie => movie.id === movieId);
    if (movie) {
      movie.reviews.push(review);
    }
    return of(movie!);
  }

}
