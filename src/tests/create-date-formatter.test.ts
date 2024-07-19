import { DateFormatter } from '../date-formatter'

test('should format date correctly with YYYY-MM-DD template', () => {
  const dateFormatter = new DateFormatter().createFormatter('YYYY-MM-DD')
  const date = new Date('2024-07-19').getTime()
  expect(dateFormatter(date)).toBe('2024-07-19')
})

test('should format date correctly with YY/MM/DD template', () => {
  const dateFormatter = new DateFormatter().createFormatter('YY/MM/DD')
  const date = new Date('2024-07-19').getTime()
  expect(dateFormatter(date)).toBe('24/07/19')
})

test('should format date correctly with DD.MM.YYYY hh:mm:ss template', () => {
  const dateFormatter = new DateFormatter().createFormatter('DD.MM.YYYY hh:mm:ss')
  const date = new Date('2024-07-19T15:30:45').getTime()
  expect(dateFormatter(date)).toBe('19.07.2024 15:30:45')
})

test('should format date correctly with hh:mm:ss.SSS template', () => {
  const dateFormatter = new DateFormatter().createFormatter('hh:mm:ss.SSS')
  const date = new Date('2024-07-19T15:30:45.123').getTime()
  expect(dateFormatter(date)).toBe('15:30:45.123')
})

test('should format date correctly with mixed length symbols', () => {
  const dateFormatter = new DateFormatter().createFormatter('YYYY, YY, YYYYY')
  const date = new Date('2024-07-19').getTime()
  expect(dateFormatter(date)).toBe('2024, 24, 02024')
})

test('should format date correctly with single digit hour, minute, and second', () => {
  const dateFormatter = new DateFormatter().createFormatter('h:m:s')
  const date = new Date('2024-07-19T05:04:03').getTime()
  expect(dateFormatter(date)).toBe('5:4:3')
})

test('should format date correctly with zero-padded hour, minute, and second', () => {
  const dateFormatter = new DateFormatter().createFormatter('hh:mm:ss')
  const date = new Date('2024-07-19T05:04:03').getTime()
  expect(dateFormatter(date)).toBe('05:04:03')
})

test('should format date correctly with zero-padded month and day', () => {
  const dateFormatter = new DateFormatter().createFormatter('MM-DD')
  const date = new Date('2024-05-03').getTime()
  expect(dateFormatter(date)).toBe('05-03')
})

test('should format date correctly with milliseconds', () => {
  const dateFormatter = new DateFormatter().createFormatter('ss.SSS')
  const date = new Date('2024-07-19T15:30:45.123').getTime()
  expect(dateFormatter(date)).toBe('45.123')
})

test('should format date correctly with space symbols', () => {
  const dateFormatter = new DateFormatter().createFormatter('DD MM YYYY')
  const date = new Date('2024-07-19').getTime()
  expect(dateFormatter(date)).toBe('19 07 2024')
})

test('should format date correctly with custom short months', () => {
  const customShortMonths = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
  const dateFormatter = new DateFormatter({ shortMonths: customShortMonths }).createFormatter('MMM DD, YYYY')
  const date = new Date('2024-07-19').getTime()
  expect(dateFormatter(date)).toBe('J 19, 2024')
})

test('should format date correctly with custom full months', () => {
  const customFullMonths = ['Janus', 'Februs', 'Mars', 'Aprils', 'Mays', 'Junus', 'Julius', 'Augustus', 'Septembus', 'Octobus', 'Novembus', 'Decembus']
  const dateFormatter = new DateFormatter({ fullMonths: customFullMonths }).createFormatter('MMMM DD, YYYY')
  const date = new Date('2024-07-19').getTime()
  expect(dateFormatter(date)).toBe('Julius 19, 2024')
})

test('should format date correctly with custom short days', () => {
  const customShortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] // Custom short day names
  const dateFormatter = new DateFormatter({ shortDays: customShortDays }).createFormatter('DDD, DD MMM YYYY')
  const date = new Date('2024-07-19').getTime() // Saturday
  expect(dateFormatter(date)).toBe('F, 19 Jul 2024') // Expecting custom short day name 'F' for Friday
})

test('should format date correctly with custom full days', () => {
  const customFullDays = ['Sunus', 'Monus', 'Tuesus', 'Wednesus', 'Thursus', 'Frius', 'Satus'] // Custom full day names
  const dateFormatter = new DateFormatter({ fullDays: customFullDays }).createFormatter('DDDD, DD MMM YYYY')
  const date = new Date('2024-07-19').getTime() // Saturday
  expect(dateFormatter(date)).toBe('Frius, 19 Jul 2024') // Expecting custom full day name 'Frius' for Friday
})
