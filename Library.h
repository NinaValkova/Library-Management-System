#ifndef LIBRARY_H
#define LIBRARY_H

#include "Book.h"

class Library
{
private:
	static const size_t MAX_STRING = 100;
	static const size_t MAX = 100;

	size_t countBooks;
	char** booksName;
	Book* books;
public:
	Library();
	void addBook(Book& book);
	void print();
	size_t getCountBooks() const;
	Book* getBook();
	void setBook(Book& book);
	
	void sortByAuthor();

	friend std::ostream& operator <<(std::ostream& out, const Library& library);

	~Library();
};


#endif