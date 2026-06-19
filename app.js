App.js v2

/*=========================================================
    AMG MULTI-DIGITAL SERVICES
    GLOBAL APPLICATION
    Version 1.0
=========================================================*/

"use strict";

/*=========================================================
    APPLICATION
=========================================================*/

const AMG = {

    version: "1.0.0",

    appName: "AMG Multi-Digital Services",

    initialized: false

};

/*=========================================================
    DOM CACHE
=========================================================*/

const DOM = {

    body: document.body,

    html: document.documentElement,

    loader: document.querySelector(".page-loader"),

    navbar: document.querySelector(".navbar"),

    sidebar: document.querySelector(".sidebar"),

    hero: document.querySelector(".hero"),

    scrollTop: document.querySelector(".scroll-top"),

    mobileMenu: document.querySelector(".mobile-menu"),

    mobileToggle: document.querySelector(".menu-toggle"),

    dropdowns: document.querySelectorAll(".dropdown"),

    tabs: document.querySelectorAll(".tab"),

    accordion: document.querySelectorAll(".accordion-item"),

    counters: document.querySelectorAll("[data-counter]"),

    forms: document.querySelectorAll("form"),

    modals: document.querySelectorAll(".modal"),

    toastContainer: document.querySelector("#toast-container")

};

/*=========================================================
    GLOBAL STATE
=========================================================*/

const State = {

    theme: localStorage.getItem("theme") || "dark",

    sidebarOpen: false,

    loading: false,

    user: null,

    notifications: [],

    transactions: [],

    services: [],

    wallet: {

        balance:0,

        bonus:0

    }

};

/*=========================================================
    UTILITIES
=========================================================*/

const Utils = {

    id(id){

        return document.getElementById(id);

    },

    qs(selector){

        return document.querySelector(selector);

    },

    qsa(selector){

        return document.querySelectorAll(selector);

    },

    create(tag){

        return document.createElement(tag);

    },

    random(min,max){

        return Math.floor(

            Math.random() * (max-min+1)

        ) + min;

    },

    money(amount){

        return Number(amount)

        .toLocaleString(

            "en-GH",

            {

                minimumFractionDigits:2

            }

        );

    },

    delay(ms){

        return new Promise(resolve=>{

            setTimeout(resolve,ms);

        });

    },

    clamp(value,min,max){

        return Math.min(

            Math.max(value,min),

            max

        );

    },

    capitalize(text){

        return text.charAt(0)

        .toUpperCase()

        +

        text.slice(1);

    },

    copy(text){

        navigator.clipboard.writeText(text);

    },

    storageSet(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    storageGet(key){

        const value=

        localStorage.getItem(key);

        if(!value) return null;

        return JSON.parse(value);

    },

    storageRemove(key){

        localStorage.removeItem(key);

    }

};

/*=========================================================
    EVENT BUS
=========================================================*/

const Events = {

    on(event,callback){

        document.addEventListener(

            event,

            callback

        );

    },

    emit(event,data={}){

        document.dispatchEvent(

            new CustomEvent(

                event,

                {

                    detail:data

                }

            )

        );

    }

};

/*=========================================================
    LOADER
=========================================================*/

const Loader={

    show(){

        if(!DOM.loader) return;

        DOM.loader.classList.remove("hide");

        State.loading=true;

    },

    hide(){

        if(!DOM.loader) return;

        DOM.loader.classList.add("hide");

        State.loading=false;

    }

};

/*=========================================================
    TOAST
=========================================================*/

const Toast={

    show(

        message,

        type="success",

        duration=3500

    ){

        let container=

        DOM.toastContainer;

        if(!container){

            container=

            Utils.create("div");

            container.id=

            "toast-container";

            container.style.position="fixed";

            container.style.top="20px";

            container.style.right="20px";

            container.style.zIndex="99999";

            document.body.appendChild(container);

        }

        const toast=

        Utils.create("div");

        toast.className=

        `toast toast-${type}`;

        toast.innerHTML=`

            <strong>${type.toUpperCase()}</strong>

            <div>${message}</div>

        `;

        container.appendChild(toast);

        setTimeout(()=>{

            toast.style.opacity="0";

            toast.style.transform=

            "translateX(60px)";

            setTimeout(()=>{

                toast.remove();

            },400);

        },duration);

    }

};

/*=========================================================
    LOGGER
=========================================================*/

const Log={

    info(msg){

        console.log(

            `%cINFO`,

            "color:#00d4ff;font-weight:bold",

            msg

        );

    },

    success(msg){

        console.log(

            `%cSUCCESS`,

            "color:#22c55e;font-weight:bold",

            msg

        );

    },

    warning(msg){

        console.warn(msg);

    },

    error(msg){

        console.error(msg);

    }

};

/*=========================================================
    APPLICATION START
=========================================================*/

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Log.success(

            "AMG Application Started"

        );

    }

);

