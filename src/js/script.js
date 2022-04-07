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
            bookFilters: '.filters input',

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
            const ratingBgc = determineRatingBgc(book.rating);
            book.rating = ratingBgc;
            const ratingWidth = book.rating * 10;
            book.ratingWidth = ratingWidth;


            
        }
    }
    render();
    function determineRatingBgc(rating){
        let background = '';
      if(rating < 5){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 5 && rating <= 7){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 7 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

       return background; 
    }
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
        
        
        
        const filtersBooks = document.querySelector(select.books.bookFilters);

        filtersBooks.addEventListener('click',function(callback){
         const bookElem = callback.target;
          const bookValue = callback.target.value;{
         
          if(bookElem.checked){
            const filters = [];
            filters.push(bookValue);
            console.log(filters);
          }else {
              const filters = [];
           const indexValue = filters.indexOf(bookElem) ;
           filters.splice(indexValue,1);  
           console.log(filters)
          }
         
          
          }
         

         
            

         
         filterBooks();

           
        })
        function filterBooks(){
             for (let book of dataSource.books) {
                const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');    
                let shouldBeHidden = false;
                const filterElem = document.querySelectorAll(select.books.bookFilters);    
            for (let filter of filterElem){
              console.log(filter)
                if (!book.details[filter]){
                    shouldBeHidden = true;
                    break;
                }
                 
                }
                if(shouldBeHidden){
                    
                filteredBook.classList.add('hidden');
                }else{
                    
                  filteredBook.classList.remove('hidden');
               }
            }
           
            }

        }
    }
      
        initActions();





        
