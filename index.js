const d = document;
let interval,
  w = window,
  next,
  previous,
  pokemon = "https://pokeapi.co/api/v2/pokemon/",
  $div = document.getElementById("pokemon"),
  $fragment = document.createDocumentFragment();

d.addEventListener("click", (e) => {
  if (e.target.matches("#Section9 #btn-1")) {
    /* if(next===null)
    {d.querySelector("#btn-1").classList.add("none");
        }
   else  */
    showPokemon(next);
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches("#Section9 #btn-2")) {
    /* if(previous===null)

       { console.log(previous)
      d.querySelector("#btn-2").classList.add("none");

        }

   else */ showPokemon(
      previous
    );
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".panelBtn *") || e.target.matches(".panelBtn")) {
    d.querySelector(".panel").classList.toggle("is-active");
    d.querySelector(".panelBtn").classList.toggle("is-active");
  }

  if (e.target.matches(".menu a")) {
    d.querySelector(".panel").classList.remove("is-active");
    d.querySelector(".panelBtn").classList.remove("is-active");
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".iniciar")) cuentaregresiva();
  if (e.target.matches(".detener")) {
    d.getElementById("reloj").innerHTML = null;
    clearInterval(interval);
  }
});
function cuentaregresiva() {
  let restan;
  interval = setInterval(() => {
    let hoy = new Date().getTime(),
      future = new Date("March 9 ,2024 00:00").getTime(),
      restan = future - hoy,
      dias = Math.floor(restan / (1000 * 60 * 60 * 24)),
      horas = Math.floor((restan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutos = (
        "0" + Math.floor((restan % (1000 * 60 * 60)) / (1000 * 60))
      ).slice(-2),
      segundos = ("0" + Math.floor((restan % (1000 * 60)) / 1000)).slice(-2);

    d.getElementById(
      "reloj"
    ).innerHTML = `<b>Faltan ${dias} días con ${horas} horas con ${minutos} minutos  con ${segundos} segundos</b>`;

    if (
      Math.floor(restan / (1000 * 60)) === 0 &&
      Math.floor((restan % (1000 * 60)) / 1000) === 0
    ) {
      d.getElementById("reloj").innerHTML = `<p><b>Felicidades Osvany</b></p>`;
      clearInterval(interval);
    }
  }, 1000);
      }

function get_data() {
  const $fetch = d.getElementById("fetch"),
    $fragment = d.createDocumentFragment();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      json.forEach((el) => {
        const $li = d.createElement("li");
        $li.innerHTML = `${el.name}--${el.email}--${el.phone}--${el.address.street}--${el.address.zipcode}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      let messaje = "ocurrió un error" || err.statusText;
      $fetch.innerHTML = `<h3>Error:${err.status} ${messaje}</h3>`;
    });
}

function geolocalizacion() {
  let options = {
    enableHighAcuraccy: true,
    timeout: 3000,
    maximunAge: 0
  };
  const succes = (position) => {
    console.log(position);
    console.log(position.coords.latitude);
    document.querySelector("#geo").innerHTML = `<ul>
      <li><mark>Latitud:${position.coords.latitude}</mark></li>
      <li><mark>Longitud:${position.coords.longitude}</mark></li>
      </ul>`;
  };

  const error = (err) => {
    console.log(err);
  };
  navigator.geolocation.getCurrentPosition(succes, error, options);
  }
function scrollBtn() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".scrollBtn"))
      window.scrollTo({
        behavior: "smooth",
        top: 0
      });
  });
  window.addEventListener("scroll", (e) => {
    let distance = window.pageYOffset;
    if (distance >= 1500) {
      document.querySelector(".scrollBtn").classList.remove("hidden");
    } else {
      document.querySelector(".scrollBtn").classList.add("hidden");
    }
  });
}
function darkLigth(btn, classDarkLigth) {
  let moon = "🌛",
    sun = "🌞";
  let $darkBtn = document.querySelector(btn);

  const ligthMode = () => {
    document.querySelectorAll("[data-dark]").forEach((el) => {
      el.classList.remove(classDarkLigth);
    });
    $darkBtn.textContent = moon;
    localStorage.setItem("theme", "light");
  };

  const darkMode = () => {
    document.querySelectorAll("[data-dark]").forEach((el) => {
      el.classList.add(classDarkLigth);
    });
    $darkBtn.textContent = sun;
    localStorage.setItem("theme", "dark");
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      if ($darkBtn.textContent === moon) {
        darkMode();
      } else ligthMode();
    }
  });
}
function filtroBusqueda(input) {
  let $selector = document.querySelectorAll(".card");

  document.addEventListener("keyup", (e) => {
    if (e.target.matches(input)) {
      console.log(e.target);
      console.log(document.querySelectorAll(".card"));

      /*if (e.key === "Escape")
   {d.querySelector(input).value = ""; }*/

      $selector.forEach((el) =>
        el.textContent.toLowerCase().includes(e.target.value)
          ? el.classList.remove("visible")
          : el.classList.add("visible")
      );
    }
  });
}
function sorteoDigital(btn, selector, divSelector) {
  const $li = document.querySelectorAll(selector);
  const players = () => {
    let random = Math.floor(Math.random() * $li.length);
    return random;
  };
  document.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      let winner = players();
      d.querySelector(
        divSelector
      ).innerHTML = `<p><b>El ganador es ${$li[winner].textContent}</b></p>`;
    }
  });
    }
function responsiveSlider(selector) {
  const $selector = document.querySelectorAll(selector),
    $prev = document.querySelector("#prev"),
    $next = document.querySelector("#next");
  let i = 0;
  document.addEventListener("click", (e) => {
    if (e.target === $prev) {
      e.preventDefault();
      $selector[i].classList.remove("active");
      i--;
      if (i < 0) {
        i = $selector.length - 1;
      }
      $selector[i].classList.add("active");
    }
    if (e.target === $next) {
      e.preventDefault();
      $selector[i].classList.remove("active");
      i++;
      if (i >= $selector.length) {
        i = 0;
      }
      $selector[i].classList.add("active");
    }
  });
}

function automaticSlider(selector) {
  const $selector = document.querySelectorAll(selector);
  const $point = document.querySelectorAll(".point");
  let i = 0;
  setInterval(() => {
    /* $selector[i].style.transform  = "translate(100%,0)";*/
    $selector[i].classList.remove("automatic");
    $point[i].classList.remove("color");
    i++;
    if (i >= $selector.length) {
      i = 0;
    }
    $selector[i].classList.add("automatic");
    $point[i].classList.add("color");
  }, 2500);
}
function scrollSpy() {
  let $section = document.querySelectorAll("section[data-scroll-spy]");

  let cb = (entries) => {
    entries.forEach((entry) => {
      let id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        document
          .querySelector(`a[href="#${id}"][data-scroll-spy]`)
          .classList.add("spy");
      } else {
        document
          .querySelector(`a[href="#${id}"][data-scroll-spy]`)
          .classList.remove("spy");
      }
    });
  };

  let observer = new IntersectionObserver(cb, { threshold: 0.5 });
  $section.forEach((el) => observer.observe(el));
      }
function onlineOffline() {
  const online = () => {
    let $body = document.querySelector("body");
    const $div = document.createElement("div");

    if (navigator.onLine) {
      document.querySelector("#Section6 h1").textContent =
        "Conexión reestablecida";
      $div.textContent = "Conexión reestablecida";
      $div.classList.add("online");
    } else {
      document.querySelector("#Section6 h1").textContent = "Conexión perdida";
      $div.textContent = "Conexión perdida";
      $div.classList.add("offline");
    }
    document.documentElement.insertAdjacentElement("afterbegin", $div);
    setTimeout(() => {
      document.documentElement.removeChild($div);
    }, 3000);
  };
  w.addEventListener("online", online);
  w.addEventListener("offline", online);
}
function contactFormValidation() {
  const $input = d.querySelectorAll(".contact-form [required]"),
    $form = document.querySelector(".contact-form");
  $input.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    input.insertAdjacentElement("afterend", $span);
    $span.classList.add("contact-error", "none");
  });
  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      const $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;
      const expReg = new RegExp(pattern);
      console.log(pattern);
      if (pattern && $input.value !== "") {
        return !expReg.exec($input.value)
          ? d.getElementById($input.name).classList.add("isActive")
          : d.getElementById($input.name).classList.remove("isActive");
      }

      if (!pattern) {
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("isActive")
          : d.getElementById($input.name).classList.remove("isActive");
      }
    }
  });
  d.addEventListener("submit", (e) => {
    if (e.target === $form) {
      e.preventDefault();
      $form.reset();
      d.querySelector(".contact-form-loader").classList.remove("none");
      setTimeout(() => {
        d.querySelector(".contact-form-loader").classList.add("none");
        d.querySelector(".contact-form-response").classList.remove("none");
        setTimeout(() => {
          d.querySelector(".contact-form-response").classList.add("none");
        }, 3000);
      }, 3000);
    }
  });
  }
function deteccionDispositivos() {
  let ua = navigator.userAgent;

  const isMovile = {
      ios: () => ua.match(/ios/i),
      android: () => ua.match(/android/i),
      windows: () => ua.match(/windows phone/i),
      isAny: function () {
        return;
        this.ios() || this.android() || this.windows();
      }
    },
    isDesktop = {
      windows: () => ua.match(/windows/i),
      linux: () => ua.match(/linux/i),
      macos: () => ua.match(/macos/i),
      isAny: function () {
        return;
        this.windows() || this.linux() || this.macos();
      }
    };
  if (isMovile.android()) {
    console.log(ua);
    d.getElementById(
      "useragent"
    ).innerHTML = `<p><mark>Este contenido solo se ve en ${ua}</mark></p>`;
  }
}
function showPokemon(urlPokemon) {
  
  fetch(urlPokemon)
    .then((res) => (res.ok ? res.json() : Promise.reject("Ocurrió un error")))
    .then((json) => {
      next = json.next;
      previous = json.previous;

      if (next === null) d.querySelector("#btn-2").style.display = "none";
      else d.querySelector("#btn-2").style.display = "inline-block";

      if (previous === null) d.querySelector("#btn-2").style.display = "none";
      else d.querySelector("#btn-2").style.display = "inline-block";

      json.results.forEach((json) => {
        fetch(json.url)
          .then((res) => res.json())
          .then((json) => {
            //console.log(json);
            const $img = document.createElement("img");
            $img.src = json.sprites.front_shiny;
            $img.alt = json.name;
            $fragment.appendChild($img);
            
            //console.log(json.name);
          });
        
      });
    $div.innerHTML=$fragment;
    })
    .catch((err) => {
      console.log(err);
    });
      }
function helpHttp() {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "aplication/json"
    };

    const controller = new AbortController();

    options.signal = controller.signal;

    options.method = options.method || "GET";

    options.header = options.header
      ? { ...defaultHeader, ...options.header }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;

    if (!options.body) delete options.body;

    setTimeout(() => {
      controller.abort();
    }, 3000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: "00",

              status: res.status,

              statusText: res.statusText || "Ocurrió un error"
            })
      )

      .catch((err) => err);
  };
  const get = (endpoint, options = {}) => customFetch(endpoint, options);

  const post = (endpoint, options = {}) => {
    options.method = "post";

    return customFetch(endpoint, options);
  };

  const put = (endpoint, options = {}) => {
    options.method = "put";

    return customFetch(endpoint, options);
  };

  const del = (endpoint, options = {}) => {
    options.method = "del";

    return customFetch(endpoint, options);
  };

  return {
    get,
    post,
    put,
    del
  };
    }
function searchSongs() {
  const fetchData = async (artist, song) => {
    let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    let artistUrl = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
    let coverBook = `https://openlibrary.org/search.json?q=the+lord+of+the+rings`;

    const [artistRes, songRes, coverRes] = await Promise.all([
      helpHttp().get(artistUrl),
      helpHttp().get(songUrl),
      helpHttp().get(coverBook, {
        method: "GET",
        headers: { "User-Agent": "MyApp/1.0 (osvanybreffbuzon@gmail.com)" }
      })
    ]);

    d.querySelector("#nombre").textContent = artistRes.status;

    d.querySelector("#lyric").textContent = songRes.lyrics;
    d.querySelector("#sound-cloud").textContent = coverRes;
  };
  const $form = d.getElementById("form");
  d.addEventListener("submit", (e) => {
    if (e.target === $form) {
      e.preventDefault();
      if ($form.artist.value === "" || $form.song.value === "") {
        alert("datos incompletos");
        return;
      } else fetchData($form.artist.value, $form.song.value);
    }
  });
}
searchSongs();
showPokemon(pokemon);
deteccionDispositivos();
contactFormValidation();
onlineOffline();
scrollSpy();
//automaticSlider(".sliderSlide");
//responsiveSlider(".sliderSlide");
filtroBusqueda(".filter");
darkLigth(".darkModeBtn", "classDark");
scrollBtn();
get_data();
geolocalizacion();
sorteoDigital(".winnerBtn", ".player", "#sort");