/*=========================================================
    END PART 1
=========================================================*/

/*=========================================================
    PART 2
    THEME • NAVIGATION • SIDEBAR • SCROLL
=========================================================*/

/*=========================================================
    THEME MANAGER
=========================================================*/

const Theme={

    init(){

        this.apply(State.theme);

    },

    toggle(){

        State.theme=

        State.theme==="dark"

        ?"light"

        :"dark";

        this.apply(State.theme);

        localStorage.setItem(

            "theme",

            State.theme

        );

        Toast.show(

            `${Utils.capitalize(State.theme)} mode enabled`

        );

    },

    apply(theme){

        document.documentElement

        .setAttribute(

            "data-theme",

            theme

        );

    }

};

/*=========================================================
    MOBILE MENU
=========================================================*/

const MobileMenu={

    init(){

        if(!DOM.mobileToggle) return;

        DOM.mobileToggle

        .addEventListener(

            "click",

            ()=>{

                this.toggle();

            }

        );

    },

    toggle(){

        if(!DOM.mobileMenu) return;

        DOM.mobileMenu

        .classList.toggle(

            "active"

        );

    },

    close(){

        if(!DOM.mobileMenu) return;

        DOM.mobileMenu

        .classList.remove(

            "active"

        );

    }

};

/*=========================================================
    SIDEBAR
=========================================================*/

const Sidebar={

    open(){

        if(!DOM.sidebar) return;

        DOM.sidebar

        .classList.add(

            "open"

        );

        State.sidebarOpen=true;

    },

    close(){

        if(!DOM.sidebar) return;

        DOM.sidebar

        .classList.remove(

            "open"

        );

        State.sidebarOpen=false;

    },

    toggle(){

        State.sidebarOpen

        ?this.close()

        :this.open();

    }

};

/*=========================================================
    SCROLL TO TOP
=========================================================*/

const ScrollTop={

    init(){

        window.addEventListener(

            "scroll",

            ()=>{

                this.check();

            }

        );

        if(DOM.scrollTop){

            DOM.scrollTop

            .addEventListener(

                "click",

                ()=>{

                    window.scrollTo({

                        top:0,

                        behavior:"smooth"

                    });

                }

            );

        }

    },

    check(){

        if(!DOM.scrollTop) return;

        if(window.scrollY>500){

            DOM.scrollTop

            .classList.add(

                "show"

            );

        }

        else{

            DOM.scrollTop

            .classList.remove(

                "show"

            );

        }

    }

};

/*=========================================================
    NAVBAR EFFECT
=========================================================*/

const Navbar={

    init(){

        if(!DOM.navbar) return;

        window.addEventListener(

            "scroll",

            ()=>{

                this.effect();

            }

        );

    },

    effect(){

        if(window.scrollY>60){

            DOM.navbar.classList.add(

                "navbar-scrolled"

            );

        }

        else{

            DOM.navbar.classList.remove(

                "navbar-scrolled"

            );

        }

    }

};

/*=========================================================
    SMOOTH SCROLL
=========================================================*/

const SmoothScroll={

    init(){

        document

        .querySelectorAll(

            'a[href^="#"]'

        )

        .forEach(link=>{

            link.addEventListener(

                "click",

                e=>{

                    const id=

                    link.getAttribute("href");

                    if(id==="#") return;

                    const target=

                    document.querySelector(id);

                    if(!target) return;

                    e.preventDefault();

                    target.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                    MobileMenu.close();

                }

            );

        });

    }

};

