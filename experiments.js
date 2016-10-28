import cookie from 'utils/net/cookies'

import { querySelectorAsync } from 'utils/dom/async-dom'

// TODO: Remove DEBUG and instances where it occurs.
const DEBUG = false

export const DISMISSED_COOKIE_NAME = 'BUTTER_BAR_DISMISSED'

const bootstrapExperiment = () => {
  querySelectorAsync('.butter-bar-notification')
    .then(el => el.remove())
    .catch(err => console.error(err))

  querySelectorAsync('.slideout-drawer')
    .then(el => Object.assign(el.style, {
      height: '100%'
    }))
    .catch(err => console.error(err))

  const Vue = require('vue')
  const LocaleSelectModal = require('./LocaleSelectModal')

  document.body.appendChild(document.createElement('locale-select-modal'))

  /* eslint-disable no-new */
  new Vue({
    el: 'body',
    components: { LocaleSelectModal }
  })
}

/* eslint-disable no-unused-vars */
function shouldBootstrap () {
  const supportedCountries = ['AR', 'CH', 'CO', 'MX', 'PE']
  let showBar
  let countryCode

  try {
    ({ showBar, countryCode } = JSON.parse(sessionStorage.getItem('country_lookup')))
  } catch (err) {
    [showBar, countryCode] = [false, null]
  }

  const isDismissed = cookie.get(DISMISSED_COOKIE_NAME) || false
  const isSupportedCountry = supportedCountries.includes(countryCode)

  if (DEBUG) {
    console.log(`showBar: ${showBar}`)
    console.log(`isSupportedCountry: ${isSupportedCountry}`)
    console.log(`isDismissed: ${isDismissed}`)
    return true
  }

  return showBar && isSupportedCountry && !isDismissed
}

export default function (mod) {
  require.ensure([], () => {
    shouldBootstrap() && bootstrapExperiment()
  }, 'locale-select-modal')
}
