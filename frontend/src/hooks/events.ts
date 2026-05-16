import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../services/events.js'
import { EventInsert, EventUpdate } from '../types/events.js'


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

interface UpdateEventProps {
  id: string,
  updates: EventUpdate
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: UpdateEventProps) => updateEvent(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
    }
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
    }
  })
}




