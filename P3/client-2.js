
const ver = document.getElementById('ver');
const resultado = document.getElementById('resultado');


ver.onkeyup = () => {
  const m = new XMLHttpRequest();
  m.onreadystatechange = function() {
     if (m.readyState == 4 && m.status == 200) {
       let items = JSON.parse(m.responseText);
       resultado.innerHTML = "";
       for (let i = 0; i < items.length; i++) {
         resultado.innerHTML += "<a class=\"list-group-item\" href=\"" + items[i].replace(/[ ]/gi,'-') + ".html\">" + "<br>" + items[i] + "</a>";
       }
     }
   }
   m.open("GET","http://localhost:8080/myquery?prod=" + ver.value, true);
   m.send();
}
