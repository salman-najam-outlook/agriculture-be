const moment = require('moment');
const _ = require('lodash');
const { RRule } = require('rrule');
const { notEmpty } = require(rootPath + '/helpers/general');

const rule = {
  freq: {
    year: RRule.YEARLY,
    month: RRule.MONTHLY,
    week: RRule.WEEKLY,
    day: RRule.DAILY,
  },
  weekday: {
    mo: RRule.MO,
    tu: RRule.TU,
    we: RRule.WE,
    th: RRule.TH,
    fr: RRule.FR,
    sa: RRule.SA,
    su: RRule.SU,
  },
};

exports.getRecurringDates = (params, endDateTime) => {
  const {
    startDate,
    repeatsInterval,
    repeatsFreq,
    repeatWeekDays,
    repeatEnds,
    repeatEndValue,
    bysetpos,
  } = params;

  // Create a rule:
  let query = {
    ...(notEmpty(bysetpos) ? { bysetpos: 1 } : null),
    ...(notEmpty(repeatsFreq) ? { freq: rule.freq[repeatsFreq] } : null),
    ...(endDateTime ? { until: new Date(endDateTime) } : null),
    ...(repeatEnds == 'never' ? { count: 365 } : null),
    ...(repeatEnds == 'after' ? { count: parseInt(repeatEndValue) } : null),
    ...(repeatEnds == 'on'
      ? {
          until: new Date(
            moment.utc(repeatEndValue, process.env.ACCEPT_DATE_FORMAT)
          ),
        }
      : null),
    ...(notEmpty(repeatWeekDays)
      ? {
          byweekday: repeatWeekDays.map((day) => {
            return rule.weekday[day];
          }),
        }
      : null),
    dtstart: new Date(startDate),
    interval: parseInt(repeatsInterval ?? 1),
    wkst: RRule.SU,
    tzid: 'UTC',
  };

  const events = new RRule(query);

  return events;
};
