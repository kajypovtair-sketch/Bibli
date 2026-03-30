import os
import json
import re
from ebooklib import epub

def get_metadata(file_path):
    # Значения по умолчанию
    title = os.path.basename(file_path).replace('.epub', '')
    author = "Unknown Author"
    
    try:
        if file_path.endswith('.epub'):
            book = epub.read_epub(file_path)
            # Пытаемся достать реальное название из метаданных
            t = book.get_metadata('DC', 'title')
            if t: title = t[0][0]
            
            # Пытаемся достать автора
            a = book.get_metadata('DC', 'creator')
            if a: author = a[0][0]
    except:
        pass # Если файл битый, оставляем имя файла
        
    return title, author

def main():
    books_dir = 'books'
    data_list = []

    if not os.path.exists(books_dir):
        return

    for filename in os.listdir(books_dir):
        if filename.endswith('.epub'):
            full_path = os.path.join(books_dir, filename)
            title, author = get_metadata(full_path)
            
            data_list.append({
                "title": title,
                "author": author,
                "link": f"books/{filename}",
                "image": "img/default-cover.jpg" # Пока ставим общую обложку
            })

    # Сохраняем результат в папку js
    os.makedirs('js', exist_ok=True)
    with open('js/books_data.json', 'w', encoding='utf-8') as f:
        json.dump(data_list, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
