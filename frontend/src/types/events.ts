export type EventStatus = 'upcoming' | 'ongoing' | 'completed'

export interface Event {
  id: string
  created_at: string
  name: string
  description: string
  content: string
  cover_image: string
  location: string
  url: string | null
  start_time: string
  end_time: string
}

export type EventInsert = Omit<Event, 'id' | 'created_at'>
export type EventUpdate = Partial<EventInsert>
