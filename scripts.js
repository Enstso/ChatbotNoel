
function cookie_array(cookie){
    let cookies= cookie.split(',');
    return cookies;

}

let cookies = cookie_array(document.cookie);
        let ul = document.createElement('ul');
        for(let i =0;i<5;i++){
            let li = document.createElement('li');
            li.innerText = cookies[i];
            ul.appendChild(li);
        }
        console.log(ul);
        document.getElementById('recap').appendChild(ul);