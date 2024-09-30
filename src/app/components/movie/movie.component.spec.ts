import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieComponent } from './movie.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie/movie.service';
import { MovieDetailsComponent } from '../movie-detail/movie-detail.component';
import { mockMovieService } from '../../services/movie/mock-movie-service';
import { By } from '@angular/platform-browser';
import { Movie } from '../../models/movie.model';

describe('MovieComponent Integration Test', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieComponent, MovieDetailsComponent, FormsModule],
      providers: [{ provide: MovieService, useValue: mockMovieService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);

  });

  it('should load movies on init', () => {
    // Trigger ngOnInit
    fixture.detectChanges();

    // Check that movies are loaded
    expect(component.movies.length).toBe(2);
    expect(movieService.getMovies).toHaveBeenCalled();

    // Verify that movie titles are rendered
    const movieElements = fixture.debugElement.queryAll(By.css('.movie-card'));

    expect(movieElements[0].nativeElement.textContent).toContain('Inception');
    expect(movieElements[1].nativeElement.textContent).toContain('The Dark Knight');
  });

  it('should display movie details when a movie is clicked', () => {
    // Trigger ngOnInit
    fixture.detectChanges();

    // Click on the first movie (Inception)
    const movieElements = fixture.debugElement.queryAll(By.css('.movie-card'));
    movieElements[0].triggerEventHandler('click', null);

    // Check that the selectedMovieId is set
    expect(component.selectedMovieId).toBe(1);

    // Verify that the MovieDetailsComponent is rendered
    fixture.detectChanges(); // Update the DOM
    const movieDetails = fixture.debugElement.query(By.css('app-movie-details'));
    expect(movieDetails).toBeTruthy();
  });
  it('should render title', () => {
    fixture.detectChanges();

    const header = fixture.debugElement.queryAll(By.css('.header'));
    expect(header[0].nativeElement.textContent).toBe('Movie Review App');
  });
  it('should not display reviews if there are none',()=>{
    fixture.detectChanges();
    component.movies = [{id: 1, reviews: [], title: 'Test'}];

    const movieElements = fixture.debugElement.queryAll(By.css('.review'));
    expect(movieElements[0].nativeElement.textContent).toContain('No reviews yet.');
  });
  it('should display reviews if there are',()=>{
    fixture.detectChanges();

    const movieElements = fixture.debugElement.queryAll(By.css('.movie-rating'));
    expect(movieElements[0].nativeElement.textContent).toContain('Average Rating: 5 / 5');
  });
  it('should search correct movie', () => {
    const searchTerm = 'Inception';
    const loadMoviesSpy = jest.spyOn(component, 'loadMovies');
    component.onSearch(searchTerm);
    expect(loadMoviesSpy).toHaveBeenCalledWith(searchTerm);
  });
  it('should display searched movie', () => {
    fixture.detectChanges();
    const searchTerm = 'Inception';
    component.onSearch(searchTerm);
    fixture.detectChanges();
    const movieElements = fixture.debugElement.queryAll(By.css('.movie-title'));
    expect(movieElements[0].nativeElement.textContent).toBe('Inception');
  });
  describe('calculateAverageRating', () => {
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
    it('should return correct average when there are no reviews', () => {
      const movie: Movie = {
        id: 1,
        reviews: [

        ],
        title: 'Testception',
      };
      const averageRating = component.calculateAverageRating(movie);
      expect(averageRating).toBe(0);
    });
  });
});
