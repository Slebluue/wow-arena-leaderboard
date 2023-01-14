import nookies from 'nookies'

const SECRET = process.env.CLIENT_SECRET
const CLIENT_ID = process.env.CLIENT_ID

export async function fetchToken() {
  const res = await fetch('https://oauth.battle.net/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + SECRET,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.json())
  
  return res
}

export async function selectToken(ctx) {
  const cookies = nookies.get(ctx)
  let authToken = cookies?.token

  if (!authToken) {
    const res = await fetchToken()
    nookies.set(ctx, 'token', res?.access_token, {
      maxAge: res?.expires_in,
      path: '/',
    })
    authToken = res?.access_token
  }

  return authToken
}

export default async function handler(req, res) {
  res.status(200).json({})
}