import React from 'react';
import { useRef } from 'react';

export const ModalWindow = ({ setTextToTranslate, setTranslatedText }) => {
  const handleClick = () => {
    setTextToTranslate('');
    setTranslatedText('');
  };

  const imageTrack = useRef();

  window.onmousedown = (e) => {
    imageTrack.current.dataset.mouseDownAt = e.clientX;
  };

  window.onmousemove = (e) => {
    if (imageTrack.current.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(imageTrack.current.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(imageTrack.current.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    imageTrack.current.dataset.percentage = nextPercentage;

    imageTrack.current.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of imageTrack.current.getElementsByClassName('image')) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: 'forwards' },
      );
    }
  };

  window.onmouseup = () => {
    imageTrack.current.dataset.mouseDownAt = '0';
    imageTrack.current.dataset.prevPercentage = imageTrack.current.dataset.percentage;
  };

  return (
    <div className="modal">
      <div className="close-modal" onClick={handleClick}>
        Закрыть X
      </div>
      <div className="image-track" ref={imageTrack} data-mouse-down-at="0" data-prev-percentage="0">
        <img
          class="image"
          src="https://psv4.userapi.com/c909618/u146772798/docs/d17/e22e992e0f53/uGeeYTGMaU.jpg?extra=sGE9whEO37Q9n_XM7rkd9bCKYGKQVCNJg4gQ9n3Og1umF6vOZG_meqgn5VXqKRJNtNJFoFafRb9ypJaX2lbLjUX3IG9gXDPBUKGJw89S_EeNrhk8jp1FrDB-TpjSfIli4wLLdtGbQqcQg7B-7xANg8QkOQ"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c909218/u146772798/docs/d11/d507f27420ad/znmVislibwE.jpg?extra=8u1QhciVWrnFvqvz9OH9ud8QcbR6T9I0OuEVxlbeGWzMfv0fA70xndF_UrD0wW4-JNhhU8OaAdWuoA3IGaHvxRubB3H1BSMqlRpeLok67hPSCwzuLkej1UMZUrkAYTvD1taHm7hualVLjOlva1cfgi7QSA"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c909618/u146772798/docs/d43/a3ed9543b0c7/pND45oZjpNc.jpg?extra=-fCvlDgu1wW4v9wTTeymNhEXILjVH2Bb5SokUzaZmsPa1RO3R6xQxGEtVeVr2EMi9rersqmNWFhFi0c9ERHWlh3ZA4rX43Rg2pV6tlcUd1MxpqazED7TzdCI8zDaQEsMmVOmWQNETYH-gTbrhRPdj-m9pQ"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c909228/u146772798/docs/d13/f64630fbef88/nZgGWp86NeI.jpg?extra=wVAOKkz48Ojrg-je28j7hBojEalPEbBqWSqzNwXKU5PRBxSQqmSbqLO9aZICzgG14hpNRkiJHanng1Bum-ULfK-N9EmlHs-YywsnAlhawWL_FPXecppJgwmuFCR_q07Cl_bLlDxBOBDssQontNZtHonfMQ"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c909328/u146772798/docs/d42/b7a77a16813e/1QSFr8RhnKM.jpg?extra=q2ujMPOxQ24ZBUEhU3zzmfj8tNX-tw1ym4Sgnnb--LTc3seFeTcO_fdHIfO1aua9t1LuShIrfo1LOplDj1HCYlAdQ2_W92OKDKC-dPYXKifykFMPc35iBszLisWIVfIBALri7Py4D1Bdwa4u_osspSKSIA"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c240331/u146772798/docs/d42/408858c90ec2/FjKWh7482I.jpg?extra=WwvrnD-Sst8zPLTKEFdp8xbKMVVRj3Mz-j55xv2hR_aaUv7ktKl3z3S8Q577MhpFwkCtunY6SNLkrGB_Y8_wRqTOYPGAfcHnzVq0CWAZzW6ddJAtsuNu85adcmvJiSEDIgbgJ4qQA5vLYuz9ZXxzwvU77w"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c235031/u146772798/docs/d47/4545334d0725/3szFTd4xjZA.jpg?extra=qtVummB1eaUgQ6cu9gRezZeVMlyvPxfs1brhgtKb6MKW1x_8QA1uFk4ubGFRi2W3ZBgReM3z2WvTdGelsXeBI7hV6bljWsYrZgToCrF4nj0PspynABIhVZKj-5efLmbLAsVfcY3P3pVRhSOw5BKKlwZBEg"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c909618/u146772798/docs/d6/7ce91426440d/8TYvBm92tFM.jpg?extra=iUT_x4KoE9Zgn0YBVlQoAqD1qsvHWfSG4eGclSVlPjNHkGbguSN2ctQ3uUvMHf6rciOH7WTK9YGLfbX0uANy0KUsiWBDiTmWDC6n7Pt-beM-S4-dLQwxi-A07_PmvJXrwGRSYchQhn4QuBlAkcyCvDP04A"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c909628/u146772798/docs/d4/c381d4ce8f4b/44HxDRmduxc.jpg?extra=Wlyq8QeYaRI2Fn1aOP4fRo6SgcWxmiwKOi7j9fY4PVINu4J528yctyQt1Z7oD6zGpeoa4k8HM0gW7aVMkLQS4ObzGKk0m6MEPgKZiOVpuUXIMArNC4RGBEuALG2M66__nTg-_zQh8lAvZrRHEy4ZsQnE_g"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c235031/u146772798/docs/d25/00cd007b3619/M5c7q-WKgsk.jpg?extra=34oJ0QsuOik-zkEi6MsX3XOMWEBDftzLb7F7Bde59Xnv3jYxMrX4vzVnfoU2N1bQLMUmtT4CwmXEuAvqeESr6BA22UlKHSQiyzcAJCObqDtX3qR8eHfDkz8rannfN3lunjHtUFaC2sM045QatiwEy1Jv3w"
          draggable="false"
          alt=""
        />
        <img
          class="image"
          src="https://psv4.userapi.com/c909518/u146772798/docs/d41/77729f994da0/Espu5L2Cj6s.jpg?extra=f9Qem1jNstOGDP7n_PNQ-hzE5nbIakpFW7f9Hsw1xaQF736xq2KDnsSccbLZIbDw9gbGldmmSNhLdu5yUyxGLltO6l1Qpsio7ceVGtxcCEjlRvFmI8afSjgA57SRlVreBZx9qWWo5XOD14k7GlEyBhBC_A"
          draggable="false"
          alt=""
        />
      </div>
    </div>
  );
};
