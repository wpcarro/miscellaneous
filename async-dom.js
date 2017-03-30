/**
 * Retrieves a DOM element. If the element is not present, observes changes to
 * the DOM until the element is present.
 * @param {string} selector CSS selector string.
 * @return {Element} DOM element reference.
 */
const querySelectorAsync = selector => new Promise(resolve => {
  const element = document.querySelector(selector)

  if (element) {
    return resolve(element)
  }

  const observer = new MutationObserver(mRecords => {
    mRecords.forEach(mRecord => mRecord.addedNodes.forEach(node => {
      let element

      try {
        element = node.parentElement.querySelector(selector)
      } catch (err) {
        element = null
      }

      if (element) {
        resolve(element)
        observer.disconnect()
      }
    }))
  })

  observer.observe(document.body, { childList: true })
})

export {
  querySelectorAsync
}
