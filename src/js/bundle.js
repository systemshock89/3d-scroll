'use strict';

import LazyLoad from "vanilla-lazyload";

const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});

document.addEventListener('DOMContentLoaded', () => {

    // 3D Scroll
    const zSpacing = -1000; // расстояние по оси Z (напр, от текста до фотографии)
    let lastPos = zSpacing / 5; // стартовая позиция
    const $frames = document.getElementsByClassName('frame'),
          frames = Array.from($frames),
          zVals = []; // массив знач-й по оси Z

    scroll3d();
    window.addEventListener("scroll", () => {
        scroll3d();
    });

    function scroll3d(){
        const top = document.documentElement.scrollTop, // расстояние сверху до текущей позиции
            delta = lastPos - top;

        lastPos = top;

        frames.forEach((n, i) => {
            zVals.push((i * zSpacing) + zSpacing);
            zVals[i] += delta * -5.5 // управляем скоростью пролистывания
            const frame = frames[i],
                transform = `translateZ(${zVals[i]}px)`,
                opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0; // параметр 1.8 регулирует, когда будет пропадать эл-т
            frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity};`);
        });
    }

    // Audio
    const soundButton = document.querySelector('.soundbutton'),
          audio = document.querySelector('.audio')

    soundButton.addEventListener('click', e => {
        e.preventDefault();
        soundButton.classList.toggle('paused');
        audio.paused ? audio.play() : audio.pause();
    });

    window.addEventListener("focus", () => {
        soundButton.classList.contains('paused') ? audio.pause() : audio.play();
    });

    // при переходе на другую вкладку аудио отключается
    window.addEventListener("blur", () => {
        audio.pause();
    });

});