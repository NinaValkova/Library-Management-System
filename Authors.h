#ifndef AUTHORS_H
#define AUTHORS_H

class Author
{
private:
	const static size_t MAX_STRING = 100;
	const static size_t MAX = 100;

	char* name;
	char* secondName;
	char* lastName;

	void copy(char*& current, const char* member);
	void readName(char*& name);
public:
	Author();
	Author(const Author& other);
	Author& operator = (const Author& other);
	char* format();
	void readAuthor();
	void print(); 
	char* getName() const;
	~Author();
};


#endif