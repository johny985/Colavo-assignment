export interface RequestBody {
  start_day_identifier: string;
  timezone_identifier: string;
  service_duration: number;
  days?: number;
  timeslot_interval?: number;
  is_ignore_schedule?: boolean;
  is_ignore_workhour?: boolean;
}

export interface Timeslot {
  begin_at: number;
  end_at: number;
}

export interface DayTimetable {
  start_of_day: number;
  day_modifier: number;
  is_day_off: boolean;
  timeslots: Timeslot[];
}

export interface Workhour {
  close_interval: number;
  is_day_off: boolean;
  key: string;
  open_interval: number;
  weekday: number;
}

export interface EventData {
  begin_at: number;
  end_at: number;
  created_at: number;
  updated_at: number;
}
