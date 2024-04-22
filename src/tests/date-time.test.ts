import { DateTime, TimeData } from '../date-time'

// April 23, 2021, 00:00:00 UTC
const someDateInMilliseconds = 1619125200000
const someDateTimeData: TimeData = {
  years: 2021,
  months: 4,
  days: 23,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
}

// Test for constructor with no arguments
test('DateTime constructor with no arguments should create an instance representing the current date and time', () => {
  const dateTime = new DateTime()
  const currentDate = new Date()

  expect(dateTime.getTimeInMilliseconds()).toBeCloseTo(currentDate.getTime())
})

// Test for constructor with milliseconds argument
test('DateTime constructor with milliseconds argument should create an instance with the specified milliseconds since epoch', () => {
  const milliseconds = new Date(someDateInMilliseconds).getTime() // April 23, 2021, 00:00:00 UTC
  const dateTime = new DateTime(milliseconds)

  expect(dateTime.getTimeInMilliseconds()).toEqual(milliseconds)
})

// Test for getTimeData method
test('getTimeData method should return an object containing the current date and time components', () => {
  const dateTime = new DateTime(someDateInMilliseconds) // April 23, 2021, 00:00:00 UTC
  const expectedTimeData = someDateTimeData

  expect(dateTime.getTimeData()).toEqual(expectedTimeData)
})

// Test for getDateTimeBefore method
test('getDateTimeBefore method should return a DateTime instance representing the specified duration before the current date and time', () => {
  const dateTime = new DateTime(someDateInMilliseconds) // April 23, 2021, 00:00:00 UTC
  const duration = { years: 1, months: 2, days: 5, hours: 3, minutes: 30, seconds: 44, milliseconds: 500 }

  const expectedDateTime = new DateTime(1581964155500) // February 17, 2020, 20:29:15.500 UTC

  expect(dateTime.getDateTimeBefore(duration)).toEqual(expectedDateTime)
})

// Test for getDateTimeAfter method
test('getDateTimeAfter method should return a DateTime instance representing the specified duration after the current date and time', () => {
  const dateTime = new DateTime(someDateInMilliseconds) // April 23, 2021, 00:00:00 UTC
  const duration = { years: 1, months: 2, days: 5, hours: 3, minutes: 30, seconds: 15, milliseconds: 500 }
  
  const expectedDateTime = new DateTime(1656376215500) // June 28, 2022, 03:30:15.500 UTC

  expect(dateTime.getDateTimeAfter(duration)).toEqual(expectedDateTime)
})

// Test for isMomentEarlier method
test('isMomentEarlier method should return true if the given moment is earlier or equal to the current moment', () => {
  const currentDateTime = new DateTime()
  
  const earlierDateTime = new DateTime(currentDateTime.getTimeInMilliseconds() - 1000) // 1 second earlier
  const laterDateTime = new DateTime(currentDateTime.getTimeInMilliseconds() + 1000) // 1 second later

  expect(currentDateTime.isMomentEarlier(earlierDateTime)).toBe(true)
  expect(currentDateTime.isMomentEarlier(laterDateTime)).toBe(false)
})

// Test for isMomentLater method
test('isMomentLater method should return true if the given moment is later or equal to the current moment', () => {
  const currentDateTime = new DateTime()

  const earlierDateTime = new DateTime(currentDateTime.getTimeInMilliseconds() - 1000) // 1 second earlier
  const laterDateTime = new DateTime(currentDateTime.getTimeInMilliseconds() + 1000) // 1 second later

  expect(currentDateTime.isMomentLater(earlierDateTime)).toBe(false)
  expect(currentDateTime.isMomentLater(laterDateTime)).toBe(true)
})
