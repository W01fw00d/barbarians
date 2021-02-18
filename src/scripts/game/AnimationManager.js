function AnimationManager(enableAnimations) {
  this.enableAnimations = enableAnimations;

  const sleep = (miliseconds) => new Promise(resolve =>
    setTimeout(
      resolve,
      this.enableAnimations ? miliseconds : 0
    )
  );

  const ONE_SECOND = 1000;
  const TWO_SECONDS = ONE_SECOND * 2;


  this.sleepOneStep = () => sleep(TWO_SECONDS);
  this.sleepHalfStep = () => sleep(ONE_SECOND);
}

AnimationManager.prototype.functionExample = function() {
};