/*=========================================================
    ACTIVE NAVIGATION
=========================================================*/

const Navigation={

    init(){

        this.sections=

        document.querySelectorAll("section");

        this.links=

        document.querySelectorAll(

            '.nav-link'

        );

        window.addEventListener(

            "scroll",

            ()=>{

                this.update();

            }

        );

    },

    update(){

        let current="";

        this.sections.forEach(section=>{

            const top=

            section.offsetTop-120;

            if(window.scrollY>=top){

                current=

                section.id;

            }

        });

        this.links.forEach(link=>{

            link.classList.remove(

                "active"

            );

            if(

                link.getAttribute("href")

                ==="#"+current

            ){

                link.classList.add(

                    "active"

                );

            }

        });

    }

};

/*=========================================================
    WINDOW EVENTS
=========================================================*/

window.addEventListener(

    "resize",

    ()=>{

        if(

            window.innerWidth>992

        ){

            MobileMenu.close();

        }

    }

);

/*=========================================================
    APPLICATION INITIALIZER
=========================================================*/

const App={

    init(){

        Theme.init();

        MobileMenu.init();

        ScrollTop.init();

        Navbar.init();

        SmoothScroll.init();

        Navigation.init();

        Log.success(

            "Core UI Loaded"

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();

    }

);

/*=========================================================
    END PART 2
=========================================================*/

/*=========================================================
    PART 3
    ANIMATIONS • COUNTERS • ACCORDION • TABS • MODALS
=========================================================*/

/*=========================================================
    INTERSECTION OBSERVER
=========================================================*/

const Animator={

    observer:null,

    init(){

        const options={

            threshold:0.15,

            rootMargin:"0px 0px -50px 0px"

        };

        this.observer=

        new IntersectionObserver(

            this.reveal.bind(this),

            options

        );

        document

        .querySelectorAll(

            ".fade-up,.fade-left,.fade-right"

        )

        .forEach(item=>{

            this.observer.observe(item);

        });

    },

    reveal(entries){

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                this.observer.unobserve(entry.target);

            }

        });

    }

};

/*=========================================================
    COUNTER ANIMATION
=========================================================*/

const Counter={

    started:false,

    init(){

        if(this.started) return;

        this.started=true;

        DOM.counters.forEach(counter=>{

            this.animate(counter);

        });

    },

    animate(element){

        const target=

        Number(

            element.dataset.counter

        );

        const duration=1800;

        const increment=

        target/(duration/16);

        let current=0;

        const update=()=>{

            current+=increment;

            if(current>=target){

                element.textContent=

                Utils.money(target);

                return;

            }

            element.textContent=

            Utils.money(

                Math.floor(current)

            );

            requestAnimationFrame(update);

        };

        update();

    }

};

/*=========================================================
    ACCORDION
=========================================================*/

const Accordion={

    init(){

        DOM.accordion.forEach(item=>{

            const header=

            item.querySelector(

                ".accordion-header"

            );

            if(!header) return;

            header.addEventListener(

                "click",

                ()=>{

                    this.toggle(item);

                }

            );

        });

    },

    toggle(item){

        item.classList.toggle(

            "active"

        );

    }

};

/*=========================================================
    TABS
=========================================================*/

const Tabs={

    init(){

        DOM.tabs.forEach(tab=>{

            tab.addEventListener(

                "click",

                ()=>{

                    this.activate(tab);

                }

            );

        });

    },

    activate(tab){

        const group=

        tab.parentElement;

        group

        .querySelectorAll(".tab")

        .forEach(btn=>{

            btn.classList.remove(

                "active"

            );

        });

        tab.classList.add(

            "active"

        );

        const target=

        tab.dataset.tab;

        document

        .querySelectorAll(

            ".tab-content"

        )

        .forEach(panel=>{

            panel.classList.remove(

                "active"

            );

        });

        const content=

        document.getElementById(target);

        if(content){

            content.classList.add(

                "active"

            );

        }

    }

};

