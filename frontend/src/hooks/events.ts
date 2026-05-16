import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createEvent, getAllEvents, getEventById } from '../services/events.js'
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (info: EventInsert) => createEvent(info),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
    },
  })
}



