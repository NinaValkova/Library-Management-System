#ifndef FILTER_H
#define FILTER_H

#include "Library.h"
#include "Specification.h"

class Filter
{
public:

	// ������� ������������ �� ��������� � ������� �����, ��������� �� ������� ��� �� ��������.
	static void printLibraryExercise1(Library& library)
	{
		std::cout << "Exercise 1:\n";

		Library newLibrary;

		size_t size = library.getCountBooks();

		for (size_t i = 0; i < size; i++)
		{
			newLibrary.setBook(library.getBook()[i]);
		}

		
		newLibrary.sortByAuthor();

		newLibrary.print();

	}

	// ������� ���������� �� �������, ����� �� ����� �� �������� ����.
	static void printLibraryExercise2(Library& library, Specification& s)
	{
		std::cout << "Exercise 2:\n";

		Library newLibrary;

		size_t size = library.getCountBooks();
		for (size_t i = 0; i < size; i++)
		{
			if (s.is_satisfied(library.getBook()[i]))
			{
				newLibrary.setBook(library.getBook()[i]);
			}
		}

		newLibrary.print();
	}


};



#endif