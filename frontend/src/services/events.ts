import supabase from "../supabase/supabase";
import type { Event, EventInsert, EventUpdate } from "../types/event";

export const getAllEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')

  if (error) throw error
  return data ?? []
}

export const getEventById = async (id: string): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const createEvent = async (info: EventInsert): Promise<void> => {
  const { error } = await supabase
    .from('events')
    .insert(info)

  if (error) throw error
}

export const updateEvent = async (id: string, updates: EventUpdate): Promise<void> => {
  const { error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)

  if (error) throw error
}

export const deleteEvent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)

  if (error) throw error
}
