#ifndef FILE_WRITER_H
#define FILE_WRITER_H

#include <fstream>

class FileWriter
{
public:
	// Записва във файл информацията за книгите, които са с повече от един автора.
	static void save(const Library& library, const char* fileName)
	{
		std::ofstream out(fileName);
		
		if (!out.is_open())
		{
			std::cerr << "Failed to open file for writing";
			return;
		}

		out << library;
		
		out.close();
	}

};


#endif