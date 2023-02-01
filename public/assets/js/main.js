var myUser;

//var socket = io.connect();

function login(){
    let signUp = document.getElementById("signUp");
    let signIn = document.getElementById("signIn");
    let logo = document.getElementsByClassName("logo")[0];
    let send = document.getElementById("submit");
    let login = document.getElementById("login");

    signUp.onclick = (e) => {
        e.stopPropagation();
        let div = document.getElementsByClassName("popUp")[0];
        
        div.classList.add("popUpUp");
        logo.classList.add("logoUp");
        setTimeout(() => {
            document.getElementsByClassName("popUpBack")[0].classList.add("popUpBackUp");
        }, 50);

        constructRegister();
    };

    signIn.onclick = (e) => {
        e.stopPropagation();
        let div = document.getElementsByClassName("popUp")[0];
        
        div.classList.add("popUpUp");
        logo.classList.add("logoUp");
        setTimeout(() => {
            document.getElementsByClassName("popUpBack")[0].classList.add("popUpBackUp");
        }, 50);

        constructLogin();
    }
    
    function constructLogin(){
        let loginCode = 
        `<H2 style="color: rgb(75, 75, 75); margin-top: 30px;">Login</H2>
        <div id="formContainer" style="height:200px">
            <input type="text" id="username" placeholder="Your username or email" class="form">
            <input type="password" id="password" placeholder="Your password" class="form">
        </div> <div id="error"></div><br>
        
        <br><input type="submit" id="submit" style="margin-top: -30px">

        <br><div id="forgotPW" style="margin-top: 30px"><h3 style="color: rgb(75, 75, 75);"> <u> Forgot your password? </u> </h3></div>
        <br><div id="register"><h4 style="color: rgb(75, 75, 75);"> <u> Register </u></h4></div>
    `;
        document.getElementsByClassName("popUp")[0].innerHTML = loginCode;

        document.getElementById("register").onclick = () => {
        let back = document.getElementsByClassName("popUpBack")[0];
        let front = document.getElementsByClassName("popUp")[0];
        front.classList.add("popUpFrontBack");
            front.classList.add("popUpFrontShrink");
            back.classList.add("popUpBackFront");
            back.classList.add("popUpBackEnlarge");

            
            setTimeout(() => {
                front.classList.remove("popUpFrontBack");
                front.classList.remove("popUpFrontShrink");
                back.classList.remove("popUpBackFront");
                back.classList.remove("popUpBackEnlarge");
                back.classList.add("popUpBackDown");
                front.innerHTML = "";
                back.classList.remove("popUpBackDown");

                back.classList.remove("popUpBack");
                back.classList.remove("popUpBackUp");
                back.classList.add("popUp");
                back.classList.add("popUpUp");

                front.classList.remove("popUp");
                front.classList.remove("popUpUp");
                front.classList.add("popUpBack");
                front.classList.add("popUpBackUp");
                
                
                
                constructRegister();
            }, 500);
        }
        document.getElementById("submit").onclick = () => {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let error = document.getElementById("error");
            
            if (username == "" || password == ""){
                error.textContent = "Please fill out all fields!";
                return;
            } 
            let User;
            if (username.includes("@")){
                User = {
                    email: username,
                    password: password
                };
            } 
            else {
                User = {
                    username: username,
                    password: password
                };
            }

            

            $.ajax({
                type: "POST",
                url: "/api/checkUser",
                data: User,
                success: function(data){
                    if (data == "login") {
                        toChatList();
                        return;
                    }
                    if (data == "retry") {
                        error.textContent = "Wrong login, try again or create an account!";
                    }
                }
            });
           
            
        }
        document.getElementById("clear").onclick = () => {
            let front = document.getElementsByClassName("popUp")[0];
            let back = document.getElementsByClassName("popUpBack")[0];
            if (front.classList.contains("popUpUp")) {
                front.classList.remove("popUpUp");
                back.classList.remove("popUpBackUp");
            };
         }
    }

    function constructRegister(){
        let registerCode = `<H2 style="color: rgb(75, 75, 75); margin-top: 30px;">CREATE AN ACCOUNT</H2>
        <div id="formContainer">
            <input type="text" id="username" placeholder="Your username" class="form">
            <input type="text" id="email" placeholder="Your mail" class="form">
            <input type="password" id="password" placeholder="Your password" class="form">
            <input type="password" id="password2" placeholder="Repeat password" class="form">
        </div> <div id="error"></div><br>
        <form action="">
            <input type="checkbox" id="terms" name="terms"> 
            <label for="terms" style="color: rgb(75, 75, 75);">I agree all statements in <u> <b> Terms of service. </b> </u> </label>
        </form>
        <br><input type="submit" id="submit">

        <br><div id="forgotPW"><h3 style="color: rgb(75, 75, 75);"> <u> Forgot your password? </u> </h3></div>
        <br><div id="login"><h4 style="color: rgb(75, 75, 75);"> <u> Login </u></h4></div>
            `
            

        
        document.getElementsByClassName("popUp")[0].innerHTML = registerCode;
        document.getElementById("submit").onclick = () => {
            let username = document.getElementById("username").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let password2 = document.getElementById("password2").value;
            let terms = document.getElementById("terms").checked;
            let error = document.getElementById("error");
            if (password != password2) {
                error.textContent = "Passwords do not match!";
                return;
            }
            if (username == "" || email == "" || password == "" || password2 == ""){
                error.textContent = "Please fill out all fields!";
                return;
            } 
            if (!terms) {
                error.textContent = "Please accept the terms and conditions!";   
                return;
            }

            let newUser = {
                username: username,
                email: email,
                password: password
            };

            $.ajax({
                type: "POST",
                url: "/api/checkNewUser",
                data: newUser,
                success: function(data){
                    if (data == "username found") {
                        error.textContent = "Username already taken!";
                        return;
                    }
                    if (data == "email found") {
                        error.textContent = "Email already taken! Try logging in!";
                        return;
                    }
                    if (data == "added") {
                        myUser = username;
                        toChatList();
                    }
                }
            });
           
            
        }
        document.getElementById("login").onclick = () => {
            let front = document.getElementsByClassName("popUp")[0];
            let back = document.getElementsByClassName("popUpBack")[0];
 
             front.classList.add("popUpFrontBack");
             front.classList.add("popUpFrontShrink");
             back.classList.add("popUpBackFront");
             back.classList.add("popUpBackEnlarge");
 
             setTimeout(() => {
                 front.classList.remove("popUpFrontBack");
                 front.classList.remove("popUpFrontShrink");
                 back.classList.remove("popUpBackFront");
                 back.classList.remove("popUpBackEnlarge");
                 back.classList.add("popUpBackDown");
                 front.innerHTML = "";
                 back.classList.remove("popUpBackDown");
 
                 back.classList.remove("popUpBack");
                 back.classList.remove("popUpBackUp");
                 back.classList.add("popUp");
                 back.classList.add("popUpUp");
 
                 front.classList.remove("popUp");
                 front.classList.remove("popUpUp");
                 front.classList.add("popUpBack");
                 front.classList.add("popUpBackUp");
                 
                 
                 
                 constructLogin();
             }, 500);
        }

         document.getElementById("clear").onclick = () => {
            let front = document.getElementsByClassName("popUp")[0];
            let back = document.getElementsByClassName("popUpBack")[0];
            if (front.classList.contains("popUpUp")) {
                front.classList.remove("popUpUp");
                back.classList.remove("popUpBackUp");
            };
         }
    }

    
}
login();

