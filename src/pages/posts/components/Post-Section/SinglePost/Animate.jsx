import React from 'react'

const Animate = () => {
    var animateButton = function (e) {
      e.preventDefault;
      //reset animation
      e.target.classList.remove("animate");

      e.target.classList.add("animate");
      setTimeout(function () {
        e.target.classList.remove("animate");
      }, 700);
    };

    var classname = document.getElementsByClassName("sparkle");

    for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener("click", animateButton, false);
    }

  return (
      <div className='sparkle absolute'>
    </div>
  )
}

export default Animate

