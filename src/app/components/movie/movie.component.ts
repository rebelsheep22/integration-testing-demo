import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../../services/movie/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from '../movie-detail/movie-detail.component';
import { BehaviorSubject } from 'rxjs';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [FormsModule,CommonModule,MovieDetailsComponent,SearchComponent],
  templateUrl:  './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selectedMovieId: number | null = null;
  isLoading: boolean = true;
  hasError: boolean = false;
  private movieIdSubject = new BehaviorSubject<number>(0);
  movieId$ = this.movieIdSubject.asObservable();
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(searchTerm: string = '') {
    this.movieService.getMovies(searchTerm).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.filteredMovies = movies; // Initial load
        this.isLoading = false;
      }
    });
  }

  selectMovie(id: number) {
    this.selectedMovieId = id;
    this.movieIdSubject.next(id);
  }

  onSearch(searchTerm: string) {
    this.loadMovies(searchTerm);
    this.selectMovie(0);
  }

  calculateAverageRating(movie: Movie): number {
    if (movie.reviews.length === 0) return 0;
    const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / movie.reviews.length;
  }
}
