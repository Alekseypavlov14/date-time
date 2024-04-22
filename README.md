# @oleksii-pavlov/date-time

## Description

`@oleksii-pavlov/date-time` is a TypeScript library that provides a DateTime class for handling date and time operations.

The DateTime class allows you to work with dates and times, manipulate them, perform comparisons, and convert between different formats.

## Installation

You can install the package via npm:

```bash
npm install @oleksii-pavlov/date-time
```

## Usage

### Importing the DateTime class

You can import the DateTime class into your TypeScript/JavaScript file as follows:

```typescript
import { DateTime } from '@oleksii-pavlov/date-time'
```

### Creating DateTime Instances

You can create DateTime instances using various constructors:

```typescript
// Create a DateTime instance representing the current date and time
const now = new DateTime()

// Create a DateTime instance from milliseconds since epoch
const dateTimeFromMilliseconds = new DateTime({ years: 2024, months: 4, days: 22 })

// Create a DateTime instance from a Date object
const date = new Date()
const dateTimeFromDate = new DateTime(date)

// Create a DateTime instance from TimeData object
const timeData = { 
  years: 2024, 
  months: 4, 
  days: 22, 
  hours: 10, 
  minutes: 30, 
  seconds: 0,
  milliseconds: 500 
}
const dateTimeFromTimeData = new DateTime(timeData)
```

Read more about [TimeData](#timedata) below.

### Methods

#### `getDateTimeBefore(timeData: TimeData): DateTime`

Returns a DateTime instance representing the specified duration before the current date and time.

```typescript
const dateTime = new DateTime()

const duration = { days: 7 }
const dateTimeBefore = dateTime.getDateTimeBefore(duration)

console.log(dateTimeBefore)
```

#### `getDateTimeAfter(timeData: TimeData): DateTime`

Returns a DateTime instance representing the specified duration after the current date and time.

```typescript
const dateTime = new DateTime()

const duration = { months: 3 }
const dateTimeAfter = dateTime.getDateTimeAfter(duration)

console.log(dateTimeAfter)
```

#### `normalizeDate(): DateTime`

Returns a DateTime instance with the time components set to 0. (Returns the 00:00 time of the date)

```typescript
const dateTime = new DateTime()
const normalizedDateTime = dateTime.normalizeDate()

console.log(normalizedDateTime)
```

#### `isMomentEarlier(moment: DateTime): boolean`

Checks if the given moment is earlier than or equal to the current moment.

```typescript
const now = new DateTime()
const oneSecondAgo = new DateTime(now.getTimeInMilliseconds() - 1000)

console.log(now.isMomentEarlier(oneSecondAgo)) // true
```

#### `isMomentLater(moment: DateTime): boolean`

Checks if the given moment is later than to the current moment.

```typescript
const now = new DateTime()
const oneSecondLater = new DateTime(now.getTimeInMilliseconds() + 1000)

console.log(now.isMomentLater(oneSecondLater)) // true
```

#### `getTimeData(): Required<TimeData>`

Returns a [TimeData](#timedata) object containing the date and time components.

```typescript
const dateTime = new DateTime()
const timeData = dateTime.getTimeData()

console.log(timeData)
```

#### `getDate(): Date`

Returns the JavaScript Date object representing the date and time.

```typescript
const dateTime = new DateTime()
const date = dateTime.getDate()

console.log(date)
```

#### `getTimeInMilliseconds(): number`

Returns the number of milliseconds.

```typescript
const dateTime = new DateTime()
const milliseconds = dateTime.getTimeInMilliseconds()

console.log(milliseconds)
```

### API

#### `TimeData`

TimeData is an object than contains data about date and time.

```typescript
interface TimeData {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}
```

In DateTime **constructor** TimeData is one of the possible arguments. For **Date** properties **years**, **months**, **days** default values are **today** values. For **Time** properties **hours**, **minutes**, **seconds**, **milliseconds** default values are **0** (00:00 time)
