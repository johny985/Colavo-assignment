import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

import { workhoursData, eventsData } from './mock-data';

import {
  DayTimetable,
  EventData,
  RequestBody,
  Timeslot,
  Workhour,
} from './time-slots.interface';

@Injectable()
export class TimeSlotsService {
  getTimeSlots(body: RequestBody): DayTimetable[] {
    const {
      start_day_identifier,
      timezone_identifier,
      service_duration,
      days = 1,
      timeslot_interval = 1800,
      is_ignore_schedule = false,
      is_ignore_workhour = false,
    } = body;

    const startDateStr = `${start_day_identifier.substring(0, 4)}-${start_day_identifier.substring(4, 6)}-${start_day_identifier.substring(6, 8)}`;
    const currentDayMoment = moment
      .tz(startDateStr, timezone_identifier)
      .startOf('day');

    const result: DayTimetable[] = [];

    for (let dayIndex = 0; dayIndex < days; dayIndex++) {
      const dayStartUnix = currentDayMoment.unix();
      const weekday = currentDayMoment.isoWeekday();

      const formattedWeekday = weekday === 7 ? 1 : weekday + 1;

      let { is_day_off, open_interval, close_interval } =
        this.getWorkhourData(formattedWeekday);

      if (is_ignore_workhour) {
        is_day_off = false;
        open_interval = 0;
        close_interval = 24 * 60 * 60;
      }

      let timeslots: Timeslot[] = [];
      if (!is_day_off) {
        timeslots = this.generateTimeslots(
          dayStartUnix,
          open_interval,
          close_interval,
          timeslot_interval,
          service_duration,
        );

        if (!is_ignore_schedule) {
          timeslots = this.filterByEvents(timeslots, eventsData);
        }
      }

      const dayTimetable: DayTimetable = {
        start_of_day: dayStartUnix,
        day_modifier: dayIndex,
        is_day_off,
        timeslots,
      };

      result.push(dayTimetable);

      currentDayMoment.add(1, 'day').startOf('day');
    }

    return result;
  }

  private getWorkhourData(weekday: number): Workhour {
    const workhour = workhoursData.find((data) => data.weekday === weekday);
    if (!workhour) {
      return {
        close_interval: 0,
        is_day_off: true,
        key: '',
        open_interval: 0,
        weekday,
      };
    }
    return workhour;
  }

  private generateTimeslots(
    dayStartUnix: number,
    opening: number,
    closing: number,
    slotInterval: number,
    serviceDuration: number,
  ): Timeslot[] {
    const timeslots: Timeslot[] = [];
    let currentTimeOffset = opening;

    while (currentTimeOffset + serviceDuration <= closing) {
      const beginAt = dayStartUnix + currentTimeOffset;
      const endAt = beginAt + serviceDuration;

      if (endAt <= dayStartUnix + closing) {
        timeslots.push({
          begin_at: beginAt,
          end_at: endAt,
        });
      }

      currentTimeOffset += slotInterval;
    }
    return timeslots;
  }

  private filterByEvents(
    timeslots: Timeslot[],
    events: EventData[],
  ): Timeslot[] {
    if (!events || events.length === 0) return timeslots;

    return timeslots.filter((slot) => {
      const overlap = events.some((event) => {
        if (event.end_at <= event.begin_at) return false;

        const latestStart = Math.max(slot.begin_at, event.begin_at);
        const earliestEnd = Math.min(slot.end_at, event.end_at);

        return latestStart < earliestEnd;
      });

      return !overlap;
    });
  }
}
