#ifndef BOOK_H
#define BOOK_H

#include "Authors.h"
#include "Time.h"

class Book
{
private:
	const static size_t MAX = 100;

	size_t numAuthors;
	Author* authors;

	bool isAvailable;

	Time time;

	char* bookName;

	void readName(char*& name);
	void copy(char*& current, const char* member);
public:
	Book();
	Book(const Book& other);
	Book& operator = (const Book& other);
	void readBook();
	void print();
	char* getBookName();
	Time getTime();
	Author* getAuthors();
	size_t getNumAuthors();
	~Book();

};


#endif
