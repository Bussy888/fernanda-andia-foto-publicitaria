import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import manifest from '../photos.json';
import './style.css';
import './night.css';
import './modern.css';
import { layoutRows } from './gallery-layout.js';

const collections = {a:'Tinto & carácter',b:'Rosado en flor',c:'Brillo nocturno',d:'Blanco sobre blanco',e:'Dulce tentación',f:'Joyas de la tierra'};
const categories = ['Todo', ...Object.values(collections)];
const descriptions = {
 a1:'Botella de vino tinto con fresas y flores',a2:'Vino tinto y copa con fresas',a3:'Vino y copa en una composición de estudio',a4:'Botella de vino tinto con pétalos',a5:'Vino tinto y copa sobre fondo negro',a6:'Botella de vino tinto con flores',
 b1:'Vino rosado con copa, flores y fresas',b2:'Botella de rosado y copa sobre fondo rosa',b3:'Botella de vino rosado entre flores',b4:'Botella de rosado con fresas',b5:'Composición cenital de vino rosado y pétalos',b6:'Fresa y burbujas en una copa de rosado',b7:'Copa de rosado con fresa sobre fondo rosa',
 c1:'Perfume y reloj entre humo sobre fondo negro',c2:'Perfume y reloj en luz tenue',c3:'Reloj sobre tela negra entre humo',c4:'Frasco de perfume en una composición oscura',c5:'Bodegón de perfume y reloj sobre tela negra',c6:'Joyas doradas sobre piedras oscuras',c7:'Colgante de cruz sobre carbón',c8:'Anillo con piedra clara sobre roca negra',c9:'Anillo dorado con piedras verdes',c10:'Broche de cristal sobre textura negra',c11:'Detalle de collar en una modelo',
 d1:'Composición de cerámica blanca, flores y frutas',d2:'Detalle cenital de cerámica y frutas blancas',d3:'Jarra blanca y flores en luz natural',d4:'Taza blanca sobre tela con sombras suaves',e1:'Chocolate suspendido con especias',e2:'Miel cayendo sobre una barra de chocolate',f1:'Pendientes azules sobre piedra',f2:'Colgante azul y dorado sobre piedra',f3:'Pendientes verdes en un escenario natural',f4:'Anillo verde entre hojas y flores',f5:'Pendientes dorados sobre piedra gris'
};
const photos = [...manifest].sort((a,b)=>a.source.localeCompare(b.source,'es',{numeric:true,sensitivity:'base'})).map(p => {
 const name=p.source.replace(/\.[^.]+$/, '');
 const category=collections[name.charAt(0).toLowerCase()] || 'Otras';
 return {...p, name, category, alt:descriptions[name] || 'Fotografía de producto '+name};
});
const ordered = photos;
const photoUrl = (p,small=false) => `${import.meta.env.BASE_URL}photos/${String(p.id).padStart(2,'0')}${small?'-small':''}.webp`;
function Photo({id, ...props}) { const p=photos.find(p=>p.id===id); return <img src={photoUrl(p)} alt={p.alt} width={p.width} height={p.height} {...props}/>; }

