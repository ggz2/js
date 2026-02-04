/* --------------------------------------------------------------
 * loader.js – injected by the bookmarklet.
 * Shows a draggable, resizable iframe that loads https://coppermusic.vercel.app
 * -------------------------------------------------------------- */

(function(){
  // -----------------------------------------------------------------
  // 1️⃣ Avoid inserting the widget more than once on the same page
  // -----------------------------------------------------------------
  if (document.getElementById('coppermusic‑iframe‑wrapper')) return;

  // -----------------------------------------------------------------
  // 2️⃣ Build the wrapper that will hold the header + iframe
  // -----------------------------------------------------------------
  const wrapper = document.createElement('div');
  wrapper.id = 'coppermusic‑iframe‑wrapper';
  Object.assign(wrapper.style,{
    position:'fixed',
    top:'40px',
    left:'40px',
    width:'480px',
    height:'360px',
    background:'#fff',
    border:'2px solid #444',
    borderRadius:'4px',
    zIndex:2147483647,               // on‑top of everything
    boxShadow:'0 4px 12px rgba(0,0,0,.4)',
    resize:'both',
    overflow:'hidden',
    display:'flex',
    flexDirection:'column',
    fontFamily:'sans-serif',
  });

  // -----------------------------------------------------------------
  // 3️⃣ Header – drag handle + close button
  // -----------------------------------------------------------------
  const header = document.createElement('div');
  header.textContent = 'Coppermusic';
  Object.assign(header.style,{
    background:'#444',
    color:'#fff',
    padding:'4px 8px',
    cursor:'move',
    userSelect:'none',
    flexShrink:0,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    fontSize:'13px',
  });

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  Object.assign(closeBtn.style,{
    background:'transparent',
    border:'none',
    color:'#fff',
    cursor:'pointer',
    fontSize:'13px',
  });
  closeBtn.onclick = ()=>wrapper.remove();
  header.appendChild(closeBtn);
  wrapper.appendChild(header);

  // -----------------------------------------------------------------
  // 4️⃣ The iframe that loads the actual site
  // -----------------------------------------------------------------
  const iframe = document.createElement('iframe');
  iframe.src = 'https://coppermusic.vercel.app';
  iframe.style.border = '0';
  iframe.style.flexGrow = '1';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  wrapper.appendChild(iframe);

  // -----------------------------------------------------------------
  // 5️⃣ Make the wrapper draggable (by the header)
  // -----------------------------------------------------------------
  let dragging = false, offsetX = 0, offsetY = 0;
  header.addEventListener('mousedown', e=>{
    dragging = true;
    const rect = wrapper.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e=>{
    if (!dragging) return;
    wrapper.style.left = (e.clientX - offsetX) + 'px';
    wrapper.style.top  = (e.clientY - offsetY) + 'px';
  });
  document.addEventListener('mouseup',()=>dragging=false);

  // -----------------------------------------------------------------
  // 6️⃣ Insert the whole thing into the page
  // -----------------------------------------------------------------
  document.body.appendChild(wrapper);
})();
