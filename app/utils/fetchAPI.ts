type GetType = {
  url: string;
  method?: 'GET'
  body?: undefined
}

type NonGetType<T> = {
  url: string;
  method: 'POST' | 'PUT' | 'DELETE'
  body: T
}

type FetchType<T> = GetType | NonGetType<T>

const fetchAPI = <T>({ url, method, body }: FetchType<T>) => {
  const root = 'http://localhost:5000'
  const fullUrl = root + url

  return fetch(fullUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(body)
  })
}

export default fetchAPI