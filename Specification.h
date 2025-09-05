#ifndef SPECIFICATION_H
#define SPECIFICATION_H

#include "library.h"

class Specification
{
public:
	virtual bool is_satisfied(Book& book) = 0;
};

#endif
