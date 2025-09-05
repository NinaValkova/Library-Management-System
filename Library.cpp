#include <iostream>

#include "Library.h"

Library::Library()
{
	countBooks = 0;
    booksName = new(std::nothrow) char* [MAX];
	books = nullptr;
}

void Library::addBook(Book& book)
{
	Book* newBooks = new(std::nothrow) Book[countBooks + 1];

	if (newBooks != nullptr)
	{
		for (size_t i = 0; i < countBooks; i++)
		{
			newBooks[i] = books[i];
			//newBooks[i] = Book(books[i]);
		}

		newBooks[countBooks] = book;

		size_t size = strlen(book.getBookName());
		booksName[countBooks] = new(std::nothrow) char[size + 1];

		if (booksName[countBooks] != nullptr)
		{
			strncpy_s(booksName[countBooks], size + 1, book.getBookName(), size);

			booksName[countBooks][size] = '\0';
		}

		if (books != nullptr)
		{
			delete[] books;
		}

		books = newBooks;

		countBooks++;
	}
}


void Library::print()
{

	for (size_t i = 0; i < countBooks; i++)
	{
		std::cout << booksName[i] << " ";
		books[i].print();
	}
	std::cout << std::endl;

}

size_t Library::getCountBooks() const
{
	return countBooks;
}

std::ostream& operator <<(std::ostream& out, const Library& library)
{
	size_t size = library.getCountBooks();
	for (size_t i = 0; i < size; i++)
	{
		if (library.books[i].getNumAuthors() >= 2)
		{
			out << library.booksName[i] << "\n";
		}
	}

	return out;
}

Book* Library::getBook()
{
	return books;
}

void Library::setBook(Book& book)
{
	addBook(book);
}

// книги, подредени по азбучен ред на авторите.
void Library::sortByAuthor()
{

	Book temp;

	//bubble sort
	for (size_t i = 0; i < countBooks-1; i++)
	{
		for (size_t j = 0; j < countBooks - 1 - i; j++)
		{
			const char* firstAuthor = books[j].getAuthors()[0].format();
			const char* secondAuthor = books[j+1].getAuthors()[0].format();
			if (strcmp(firstAuthor, secondAuthor) < 0)
			{
				temp = books[j];
				books[j] = books[j + 1];
				books[j + 1] = temp;
			}
		}
	}
}

Library::~Library()
{
	for (size_t i = 0; i < countBooks; i++)
	{
		if (booksName[i] != nullptr)
		{
			delete[] booksName[i];
		}
	}
	delete[] booksName;

	delete[] books;
}

