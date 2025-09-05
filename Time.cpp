#include <iostream>

#include "Time.h"

Time::Time():hour(0), minutes(0), seconds(0)
{}

Time::Time(size_t hour, size_t minutes, size_t seconds)
{
	makeFormatted(hour, minutes, seconds);
}

Time::Time(const Time& other)
{
	hour = other.hour;
	minutes = other.minutes;
	seconds = other.seconds;
}

Time& Time::operator = (const Time& other)
{
	if (this != &other)
	{
		hour = other.hour;
		minutes = other.minutes;
		seconds = other.seconds;
	}

	return *this;
}

void Time::makeFormatted(size_t hour, size_t minutes, size_t seconds)
{
	this->hour = (hour + minutes / MINUTES_PER_HOUR) % MAX_HOURS;
	this->minutes = minutes % MINUTES_PER_HOUR;

	if (seconds >= 60)
	{
		this->minutes += seconds / SECONDS_PER_MINUTES;
		this->seconds = seconds % SECONDS_PER_MINUTES;
	}
	else
	{
	this->seconds = seconds;
	}
}

void Time::readTime()
{
	std::cout << "hour: ";
	std::cin >> hour;

	std::cout << "minutes: ";
	std::cin >> minutes;

	std::cout << "seconds: ";
	std::cin >> seconds;

	makeFormatted(hour, minutes, seconds);
}

char* Time::format()
{
	char* time = new(std::nothrow) char[MAX_STRING];

	if (time != nullptr)
	{
		strcpy_s(time, MAX_STRING, "");
		char buffer[MAX_STRING];

		_itoa_s(hour, buffer, MAX_STRING, 10);
		strcat_s(time, MAX_STRING, buffer);
		strcat_s(time, MAX_STRING, ":");
		_itoa_s(minutes, buffer, MAX_STRING, 10);
		strcat_s(time, MAX_STRING, buffer);
		strcat_s(time, MAX_STRING, ":");
		_itoa_s(seconds, buffer, MAX_STRING, 10);
		strcat_s(time, MAX_STRING, buffer);
	}

	return time;
}