/*=========================================================
    DROPDOWNS
=========================================================*/

const Dropdown={

    init(){

        DOM.dropdowns.forEach(menu=>{

            const button=

            menu.querySelector(

                ".dropdown-toggle"

            );

            if(!button) return;

            button.addEventListener(

                "click",

                e=>{

                    e.stopPropagation();

                    menu.classList.toggle(

                        "open"

                    );

                }

            );

        });

        document.addEventListener(

            "click",

            ()=>{

                DOM.dropdowns.forEach(menu=>{

                    menu.classList.remove(

                        "open"

                    );

                });

            }

        );

    }

};

/*=========================================================
    MODALS
=========================================================*/

const Modal={

    open(id){

        const modal=

        document.getElementById(id);

        if(!modal) return;

        modal.classList.add(

            "active"

        );

        document.body.style.overflow="hidden";

    },

    close(id){

        const modal=

        document.getElementById(id);

        if(!modal) return;

        modal.classList.remove(

            "active"

        );

        document.body.style.overflow="";

    },

    init(){

        document

        .querySelectorAll(

            "[data-modal-open]"

        )

        .forEach(btn=>{

            btn.addEventListener(

                "click",

                ()=>{

                    this.open(

                        btn.dataset.modalOpen

                    );

                }

            );

        });

        document

        .querySelectorAll(

            "[data-modal-close]"

        )

        .forEach(btn=>{

            btn.addEventListener(

                "click",

                ()=>{

                    this.close(

                        btn.dataset.modalClose

                    );

                }

            );

        });

        DOM.modals.forEach(modal=>{

            modal.addEventListener(

                "click",

                e=>{

                    if(

                        e.target===modal

                    ){

                        modal.classList.remove(

                            "active"

                        );

                        document.body.style.overflow="";

                    }

                }

            );

        });

    }

};

/*=========================================================
    KEYBOARD SHORTCUTS
=========================================================*/

const Keyboard={

    init(){

        document.addEventListener(

            "keydown",

            e=>{

                if(e.key==="Escape"){

                    DOM.modals.forEach(modal=>{

                        modal.classList.remove(

                            "active"

                        );

                    });

                    document.body.style.overflow="";

                }

            }

        );

    }

};

/*=========================================================
    INITIALIZE PART 3
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Animator.init();

        Accordion.init();

        Tabs.init();

        Dropdown.init();

        Modal.init();

        Keyboard.init();

        Counter.init();

        Log.success(

            "Interactive Components Loaded"

        );

    }

);

/*=========================================================
    END PART 3
=========================================================*/

/*=========================================================
    PART 4
    AUTHENTICATION • VALIDATION • SESSION MANAGEMENT
=========================================================*/

/*=========================================================
    VALIDATOR
=========================================================*/

const Validator={

    email(email){

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    },

    password(password){

        return password.length>=8;

    },

    phone(phone){

        return /^[0-9]{10,15}$/.test(phone);

    },

    required(value){

        return value.trim()!=="";

    }

};

/*=========================================================
    PASSWORD STRENGTH
=========================================================*/

const PasswordStrength={

    score(password){

        let score=0;

        if(password.length>=8) score++;

        if(/[A-Z]/.test(password)) score++;

        if(/[a-z]/.test(password)) score++;

        if(/[0-9]/.test(password)) score++;

        if(/[^A-Za-z0-9]/.test(password)) score++;

        return score;

    },

    text(score){

        if(score<=2) return "Weak";

        if(score===3) return "Medium";

        if(score===4) return "Strong";

        return "Very Strong";

    }

};

/*=========================================================
    PASSWORD TOGGLE
=========================================================*/

const Password={

    init(){

        document

        .querySelectorAll("[data-password-toggle]")

        .forEach(button=>{

            button.addEventListener("click",()=>{

                const input=document.getElementById(

                    button.dataset.passwordToggle

                );

                if(!input) return;

                input.type=

                input.type==="password"

                ?"text"

                :"password";

            });

        });

    }

};

/*=========================================================
    SESSION
=========================================================*/

