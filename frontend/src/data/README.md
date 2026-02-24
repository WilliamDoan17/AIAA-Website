# Data Schema

Structure and source for all the data in the website of AIAA USF 
The mock data in /src/data follows this structure.

## Projects
- id: string
- name: string
- description: string
- thumbnail: string

## Events 
- id: string
- name: string
- date: string
- start_time: string
- end_time: string
- location: string
- description: string 
- thumbnail: string

## Members
- id: string
- name: string
- role: string
- photo: string

## Conventions
- Images are relative paths from /public/ (only for frontend mock data phase)
- Dates are ISO 8601 strings

## Conventions 

Mock data list is named as mock(data)s (camelCase)
