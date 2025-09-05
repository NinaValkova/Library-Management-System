#include <iostream>

#include "library.h"
#include "FileWriter.h"
#include "DataSpecification.h"
#include "Filter.h"

int main()
{
	Book book1;
	book1.readBook();

	Book book2;
	book2.readBook();
	
	Library library;
	library.addBook(book1);
	library.addBook(book2);

	Filter::printLibraryExercise1(library);

	DataSpecification specificaton(Time(12, 12, 12));
	Filter::printLibraryExercise2(library, specificaton);
	
	//Single Responsibility Principle
	FileWriter fileWriter;
	fileWriter.save(library, "library.txt");



	return 0;
}