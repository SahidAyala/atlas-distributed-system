import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

dayjs.extend(relativeTime)
dayjs.extend(duration)

export function formatDateTime(iso: string): string {
  return dayjs(iso).format('MMM D, YYYY HH:mm:ss')
}

export function formatDate(iso: string): string {
  return dayjs(iso).format('MMM D, YYYY')
}

export function formatRelative(iso: string): string {
  return dayjs(iso).fromNow()
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`
  const d = dayjs.duration(ms)
  return `${d.minutes()}m ${d.seconds()}s`
}
