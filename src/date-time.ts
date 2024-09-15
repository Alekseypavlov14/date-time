export interface TimeData {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

export class DateTime {
  private time: Date

  constructor()
  constructor(timeData: number)
  constructor(TimeData: Date)
  constructor(timeData: TimeData)
  constructor(timeData?: number | Date | TimeData) {
    if (typeof timeData === 'number') this.time = new Date(timeData)
    else if (timeData instanceof Date) this.time = timeData
    else if (timeData === undefined) this.time = new Date()
    else this.time = DateTime.mapTimeDataToDate(timeData)
  }
  
  static mapTimeDataToDate(timeData: TimeData): Date {
    const currentDate = new Date()
    const normalizedTimeData = DateTime.normalizeTimeData(timeData)

    currentDate.setFullYear(normalizedTimeData.years)
    currentDate.setMonth(normalizedTimeData.months - 1)
    currentDate.setDate(normalizedTimeData.days)
    currentDate.setHours(normalizedTimeData.hours)
    currentDate.setMinutes(normalizedTimeData.minutes)
    currentDate.setSeconds(normalizedTimeData.seconds)
    currentDate.setMilliseconds(normalizedTimeData.milliseconds)

    return currentDate
  }
  
  static mapDateToTimeData(date: Date): Required<TimeData> {
    return {
      years: date.getFullYear(),
      months: date.getMonth() + 1,
      days: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: date.getMilliseconds(),
    }
  }

  static normalizeTimeData(timeData: TimeData): Required<TimeData> {
    const now = new Date()

    return ({
      years: timeData.years !== undefined ? timeData.years : now.getFullYear(),
      months: timeData.months !== undefined ? timeData.months : now.getMonth() + 1,
      days: timeData.days !== undefined ? timeData.days : now.getDate(),
      hours: timeData.hours !== undefined ? timeData.hours : 0,
      minutes: timeData.minutes !== undefined ? timeData.minutes : 0,
      seconds: timeData.seconds !== undefined ? timeData.seconds : 0,
      milliseconds: timeData.milliseconds !== undefined ? timeData.milliseconds : 0,
    })
  }

  getTimeData(): Required<TimeData> {
    return DateTime.mapDateToTimeData(this.time)
  }

  getDate(): Date {
    return this.time
  } 

  getTimeInMilliseconds(): number {
    return this.time.getTime()
  }

  getDateTimeBefore(timeData: TimeData): DateTime {
    // create clone of this.time
    const currentDate = new Date(this.time.getTime())

    if (timeData.years) currentDate.setFullYear(currentDate.getFullYear() - timeData.years)
    if (timeData.months) currentDate.setMonth(currentDate.getMonth() - timeData.months)
    if (timeData.days) currentDate.setDate(currentDate.getDate() - timeData.days)
    if (timeData.hours) currentDate.setHours(currentDate.getHours() - timeData.hours)
    if (timeData.minutes) currentDate.setMinutes(currentDate.getMinutes() - timeData.minutes)
    if (timeData.seconds) currentDate.setSeconds(currentDate.getSeconds() - timeData.seconds)
    if (timeData.milliseconds) currentDate.setMilliseconds(currentDate.getMilliseconds() - timeData.milliseconds)

    return new DateTime(DateTime.mapDateToTimeData(currentDate))
  }

  getDateTimeAfter(timeData: TimeData): DateTime {
    // create clone of this.time
    const currentDate = new Date(this.time.getTime())

    if (timeData.years) currentDate.setFullYear(currentDate.getFullYear() + timeData.years)
    if (timeData.months) currentDate.setMonth(currentDate.getMonth() + timeData.months)
    if (timeData.days) currentDate.setDate(currentDate.getDate() + timeData.days)
    if (timeData.hours) currentDate.setHours(currentDate.getHours() + timeData.hours)
    if (timeData.minutes) currentDate.setMinutes(currentDate.getMinutes() + timeData.minutes)
    if (timeData.seconds) currentDate.setSeconds(currentDate.getSeconds() + timeData.seconds)
    if (timeData.milliseconds) currentDate.setMilliseconds(currentDate.getMilliseconds() + timeData.milliseconds)

    return new DateTime(DateTime.mapDateToTimeData(currentDate))
  }

  normalizeDate(): DateTime {
    const timeData = this.getTimeData()

    return new DateTime({
      days: timeData.days,
      months: timeData.months,
      years: timeData.years
    })
  }

  isMomentEarlier(moment: DateTime): boolean {
    const currentMoment = this.time.getTime()
    const givenMoment = moment.time.getTime()
    return givenMoment <= currentMoment
  }

  isMomentLater(moment: DateTime): boolean {
    return !this.isMomentEarlier(moment)
  }

  getFirstDayOfWeek(firstDayOfWeekIndex: number = 0): DateTime {
    const dateDifference = this.calculateDateDifference(firstDayOfWeekIndex)
    return this.getDateTimeBefore({ days: dateDifference })
  }

  getLastDayOfWeek(firstDayOfWeekIndex: number = 0): DateTime {
    const firstDayOfWeek = this.getFirstDayOfWeek(firstDayOfWeekIndex)
    return firstDayOfWeek.getDateTimeAfter({ days: 6 })
  }

  getWeekDay(firstDayOfWeekIndex: number = 0): number {
    return this.calculateDateDifference(firstDayOfWeekIndex)
  }

  private calculateDateDifference(firstDayOfWeekIndex: number): number {
    const dayOfWeek = this.getDate().getDay()
    return (dayOfWeek - firstDayOfWeekIndex + 7) % 7
  }
}
