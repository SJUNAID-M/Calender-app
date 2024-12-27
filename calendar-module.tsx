import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Communication = {
  id: string;
  title: string;
  date: string;
  type: string;
  companyName: string;
  notes?: string;
};

// Date helper functions
const getMonthDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  
  return days;
};

const formatDate = (date: Date): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const parseISO = (dateString: string): Date => {
  return new Date(dateString);
};

const CalendarModule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Communication | null>(null);
  const [events] = useState<Communication[]>([
    {
      id: '1',
      title: 'Email - TechCorp',
      date: '2024-12-25',
      type: 'Email',
      companyName: 'TechCorp',
      notes: 'Quarterly update discussion'
    },
    {
      id: '2',
      title: 'Call - InnoSys',
      date: '2024-12-28',
      type: 'Phone',
      companyName: 'InnoSys',
      notes: 'Follow-up call'
    }
  ]);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToToday = () => setCurrentDate(new Date());

  // Get days for the current month
  const daysInMonth = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDisplayDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Communication Calendar</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold text-center mb-4">
            {formatDate(currentDate)}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Week day headers */}
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center font-semibold bg-gray-50">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {daysInMonth.map(day => {
              const dayEvents = getEventsForDay(day);
              
              return (
                <div 
                  key={day.toString()}
                  className="min-h-24 p-2 border bg-white hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    if (dayEvents.length > 0) {
                      setSelectedEvent(dayEvents[0]);
                    }
                  }}
                >
                  <div className="font-medium text-sm">
                    {day.getDate()}
                  </div>
                  <div className="space-y-1 mt-1">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate ${
                          event.type === 'Email' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Event Details Dialog */}
          {selectedEvent && (
            <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Communication Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Company</h4>
                    <p>{selectedEvent.companyName}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Type</h4>
                    <p>{selectedEvent.type}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Date</h4>
                    <p>{formatDisplayDate(parseISO(selectedEvent.date))}</p>
                  </div>
                  {selectedEvent.notes && (
                    <div>
                      <h4 className="font-semibold">Notes</h4>
                      <p>{selectedEvent.notes}</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarModule;
