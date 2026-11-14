/* ============================================================
   EDIT THIS FILE to add or remove things on your page.
   Each item is one block { ... }, separated by commas.
   Delete a block to remove it. Copy a block to add another.

   SOUNDCLOUD EMBED CODE:
   On SoundCloud open the track > Share > Embed tab > Copy the code.
   Paste it between the two backticks ` ` like in the examples.
   (Backticks are the key left of the 1 on most keyboards.)
   ============================================================ */

/* 1. BEFORE/AFTER SAMPLES */
const SAMPLES = [
  /* Example - remove the comment marks and paste your codes:
  {
    title:  "Song name - Artist",
    detail: "Hip hop | Mix and master",
    before: `PASTE SOUNDCLOUD EMBED CODE FOR THE BEFORE`,
    after:  `PASTE SOUNDCLOUD EMBED CODE FOR THE AFTER`
  },
  */
 {
    title:  "Example 1",
    detail: "Metal | Mixing",
    embed:  `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2438247084%3Fsecret_token%3Ds-5EF0L5vQKqP&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/cha-sa-raser" title="MeatMuncher_0603" target="_blank" style="color: #cccccc; text-decoration: none;">MeatMuncher_0603</a> · <a href="https://soundcloud.com/cha-sa-raser/mix-1/s-5EF0L5vQKqP" title="Mix 1" target="_blank" style="color: #cccccc; text-decoration: none;">Mix 1</a></div>`
  },
];

/* 2. SINGLE TRACKS (one player, no before/after) */
const SINGLES = [
  /* Example - remove the comment marks and paste your code:
  {
    title:  "Song name - Artist",
    detail: "Pop | Mastering",
    embed:  `PASTE SOUNDCLOUD EMBED CODE`
  },
  */
 {
    title:  "Example 1",
    detail: "J-Rock | Full Production",
    embed:  `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2438190279%3Fsecret_token%3Ds-dsxiVlrFXss&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/cha-sa-raser" title="cha sa (raser)" target="_blank" style="color: #cccccc; text-decoration: none;">cha sa (raser)</a> · <a href="https://soundcloud.com/cha-sa-raser/commision-1/s-dsxiVlrFXss" title="Commision 1" target="_blank" style="color: #cccccc; text-decoration: none;">Commision 1</a></div>`
  },
];

/* 3. PICTURES (put image files in an "images" folder next to Main.html) */
const PICTURES = [
  /* { src: "images/studio.jpg", alt: "My studio setup" }, */
];

/* 4. LINKS (contact buttons) */
const LINKS = [
  { label: "Email me",  url: "mailto:peemaireverse@gmail.com" },
  { label: "Instagram", url: "https://www.instagram.com/meatmuncher_0603" },
  { label: "X", url: "https://x.com/raserflp" },
  { label: "Discord", url: "https://discord.com/users/445168877614268427" },
];

/* ------------------ Nothing to edit below ------------------ */

/* Takes the SoundCloud embed code, keeps only the player address
   and height, and builds a clean iframe from it. */
function player(code){
  code = String(code || "");
  const found = code.match(/src=["']([^"']+)["']/);
  let src = (found ? found[1] : code.trim()).replace(/&amp;/g, "&");
  if (!src.startsWith("https://w.soundcloud.com/player/")){
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "Paste the SoundCloud embed code (Share > Embed) in the embed: field.";
    return p;
  }
  try {
    const u = new URL(src);
    u.searchParams.set("color", "#C3A98F");
    src = u.toString();
  } catch (e) {}
  const height = (code.match(/height=["']?(\d+)/) || [null, "166"])[1];
  const f = document.createElement("iframe");
  f.src = src;
  f.style.height = height + "px";
  f.loading = "lazy";
  f.allow = "autoplay";
  f.title = "SoundCloud player";
  return f;
}
function head(s){
  const d = document.createElement("div"); d.className = "sample-head";
  const h = document.createElement("h3"); h.textContent = s.title || "";
  const m = document.createElement("span"); m.textContent = s.detail || "";
  d.append(h, m); return d;
}

/* Fills one list with single-player cards */
function fill(list, items, emptyText){
  if (items.length === 0){
    list.innerHTML = '<p class="empty">' + emptyText + '</p>';
    return;
  }
  items.forEach(s => {
    const box = document.createElement("article"); box.className = "single";
    box.append(head(s), player(s.embed)); list.append(box);
  });
}

/* Mix and master list */
fill(document.getElementById("sample-list"), SAMPLES, "Add your first mix or master in embeds.js.");

/* Composing list (section stays hidden until it has a track) */
if (SINGLES.length){
  document.getElementById("singles").hidden = false;
  fill(document.getElementById("single-list"), SINGLES, "");
}

if (PICTURES.length){
  document.getElementById("gallery").hidden = false;
  const list = document.getElementById("picture-list");
  PICTURES.forEach(p => {
    const i = document.createElement("img");
    i.src = p.src; i.alt = p.alt || ""; i.loading = "lazy"; list.append(i);
  });
}

const linkList = document.getElementById("link-list");
LINKS.forEach(l => {
  const li = document.createElement("li"), a = document.createElement("a");
  a.href = l.url; a.textContent = l.label;
  if (!l.url.startsWith("mailto:")){ a.target = "_blank"; a.rel = "noopener"; }
  li.append(a); linkList.append(li);
});