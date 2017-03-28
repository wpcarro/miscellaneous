// Generic Page Loader for UI FX
const PageLoader = (function pageLoaderModule() {

  // Public Functions
  const init = function pageLoaderInit(mountPoint) {
    const ref = createMarkup(mountPoint);

    return {
      _percentageComplete: 0,
      _shouldContinue: true,
      _htmlRef: ref,
      _updateCount: 0,
    };
  };

  const start = function pageLoaderStart(loader) {
    loader._percentageComplete = 2;

    update(loader);
  };

  const stop = function pageLoaderFinish(loader) {
    const animationDuration = getAnimationDurationMS();

    loader._shouldContinue = false;
    loader._percentageComplete = 100;

    Object.assign(loader._htmlRef.style, {
      width: '100%',
    });

    setTimeout(function() {
      Object.assign(loader._htmlRef.style, {
        top: '-5px',
      });

      setTimeout(function() {
        loader._updateCount = 0;
      }, animationDuration + 1)

    }, animationDuration);

  };


  // Private Functions
  const update = function _pageLoaderUpdate(loader) {
    const percentageComplete = loader._percentageComplete;
    const newPercentage = computeNewPercentage(loader);

    loader._updateCount += 1;
    loader._percentageComplete = newPercentage;

    // update UI
    Object.assign(loader._htmlRef.style, {
      width: toPercentage(newPercentage),
    });

    // repeat
    setTimeout(function() {
      if (loader._shouldContinue === true) {
        update(loader);
      }
    }, jitter(getThrottleAmountMS()));
  };

  const jitter = function _pageLoaderJitterValue(x) {
    const amt = 500;

    return Math.floor(Math.random() * amt) - (amt / 2) + x;
  };

  const getThrottleAmountMS = function _pageLoaderGetThrottleAmountMS() {
    return 750;
  };

  const getAveragePageLoadMS = function _pageLoaderGetAveragePageLoadMS() {
    return 4000;
  };

  const computeNewPercentage = function _pageLoaderComputeNewPercentage(loader) {
    const numUpdatesPerLoad = getAveragePageLoadMS() / getThrottleAmountMS();
    const domain = [Math.log(1), Math.log(1 + numUpdatesPerLoad)];
    const range = [0, 100];
    const newVal = remap(domain, range, Math.log(loader._updateCount + 1));

    return newVal;
  };

  const remap = function _pageLoaderRemapValues(domain, range, x) {
    const offset = x - domain[0];
    const domainSz = domain[1] - domain[0];
    const rangeSz = range[1] - range[0];
    const scaleFactor = rangeSz / domainSz;

    return offset * scaleFactor + range[0];
  };

  const clamp = function(min, max, x) {
    return Math.min(Math.max(min, x), max);
  };

  const getAnimationDurationMS = function _pageLoaderGetAnimationDurationMS() {
    return 250;
  };

  const toPercentage = function _pageLoaderToPercentage(x) {
    return `${x}%`;
  };

  const getContainerStyles = function _pageLoaderGetContainerStyles() {
    return {
      height: '3px',
      width: '100vw',
      position: 'fixed',
      top: '0',
      left: '0',
      'z-index': '100',
    };
  };

  const getInnerStyles = function _pageLoaderGetInnerStyles() {
    const transitionDuration = msToCSS(getAnimationDurationMS());

    return {
      position: 'absolute',
      top: '0',
      left: '0',
      background: getColor('green'),
      height: '100%',
      width: '0%',
      transition: `width ${transitionDuration}, top ${transitionDuration}`,
    };
  };

  const getColor = function _pageLoaderGetColor(colorName) {
    const colors = {
      blue: 'rgb(0, 195, 255)',
      green: 'rgb(62, 207, 142)',
      orange: 'rgb(245, 142, 101)',
    };

    return colors[colorName] || 'black';
  };

  const msToCSS = function(ms) {
    return `${ms / 1000}s`;
  };

  const createMarkup = function _pageLoaderCreateMarkup(mountPoint) {
    const container = document.createElement('div');
    const inner = document.createElement('div')

    // Stylize
    Object.assign(container.style, getContainerStyles());
    Object.assign(inner.style, getInnerStyles());

    container.appendChild(inner);
    mountPoint.appendChild(container);

    return inner;
  };

  // API
  return {
    init: init,
    start: start,
    stop: stop,
  };
}());
