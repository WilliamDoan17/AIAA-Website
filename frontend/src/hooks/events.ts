import { useMutation, useQuery } from '@tanstack/react-query'
import { getAllEvents, getEventById } from '../services/events.js'
import { EventInsert } from '../types/events.js'


export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: getAllEvents,
  })
}

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => getEventById(id),
  })
}

export const useCreateEvent = () => {
  return useMutation({

  })
}



