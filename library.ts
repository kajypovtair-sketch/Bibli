// Интерфейсы для типизации
interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  rating: number;
  description: string;
}

// Класс для управления библиотекой
class SmartLibrary {
  private books: Book[] = [];
  private bookId: number = 1;

  constructor() {
    this.initializeBooks();
  }

  // Инициализация библиотеки с примерами книг
  private initializeBooks(): void {
    this.books = [
      {
        id: this.bookId++,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopia",
        year: 1949,
        rating: 4.8,
        description: "A dystopian novel about a totalitarian state"
      },
      {
        id: this.bookId++,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Drama",
        year: 1960,
        rating: 4.9,
        description: "A gripping tale of racial injustice and childhood innocence"
      },
      {
        id: this.bookId++,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Romance",
        year: 1925,
        rating: 4.7,
        description: "A classic American novel about love and ambition"
      },
      {
        id: this.bookId++,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        year: 1965,
        rating: 4.8,
        description: "An epic space opera set on a desert planet"
      },
      {
        id: this.bookId++,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        year: 1937,
        rating: 4.9,
        description: "A journey through a magical world"
      },
      {
        id: this.bookId++,
        title: "Murder on the Orient Express",
        author: "Agatha Christie",
        genre: "Mystery",
        year: 1934,
        rating: 4.7,
        description: "A classic detective mystery on a luxury train"
      },
      {
        id: this.bookId++,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Drama",
        year: 1951,
        rating: 4.5,
        description: "A coming-of-age story of teenage angst"
      },
      {
        id: this.bookId++,
        title: "Foundation",
        author: "Isaac Asimov",
        genre: "Science Fiction",
        year: 1951,
        rating: 4.8,
        description: "A groundbreaking science fiction epic"
      }
    ];
  }

  // Добавить новую книгу
  addBook(title: string, author: string, genre: string, year: number, rating: number, description: string): Book {
    const newBook: Book = {
      id: this.bookId++,
      title,
      author,
      genre,
      year,
      rating,
      description
    };
    this.books.push(newBook);
    return newBook;
  }

  // Получить все книги
  getAllBooks(): Book[] {
    return [...this.books];
  }

  // Фильтр по жанру
  filterByGenre(genre: string): Book[] {
    return this.books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
  }

  // Фильтр по году
  filterByYear(year: number): Book[] {
    return this.books.filter(book => book.year === year);
  }

  // Фильтр по рейтингу (минимальный)
  filterByMinRating(minRating: number): Book[] {
    return this.books.filter(book => book.rating >= minRating);
  }

  // Поиск по названию (частичное совпадение)
  searchByTitle(query: string): Book[] {
    const lowerQuery = query.toLowerCase();
    return this.books.filter(book => book.title.toLowerCase().includes(lowerQuery));
  }

  // Поиск по автору (частичное совпадение)
  searchByAuthor(query: string): Book[] {
    const lowerQuery = query.toLowerCase();
    return this.books.filter(book => book.author.toLowerCase().includes(lowerQuery));
  }

  // Поиск по описанию
  searchByDescription(query: string): Book[] {
    const lowerQuery = query.toLowerCase();
    return this.books.filter(book => book.description.toLowerCase().includes(lowerQuery));
  }

  // Комбинированный поиск
  search(query: string): Book[] {
    const lowerQuery = query.toLowerCase();
    return this.books.filter(book =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Получить все доступные жанры
  getGenres(): string[] {
    const genres = new Set(this.books.map(book => book.genre));
    return Array.from(genres).sort();
  }

  // Сортировка по рейтингу
  sortByRating(descending: boolean = true): Book[] {
    const sorted = [...this.books];
    sorted.sort((a, b) => descending ? b.rating - a.rating : a.rating - b.rating);
    return sorted;
  }

  // Сортировка по году издания
  sortByYear(descending: boolean = false): Book[] {
    const sorted = [...this.books];
    sorted.sort((a, b) => descending ? b.year - a.year : a.year - b.year);
    return sorted;
  }

  // Сортировка по названию
  sortByTitle(ascending: boolean = true): Book[] {
    const sorted = [...this.books];
    sorted.sort((a, b) => 
      ascending 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title)
    );
    return sorted;
  }

  // Получить книгу по ID
  getBookById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  // Удалить книгу по ID
  removeBook(id: number): boolean {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      return true;
    }
    return false;
  }

  // Обновить информацию о книге
  updateBook(id: number, updates: Partial<Book>): Book | undefined {
    const book = this.getBookById(id);
    if (book) {
      Object.assign(book, updates);
    }
    return book;
  }

  // Получить статистику библиотеки
  getStatistics() {
    return {
      totalBooks: this.books.length,
      genres: this.getGenres(),
      averageRating: (this.books.reduce((sum, book) => sum + book.rating, 0) / this.books.length).toFixed(2),
      oldestBook: this.books.reduce((oldest, book) => book.year < oldest.year ? book : oldest),
      newestBook: this.books.reduce((newest, book) => book.year > newest.year ? book : newest)
    };
  }
}

export { SmartLibrary, Book };