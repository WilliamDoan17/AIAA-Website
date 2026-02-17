# Data Schema

Structure and source for all the data in the website of AIAA USF 
The mock data in /src/data follows this structure.

## Projects
- _id: string
- title: string
- description: string
- coverImage: string

## Events 
- _id: string
- title: string
- date: string
- location: string
- description: string 
- coverImage: string

## Members
- _id: string
- name: string
- role: string
- photo: string

## Conventiosn
- Images are relative paths from /public/ (only for frontend mock data phase)
- Dates are ISO 8601 strings
