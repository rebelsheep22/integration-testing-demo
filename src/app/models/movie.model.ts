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
  