import os
import json

def update():
    books = []
    # Сканируем папку books
    for file in os.listdir('books'):
        if file.endswith(('.epub', '.pdf')):
            books.append({
                "title": file.replace('.epub', '').replace('.pdf', ''),
                "author": "Неизвестен",
                "link": f"books/{file}"
            })
    
    # Записываем в JSON для вашего JS-кода
    with open('js/books_data.json', 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    update()
