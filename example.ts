import { SmartLibrary } from './library';

// Создание экземпляра библиотеки
const library = new SmartLibrary();

console.log("=== БИБЛИОТЕКА ПРИМЕРЫ ===\n");

// 1. Вывести все книги
console.log("📚 ВСЕ КНИГИ:");
library.getAllBooks().forEach(book => {
  console.log(`• ${book.title} - ${book.author} (${book.year}) [⭐ ${book.rating}]`);
});

// 2. Получить все жанры
console.log("\n📂 ДОСТУПНЫЕ ЖАНРЫ:");
console.log(library.getGenres().join(", "));

// 3. Фильтр по жанру
console.log("\n🔍 КНИГИ ЖАНРА 'Science Fiction':");
library.filterByGenre("Science Fiction").forEach(book => {
  console.log(`• ${book.title} - ${book.author}`);
});

// 4. Фильтр по жанру - Fantasy
console.log("\n🔍 КНИГИ ЖАНРА 'Fantasy':");
library.filterByGenre("Fantasy").forEach(book => {
  console.log(`• ${book.title} - ${book.author}`);
});

// 5. Поиск по названию
console.log("\n🔎 ПОИСК ПО НАЗВАНИЮ 'Gatsby':");
library.searchByTitle("Gatsby").forEach(book => {
  console.log(`• ${book.title} - ${book.author} (${book.year})`);
});

// 6. Поиск по автору
console.log("\n🔎 ПОИСК ПО АВТОРУ 'Tolkien':");
library.searchByAuthor("Tolkien").forEach(book => {
  console.log(`• ${book.title} (${book.year})`);
});

// 7. Комбинированный поиск
console.log("\n🔎 КОМБИНИРОВАННЫЙ ПОИСК 'mystery':");
library.search("mystery").forEach(book => {
  console.log(`• ${book.title} - ${book.author}`);
});

// 8. Сортировка по рейтингу
console.log("\n⭐ КНИГИ ПО РЕЙТИНГУ (ТОП):");
library.sortByRating(true).slice(0, 3).forEach(book => {
  console.log(`• ${book.title} [⭐ ${book.rating}]`);
});

// 9. Сортировка по году
console.log("\n📅 САМЫЕ СТАРЫЕ КНИГИ:");
library.sortByYear(false).slice(0, 3).forEach(book => {
  console.log(`• ${book.title} (${book.year})`);
});

// 10. Фильтр по минимальному рейтингу
console.log("\n⭐ КНИГИ С РЕЙТИНГОМ >= 4.8:");
library.filterByMinRating(4.8).forEach(book => {
  console.log(`• ${book.title} [⭐ ${book.rating}]`);
});

// 11. Добавить новую книгу
console.log("\n➕ ДОБАВЛЕНИЕ НОВОЙ КНИГИ:");
const newBook = library.addBook(
  "The Name of the Wind",
  "Patrick Rothfuss",
  "Fantasy",
  2007,
  4.8,
  "A tale of a legendary figure and his own mysterious past"
);
console.log(`✓ Добавлена книга: ${newBook.title} (ID: ${newBook.id})`);

// 12. Статистика библиотеки
console.log("\n📊 СТАТИСТИКА БИБЛИОТЕКИ:");
const stats = library.getStatistics();
console.log(`Всего книг: ${stats.totalBooks}`);
console.log(`Средний рейтинг: ${stats.averageRating}`);
console.log(`Самая старая: ${stats.oldestBook.title} (${stats.oldestBook.year})`);
console.log(`Самая новая: ${stats.newestBook.title} (${stats.newestBook.year})`);

// 13. Получить книгу по ID
console.log("\n🔍 КНИГА ПО ID (ID: 1):");
const book = library.getBookById(1);
if (book) {
  console.log(`${book.title} - ${book.author}`);
  console.log(`Описание: ${book.description}`);
}