const Session={

    save(user){

        State.user=user;

        Utils.storageSet("amg_user",user);

    },

    current(){

        return Utils.storageGet("amg_user");

    },

    destroy(){

        Utils.storageRemove("amg_user");

        State.user=null;

    },

    loggedIn(){

        return this.current()!==null;

    }

};

/*=========================================================
    AUTHENTICATION
=========================================================*/

const Auth={

    users(){

        return Utils.storageGet("amg_users")||[];

    },

    save(users){

        Utils.storageSet("amg_users",users);

    },

    register(data){

        const users=this.users();

        const exists=users.find(

            u=>u.email===data.email

        );

        if(exists){

            Toast.show(

                "Email already registered",

                "error"

            );

            return false;

        }

        data.id=Date.now();

        data.wallet=0;

        data.created=new Date().toISOString();

        users.push(data);

        this.save(users);

        Toast.show(

            "Registration successful"

        );

        return true;

    },

    login(email,password){

        const user=this.users().find(

            u=>

            u.email===email &&

            u.password===password

        );

        if(!user){

            Toast.show(

                "Invalid login details",

                "error"

            );

            return false;

        }

        Session.save(user);

        Toast.show(

            "Welcome back "+user.firstName

        );

        setTimeout(()=>{

            window.location.href="dashboard.html";

        },1000);

        return true;

    },

    logout(){

        Session.destroy();

        Toast.show("Logged out");

        setTimeout(()=>{

            window.location.href="index.html";

        },800);

    }

};

/*=========================================================
    LOGIN FORM
=========================================================*/

const LoginForm={

    init(){

        const form=

        document.getElementById("loginForm");

        if(!form) return;

        form.addEventListener(

            "submit",

            e=>{

                e.preventDefault();

                const email=

                Utils.id("email").value.trim();

                const password=

                Utils.id("password").value;

                if(

                    !Validator.email(email)

                ){

                    Toast.show(

                        "Enter a valid email",

                        "warning"

                    );

                    return;

                }

                Auth.login(

                    email,

                    password

                );

            }

        );

    }

};

/*=========================================================
    SIGNUP FORM
=========================================================*/

const SignupForm={

    init(){

        const form=

        document.getElementById("signupForm");

        if(!form) return;

        form.addEventListener(

            "submit",

            e=>{

                e.preventDefault();

                const user={

                    firstName:

                    Utils.id("firstName").value.trim(),

                    lastName:

                    Utils.id("lastName").value.trim(),

                    phone:

                    Utils.id("phone").value.trim(),

                    email:

                    Utils.id("email").value.trim(),

                    password:

                    Utils.id("password").value

                };

                if(

                    !Validator.required(user.firstName) ||

                    !Validator.required(user.lastName)

                ){

                    Toast.show(

                        "Fill all required fields",

                        "warning"

                    );

                    return;

                }

                if(

                    !Validator.email(user.email)

                ){

                    Toast.show(

                        "Invalid email",

                        "warning"

                    );

                    return;

                }

                if(

                    !Validator.password(user.password)

                ){

                    Toast.show(

                        "Password must be at least 8 characters",

                        "warning"

                    );

                    return;

                }

                if(Auth.register(user)){

                    setTimeout(()=>{

                        window.location.href="index.html";

                    },1200);

                }

            }

        );

    }

};

/*=========================================================
    AUTO LOGIN
=========================================================*/

const AutoLogin={

    init(){

        const user=Session.current();

        if(user){

            State.user=user;

            Log.success(

                "User Session Restored"

            );

        }

    }

};

/*=========================================================
    INITIALIZE PART 4
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Password.init();

        LoginForm.init();

        SignupForm.init();

        AutoLogin.init();

    }

);

/*=========================================================
    END PART 4
=========================================================*/

/*=========================================================
    PART 5
    WALLET • TRANSACTIONS • SERVICES • DASHBOARD
=========================================================*/

/*=========================================================
    WALLET MANAGER
=========================================================*/

