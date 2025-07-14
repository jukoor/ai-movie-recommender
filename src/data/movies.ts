import { Movie } from '../types/movie';

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    duration: 152,
    director: "Christopher Nolan",
    poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    duration: 148,
    director: "Christopher Nolan",
    poster: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea."
  },
  {
    id: 3,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    duration: 154,
    director: "Quentin Tarantino",
    poster: "https://images.pexels.com/photos/7991553/pexels-photo-7991553.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    rating: 9.3,
    duration: 142,
    director: "Frank Darabont",
    poster: "https://images.pexels.com/photos/7991491/pexels-photo-7991491.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 5,
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    duration: 169,
    director: "Christopher Nolan",
    poster: "https://images.pexels.com/photos/7991264/pexels-photo-7991264.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    duration: 136,
    director: "The Wachowskis",
    poster: "https://images.pexels.com/photos/7991348/pexels-photo-7991348.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A computer programmer discovers that reality as he knows it is a simulation and joins a rebellion to free humanity."
  },
  {
    id: 7,
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    rating: 8.7,
    duration: 146,
    director: "Martin Scorsese",
    poster: "https://images.pexels.com/photos/7991435/pexels-photo-7991435.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill."
  },
  {
    id: 8,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: ["Adventure", "Drama", "Fantasy"],
    rating: 8.8,
    duration: 178,
    director: "Peter Jackson",
    poster: "https://images.pexels.com/photos/7991408/pexels-photo-7991408.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring."
  }
];