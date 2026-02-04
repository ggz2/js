var mirrors = ["https://edpuzzle.hs.vc"];

async function try_mirror(mirror) {
  let r = await fetch(mirror + "/open.js");
  let script = await r.text();
  window.base_url = mirror;
  eval(script);
}
