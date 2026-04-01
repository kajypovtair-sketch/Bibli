import os
import json
from ebooklib import epub
from ebooklib import ITEM_IMAGE

def extract_cover(book, book_filename):
    """Достает обложку из epub и сохраняет в папку img/covers/"""
    os.makedirs('img/covers', exist_ok=True)
    cover_path = f"img/covers/{book_filename}.jpg"
    
    try:
        images = list(book.get_items_of_type(ITEM_IMAGE))
        if images:
            with open(cover_path, 'wb') as f:
                f.write(images[0].get_content())
            return cover_path
    except:
        pass
    return "img/default-cover.jpg"

def get_metadata(file_path):
    filename = os.path.basename(file_path)
    title = filename.replace('.epub', '')
    author = "Unknown Author"
    cover_url = "img/default-cover.jpg"
    
    try:
        book = epub.read_epub(file_path)
        # Извлекаем название
        t = book.get_metadata('DC', 'title')
        if t and t[0][0]: title = t[0][0]
        # Извлекаем автора
        a = book.get_metadata('DC', 'creator')
        if a and a[0][0]: author = a[0][0]
        # Извлекаем обложку
        cover_url = extract_cover(book, filename)
    except:
        pass
        
    return title, author, cover_url

def main():
    books_dir = 'books'
    data_list = []

    if not os.path.exists(books_dir):
        os.makedirs(books_dir, exist_ok=True)
        print(f"Создана папка {books_dir}. Положите туда .epub файлы.")
        return

    # Получаем список файлов и сортируем для стабильности ID
    files = [f for f in os.listdir(books_dir) if f.endswith('.epub')]
    
    for index, filename in enumerate(files):
        full_path = os.path.join(books_dir, filename)
        title, author, cover = get_metadata(full_path)
        
        # Правильное добавление данных в список
        data_list.append({
            "id": index + 1,
            "title": str(title),
            "author": str(author),
            "genre": "Classic",       
            "year": 2024,             
            "rating": 5.0,            
            "link": f"books/{filename}",
            "image": cover,
            "description": "Автоматически добавленная книга из папки books."
        })

    # Создаем папку js и сохраняем JSON
    os.makedirs('js', exist_ok=True)
    with open('js/books_data.json', 'w', encoding='utf-8') as f:
        json.dump(data_list, f, ensure_ascii=False, indent=4)
    
    print(f"Успешно! Обработано книг: {len(data_list)}")

if __name__ == "__main__":
    main()
