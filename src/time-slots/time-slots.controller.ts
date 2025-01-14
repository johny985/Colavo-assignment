import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RequestBody, DayTimetable } from './time-slots.interface';
import { TimeSlotsService } from './time-slots.service';

@Controller('getTimeSlots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  @Post()
  getTimeSlots(@Body() body: RequestBody): DayTimetable[] {
    const { start_day_identifier, timezone_identifier, service_duration } =
      body;

    if (!start_day_identifier || !timezone_identifier || !service_duration) {
      throw new BadRequestException('Please check required parameters');
    }

    return this.timeSlotsService.getTimeSlots(body);
  }
}