const Wallet={

    key:"amg_wallet",

    load(){

        let wallet=

        Utils.storageGet(this.key);

        if(!wallet){

            wallet={

                balance:0,

                bonus:0,

                spent:0,

                earned:0

            };

            Utils.storageSet(this.key,wallet);

        }

        State.wallet=wallet;

        return wallet;

    },

    save(){

        Utils.storageSet(

            this.key,

            State.wallet

        );

    },

    deposit(amount){

        amount=Number(amount);

        State.wallet.balance+=amount;

        State.wallet.earned+=amount;

        this.save();

        Toast.show(

            "Wallet funded successfully."

        );

    },

    withdraw(amount){

        amount=Number(amount);

        if(State.wallet.balance<amount){

            Toast.show(

                "Insufficient wallet balance",

                "error"

            );

            return false;

        }

        State.wallet.balance-=amount;

        State.wallet.spent+=amount;

        this.save();

        return true;

    },

    balance(){

        return State.wallet.balance;

    }

};

/*=========================================================
    TRANSACTIONS
=========================================================*/

const Transactions={

    key:"amg_transactions",

    load(){

        State.transactions=

        Utils.storageGet(this.key)||[];

    },

    save(){

        Utils.storageSet(

            this.key,

            State.transactions

        );

    },

    add(data){

        data.id=Date.now();

        data.date=

        new Date().toLocaleString();

        State.transactions.unshift(data);

        this.save();

    },

    latest(limit=10){

        return State.transactions.slice(0,limit);

    },

    search(keyword){

        keyword=

        keyword.toLowerCase();

        return State.transactions.filter(tx=>

            JSON.stringify(tx)

            .toLowerCase()

            .includes(keyword)

        );

    }

};

/*=========================================================
    DASHBOARD
=========================================================*/

const Dashboard={

    init(){

        this.updateBalance();

        this.updateStats();

        this.loadTransactions();

    },

    updateBalance(){

        const balance=

        document.querySelector(

            "[data-wallet-balance]"

        );

        if(balance){

            balance.textContent=

            "GH₵ "+Utils.money(

                Wallet.balance()

            );

        }

    },

    updateStats(){

        const total=

        document.querySelector(

            "[data-total-transactions]"

        );

        if(total){

            total.textContent=

            State.transactions.length;

        }

    },

    loadTransactions(){

        const table=

        document.querySelector(

            "#recentTransactions"

        );

        if(!table) return;

        table.innerHTML="";

        Transactions.latest().forEach(tx=>{

            table.innerHTML+=`

            <tr>

                <td>${tx.service}</td>

                <td>${tx.amount}</td>

                <td>${tx.status}</td>

                <td>${tx.date}</td>

            </tr>

            `;

        });

    }

};

/*=========================================================
    SERVICES
=========================================================*/

const Services={

    purchase(service,amount){

        if(

            !Wallet.withdraw(amount)

        ){

            return;

        }

        Transactions.add({

            service:service,

            amount:"GH₵ "+Utils.money(amount),

            status:"Successful"

        });

        Dashboard.updateBalance();

        Dashboard.loadTransactions();

        Dashboard.updateStats();

        Toast.show(

            service+

            " purchase successful."

        );

    }

};

/*=========================================================
    QUICK PURCHASE
=========================================================*/

const QuickPurchase={

    init(){

        document

        .querySelectorAll(

            "[data-service]"

        )

        .forEach(button=>{

            button.addEventListener(

                "click",

                ()=>{

                    const service=

                    button.dataset.service;

                    const amount=

                    Number(

                        button.dataset.amount

                    );

                    Services.purchase(

                        service,

                        amount

                    );

                }

            );

        });

    }

};

/*=========================================================
    FUND WALLET FORM
=========================================================*/

const FundWallet={

    init(){

        const form=

        document.getElementById(

            "fundWalletForm"

        );

        if(!form) return;

        form.addEventListener(

            "submit",

            e=>{

                e.preventDefault();

                const amount=

                Number(

                    Utils.id(

                        "fundAmount"

                    ).value

                );

                if(amount<=0){

                    Toast.show(

                        "Invalid amount",

                        "warning"

                    );

                    return;

                }

                Wallet.deposit(amount);

                Dashboard.updateBalance();

                form.reset();

            }

        );

    }

};

