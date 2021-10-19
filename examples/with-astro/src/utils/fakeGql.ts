export const fakeGql = async (query: string, variables: any) => {
  const res = await fetch('https://dev.api.brikl.com/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `667674bf-c3f8-4444-8127-29c77c7e6530-GUESTORG-PUBLIC`,
      'x-brikl-shop-id': '667674bf-c3f8-4444-8127-29c77c7e6530',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const jsonData = await res.json()

  return jsonData
}
