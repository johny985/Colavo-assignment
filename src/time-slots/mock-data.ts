import { EventData, Workhour } from './time-slots.interface';

export const eventsData: EventData[] = [
  {
    begin_at: 1620268200,
    end_at: 1620275400,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620275400,
    end_at: 1620275400,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620276300,
    end_at: 1620275400,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620354600,
    end_at: 1620354900,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620441000,
    end_at: 1620469800,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620477000,
    end_at: 1620534600,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
];

export const workhoursData: Workhour[] = [
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'fri',
    open_interval: 36000,
    weekday: 6,
  },
  {
    close_interval: 36900,
    is_day_off: false,
    key: 'mon',
    open_interval: 36900,
    weekday: 2,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'sat',
    open_interval: 36000,
    weekday: 7,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'sun',
    open_interval: 36000,
    weekday: 1,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'thu',
    open_interval: 36000,
    weekday: 5,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'tue',
    open_interval: 36000,
    weekday: 3,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'wed',
    open_interval: 36000,
    weekday: 4,
  },
];
