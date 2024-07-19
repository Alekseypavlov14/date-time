import { DAY_DURING_PROCESSING_SYMBOL, DAY_SYMBOL, defaultFullDays, defaultFullMonths, defaultShortDays, defaultShortMonths, HOUR_SYMBOL, MILLISECOND_SYMBOL, MINUTE_SYMBOL, MONTH_DURING_PROCESSING_SYMBOL, MONTH_SYMBOL, SECOND_SYMBOL, YEAR_SYMBOL } from './constants'
import { DateTime } from './date-time'

type ReplaceValue = number | string

export interface DateFormatterConfig {
  shortDays?: string[]
  fullDays?: string[]
  shortMonths?: string[]
  fullMonths?: string[]
}

export class DateFormatter {
  private shortDays: string[] = defaultShortDays
  private fullDays: string[] = defaultFullDays
  private shortMonths: string[] = defaultShortMonths
  private fullMonths: string[] = defaultFullMonths

  constructor(config: DateFormatterConfig = {}) {
    if (config.shortDays) this.shortDays = config.shortDays
    if (config.fullDays) this.fullDays = config.fullDays
    if (config.shortMonths) this.shortMonths = config.shortMonths
    if (config.fullMonths) this.fullMonths = config.fullMonths
  }

  createFormatter(template: string) {
    // regexps
    const yearsSymbolsRegex = this.createGlobalRegex(this.getRegExpConstructor(YEAR_SYMBOL))
    const monthsSymbolRegex = this.createGlobalRegex(this.getRegExpConstructor(MONTH_SYMBOL))
    const daysSymbolRegex = this.createGlobalRegex(this.getRegExpConstructor(DAY_SYMBOL))
    const hoursSymbolRegex = this.createGlobalRegex(this.getRegExpConstructor(HOUR_SYMBOL))
    const minutesSymbolRegex = this.createGlobalRegex(this.getRegExpConstructor(MINUTE_SYMBOL))
    const secondsSymbolRegex = this.createGlobalRegex(this.getRegExpConstructor(SECOND_SYMBOL))
    const millisecondsSymbolRegex = this.createGlobalRegex(this.getRegExpConstructor(MILLISECOND_SYMBOL))

    // customable regexps (processing)
    const shortDaysRegex = this.createGlobalRegex(`${DAY_SYMBOL}{3}`)
    const fullDaysRegex = this.createGlobalRegex(`${DAY_SYMBOL}{4}`)
    const shortMonthsRegex = this.createGlobalRegex(`${MONTH_SYMBOL}{3}`)
    const fullMonthsRegex = this.createGlobalRegex(`${MONTH_SYMBOL}{4}`)

    const shortDaysProcessingRegex = this.createGlobalRegex(`${DAY_DURING_PROCESSING_SYMBOL}{3}`)
    const fullDaysProcessingRegex = this.createGlobalRegex(`${DAY_DURING_PROCESSING_SYMBOL}{4}`)
    const shortMonthsProcessingRegex = this.createGlobalRegex(`${MONTH_DURING_PROCESSING_SYMBOL}{3}`)
    const fullMonthsProcessingRegex = this.createGlobalRegex(`${MONTH_DURING_PROCESSING_SYMBOL}{4}`)

    return (date: number) => {
      const dateTime = new DateTime(date)
      const timeData = dateTime.getTimeData()

      // for custom replacers
      const dayOfWeek = dateTime.getDate().getDay()
      const monthIndex = dateTime.getDate().getMonth()
  
      return template
        // start custom replacements
        .replace(fullMonthsRegex, this.repeatValue(MONTH_DURING_PROCESSING_SYMBOL, 4))
        .replace(shortMonthsRegex, this.repeatValue(MONTH_DURING_PROCESSING_SYMBOL, 3))
        .replace(fullDaysRegex, this.repeatValue(DAY_DURING_PROCESSING_SYMBOL, 4))
        .replace(shortDaysRegex, this.repeatValue(DAY_DURING_PROCESSING_SYMBOL, 3))

        // basic replacers
        .replace(yearsSymbolsRegex, this.createReplacer(timeData.years))
        .replace(monthsSymbolRegex, this.createReplacer(timeData.months))
        .replace(daysSymbolRegex, this.createReplacer(timeData.days))
        .replace(hoursSymbolRegex, this.createReplacer(timeData.hours))
        .replace(minutesSymbolRegex, this.createReplacer(timeData.minutes))
        .replace(secondsSymbolRegex, this.createReplacer(timeData.seconds))
        .replace(millisecondsSymbolRegex, this.createReplacer(timeData.milliseconds))

        // final custom replacements
        .replace(fullMonthsProcessingRegex, this.fullMonths[monthIndex])
        .replace(shortMonthsProcessingRegex, this.shortMonths[monthIndex])
        .replace(fullDaysProcessingRegex, this.fullDays[dayOfWeek])
        .replace(shortDaysProcessingRegex, this.shortDays[dayOfWeek])
    }
  }

  private createReplacer(value: ReplaceValue) {
    return (match: string) => this.padValue(value, match.length).slice(-match.length)
  }
  private padValue(value: ReplaceValue, length: number) {
    return String(value ?? '').padStart(length, '0')
  }
  private repeatValue(value: string, length: number) {
    return new Array(Math.ceil(length / value.length)).fill(value).join('').slice(0, length)
  }

  private createGlobalRegex(constructor: string) {
    return new RegExp(constructor, 'g')
  }
  private getRegExpConstructor(symbol: string) {
    return `${symbol}{1,}`
  }
}
