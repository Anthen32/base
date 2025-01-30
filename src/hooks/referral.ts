import Cookies from 'js-cookie'

// FUCK YOU TONY!

const querystring = window.location.search
const getReferral = new URLSearchParams(querystring)

const useSetReferralCookie = () => {
  const CookieValue = getReferral.get('ref')

  if (CookieValue) {
    Cookies.set('ref', CookieValue)
  }
}

export function getReferralAddress() {
  return Cookies.get('ref') ? `0x${Cookies.get('ref')}` : null
}

export default useSetReferralCookie
