import { convertTimeToMinute } from '@/utils'
import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import isBefore from 'date-fns/isBefore'
import isSameDay from 'date-fns/isSameDay'
import subDays from 'date-fns/subDays'
import { TestContextExtended } from 'utils/TestContextExtended'
import { date, lazy, number, object, string } from 'yup'

function validateValidTime(this: any) {
  const ctx = this as unknown as TestContextExtended<{
    startDate: Date
    startTime: Date
  }>
  const { startDate, startTime } = ctx.from[0].value

  const today = new Date()
  return isSameDay(startDate, today)
    ? convertTimeToMinute(new Date(format(startTime, 'yyyy/MM/dd HH:mm'))) >
        convertTimeToMinute(new Date(format(today, 'yyyy/MM/dd HH:mm')))
    : isBefore(new Date(format(today, 'yyyy/MM/dd')), startDate) &&
        isBefore(subDays(startDate, 3), new Date(format(today, 'yyyy/MM/dd')))
}

function ValidTime(this: any) {
  const ctx = this as unknown as TestContextExtended<{
    startTime: Date
  }>
  const { startTime } = ctx.from[0].value

  const crrDate = format(new Date(), 'yyyy/MM/dd')

  return (
    convertTimeToMinute(new Date(`${crrDate} 06:59`)) <
      convertTimeToMinute(new Date(format(startTime, 'yyyy/MM/dd HH:mm'))) &&
    convertTimeToMinute(new Date(format(startTime, 'yyyy/MM/dd HH:mm'))) <
      convertTimeToMinute(new Date(`${crrDate} 23:01`))
  )
}

export const validationSchema = lazy(() =>
  object().shape({
    name: string().required('Please enter name'),

    phone: string()
      .required('Please enter phone number')
      .min(10, 'Phone is required to have at least 10 characters'),

    note: string().max(
      5000,
      'Note is required to have at more 5000 characters'
    ),
    amount: number()
      .required('Please enter people of number')
      .min(1, 'People of number is required to have at least 1')
      .max(15, 'People of number is required to have at more 15'),
    startDate: date()
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .required('Date is not null')
      .test(
        'startTimeLessThanCurrentDate',
        'The reservation period cannot be in the past and after 2 days to the present',
        validateValidTime
      ),
    startTime: date()
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .required('Date is not null')
      .test(
        'timeIsOffice',
        'time must be administrative time (7:00 AM - 11:00 PM)',
        ValidTime
      ),
  })
)
