import os
import json
import re
from ebooklib import epub
from ebooklib import ITEM_IMAGE

def extract_cover(book, book_filename):
    """Достает обложку из epub и сохраняет в папку img/covers/"""
    os.makedirs('img/covers', exist_ok=True)
    cover_path = f"img/covers/{book_filename}.jpg"
    
    # Ищем изображения внутри epub
    images = list(book.get_items_of_type(ITEM_IMAGE))
    if images:
        # Обычно первая картинка — это обложка
        with open(cover_path, 'wb') as f:
            f.write(images[0].get_content())
        return cover_path
    return "img/default-cover.jpg" # Если обложки нет

def get_metadata(file_path):
    title = os.path.basename(file_path).replace('.epub', '')
    author = "Unknown Author"
    cover_url = "img/default-cover.jpg"
    
    try:
        book = epub.read_epub(file_path)
        # Метаданные
        t = book.get_metadata('DC', 'title')
        if t: title = t[0][0]
        a = book.get_metadata('DC', 'creator')
        if a: author = a[0][0]
        
        # Извлечение обложки
        cover_url = extract_cover(book, os.path.basename(file_path))
    except:
        pass
        
    return title, author, cover_url

def main():
    books_dir = 'books'
    data_list = []

    if not os.path.exists(books_dir):
        os.makedirs(books_dir)
        return

    for filename in os.listdir(books_dir):
        if filename.endswith('.epub'):
            full_path = os.path.join(books_dir, filename)
            title, author, cover = get_metadata(full_path)
            
            data_list.append({# Добавь это в data_list.append в файле update_library.py
    "id": len(data_list) + 1, # Добавляем ID для работы методов поиска
    "title": title,
    "author": author,
    "genre": "Classic",       # EPUB не всегда хранит жанр, можно пока ставить дефолт
    "year": 2024,             # Можно вытащить из метаданных 'DC', 'date'
    "rating": 5.0,            # Заглушка
    "link": f"books/{filename}",
    "image": cover,
    "description": "Описание книги..."  
})

    "title": title,
    "author": author,
    "link": f"books/{filename}",
    "image": cover
})

    os.makedirs('js', exist_ok=True)
    with open('js/books_data.json', 'w', encoding='utf-8') as f:
        json.dump(data_list, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
