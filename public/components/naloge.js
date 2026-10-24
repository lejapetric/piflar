// public/components/naloge.js
// Interaktivne naloge: <div id="naloge" data-poglavje="mnozice" data-math></div>
// Naloge pridejo iz /api/naloge, odgovor preveri strežnik, postopek se naloži na zahtevo.

const container = document.getElementById("naloge");

// Formule v vsebini, ki je bila dodana po nalaganju strani
function typeset(el) {
  const mj = window.MathJax;
  if (mj?.typesetPromise) mj.startup.promise.then(() => mj.typesetPromise([el])).catch(console.error);
  // Sicer se MathJax še nalaga in bo ob zagonu obdelal celo stran.
}

async function api(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Napaka na strežniku.");
  return data;
}

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function renderNaloga(naloga, i) {
  const card = el("article", "naloga");
  card.id = naloga.id;

  card.append(el("h3", "naloga-naslov", `Naloga ${i + 1}`));
  card.append(el("div", "naloga-besedilo", naloga.besedilo));

  const form = el("form", "naloga-odgovor");
  const inputId = `odgovor-${naloga.id}`;
  form.innerHTML = `
    <label for="${inputId}">Tvoj odgovor</label>
    <div class="naloga-vnos">
      <input id="${inputId}" name="odgovor" type="text" autocomplete="off" required maxlength="200">
      <button type="submit" class="btn btn-primary">Preveri</button>
    </div>`;
  if (naloga.namig) form.append(el("small", "naloga-namig", naloga.namig));
  card.append(form);

  const status = el("p", "naloga-status");
  status.setAttribute("role", "status");
  card.append(status);

  const actions = el("div", "naloga-akcije");
  const btnPostopek = el("button", "btn btn-secondary", "Pokaži postopek");
  btnPostopek.type = "button";
  actions.append(btnPostopek);
  card.append(actions);

  const postopek = el("div", "naloga-postopek");
  postopek.hidden = true;
  card.append(postopek);

  if (naloga.povezave?.length) {
    const links = el("div", "naloga-povezave");
    links.append(el("span", "", "Ne veš, kako začeti? Preberi razlago:"));
    for (const p of naloga.povezave) {
      const a = el("a");
      a.href = p.url;
      a.textContent = p.naslov;
      links.append(a);
    }
    card.append(links);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const odgovor = form.elements.odgovor.value;
    status.className = "naloga-status";
    status.textContent = "Preverjam …";
    try {
      const { pravilno } = await api(`/api/naloge/${encodeURIComponent(naloga.id)}/odgovor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ odgovor }),
      });
      status.classList.add(pravilno ? "pravilno" : "napacno");
      status.textContent = pravilno
        ? "Pravilno! 🎉"
        : "Žal ni pravilno. Poskusi znova ali si oglej postopek.";
    } catch (err) {
      status.classList.add("napacno");
      status.textContent = err.message;
    }
  });

  btnPostopek.addEventListener("click", async () => {
    if (!postopek.hidden) {
      postopek.hidden = true;
      btnPostopek.textContent = "Pokaži postopek";
      return;
    }
    if (!postopek.hasChildNodes()) {
      try {
        const data = await api(`/api/naloge/${encodeURIComponent(naloga.id)}/postopek`);
        postopek.innerHTML = `<h4>Postopek</h4>${data.postopek}<p class="naloga-rezultat"><strong>Rezultat:</strong> ${data.rezultat}</p>`;
        typeset(postopek);
      } catch (err) {
        status.className = "naloga-status napacno";
        status.textContent = err.message;
        return;
      }
    }
    postopek.hidden = false;
    btnPostopek.textContent = "Skrij postopek";
  });

  return card;
}

async function init() {
  if (!container) return;
  const { poglavje } = container.dataset;
  try {
    const naloge = await api(`/api/naloge?poglavje=${encodeURIComponent(poglavje)}`);
    container.replaceChildren(...naloge.map(renderNaloga));
    if (!naloge.length) container.textContent = "Naloge za to poglavje so še v pripravi.";
    typeset(container);
  } catch (err) {
    container.textContent = `Nalog ni bilo mogoče naložiti: ${err.message}`;
  }
}

init();
