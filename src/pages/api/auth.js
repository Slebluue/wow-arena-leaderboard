import nookies from 'nookies'

export async function fetchToken() {
  const SECRET = process.env.CLIENT_SECRET
  const CLIENT_ID = process.env.CLIENT_ID

  const res = await fetch('https://oauth.battle.net/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + SECRET,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    cache: 'no-store',
  }).then(res => res.json())
  
  return res
}

export async function selectToken(ctx) {
  const res = await fetchToken()
  nookies.set(ctx, 'token', res?.access_token, {
    maxAge: res?.expires_in,
    path: '/',
  })

  return res?.access_token
}

export default async function handler(req, res) {
  res.status(200).json({})
}