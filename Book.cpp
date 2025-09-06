#include <iostream>

#include "Book.h"

void Book::copy(char*& current, const char* member)
{
	size_t size = strlen(member);

	current = new(std::nothrow) char[size + 1];
	if (current != nullptr)
	{
		strcpy_s(current, size + 1, member);
	}
}

Book::Book()
{
	numAuthors = 0;
	authors = new(std::nothrow) Author[MAX];
	isAvailable = 0;
	bookName = nullptr;
}

Book::Book(const Book& other) : time(other.time)
{
	numAuthors = other.numAuthors;

	for (size_t i = 0; i < numAuthors; i++)
	{
		this->authors[i] = Author(other.authors[i]);
	}

	isAvailable = other.isAvailable;
	copy(this->bookName, other.bookName);
}

Book& Book::operator = (const Book& other)
{
	if (this != &other)
	{
		numAuthors = other.numAuthors;

		/*for (size_t i = 0; i < numAuthors; i++)
		{
			authors[i] = other.authors[i];
		}*/

		delete[] this->authors;

		this->authors = new Author[numAuthors];

		for (size_t i = 0; i < numAuthors; i++)
		{
			this->authors[i] = Author(other.authors[i]);
		}

		
		isAvailable = other.isAvailable;
		copy(this->bookName, other.bookName);
		time = other.time;
	}

	return *this;
}

void Book::readName(char*& name)
{
	char buffer[MAX] = "";

	std::cin.getline(buffer, sizeof(buffer));

	if (!std::cin)
	{
		std::cin.clear();
		std::cin.ignore();
	}

	name = new(std::nothrow) char[strlen(buffer) + 1];

	if (name != nullptr)
	{
		strcpy_s(name, strlen(buffer) + 1, buffer);
	}
}

void Book::readBook()
{
	std::cout << "number of authors: ";
	std::cin >> numAuthors;
	std::cin.get();

	for (size_t i = 0; i < numAuthors; i++)
	{
		std::cout << "author info: " << std::endl;;
		authors[i].readAuthor();
	}

	std::cin >> isAvailable;
	std::cin.get();

	std::cout << "book name: ";
	readName(bookName);

	time.readTime();

}

char* Book::getBookName()
{
	return this->bookName;
}

Time Book::getTime()
{
	return time;
}

Author* Book::getAuthors()
{
	return authors;
}

void Book::print()
{
	for (size_t i = 0; i < numAuthors; i++)
	{
		authors[i].print();
	}

	std::cout <<"is available :"<< std::boolalpha<< isAvailable << " ";

	char* getFormated = time.format();
	std::cout << getFormated << std::endl;

	delete[] getFormated;
}

size_t Book::getNumAuthors()
{
	return numAuthors;
}

Book::~Book()
{
	delete[] bookName;

}