/*=========================================================
    INITIALIZE PART 5
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Wallet.load();

        Transactions.load();

        Dashboard.init();

        QuickPurchase.init();

        FundWallet.init();

        Log.success(

            "Wallet & Dashboard Loaded"

        );

    }

);

/*=========================================================
    END PART 5
=========================================================*/

/*=========================================================
    PART 6
    API ENGINE • NETWORK • PAYMENTS • UTILITIES
=========================================================*/

/*=========================================================
    API CONFIG
=========================================================*/

const API={

    BASE_URL:"",

    TOKEN:"",

    timeout:30000

};

/*=========================================================
    API CLIENT
=========================================================*/

const ApiClient={

    async request(

        endpoint,

        method="GET",

        body=null

    ){

        try{

            Loader.show();

            const options={

                method,

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":

                    "Bearer "+API.TOKEN

                }

            };

            if(body){

                options.body=

                JSON.stringify(body);

            }

            const response=

            await fetch(

                API.BASE_URL+endpoint,

                options

            );

            const data=

            await response.json();

            Loader.hide();

            return data;

        }

        catch(error){

            Loader.hide();

            Log.error(error);

            Toast.show(

                "Network Error",

                "error"

            );

            return null;

        }

    }

};

/*=========================================================
    API SERVICES
=========================================================*/

const Api={

    login(data){

        return ApiClient.request(

            "/login",

            "POST",

            data

        );

    },

    signup(data){

        return ApiClient.request(

            "/register",

            "POST",

            data

        );

    },

    profile(){

        return ApiClient.request(

            "/profile"

        );

    },

    wallet(){

        return ApiClient.request(

            "/wallet"

        );

    },

    transactions(){

        return ApiClient.request(

            "/transactions"

        );

    },

    purchase(data){

        return ApiClient.request(

            "/purchase",

            "POST",

            data

        );

    }

};

/*=========================================================
    PAYSTACK PLACEHOLDER
=========================================================*/

const Paystack={

    initialize(amount,email){

        Log.info(

            "Launching Paystack..."

        );

        Toast.show(

            "Paystack integration coming soon."

        );

    }

};

/*=========================================================
    DATAMART PLACEHOLDER
=========================================================*/

const DataMart={

    buyData(details){

        Log.info(

            "Buying data bundle..."

        );

        console.table(details);

    },

    buyAirtime(details){

        Log.info(

            "Buying airtime..."

        );

        console.table(details);

    },

    verifyMeter(number){

        Log.info(

            "Verifying meter..."

        );

        console.log(number);

    }

};

/*=========================================================
    NETWORK STATUS
=========================================================*/

const Network={

    init(){

        window.addEventListener(

            "online",

            ()=>{

                Toast.show(

                    "Connection restored"

                );

            }

        );

        window.addEventListener(

            "offline",

            ()=>{

                Toast.show(

                    "No Internet Connection",

                    "warning"

                );

            }

        );

    }

};

/*=========================================================
    SEARCH ENGINE
=========================================================*/

const Search={

    init(){

        document

        .querySelectorAll(

            "[data-search]"

        )

        .forEach(input=>{

            input.addEventListener(

                "keyup",

                ()=>{

                    this.filter(

                        input

                    );

                }

            );

        });

    },

    filter(input){

        const keyword=

        input.value.toLowerCase();

        const target=

        document.querySelector(

            input.dataset.search

        );

        if(!target) return;

        target

        .querySelectorAll("tr")

        .forEach(row=>{

            row.style.display=

            row.innerText

            .toLowerCase()

            .includes(keyword)

            ?""

            :"none";

        });

    }

};

/*=========================================================
    DATE HELPERS
=========================================================*/

const DateHelper={

    today(){

        return new Date()

        .toLocaleDateString();

    },

    now(){

        return new Date()

        .toLocaleTimeString();

    },

    full(){

        return new Date()

        .toLocaleString();

    }

};

/*=========================================================
    INITIALIZE PART 6
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Network.init();

        Search.init();

        Log.success(

            "API Layer Ready"

        );

    }

);

/*=========================================================
    END PART 6
=========================================================*/

