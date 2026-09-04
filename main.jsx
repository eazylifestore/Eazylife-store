import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {Home,ShoppingBag,CalendarCheck,Target,WalletCards,UserCircle,Search, Bell,Plus,ArrowUpRight,ArrowDownLeft,Clock3,Heart,ShoppingCart,ChevronRight,CheckCircle2,Zap,Wifi,Lightbulb, Tv, MoreHorizontal, Menu, X, CreditCard, Store as StoreIcon, BarChart3, Package, Settings, Star} from "lucide-react";
import "./styles.css";

const products=[
 {id:1,name:"Samsung Galaxy S24 Ultra",desc:"256GB | 12GB RAM",price:720000,daily:12000,monthly:170000,seller:"Ezone Global",rating:4.8,cat:"Phones"},
 {id:2,name:"HP Pavilion 15 Laptop",desc:"Intel Core i5 | 8GB RAM | 512GB SSD",price:350000,daily:5800,monthly:85000,seller:"LapTech Store",rating:4.6,cat:"Laptops"},
 {id:3,name:"Apple AirPods Pro 2",desc:"USB-C",price:120000,daily:2000,monthly:28000,seller:"Gadget World",rating:4.7,cat:"Audio"},
 {id:4,name:"iPhone 15 Pro Max",desc:"256GB | Titanium Black",price:600000,daily:10000,monthly:150000,seller:"Ezone Global",rating:4.9,cat:"Phones"}
];
const money=n=>"₦"+Number(n).toLocaleString();
const nav=[["home","Home",Home],["store","Store",ShoppingBag],["pay","Pay Small",CalendarCheck],["savings","Savings",Target],["wallet","Wallet",WalletCards],["market","Marketplace",StoreIcon],["account","Account",UserCircle]];

function App(){
 const [page,setPage]=useState("home"),[selected,setSelected]=useState(null),[plan,setPlan]=useState("daily"),[cart,setCart]=useState([]),[balance,setBalance]=useState(128450),[search,setSearch]=useState(""),[menu,setMenu]=useState(false);
 const go=p=>{setPage(p);setSelected(null);setMenu(false)};
 const buy=p=>{setSelected(p);setPage("product")};
 return <div className="app">
  <header><div className="brand" onClick={()=>go("home")}><span className="logo">E</span><b>Easylife <i>Store</i></b></div><div className="desktopNav">{nav.slice(0,6).map(([id,l,I])=><button className={page===id?"active":""} onClick={()=>go(id)} key={id}><I size={18}/>{l}</button>)}</div><button className="iconBtn"><Bell size={20}/><em>3</em></button><button className="mobileMenu iconBtn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
  {menu&&<div className="mobileNav">{nav.map(([id,l,I])=><button className={page===id?"active":""} onClick={()=>go(id)} key={id}><I size={19}/>{l}</button>)}</div>}
  <main>{page==="home"&&<HomePage balance={balance} go={go} buy={buy}/>}
   {page==="store"&&<StorePage products={products} search={search} setSearch={setSearch} buy={buy} cart={cart}/>}
   {page==="product"&&selected&&<Product p={selected} onPlan={()=>setPage("pay")} add={()=>setCart([...cart,selected])}/>}
   {page==="pay"&&<PayPage p={selected||products[3]} plan={plan} setPlan={setPlan} balance={balance} setBalance={setBalance}/>}
   {page==="savings"&&<Savings balance={balance} setBalance={setBalance}/>}
   {page==="wallet"&&<Wallet balance={balance}/>}
   {page==="market"&&<Marketplace/>}
   {page==="account"&&<Account/>}
  </main>
  <footer>{nav.map(([id,l,I])=><button className={page===id?"active":""} onClick={()=>go(id)} key={id}><I size={19}/><span>{l}</span></button>)}</footer>
 </div>
}

