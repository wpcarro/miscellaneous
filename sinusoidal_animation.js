/**
 * This code was a personal experiment to use Math.sin(..) to create an oscillating animation.
 * Additionally this code demonstrates self-contained Javascript that manipulates the DOM's elements and those elements' styles.
 * It also demonstrates use of the window.requestAnimationFrame API.
 */
(function main() {

  const step_amt = 0.050;
	
  let target;
  let throttle_amt_ms = 0;
  let x = 0;

  (function setup_document() {
    const target_styles = {
      border: '1px solid red',
      color: 'red',
      display: 'inline-block',
      fontFamily: 'monospace',
      height: '15px',
      marginTop: '100px',
      position: 'absolute',
      textAlign: 'center',
      width: '75px'
    };

    target = document.createElement('div');
    target.innerText = 'hello';
    Object.assign(target.style, target_styles);
    document.body.appendChild(target);
  }());
  
  const update_target = val => {
    target.innerText = val;
    target.style.top = `${val * -100}px`;
  };

  const update = () => {
    update_target(Math.sin(x).toFixed(3));
    x += step_amt;
    window.setTimeout(() => window.requestAnimationFrame(update), throttle_amt_ms);
  };
  
  window.requestAnimationFrame(update);
}());
