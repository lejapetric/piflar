// api/utils/eposta.js
// Pošiljanje e-pošte prek Resend (https://resend.com), brez dodatnih knjižnic.
// Brez RESEND_API_KEY se e-pošta ne pošlje, povezava se izpiše v konzolo strežnika
// (za preizkus na svojem računalniku).

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Zadnje poslano sporočilo (za teste)
export let zadnjaEposta = null;

export async function posljiEposto({ za, zadeva, html, besedilo }) {
  zadnjaEposta = { za, zadeva, html, besedilo };
  const kljuc = process.env.RESEND_API_KEY;
  if (!kljuc) {
    if (process.env.NODE_ENV !== "test")
      console.warn(`RESEND_API_KEY ni nastavljen, e-pošta za ${za} ni poslana:\n${besedilo}`);
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${kljuc}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EPOSTA_POSILJATELJ || "Piflar.si <onboarding@resend.dev>",
      to: [za],
      subject: zadeva,
      html,
      text: besedilo,
    }),
  });
  if (!res.ok) throw new Error(`Pošiljanje e-pošte ni uspelo (${res.status}): ${await res.text()}`);
  return true;
}

export function posljiPotrditev(uporabnik, povezava) {
  const ime = escape(uporabnik.ime);
  return posljiEposto({
    za: uporabnik.email,
    zadeva: "Potrdi svoj e-naslov | Piflar.si",
    besedilo: `Živjo ${uporabnik.ime}!\n\nZa potrditev e-naslova in prijavo na Piflar.si odpri povezavo:\n${povezava}\n\nPovezava velja 24 ur. Če se nisi registriral(a), to sporočilo prezri.`,
    html: `<!doctype html><html lang="sl"><body style="margin:0;background:#F7F8FB;font-family:Inter,Arial,sans-serif;color:#171A2E">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#FFFFFF;border:1px solid #E7E9F2;border-radius:16px;padding:32px">
<tr><td style="font-size:20px;font-weight:700;padding-bottom:24px">Piflar<span style="color:#4F46E5">.</span>si</td></tr>
<tr><td style="font-size:16px;line-height:1.55;padding-bottom:24px">Živjo ${ime}!<br><br>Hvala za registracijo. Za potrditev e-naslova in prijavo klikni na gumb.</td></tr>
<tr><td style="padding-bottom:24px"><a href="${escape(povezava)}" style="display:inline-block;background:#4F46E5;color:#FFFFFF;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:10px">Potrdi e-naslov</a></td></tr>
<tr><td style="font-size:13px;line-height:1.5;color:#5B6178">Povezava velja 24 ur. Če gumb ne deluje, odpri:<br><a href="${escape(povezava)}" style="color:#4F46E5;word-break:break-all">${escape(povezava)}</a><br><br>Če se nisi registriral(a), to sporočilo prezri.</td></tr>
</table></td></tr></table></body></html>`,
  });
}