function HomePage({balance,go,buy}){
 return <><section className="heroHead"><div><p className="muted">Welcome back!</p><h1>Hi, Kamal 👋</h1><p>Shop, save and pay small small.</p></div><div className="avatar">K</div></section>
 <section className="balance"><div><span>Easylife Wallet</span><h2>{money(balance)} <small>◉</small></h2></div><button onClick={()=>go("wallet")}><Plus/> Fund Wallet</button></section>
 <div className="actions">{[["Add Money",Plus],["Transfer",ArrowUpRight],["Withdraw",ArrowDownLeft],["History",Clock3]].map(([x,I])=><button key={x}><I/><span>{x}</span></button>)}</div>
 <Section title="Shortcuts" more={()=>go("wallet")}><div className="shortcuts">{[["Airtime",Zap],["Data",Wifi],["Electricity",Lightbulb],["TV",Tv],["More",MoreHorizontal]].map(([x,I])=><button key={x}><span className="shortcut"><I/></span>{x}</button>)}</div></Section>
 <div className="promo"><div><b>PAY SMALL SMALL</b><h2>GET YOUR GADGET<br/>TODAY!</h2><button onClick={()=>go("store")}>Shop Now <ChevronRight/></button></div><div className="gadgets">📱 💻 🎧</div></div>
 <Section title="Popular Categories" more={()=>go("store")}><div className="cats">{["Phones","Laptops","TVs","Audio","Watches"].map(x=><button onClick={()=>go("store")} key={x}><div className="catImg">▣</div>{x}</button>)}</div></Section>
 <Section title="Recommended for you" more={()=>go("store")}><div className="productGrid">{products.slice(0,3).map(p=><ProductCard p={p} buy={()=>buy(p)} key={p.id}/>)}</div></Section>
 </>}
