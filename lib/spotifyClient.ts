var client_id = 'c2cff3f5f0c240a7a09e856800acff2c'
var client_secret = '11bb95b7d7ff451d80ae8c46a42fb447'
var access_token: string | null = null

export const getAccessToken = async () => {
  const params = new URLSearchParams()

  params.append('grant_type', 'client_credentials')

  const buffer = new Buffer(`${client_id}:${client_secret}`)
  const token = buffer.toString('base64')
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${token}`,
    },
    body: params,
  })
  const data = await res.json()

  access_token = data.access_token
}

export const browseCategories = async () => {
  const res = await fetch('https://api.spotify.com/v1/browse/categories', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  })
  const data = await res.json()
  console.log(data)
  return data
}
