const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

export const formatEventTime = (
  start_time: string,
  end_time: string,
  dateFormat: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' },
): string => {
  const start = new Date(start_time)
  const end = new Date(end_time)
  const timeOpts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' }

  const startDate = start.toLocaleDateString('en-US', dateFormat)
  const startTime = start.toLocaleTimeString('en-US', timeOpts)
  const endTime = end.toLocaleTimeString('en-US', timeOpts)

  if (isSameDay(start, end)) {
    return `${startDate} · ${startTime} – ${endTime}`
  }

  const endDate = end.toLocaleDateString('en-US', dateFormat)
  return `${startDate}, ${startTime} – ${endDate}, ${endTime}`
}
