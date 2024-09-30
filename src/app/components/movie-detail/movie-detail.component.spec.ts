import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie/movie.service';
import { MovieDetailsComponent } from '../movie-detail/movie-detail.component';
import { mockMovieService } from '../../services/movie/mock-movie-service';
import { By } from '@angular/platform-browser';
import { Movie } from '../../models/movie.model';
import { MovieComponent } from '../movie/movie.component';

describe('MovieComponent Integration Test', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let movieService: MovieService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent, FormsModule],
      providers: [{ provide: MovieService, useValue: mockMovieService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);

    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
  });

  it('should return correct average when there are reviews', () => {
    const movie: Movie = {
      id: 1,
      reviews: [
        { comment: 'good', rating: 4, user: 'test' },
        { comment: 'average', rating: 2, user: 'testo' },
      ],
      title: 'Testception',
    };
    const averageRating = component.calculateAverageRating(movie);
    expect(averageRating).toBe(3);
  });
  it('should submit review', () => {
    component.movie = {
      id: 1,
      reviews: [
        { comment: 'bad', rating: 4, user: 'test' },
        {
          comment: 'worst',
          rating: 3,
          user: 'testio',
        },
      ],
      title: 'TestCeption',
    };
    component.movieId = 1;
    const addReviewSpy = jest.spyOn(movieService,'addReview');
    component.submitReview();
    expect(addReviewSpy).toHaveBeenCalled();
  });
  it('should return correct movie based on id',()=>{
  const movieId$ = of(2);
  component.movieId$ = movieId$;
  component.ngOnInit();
  expect(component.movie?.title).toEqual('The Dark Knight')
  })
});
