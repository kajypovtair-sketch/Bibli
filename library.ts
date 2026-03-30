// Описываем структуру книги, которую генерирует Python-скрипт
interface Book {
    title: string;
    author: string;
    link: string;
    image: string;
}

class Library {
    private container: HTMLElement | null;

    constructor(containerId: string) {
        this.container = document.getElementById(containerId);
    }

    // Метод для загрузки данных из JSON
    async init() {
        try {
            // Путь к файлу, который создает наш Python-скрипт
            const response = await fetch('js/books_data.json');
            if (!response.ok) throw new Error("Файл базы данных не найден");
            
            const books: Book[] = await response.json();
            this.render(books);
        } catch (error) {
            console.error("Ошибка загрузки библиотеки:", error);
        }
    }

    // Метод для отрисовки карточек
    private render(books: Book[]) {
        if (!this.container) return;
        this.container.innerHTML = ''; // Очистка перед рендером

        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <img src="${book.image}" alt="${book.title}" class="book-cover">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <a href="${book.link}" class="download-btn" download>Скачать</a>
                </div>
            `;
            this.container?.appendChild(card);
        });
    }
}

// Запуск при загрузке страницы
const myLibrary = new Library('library-grid'); // ID блока в вашем index.html
myLibrary.init();
