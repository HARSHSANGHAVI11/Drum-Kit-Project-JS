{
	const playingClass = 'playing', // declare constant variable
		crashRide = document.getElementById('crash-ride'), // retrive the element 
		hiHatTop = document.getElementById('hihat-top'); // same

	const animateCrashOrRide = () => { // animation for the crash and ride and closed hi hat
		crashRide.style.transform = 'rotate(0deg) scale(1.5)';
	};

	const animateHiHatClosed = () => {
		hiHatTop.style.top = '171px';
	};

	const playSound = e => { // key code of pressedkey  and reset to current time 0 and it show specific key animation
		const keyCode = e.keyCode,
			keyElement = document.querySelector(`div[data-key="${keyCode}"]`);

		if(!keyElement) return;

		const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
		audioElement.currentTime = 0;
		audioElement.play();

		switch(keyCode) {
			case 69: // either matches 
			case 82:
				animateCrashOrRide();
				break;
			case 75:
				animateHiHatClosed();
				break;
		}

		keyElement.classList.add(playingClass); // key element 
	};

	const removeCrashRideTransition = e => {
		if(e.propertyName !== 'transform') return;

		// e.target.style.transform = 'rotate(-7.2deg) scale(1.5)]';
	};

	const removeHiHatTopTransition = e => { // take a event and used for call back listerners if it is not top exist and if topthan it transit top syple 166px
		if(e.propertyName !== 'top') return;

		e.target.style.top = '166px';
	};	

	const removeKeyTransition = e => { // select all elements with key and convert in list into array
		if(e.propertyName !== 'transform') return;

		e.target.classList.remove(playingClass)
	};

	const drumKeys = Array.from(document.querySelectorAll('.key'));

	drumKeys.forEach(key => {
		key.addEventListener('transitionend', removeKeyTransition); // event listerner when trasnition ends it remove key function
	});

	crashRide.addEventListener('transitionend', removeCrashRideTransition); //after clicking the specific key it will reset or remove 
	hiHatTop.addEventListener('transitionend', removeHiHatTopTransition);

	window.addEventListener('keydown', playSound); // basically press trigerred keys on screeen as sound
}