//Copyright (C) 2023 ading2210
//see README.md for more information

//this script mainly just serves to load the rest of the program

var mirrors = ["https://CopperMusic.vercel.app"];

async function try_mirror(mirror) {
  let r = await fetch(mirror + "/open.js");
  let script = await r.text();
  window.base_url = mirror;
  eval(script);
}
