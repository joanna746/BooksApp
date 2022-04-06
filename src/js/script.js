{
    'use strict'

    const select = {
        templateOf: {
            productBook: '#template-book',
        },
        books: {
            bookList: '.books-list',
            booksId: 'data-id',
            bookImage: '.book__image',
            bookName: '.book__name',
            bookFilters: '.filters',

        }

    };
    const templates = {
        productBook: Handlebars.compile(document.querySelector(select.templateOf.productBook).innerHTML),
    };
    function render() {
        for (let book of dataSource.books) {
            const generatedHTML = templates.productBook(book);
            const element = utils.createDOMFromHTML(generatedHTML);
            const bookList = document.querySelector(select.books.bookList);
            bookList.appendChild(element);
        }
    }
    render();

    function initActions(){

        const favoriteBooks = [];
        const books = document.querySelectorAll(select.books.bookImage);
        console.log(books);
        
            for (let book of books){
              book.addEventListener('dblclick', function(event){
                  event.preventDefault();
                  console.log(book);
                const bookActive = event.target.offsetParent;
                 const bookId = bookActive.getAttribute(select.books.booksId);
                 console.log(bookId);
                 if (favoriteBooks.includes(bookId)) {
                     book.classList.remove('favorite');
                     const bookIndex = favoriteBooks.indexOf(bookId);
                  favoriteBooks.splice(bookIndex, 1);
                  console.log(bookIndex);
        
                 }else {
                     book.classList.add('favorite');
                     favoriteBooks.push(bookId);
                 }
               
              });  
            }
            console.log('favoriteBooks');
        }
        
        initActions();


}


        
