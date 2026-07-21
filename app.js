"use strict";
const products=[
{id:1,name:"Specialized Demo race",category:"Bicicletas",price:5990000,detail:"DH · Aro 29-27,5 · 7 velocidades",image:"https://specializedperu.com/cdn/shop/files/94525-73_DEMO-RACE-TPE-BLK-BRSH_HERO-PDP.jpg?v=1739121033"},
{id:2,name:"GT LABOMBA",category:"Bicicletas",price:475000,detail:"DIRT · Aro 26 · Aluminio",image:"https://gtbicycles.com/cdn/shop/files/G24_G23044U_24_LaBomba_BLK_PD.jpg?v=1726069600&width=1150"},
{id:3,name:"COMMENCAL 365",category:"Bicicletas",price:3990000,detail:"GRAVEL · Cuadro 2.8 kg",image:"https://www.commencal.com/dw/image/v2/BFNN_PRD/on/demandware.static/-/Sites-commencal-master/default/dw11bce218/images/22G365SG_2000-rescale.jpg?q=70"},
{id:4,name:"Shimano XTR Di2",category:"Repuestos",price:1190000,detail:"Piñón, bielas, cadena y volante",image:"https://www.recambiosanchez.com/4428-large_default/grupo-completo-xtr-di2-m9200-1x12v.jpg"},
{id:6,name:"Casco FOX New Proframe Negro",category:"Accesorios",price:220990,detail:"Protección certificada · Ajustable",image:"https://bequick.cl/cdn/shop/files/open-uri20230905-4522-7du7hd_1800x1800_30d994a5-0a8b-486f-944c-d711b2b489be_5000x.webp?v=1701289364"},
{id:7,name:"Santa Cruz Bronson",category:"Bicicletas",price:5490000,detail:"MTB · Aro 29 · Doble suspensión",image:"https://themountainbiker.com.au/cdn/shop/files/25SCBronsonPink.png?v=1732143012&width=1445"},
{id:8,name:" Scott Ransom 920",category:"Bicicletas",price:4200000,detail:"ENDURO · Aro 29 · 12 velocidades",image:"https://www.fauconbikes.cl/cdn/shop/files/imgi_89_293026_2030126_4.png?v=1751992814"},
{id:9,name:"Commencal FRS ROCKSHOX",category:"Bicicletas",price:5359000,detail:"DH · Doble suspensión · ROCKSHOX Boxxer Ultimate, 200 mm",image:"https://www.commencal.com/dw/image/v2/BFNN_PRD/on/demandware.static/-/Sites-commencal-master/default/dw40c452e7/images/BT5FRSRSEU1.jpg?sw=800&sh=480"},
{id:10,name:"COMMENCAL CLASH SIGNATURE",category:"Bicicletas",price:5100000,detail:"ENDURO · Aro 27,5 · Horquilla FOX 38 Factory",image:"https://www.commencal.com/dw/image/v2/BFNN_PRD/on/demandware.static/-/Sites-commencal-master/default/dw76d90982/images/23CLASHSG.jpg?q=70"},
{id:11,name:"MAZA HOPE HG PRO 4 REAR 12X150 32H ORANGE",category:"Repuestos",price:279900,detail:"Maza trasera · Convertible a 12x157mm usando punteras HUB242",image:"https://dojiw2m9tvv09.cloudfront.net/79312/product/captura-de-pantalla-2023-08-09-1559561470.png"},
{id:12,name:"Manubrio Fatbar 800x35mm Rise 20 Carbono",category:"Repuestos",price:122990,detail:"Peso ligero · Carbono",image:"https://cdn.exz.cl/product/M/M1767/web/M1767-1684251031245.jpg"},
{id:13,name:"PEDALES SHIMANO 9100",category:"Repuestos",price:229990,detail:"Ligero, 310 g (11 oz) por par · Eje más fino",image:"https://kamikazebikes.com.ar/wp-content/uploads/10617A-A.jpg"},
{id:15,name:"Guantes Fox Racing",category:"Accesorios",price:24990,detail:"Palma reforzada · Cierre de velcro en la muñeca",image:"https://media.onvelocycling.com/product/guantes-fox-racing-trek-ranger-mtb-800x800.jpg?width=1200"},
{id:16,name:"Antiparra Oakley ",category:"Accesorios",price:34990,detail:"Resistencia a altos impactos · Tamaño Unico",image:"https://www.ebest.cl/media/catalog/product/cache/336bfee9e59a64103d1f594806f63945/o/a/oakley-crossbrille-goggle-airbrake-mtb-1.jpg"},
{id:17,name:"Portabicicleta Pick Up Pad Taigate Kugan L",category:"Accesorios",price:79990,detail:"Tela soft interna · Este pad incluye 6 amarres de velcro",image:"https://crossmountain.cl/cdn/shop/files/portabicicleta-pick-up-pad-taigate-kugan-l_21481.jpg?v=1754599954"},
{id:18,name:"Medidor de presión de neumáticos Maxxis",category:"Accesorios",price:45990,detail:"Hasta 250 PSI o 17 bar · La pantalla LCD se puede programar para mostrar PSI, Bar o KG/cm2",image:"https://t-bikes.cl/wp-content/uploads/2023/11/t700_x1_842b74070267b23804ccd8abcdaca760_5000x.jpg"}
];
const money=new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0});
let currentFilter="Todos";
let cart=JSON.parse(localStorage.getItem("massiveBikeCart")||"[]");
const grid=document.querySelector("#product-grid"),search=document.querySelector("#search"),cartPanel=document.querySelector("#carrito"),overlay=document.querySelector("#overlay");

