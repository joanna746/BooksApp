{
  'use strict'

  let myFilters = [];

  const select = {
    templateOf: {
      productBook: '#template-book',
    },
    books: {
      bookList: '.books-list',
      booksId: 'data-id',
      bookImage: '.book__image',
      bookName: '.book__name',
      bookFilters: '.filters input',
      bookRaiting: '.book__rating',
      elemRaiting: '.book__rating__fill'

    }

  };
  const templates = {
    productBook: Handlebars.compile(document.querySelector(select.templateOf.productBook).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBookList = this;
      thisBookList.render();
      thisBookList.determineRatingBgc();
      thisBookList.initActions();
      thisBookList.filtersBooks();
    }
    determineRatingBgc(rating) {
      const thisBookList = this;

      let background = '';

      if (rating < 5) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 5 && rating <= 7) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 7 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';

      }




      return background;

    }
    render() {
      const thisBookList = this;
      for (let book of dataSource.books) {
       
        book.ratingWidth =Number(book.rating )*10;
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        console.log(book);
        const generatedHTML = templates.productBook(book);
        console.log(generatedHTML);
        const element = utils.createDOMFromHTML(generatedHTML);
        console.log(element);
        const bookList = document.querySelector(select.books.bookList);
        console.log(bookList)
        bookList.appendChild(element);
        


      }
    }


    


    initActions() {
      const thisBookList = this;

      const favoriteBooks = [];
      const books = document.querySelectorAll(select.books.bookImage);
      console.log(books);

      for (let book of books) {
        book.addEventListener('dblclick', function (event) {
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

          } else {
            book.classList.add('favorite');
            favoriteBooks.push(bookId);
          }

        });
      }


      const filtersBooks = document.querySelectorAll(select.books.bookFilters);
      for (let elem of filtersBooks) {
      elem.addEventListener('click', function (callback) {
        const bookElem = callback.target;
        const bookValue = callback.target.value;

        if (bookElem.checked) {
          myFilters.push(bookValue);
        } else {
          const indexValue = myFilters.indexOf(bookElem);
          myFilters.splice(indexValue, 1);
        }

        thisBookList.filtersBooks();
      })
    }
  }
    filtersBooks() {

      const thisBookList = this;
      for (let book of dataSource.books) {

        const bookElement = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;

        const filterElements = document.querySelectorAll(select.books.bookFilters);

        for (let filter of filterElements) {
          if (filter.checked && !book.details[filter.value]) {
            shouldBeHidden = true;
            break;
          }

        }
        if (shouldBeHidden) {

          bookElement.classList.add('hidden');
        } else {
          bookElement.classList.remove('hidden');
        }

      }

    }

  }
  const app = new BooksList();
}





