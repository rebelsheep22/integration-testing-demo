import { Component, OnInit, Input } from '@angular/core';
import { Movie, MovieService } from '../../services/movie/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  @Input() movieId$!: Observable<number>;
  movieId!: number;
  movie: Movie | undefined;
  newReview = {
    user: '',
    rating: 0,
    comment: '',
  };

  constructor(private movieService: MovieService) {}

  ngOnInit() {
   this.loadMovie()
  }
  loadMovie():void {
    this.movieId$.subscribe((id) => {
      this.movieId = id;
      this.movieService.getMovieById(this.movieId).subscribe((movie) => {
        this.movie = movie;
      });
    });
  }
  calculateAverageRating(movie: Movie): number {
    const totalRating = movie.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / movie.reviews.length;
  }

  submitReview() {
    if (this.movie && this.movieId) {
      const review = { ...this.newReview };
      this.movieService.addReview(this.movieId, review).subscribe(() => {
        this.newReview = { user: '', rating: 0, comment: '' }; // reset form
      });
    }
  }
}
