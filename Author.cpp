#include <iostream>

#include "Authors.h"

void Author::readName(char*& name)
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

void Author::copy(char*& current, const char* member)
{
	size_t size = strlen(member);

	current = new(std::nothrow) char[size + 1];
	if (current != nullptr)
	{
		strcpy_s(current, size + 1, member);
	}
}

Author::Author()
{
	name = nullptr;
	secondName = nullptr;
	lastName = nullptr;
}

Author::Author(const Author& other) 
{
	copy(this->name, other.name);
	copy(this->secondName, other.secondName);
	copy(this->lastName, other.lastName);
}

Author& Author::operator = (const Author& other)
{
	if (this != &other)
	{
		delete this->name;
		copy(this->name, other.name);
		delete this->secondName;
		copy(this->secondName, other.secondName);
		delete this->lastName;
		copy(this->lastName, other.lastName);
	}

	return *this;
}

void Author::readAuthor()
{
	std::cout << "name: ";
	readName(name);

	std::cout << "second name: ";
	readName(secondName);

	std::cout << "last name: ";
	readName(lastName);

}

char* Author::getName() const
{
	return name;
}

void Author::print()
{
	std::cout << name << " " << secondName << " " << lastName << " ";
}

char* Author::format()
{
	char* author = new(std::nothrow) char[MAX_STRING];

	if (author != nullptr)
	{
		strcpy_s(author, MAX_STRING, "");

		strcat_s(author, MAX_STRING, name);
		strcat_s(author, MAX_STRING, " ");
		strcat_s(author, MAX_STRING, secondName);
		strcat_s(author, MAX_STRING, " ");
		strcat_s(author, MAX_STRING, lastName);
	}

	return author;
}

Author::~Author()
{
	delete[] name;
	delete[] secondName;
	delete[] lastName;
}

