
var coins=100;
window.onload=load();
function load()
{
    alert("Hello");
    var e=document.getElementById("coins");
    e.innerHTML=coins;
}
function change()
{
    var e=document.getElementById("coins");
    e.innerHTML=document.getElementById("txt").value;
 //   console.log(e.className);

    if(e.className==="red")
       e.className="green";
    else
       e.className="red";
}