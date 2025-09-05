#ifndef DATA_SPECIFICATION_H
#define DATA_SPECIFICATION_H

#include <cstring>

#include "Specification.h"

class DataSpecification : public Specification
{
private:
	Time time;
public:
	DataSpecification(Time time):time(time)
	{}

	bool is_satisfied(Book& book) override
	{
		char* currentDataFormat = book.getTime().format();
		char* dataFormant = time.format();

		if (strcmp(currentDataFormat, dataFormant) == 0)
		{
			delete currentDataFormat;
			delete dataFormant;

			return true;
		}
		else
		{
			delete currentDataFormat;
			delete dataFormant;

			return false;
		}


		return false;
	}
};


#endif
