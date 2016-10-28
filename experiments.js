// Experiment 1
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


// Experiment 2
export default function (mod) {
  // The following line imports the Sass styling
  require('./ContactBySales')

  // Convenience aliases
  const $ = document.querySelector.bind(document)
  const $$ = selector => Array.from(document.querySelectorAll(selector))

  const policyURL = '//www.google.com/intl/en/policies/privacy/'

  // Input elements with this class will be included in the form's POST request.
  const inputClass = 'js-signup-input'

  const checkboxContainerEl = document.createElement('div')
  const checkboxCopyEl = document.createElement('p')
  const checkboxEl = document.createElement('input')

  checkboxEl.setAttribute('type', 'checkbox')
  checkboxEl.setAttribute('class', 'contact-by-sales__checkbox')
  checkboxCopyEl.setAttribute('class', 'contact-by-sales__checkbox-copy')
  checkboxContainerEl.setAttribute('class',
      'contact-by-sales__checkbox-container')

  checkboxCopyEl.innerText =
      'Yes, Google may contact me regarding Google products and services.'

  checkboxContainerEl.appendChild(checkboxEl)
  checkboxContainerEl.appendChild(checkboxCopyEl)

  const salesConsentEl = createPayloadEl('sales_consent', false, inputClass)
  const salesExperimentEl = createPayloadEl('sales_experiment', true, inputClass)

  checkboxEl.addEventListener('change', event =>
      salesConsentEl.setAttribute('value', event.target.checked))

  checkboxCopyEl.addEventListener('click', () => checkboxEl.click())

  // Polls the DOM for presence of elements. Polls for 2 seconds 10x / second.
  const getDomElements = () => {
    const maxPollAttempts = 20
    let numPollAttempts = 0

    const checkForDomElements = (resolveFn, rejectFn) => {
      const inputContainerEl = $('.newsletter-modal-window__input-container')
      const disclaimerEl = $('.newsletter-modal-window__disclaimer')

      if (inputContainerEl && disclaimerEl) {
        return resolveFn({inputContainerEl, disclaimerEl})
      }

      setTimeout(() => {
        numPollAttempts += 1

        return (numPollAttempts <= maxPollAttempts)
          ? checkForDomElements(resolveFn, rejectFn)
          : rejectFn(new Error('DOM Polling timeout.'))
      }, 100)
    }

    return new Promise(checkForDomElements)
  }

  // The following selectors will be null until a subscribe button is clicked:
  //   '.newsletter-modal-window__input-container'
  //   '.newsletter-modal-window__disclaimer'
  const handleClick = () => getDomElements().then(
      ({inputContainerEl, disclaimerEl}) => {
        inputContainerEl.appendChild(checkboxContainerEl)
        inputContainerEl.appendChild(salesConsentEl)
        inputContainerEl.appendChild(salesExperimentEl)

        disclaimerEl.innerHTML = `
            Sign up to receive your selected communications from Google Inc. and its
            affiliates. Your information will be used in accordance with Google's
            <a href="${policyURL}">privacy policy</a>. We may connect information
            about the site visit that brought you here with your user profile.`
            .replace(/\n\s{2,}/, '')
      })
      .catch(err => console.error(err))

  $$('[data-modal-type=newsletter]').forEach(el => el.addEventListener('click',
      handleClick))
}

function createPayloadEl (key, initialValue, className) {
  const el = document.createElement('input')

  el.setAttribute('type', 'hidden')
  el.setAttribute('class', className)
  el.setAttribute('value', initialValue)
  el.setAttribute('data-input-key', key)

  return el
}