const collectionNotes = {
 a:'Contrastes intensos, frutas y un toque de drama.',
 b:'Flores, fresas y una forma fresca de ver el rosado.',
 c:'Perfumes, relojes y accesorios entre luces y sombras.',
 d:'Texturas sutiles. Luz suave. La belleza de lo simple.',
 e:'Chocolate, miel y texturas que despiertan los sentidos.',
 f:'Piedras, color y pequeños detalles con personalidad.'
};
function CollectionGallery({items, onOpen}) {
 const container = useRef(null);
 const [width, setWidth] = useState(0);
 useEffect(() => {
  const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
  observer.observe(container.current);
  return () => observer.disconnect();
 }, []);
 const rows = layoutRows(items, width);
 return <div className="collection-grid" ref={container}>{rows.map((row) => <div className="photo-row" key={row.items[0].id} style={{width:row.width, gap:row.gap}}>{row.items.map(p => <figure key={p.id} style={{flex:p.width/p.height}}><button onClick={() => onOpen(p)} style={{height:row.height}} aria-label={`Ampliar: ${p.alt}`}><img src={photoUrl(p,true)} srcSet={`${photoUrl(p,true)} 720w, ${photoUrl(p)} 1800w`} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 50vw, 40vw" width={p.width} height={p.height} alt={p.alt} loading="lazy" decoding="async"/><span className="expand" aria-hidden="true">↗</span></button><figcaption><span>{p.name.toUpperCase()}</span><span>Ver fotografía ↗</span></figcaption></figure>)}</div>)}</div>;
}

function App() {
 const [filter,setFilter]=useState('Todo');
 const [active,setActive]=useState(null);
 const [menu,setMenu]=useState(false);
 const dialog=useRef(null);
 const touch=useRef(null);
 const list=ordered.filter(p=>filter==='Todo'||p.category===filter);
 const selected=active===null?null:list[active];
 function step(direction){setActive(i=>(i+direction+list.length)%list.length);}
 useEffect(()=>{
  if(active===null)return;
  const el=dialog.current;
  const previous=document.activeElement;
  el.showModal();
  const old=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return ()=>{el.close(); document.body.style.overflow=old; previous?.focus();};
 },[active===null]);
 return <>
  <a className="skip" href="#portfolio">Saltar a las fotografías</a>
  <header><a className="wordmark" href="#" aria-label="Fernanda Andia, inicio">fernanda andia<span>FOTOGRAFÍA</span></a><button className="menu-button" aria-label="Abrir navegación" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?'Cerrar −':'Menú +'}</button><nav className={menu?'open':''} aria-label="Navegación principal">{[['Trabajo','#portfolio'],['Mi mirada','#sobre-mi'],['Hablemos ↗','#contacto']].map(([label,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}</nav></header>
  <main>
   <section className="intro" aria-labelledby="intro-title"><div className="eyebrow"><span className="dot"/> FOTOGRAFÍA PUBLICITARIA & DE PRODUCTO <span className="edition">PORTAFOLIO / 01</span></div><h1 id="intro-title">Lo cotidiano.<br/><span>Extraordinario.</span><i>↗</i></h1><div className="intro-bottom"><p>Luz, textura y una nueva forma de mirar.<br/>Imágenes que dan carácter a cada producto.</p><a className="text-link" href="#portfolio">Explorar el trabajo <span>↓</span></a></div></section>
   <section className="showcase" aria-label="Fotografías destacadas"><button className="hero-image" onClick={()=>{setFilter('Todo');setActive(0);}} aria-label="Ampliar primera fotografía"><Photo id={1} fetchPriority="high"/><span className="image-note">01 / LUZ Y CARÁCTER <b>↗</b></span></button><div className="hero-aside"><button onClick={()=>{setFilter('Todo');setActive(1);}} aria-label="Ampliar segunda fotografía"><Photo id={2} fetchPriority="high"/><span className="image-note">02 / LA ESENCIA DEL PRODUCTO <b>↗</b></span></button><div className="aside-caption"><span>UNA MIRADA, MUCHAS POSIBILIDADES</span><p>El detalle hace<br/><em>la diferencia.</em></p><span className="asterisk">✳</span></div></div></section>
   <section id="portfolio" className="portfolio"><div className="section-top"><div><span className="eyebrow">01 — TRABAJO SELECCIONADO</span><h2>Objetos con <em>presencia.</em></h2></div><p>Una selección de luz, color y composición.<br/>Cada imagen, una intención.</p></div><div className="filter-row"><div className="filters" aria-label="Filtrar fotografías">{categories.map(c=><button key={c} aria-pressed={filter===c} className={filter===c?'selected':''} onClick={()=>setFilter(c)}>{c}<sup>{c==='Todo'?photos.length:photos.filter(p=>p.category===c).length}</sup></button>)}</div><span className="count" aria-live="polite">{String(list.length).padStart(2,'0')} FOTOGRAFÍAS</span></div><div className="collection-list">{Object.entries(collections).filter(([,title])=>filter==='Todo'||filter===title).map(([key,title])=>{
 const items=list.filter(p=>p.name.startsWith(key));
 return <section className="collection" key={key} aria-labelledby={'collection-'+key}><div className="collection-heading"><div><span className="collection-index">{String(Object.keys(collections).indexOf(key)+1).padStart(2,'0')} / SERIE</span><h3 id={'collection-'+key}>{title}</h3><p>{collectionNotes[key]}</p></div><span className="collection-total">{items.length} fotografías</span></div><CollectionGallery items={items} onOpen={p=>setActive(list.findIndex(item=>item.id===p.id))}/></section>;
 })}</div></section>
   <section id="sobre-mi" className="about"><div className="about-image"><img src={`${import.meta.env.BASE_URL}mi-mirada.webp`} width={1800} height={1166} alt="Una persona en una barca entre juncos, con montañas nevadas al fondo" loading="lazy"/><span>LA BELLEZA ESTÁ EN CÓMO MIRAMOS.</span></div><div className="about-copy"><span className="eyebrow">02 — DETRÁS DE LA CÁMARA</span><h2>Soy Fernanda.<br/>Miro los detalles.<br/><em>Creo imágenes.</em></h2><p>Soy Fernanda Andia Cortez, fotógrafa y comunicadora formada en la Universidad Privada Boliviana.</p><p>Mi mirada conecta identidad, emoción y contexto. En la fotografía publicitaria y de producto, esa búsqueda se traduce en luz, texturas y composiciones que dejan hablar a cada objeto.</p><div className="specialties"><span>Producto</span><span>Publicidad</span><span>Bodegón</span></div><a className="text-link" href="https://www.linkedin.com/in/fernanda-andia-cortez-07389430a/" target="_blank" rel="noreferrer">Más sobre mi trayectoria ↗</a></div></section>
   <section id="contacto" className="contact"><span className="eyebrow">03 — CREEMOS ALGO JUNTOS</span><div><h2>Tu producto.<br/><em>Otra mirada.</em></h2><a className="contact-circle" href="https://wa.link/hkay5n" target="_blank" rel="noreferrer" aria-label="Hablemos por WhatsApp">↗</a></div><div className="contact-bottom"><p>¿Tienes un proyecto en mente?<br/>Hablemos de la imagen que quieres crear.</p><a className="text-link" href="https://wa.link/hkay5n" target="_blank" rel="noreferrer">Escríbeme por WhatsApp ↗</a></div></section>
  </main><footer><a className="wordmark" href="#">fernanda andia<span>FOTOGRAFÍA</span></a><span>© {new Date().getFullYear()} Fernanda Andia Cortez</span><a href="https://www.instagram.com/wxnter4sgard/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="#">Volver arriba ↑</a></footer>
  <dialog ref={dialog} className="lightbox" aria-label="Visor de fotografías" onCancel={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)setActive(null);}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}}>
   {selected&&<><div className="lightbox-top"><span>{selected.category} · {active+1} / {list.length}</span><button autoFocus onClick={()=>setActive(null)} aria-label="Cerrar visor">Cerrar ×</button></div><div className="lightbox-content" onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{const delta=e.changedTouches[0].clientX-touch.current;if(Math.abs(delta)>50)step(delta<0?1:-1);}}><button className="prev" onClick={()=>step(-1)} aria-label="Fotografía anterior">←</button><img src={photoUrl(selected)} alt={selected.alt}/><button className="next" onClick={()=>step(1)} aria-label="Fotografía siguiente">→</button></div><p>{selected.alt}</p></>}
  </dialog>
 </>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
