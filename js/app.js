// ? TABS
const tabs = document.querySelectorAll(".tabheader__item");
const tabsParent = document.querySelector(".tabheader__items");
const tabContent = document.querySelectorAll(".tabcontent");

const hideTabContent = () => {
  tabContent.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tabheader__item_active");
  });
};

const showTabContent = (i = 0) => {
  tabContent[i].style.display = "block";
  tabs[i].classList.add("tabheader__item_active");
};
hideTabContent();
showTabContent();

tabsParent.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("tabheader__item")) {
    tabs.forEach((item, i) => {
      if (target === item) {
        console.log(i);
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});




// ?DEADLINE
const deadline = '2022-6-30'

function getTimeRemaining(deadline) {
	const t = new Date(deadline) - new Date(),
		days = Math.floor((t / (1000 * 60 * 60 * 24))),
		hours = Math.floor((t / (1000 * 60 * 60) % 24)),
		minutes = Math.floor((t / 1000 / 60) % 60),
		seconds = Math.floor((t / 1000) % 60);

	return {
		"total": t,
		"days": days,
		"hours": hours,
		"minutes": minutes,
		"seconds": seconds
	}
}

function setClock(element, deadline) {
	const elem = document.querySelector(element),
		days = elem.querySelector('#days'),
		hours = elem.querySelector('#hours'),
		minutes = elem.querySelector('#minutes'),
		seconds = elem.querySelector('#seconds');

	setInterval(updateClock, 1000);

	updateClock();

	function makeZero(num) {
		if (num > 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

  function updateClock() {
    const t = getTimeRemaining(deadline);
    if (t.total < 0) {
      days.innerHTML = 0;
      hours.innerHTML = 0;
      minutes.innerHTML = 0;
      seconds.innerHTML = 0;
    } else {
      days.innerHTML = makeZero(t.days);
      hours.innerHTML = makeZero(t.hours);
      minutes.innerHTML = makeZero(t.minutes);
      seconds.innerHTML = makeZero(t.seconds);
    }
  }
}
setClock('.timer', deadline)

// !CARD

class Menu {
  constructor(img, altimg, title, descr, price) {
    this.src = img;
    this.title = title;
    this.price = price;
    this.altimg = altimg;
    this.description = descr;
  }

  render() {
    const wrapper = document.querySelector("#cardWrapper");
    const elem = document.createElement("div");
    elem.classList.add("menu__item");

    elem.innerHTML = `
		<div class="menu__item">
			<img src=${this.src} alt=${this.altimg}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.description}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
			<div class="menu__item-cost">Цена:</div>
			<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
		</div>
		`;
    wrapper.append(elem);
  }
}
 //* async & await
const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    new Error(`Couldn't fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

getResource("db.json").then((data) => {
  data.menu.forEach(({ img, altimg, title, descr, price }) => {
    new Menu(img, altimg, title, descr, price).render();
  });
});

//? FORM
const forms = document.querySelectorAll('form')
const message = {
	loading: "Loading...",
	success: 'Спасибо, скоро свяжемся !',
	fail: 'Что-то пошло не так'
}

forms.forEach(item => {
	bindPostData(item)
});

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data, 
  });
  return await res;
}

function bindPostData (form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault()

		const messageBlock = document.createElement('div')
		messageBlock.src = message.loading
    messageBlock.style.cssText = `
    display: block;
    margin: 20px auto 0;
    `;
    form.insertAdjacentElement("afterend", messageBlock);
    
    const formData = new FormData(form);
    const object = {};

    formData.forEach((item, i) => {
      object[i] = item;
    });

    postData("server-php", JSON.stringify(object))
    .then((data) => {
      console.log(data);
      showThanksModal(message.success);
    })
    .catch(() => {
      showThanksModal(message.fail);
    })
    .finally(() => {
      form.reset();
      messageBlock.remove();
    });
	})
}
function showThanksModal(message) {
  openModal();
  const prevModal = document.querySelector(".modal__dialog");
  prevModal.classList.add("hide");

  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal__dialog");

  thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close">x</div>
			<div class="modal__title">${message}</div>
		</div>
	`;
  modal.append(thanksModal);

  setTimeout(() => {
    prevModal.classList.remove("hide");
    closeModal();
    thanksModal.remove();
  }, 2000);
}    