function createUserChat(username) {
    let div = document.createElement("div");
    div.innerHTML = username;
    div.classList.add("user");
    if (!document.getElementById("list")) return;
    document.getElementById("list").appendChild(div);
    div.onclick = () => {
        toChat(username);
    };
}

/*socket.on("chatmessage", (data) => {
    console.log(data);
    if (data.dest == myUser) {
        let div = document.createElement("div");
        div.classList.add("yourmessage");
        document.getElementById("mainScreen").appendChild(div);
    
        let mes = document.createElement("div");
        mes.innerHTML = data.text;
        mes.classList.add("message");
        div.appendChild(mes);

        var objDiv = document.getElementById("mainScreen");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
});

socket.on("checkOnlineStatus", () => {
    socket.emit("online", myUser);
});

*/


var users = [];


function toChatList(list){
    var chatlist = `
    <div id="chatList">
        <div id="subBar">
            <input class="searchBar" type="text">
                
                <svg id="lens" width="16" height="16" viewBox="0 0 2588 2631" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1157.12 32C567.633 32 88 530.6 88 1143.4C88 1756.19 567.633 2254.79 1157.12 2254.79C1394.33 2254.74 1624.7 2172.19 1811.55 2020.29L2399.03 2631L2588 2434.56L2000.52 1823.85C2146.72 1629.59 2226.18 1390.05 2226.24 1143.4C2226.24 530.6 1746.6 32 1157.12 32Z" fill="#FDAEFF"/>
                    <path d="M1069.12 -1.8059e-08C479.633 -1.8059e-08 5.36069e-05 498.6 5.36069e-05 1111.4C5.36069e-05 1724.19 479.633 2222.79 1069.12 2222.79C1306.33 2222.74 1536.7 2140.19 1723.55 1988.29L2311.03 2599L2500 2402.56L1912.52 1791.85C2058.72 1597.59 2138.18 1358.05 2138.24 1111.4C2138.24 498.6 1658.6 -1.8059e-08 1069.12 -1.8059e-08Z" fill="white"/>
                    </svg>
                    
                <div id="placeholder">Search</div>
                <div class="button" id="profile">
                    <svg width="35px" height="35px" viewBox="0 0 2277 2277" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_f_0_1)">
                        <path d="M676.25 651.921C676.25 893.362 883.646 1089.84 1138.5 1089.84C1393.35 1089.84 1600.75 893.362 1600.75 651.921C1600.75 410.481 1393.35 214 1138.5 214C883.646 214 676.25 410.481 676.25 651.921ZM1960.28 2063H2063V1965.68C2063 1590.14 1740.35 1284.47 1343.94 1284.47H933.056C536.548 1284.47 214 1590.14 214 1965.68V2063H1960.28Z" fill="#FDAEFF"/>
                        </g>
                        <path d="M688 665.316C688 900.358 889.9 1091.63 1138 1091.63C1386.1 1091.63 1588 900.358 1588 665.316C1588 430.274 1386.1 239 1138 239C889.9 239 688 430.274 688 665.316ZM1938 2039H2038V1944.26C2038 1578.67 1723.9 1281.11 1338 1281.11H938C552 1281.11 238 1578.67 238 1944.26V2039H1938Z" fill="white"/>
                        <defs>
                        <filter id="filter0_f_0_1" x="0" y="0" width="2277" height="2277" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="107" result="effect1_foregroundBlur_0_1"/>
                        </filter>
                        </defs>
                        </svg>
                        
                </div>
        </div>
            
            <div id="list">
        
            </div>
            <div id="supBar">
                <div class="button" id="chats">
                    <svg width="35px" height="35px" viewBox="0 0 3578 3689" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_f_0_1)">
                        <path d="M509 2844.92H834V3505L1662.91 2844.92H2459C2638.24 2844.92 2784 2699.84 2784 2521.44V1227.49C2784 1049.08 2638.24 904 2459 904H509C329.762 904 184 1049.08 184 1227.49V2521.44C184 2699.84 329.762 2844.92 509 2844.92Z" fill="#FDAEFF"/>
                        </g>
                        <path d="M531.5 2805.56H844V3440L1641.03 2805.56H2406.5C2578.84 2805.56 2719 2666.11 2719 2494.63V1250.93C2719 1079.45 2578.84 940 2406.5 940H531.5C359.156 940 219 1079.45 219 1250.93V2494.63C219 2666.11 359.156 2805.56 531.5 2805.56Z" fill="white"/>
                        <g filter="url(#filter1_f_0_1)">
                        <path d="M3069 184H1119C939.762 184 794 378.35 794 617.333H2744C2923.24 617.333 3069 811.683 3069 1050.67V2784C3248.24 2784 3394 2589.65 3394 2350.67V617.333C3394 378.35 3248.24 184 3069 184Z" fill="#FDAEFF"/>
                        </g>
                        <path d="M3053.5 234H1178.5C1006.16 234 866 420.875 866 650.667H2741C2913.34 650.667 3053.5 837.542 3053.5 1067.33V2734C3225.84 2734 3366 2547.12 3366 2317.33V650.667C3366 420.875 3225.84 234 3053.5 234Z" fill="white"/>
                        <defs>
                        <filter id="filter0_f_0_1" x="0" y="720" width="2968" height="2969" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="92" result="effect1_foregroundBlur_0_1"/>
                        </filter>
                        <filter id="filter1_f_0_1" x="610" y="0" width="2968" height="2968" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="92" result="effect1_foregroundBlur_0_1"/>
                        </filter>
                        </defs>
                        </svg>
                        
                        
                </div>
                <div class="button" id="profile">
                    <svg width="35px" height="35px" viewBox="0 0 2511 3093" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="64" y="69" width="1192" height="2193" rx="65" fill="#FDAEFF"/>
                        <rect x="64" y="2426" width="1192" height="647" rx="65" fill="#FDAEFF"/>
                        <rect x="1460" y="69" width="1051" height="1334" rx="65" fill="#FDAEFF"/>
                        <rect x="1460" y="1513" width="1051" height="1580" rx="65" fill="#FDAEFF"/>
                        <rect width="1192" height="2193" rx="65" fill="#D9D9D9"/>
                        <rect y="2357" width="1192" height="647" rx="65" fill="#D9D9D9"/>
                        <rect x="1396" width="1051" height="1334" rx="65" fill="#D9D9D9"/>
                        <rect x="1396" y="1444" width="1051" height="1580" rx="65" fill="#D9D9D9"/>
                        </svg>
                        
                </div>
                
                <div class="button" id="settings">
                    <svg width="35px" height="35px" viewBox="0 0 2569 2585" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M86.0882 1743.87L341.443 2176.38C358.396 2205.06 386.292 2225.98 418.998 2234.54C451.703 2243.1 486.541 2238.59 515.85 2222L694.088 2121.25C768.14 2178.38 849.982 2225.25 936.036 2260.25V2460C936.036 2493.15 949.488 2524.95 973.432 2548.39C997.376 2571.83 1029.85 2585 1063.71 2585H1574.42C1608.29 2585 1640.76 2571.83 1664.7 2548.39C1688.65 2524.95 1702.1 2493.15 1702.1 2460V2260.25C1788.83 2224.9 1870.23 2178.13 1944.05 2121.25L2122.29 2222C2183.19 2256.38 2261.58 2235.75 2296.69 2176.38L2552.05 1743.87C2568.85 1715.15 2573.38 1681.09 2564.65 1649.11C2555.93 1617.13 2534.65 1589.82 2505.45 1573.12L2330.27 1474C2343.96 1381.81 2343.87 1288.16 2330.02 1196L2505.19 1096.88C2565.97 1062.5 2587.03 985.625 2551.79 926.125L2296.44 493.625C2279.49 464.937 2251.59 444.015 2218.88 435.459C2186.18 426.903 2151.34 431.414 2122.03 448L1943.79 548.75C1870.07 491.797 1788.7 445.027 1701.97 409.75V210C1701.97 176.848 1688.52 145.054 1664.58 121.612C1640.63 98.1696 1608.16 85 1574.3 85H1063.59C1029.72 85 997.248 98.1696 973.304 121.612C949.36 145.054 935.908 176.848 935.908 210V409.75C849.181 445.101 767.781 491.865 693.96 548.75L515.85 448C501.342 439.771 485.319 434.423 468.697 432.263C452.076 430.102 435.183 431.172 418.984 435.409C402.785 439.647 387.599 446.97 374.293 456.959C360.988 466.948 349.825 479.408 341.443 493.625L86.0882 926.125C69.2843 954.85 64.7532 988.912 73.4817 1020.89C82.2101 1052.87 103.491 1080.18 132.69 1096.88L307.864 1196C294.092 1288.18 294.092 1381.82 307.864 1474L132.69 1573.12C71.916 1607.5 50.8492 1684.37 86.0882 1743.87ZM1318.94 835C1600.6 835 1829.65 1059.25 1829.65 1335C1829.65 1610.75 1600.6 1835 1318.94 1835C1037.28 1835 808.231 1610.75 808.231 1335C808.231 1059.25 1037.28 835 1318.94 835Z" fill="#FDAEFF"/>
                        <path d="M17.0882 1658.87L272.443 2091.38C289.396 2120.06 317.292 2140.98 349.998 2149.54C382.703 2158.1 417.541 2153.59 446.85 2137L625.088 2036.25C699.14 2093.38 780.982 2140.25 867.036 2175.25V2375C867.036 2408.15 880.488 2439.95 904.432 2463.39C928.376 2486.83 960.851 2500 994.714 2500H1505.42C1539.29 2500 1571.76 2486.83 1595.7 2463.39C1619.65 2439.95 1633.1 2408.15 1633.1 2375V2175.25C1719.83 2139.9 1801.23 2093.13 1875.05 2036.25L2053.29 2137C2114.19 2171.38 2192.58 2150.75 2227.69 2091.38L2483.05 1658.87C2499.85 1630.15 2504.38 1596.09 2495.65 1564.11C2486.93 1532.13 2465.65 1504.82 2436.45 1488.12L2261.27 1389C2274.96 1296.81 2274.87 1203.16 2261.02 1111L2436.19 1011.88C2496.97 977.5 2518.03 900.625 2482.79 841.125L2227.44 408.625C2210.49 379.937 2182.59 359.015 2149.88 350.459C2117.18 341.903 2082.34 346.414 2053.03 363L1874.79 463.75C1801.07 406.797 1719.7 360.027 1632.97 324.75V125C1632.97 91.8479 1619.52 60.0537 1595.58 36.6116C1571.63 13.1696 1539.16 0 1505.3 0H994.586C960.724 0 928.248 13.1696 904.304 36.6116C880.36 60.0537 866.908 91.8479 866.908 125V324.75C780.181 360.101 698.781 406.865 624.96 463.75L446.85 363C432.342 354.771 416.319 349.423 399.697 347.263C383.076 345.102 366.183 346.172 349.984 350.409C333.785 354.647 318.599 361.97 305.293 371.959C291.988 381.948 280.825 394.408 272.443 408.625L17.0882 841.125C0.284276 869.85 -4.2468 903.912 4.48165 935.893C13.2101 967.874 34.4911 995.184 63.6904 1011.88L238.864 1111C225.092 1203.18 225.092 1296.82 238.864 1389L63.6904 1488.12C2.91598 1522.5 -18.1508 1599.37 17.0882 1658.87ZM1249.94 750C1531.6 750 1760.65 974.25 1760.65 1250C1760.65 1525.75 1531.6 1750 1249.94 1750C968.284 1750 739.231 1525.75 739.231 1250C739.231 974.25 968.284 750 1249.94 750Z" fill="white"/>
                        </svg>
                        
                </div>
            </div>
        
        </div>

    `
    document.getElementById("css").setAttribute("href", "assets/css/chatList.css");
    document.body.innerHTML = chatlist;
    if (list) {
        document.getElementById("list").innerHTML = list;
    }
    document.getElementById("searchBar").addEventListener("click", function(e) {
        e.stopPropagation();
        document.getElementById("placeholder").style.visibility = "hidden";
        document.getElementById("lens").style.visibility = "hidden";
        document.getElementById("searchBar").onkeyup = () => {
            console.log(document.getElementById("searchBar").value)
            searchUser(document.getElementById("searchBar").value);
        };
    });

    document.body.addEventListener("click", function() {
        document.getElementById("placeholder").style.visibility = "visible";
        document.getElementById("lens").style.visibility = "visible";
    });

    function searchUser(text){
        console.log(text);
        $.ajax({
            type: "GET",
            url: "/api/searchUser/" + text,
            success: function(data) {
                console.log(data)
                
            },
        });
    }
}

