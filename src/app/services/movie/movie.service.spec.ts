import { TestBed } from '@angular/core/testing';

import { MovieService, Review } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return all movies when search term is empty', (done) => {
    service.getMovies('').subscribe((movies) => {
      expect(movies.length).toBe(5);
      expect(movies).toEqual(service['movies']);
      done();
    });
  });
  it('should return filtered movies based on search term', (done) => {
    service.getMovies('Inception').subscribe((movies) => {
      expect(movies.length).toBe(1);

      expect(movies[0].title).toBe('Inception');
      done();
    });
  });
  it('should return empty movies array based on invalid search term', (done) => {
    service.getMovies('Test').subscribe((movies) => {
      expect(movies.length).toBe(0);
      done();
    });
  });
  describe('getMoviesByid',()=>{
    it('should return the movie by id',(done)=>{
      service.getMovieById(2).subscribe(movie=>{
        expect(movie).toBeTruthy();
        expect(movie.id).toBe(2);
        expect(movie.title).toBe('The Dark Knight');
        done();
      });
    });
    it('should return undefined for a nonexistent movie ID',(done)=>{
      service.getMovieById(99).subscribe((movie)=>{
        expect(movie).toBeUndefined();
        done();
      });
    });
  });
  describe('addReview',()=>{
    it('should add a review to a movie',(done)=>{
      const review: Review = { user:'Test',rating:5, comment: "good"};
      service.addReview(1,review).subscribe(movie=>{
        expect(movie.reviews.length).toBe(1);
        expect(movie.reviews[0]).toEqual(review);
        done();
      });
    });
  })
});
