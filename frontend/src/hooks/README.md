# hooks/

Custom React hooks for data access across the web app.

All hooks follow the same pattern: return an object with { data, loading, error }
Thus hooks become the middleware that components use without knowing where the data comes from

## Pattern

Every hook in this folder returns the same

```js
{
  data: Array | Object | null,
  loading: Boolean,
  error: String | null,
}
```

Components will always handle all three states

```js 
const { data, loading, error } = useHook()
if (loading) return
if (error) return 
return {
  /* render data */
}
```

## Current Implementation (Stage 1: Frontend Only)

Hooks currently import from `/data/` and return mock data immediately

```js 
import { data.js } from './data/data.js'

export const useData = () => {
  return {
    data: data, 
    loading: false,
    error: null
  }
}
```



