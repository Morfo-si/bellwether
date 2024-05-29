let bookData = null;

document.addEventListener('DOMContentLoaded', () => {
    fetch('/assets/books.json')
        .then(response => response.json())
        .then(data => {
            bookData = data;
            loadBooks(); // Initial load if needed
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Add event listeners to dropdowns
    document.getElementById('subcategory').addEventListener('change', loadBooks);
    document.getElementById('sort').addEventListener('change', loadBooks);
});

function loadBooks() {
    if (!bookData) return;

    const subcategory = document.getElementById('subcategory').value;
    const sort = document.getElementById('sort').value;
    const term = subcategory + "+" + sort;
    console.log(term);

    const books = bookData.genres[term];
    if (books) {
        displayBooks(books);
    } else {
        document.getElementById('bookList').innerHTML = '<p>No books found for the selected criteria.</p>';
    }
}

function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.slice(0, 5).forEach(book => {  // Display the first 5 books
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <img src="${book.cover_url}" alt="Book Cover">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-price"><a href="${book.link}" target="_blank">${book.price}</a></div>
        `;
        bookList.appendChild(bookDiv);
    });
}
