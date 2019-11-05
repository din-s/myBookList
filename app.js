const title = document.querySelector("#app-title")
title.textContent = "MY bOOkLIST"

class Store{

    static setBooks(books){
        localStorage.setItem("books",JSON.stringify(books))
    }
    
    static getBooks(){
        const storedBooks = localStorage.getItem("books")
        let books;
        if (storedBooks === null){
            books=[]
            this.setBooks(books)
            console.log('You have no books to display')
        }else{
             books=JSON.parse(storedBooks)
        }
        return books;
    }

    static addBook(book){
        let books = this.getBooks()
        books.push(book)
        this.setBooks(books)
    }

    static removeBook(isbn){
        let books = this.getBooks()
        books = books.filter((book)=>{
            book.isbn !== isbn
        })
        this.setBooks(books)
    }
}


const removeBook=()=>{
    Store.removeBook()
    displayDOM()
}

const displayDOM = ()=>{
const booklist = document.querySelector("#book-list")
const books=Store.getBooks()

books.forEach(book => {
    let tr = document.createElement('tr')
    let t = document.createElement('td') 
    t.textContent = book.title
    let a = document.createElement('td') 
    a.textContent = book.author
    let i = document.createElement('td') 
    i.textContent =book.isbn
    let b = document.createElement("button")
    b.setAttribute("id","delete")
    b.textContent="Delete Book"
    // p.textContent = `${book.title} is written by ${book.author}`
    tr.appendChild(t)
    tr.appendChild(a)
    tr.appendChild(i)
    tr.appendChild(b)
    booklist.appendChild(tr)
    console.log(`${book.title} is written by ${book.author}`)
});
}

displayDOM()
document.querySelector("#submit-book").addEventListener('click', (e) => {
    e.preventDefault()
    const bookTitle = e.target.form[0].value
    const bookAuthor = e.target.form[1].value
    const bookIsbn = e.target.form[2].value
    if (!bookTitle || !bookAuthor || !bookIsbn){
        console.log('Please enter a valid book details')
    }else{
        book={
            title:bookTitle,
            author:bookAuthor,
            isbn:bookIsbn
        }
        Store.addBook(book)
    }
})