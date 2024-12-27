import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/message', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json(body)
  }),
]