function renderProducts(){
 const term=search.value.trim().toLowerCase();
 const visible=products.filter(p=>(currentFilter==="Todos"||p.category===currentFilter)&&`${p.name} ${p.detail}`.toLowerCase().includes(term));
 grid.innerHTML=visible.length?visible.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-body"><span class="tag">${p.category}</span><h3>${p.name}</h3><p class="product-meta">${p.detail}</p><div class="product-bottom"><strong class="price">${money.format(p.price)}</strong><button class="button primary add" type="button" data-id="${p.id}">Agregar</button></div></div></article>`).join(""):`<p class="empty">No encontramos productos con esa búsqueda.</p>`;
}
function saveAndRenderCart(){
 localStorage.setItem("massiveBikeCart",JSON.stringify(cart));
 document.querySelector("#cart-count").textContent=cart.length;
 document.querySelector("#cart-items").innerHTML=cart.length?cart.map((item,index)=>`<div class="cart-item"><img src="${item.image}" alt="${item.name}"><div class="cart-item-info"><strong>${item.name}</strong><p>${item.detail}</p><span>${money.format(item.price)}</span></div><button class="remove" type="button" data-index="${index}" aria-label="Quitar ${item.name} del carrito">Quitar</button></div>`).join(""):`<p class="empty">Tu carrito está vacío.</p>`;
 document.querySelector("#cart-total").textContent=money.format(cart.reduce((sum,item)=>sum+item.price,0));
}
function toggleCart(open){cartPanel.classList.toggle("open",open);cartPanel.setAttribute("aria-hidden",String(!open));document.querySelector(".cart-button").setAttribute("aria-expanded",String(open));overlay.hidden=!open;if(open)document.querySelector("#close-cart").focus()}
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");button.classList.add("active");currentFilter=button.dataset.filter;renderProducts()}));
search.addEventListener("input",renderProducts);
grid.addEventListener("click",event=>{const button=event.target.closest(".add");if(!button)return;cart.push(products.find(p=>p.id===Number(button.dataset.id)));saveAndRenderCart();toggleCart(true)});
document.querySelector("#cart-items").addEventListener("click",event=>{const button=event.target.closest(".remove");if(!button)return;cart.splice(Number(button.dataset.index),1);saveAndRenderCart()});
document.querySelector(".cart-button").addEventListener("click",()=>toggleCart(true));document.querySelector("#close-cart").addEventListener("click",()=>toggleCart(false));overlay.addEventListener("click",()=>toggleCart(false));
document.addEventListener("keydown",event=>{if(event.key==="Escape")toggleCart(false)});
document.querySelector("#checkout").addEventListener("click",()=>{
 if(!cart.length){document.querySelector("#cart-message").textContent="Agrega un producto antes de continuar.";return}
 document.querySelector("#cart-message").textContent="";
 toggleCart(false);
 document.querySelector("#success-modal").classList.add("open");
 document.querySelector("#success-modal").setAttribute("aria-hidden","false");
 document.querySelector("#success-close").focus();
 cart=[];
 saveAndRenderCart();
});
document.querySelector("#success-close").addEventListener("click",()=>{document.querySelector("#success-modal").classList.remove("open");document.querySelector("#success-modal").setAttribute("aria-hidden","true")});
document.querySelector(".menu-button").addEventListener("click",event=>{const open=document.querySelector("#menu").classList.toggle("open");event.currentTarget.setAttribute("aria-expanded",String(open))});
document.querySelectorAll("#menu a").forEach(link=>link.addEventListener("click",()=>document.querySelector("#menu").classList.remove("open")));
document.querySelector("#contact-form").addEventListener("submit",event=>{event.preventDefault();document.querySelector("#form-status").textContent="¡Gracias! Tu consulta fue registrada correctamente.";event.currentTarget.reset()});
document.querySelector("#year").textContent=new Date().getFullYear();renderProducts();saveAndRenderCart();