function Section({title,more,children}){return <section className="section"><div className="sectionTitle"><h3>{title}</h3><button onClick={more}>See all <ChevronRight size={15}/></button></div>{children}</section>}
function ProductCard({p,buy}){return <article className="productCard"><div className="prodPic">📱</div><button className="heart"><Heart size={17}/></button><small className="pill">Pay Small Small</small><h4>{p.name}</h4><p>{p.desc}</p><strong>{money(p.price)}</strong><div className="terms">Daily: {money(p.daily)} · Monthly: {money(p.monthly)}</div><div className="rating">★ {p.rating} · {p.seller}</div><button className="primary full" onClick={buy}>View Product</button></article>}
function StorePage({products,search,setSearch,buy,cart}){let list=products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));return <><div className="pageTitle"><div><h1>Store</h1><p>Find gadgets from trusted sellers.</p></div><div className="cart"><ShoppingCart/> <b>{cart.length}</b></div></div><div className="search"><Search/><input placeholder="Search for gadgets, brands..." value={search} onChange={e=>setSearch(e.target.value)}/></div><div className="promo compact"><div><b>AMAZING GADGETS</b><h2>Top Brands. Best Prices.</h2><button>Shop Now</button></div><div>📱 💻 🎧 ⌚</div></div><div className="filters">{["All","Phones","Laptops","TVs","Audio"].map(x=><button key={x}>{x}</button>)}</div><div className="productGrid">{list.map(p=><ProductCard p={p} buy={()=>buy(p)} key={p.id}/>)}</div></>}
function Product({p,onPlan,add}){return <><button className="back" onClick={()=>history.back()}>← Back</button><div className="productDetail"><div className="bigPic">📱</div><div><span className="pill">Pay Small Small · Available</span><h1>{p.name}</h1><p>{p.desc}</p><div className="rating">★ {p.rating} (128 reviews) · {p.seller} ✓</div><h2 className="green">{money(p.price)}</h2><h3>About this item</h3><ul><li>Premium high-performance device</li><li>Fast and reliable everyday performance</li><li>Modern design and quality build</li><li>Warranty subject to seller terms</li></ul><div className="detailBtns"><button onClick={add}><ShoppingCart/> Add to cart</button><button className="primary" onClick={()=>alert("Demo order created")}>Buy Now</button><button onClick={onPlan}>Pay Small Small</button></div></div></div></>}
function PayPage({p,plan,setPlan}){return <><button className="back">← Pay Small Small</button><div className="payBox"><h1>Choose a payment plan</h1><p>{p.name} · {money(p.price)}</p><div className="plans">{[["daily","Daily Plan",10000,"60 Days"],["weekly","Weekly Plan",70000,"9 Weeks"],["monthly","Monthly Plan",150000,"4 Months"]].map(([id,n,v,t])=><button className={plan===id?"selected":""} onClick={()=>setPlan(id)} key={id}><b>{n}</b><span>Pay {money(v)} per {id==="daily"?"day":id==="weekly"?"week":"month"}</span><small>{t} · {money(v)}</small>{plan===id&&<CheckCircle2/>}</button>)}</div><div className="summary"><span>You will pay</span><b>{money(p.price)}</b><p>Service fee <span>₦0</span></p><p>Total amount <b>{money(p.price)}</b></p></div><button className="primary full" onClick={()=>alert("Demo payment plan started")}>Continue</button></div></>}
function Savings({balance,setBalance}){let saved=320000,target=800000;return <><div className="pageTitle"><div><h1>Savings</h1><p>Build savings and reach your goals.</p></div><Target/></div><div className="saveCard"><h2>My New Laptop</h2><p>Target Amount</p><strong>{money(target)}</strong><div className="progress"><i style={{width:"40%"}}/></div><p>Saved: {money(saved)} · 40%</p><p>Time left: 5 months</p></div><div className="section"><h3>Contribute</h3><div className="contrib">{[1000,5000,10000].map(x=><button key={x} onClick={()=>setBalance(balance-x)}>{money(x)}</button>)}</div><button className="primary full" onClick={()=>alert("Savings contribution recorded in demo")}>Save Now</button></div><Section title="Savings Activity"><div className="list">{["18 May 2024 · ₦5,000","15 May 2024 · ₦10,000","12 May 2024 · ₦2,000"].map(x=><div key={x}><CheckCircle2/> {x}</div>)}</div></Section></>}
function Wallet({balance}){return <><div className="pageTitle"><div><h1>Wallet</h1><p>Manage your Easylife balance.</p></div><WalletCards/></div><div className="walletBig"><span>Wallet Balance</span><h1>{money(balance)}</h1><p>Demo account · •••• 8901</p><div className="actions"><button><Plus/>Add Money</button><button><ArrowUpRight/>Transfer</button><button><ArrowDownLeft/>Withdraw</button><button><Clock3/>History</button></div></div><Section title="Recent Transactions"><div className="list"><div>📱 Airtime Purchase <b>- ₦1,000</b></div><div>↗ Transfer to Aliyu <b>- ₦10,000</b></div><div>＋ Wallet Funding <b>+ ₦20,000</b></div></div></Section></>}
function Marketplace(){return <><div className="pageTitle"><div><h1>Marketplace</h1><p>Connect buyers and sellers.</p></div><StoreIcon/></div><div className="search"><Search/><input placeholder="Search products or sellers..."/></div><div className="sellerList">{[["Ezone Global","4.8 (230)","Lagos"],["Gadget World","4.7 (189)","Abuja"],["LapTech Store","4.6 (145)","Port Harcourt"],["Best Electronics","4.5 (120)","Kano"]].map(x=><div className="seller" key={x[0]}><div className="avatar">{x[0][0]}</div><div><b>{x[0]}</b><p>★ {x[1]} · {x[2]}</p></div><button>Follow</button></div>)}</div><button className="primary full">Sell on Easylife</button></>}
function Account(){return <><div className="pageTitle"><div><h1>Account</h1><p>Profile, security and settings.</p></div><UserCircle/></div><div className="account"><div className="avatar large">K</div><h2>Kamal</h2><p>Customer account</p>{["Personal Information","Security & PIN","Notifications","Help & Support","Settings"].map(x=><button key={x}>{x}<ChevronRight/></button>)}</div></>}
createRoot(document.getElementById("root")).render(<App/>);