function toChat(username) {
    var chat = `
    <div id="chat">
    <div id="supBar">
        <div id="back">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
        </div>
        
        <div id="name">Wanna Marchi</div>
        <div id="picture">
            <img src="assets/img/Vanna_Marchi.jpg" style="width:  100%;">
        </div>
    </div>

        <div id="mainScreen">
            
        </div>

    <div id="subBar">
        <div id="media">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255); transform: rotate(45deg);"><path d="M15 11.586V6h2V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2h2v5.586l-2.707 1.707A.996.996 0 0 0 6 14v2a1 1 0 0 0 1 1h4v3l1 2 1-2v-3h4a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L15 11.586z"></path></svg>
        </div>
        <div id="textBar">
            <div id="text" contenteditable="true"></div>
        </div>
        <div id="send">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255);"><path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path></svg>
        </div>
        
    </div>
    </div>
    `
    var list = document.getElementById("list").innerHTML;

    document.getElementById("css").setAttribute("href", "assets/css/chat.css");
    document.body.innerHTML = chat;
    document.getElementById("name").innerHTML = username;
    document.getElementById("back").onclick = () => {
        toChatList(list);
    }

    var send = document.getElementById("send");

    send.onclick = () => {
        if (document.getElementById("text").textContent == "") { return }
        var text = document.getElementById("text").textContent;
        document.getElementById("text").textContent = "";

        let div = document.createElement("div");
        div.classList.add("mymessage");
        document.getElementById("mainScreen").appendChild(div);

        let mes = document.createElement("div");
        mes.innerHTML = text;
        mes.classList.add("message");
        div.appendChild(mes);

        var objDiv = document.getElementById("mainScreen");
        objDiv.scrollTop = objDiv.scrollHeight;

        document.getElementById("text").focus();

        //send message
        sendMessage(text);
    };

    //send message jquery ajax
    
}

function sendMessage(text) {
    $.ajax({
        url: '/api/sendmsg',
        type: 'POST',
        data: {
                text: text,
                dest: username,
                src: myUser,
                id: socket.id,
                timestamp: Date.now()
            },
        success: function (data) {
            console.log(data);
        }
    });
    }




//rilevare utenti che si disconnetto e connettono