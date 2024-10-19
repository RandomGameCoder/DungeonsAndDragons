
document.getElementById("Character_form").addEventListener('submit',(e) => {
    e.preventDefault();

    let Character_name = document.getElementById("Character_name").value;
    let Race = document.getElementById("Race").value;
    let Class = document.getElementById("Class").value;
    let Backstory = document.getElementById("Backstory").value;

    if (Character_name == "" || Race == "" || Class == "" || Backstory == "" )
    {
        alert("Please Enter All The Fields....");
    }

    else{
        setCookie(Character_name, Race, Class, Backstory, 365);
    }
})

function setCookie(Character_name, Race, Class, Backstory, time){

    let d = new Date();

    d.setTime(d.getTime() + (time*24*60*60*1000));

    let expires = "expires="+d;

    document.cookie = `Character_name=${Character_name};${expires};`;
    document.cookie = `Race=${Race};${expires};`;
    document.cookie = `Class=${Class};${expires};`;
    document.cookie = `Backstory=${Backstory};${expires};`;

}

//function getCookie(key) {
//    let name = key + "=";
//    let cookies = document.cookie.split(';');
//    for(let i = 0; i <cookies.length; i++) {
//      let values = cookies[i];
//      while (values.charAt(0) == ' ') {
//        values = values.substring(1);
//      }
//      if (values.indexOf(name) == 0) {
//        return values.substring(name.length, values.length);
//      }
//    }
//    return "";
//  }

function getCookie(){
    let cookies = document.cookie.split(';');

    let res= '';

    for (let i=0; i<cookies.length; i++){
        res+= (i+1)+ '-' + cookies[i] + "<br>";
    }

    document.getElementById('result').innerHTML = res;
}
