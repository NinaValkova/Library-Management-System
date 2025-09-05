#ifndef TIME_H
#define TIME_H

class Time
{
private:
	const static size_t MAX_STRING = 100;

	const static size_t MINUTES_PER_HOUR = 60;
	const static size_t SECONDS_PER_MINUTES = 60;
	const static size_t MAX_HOURS = 24;

	size_t hour;
	size_t minutes;
	size_t seconds;

	void makeFormatted(size_t hour, size_t minutes, size_t seconds);
public:
	Time();
	Time(size_t hour, size_t minutes, size_t seconds);
	Time(const Time& other);
	Time& operator = (const Time& other);
	void readTime();
	char* format();
};

#endif

