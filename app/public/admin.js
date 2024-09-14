document.getElementsByTagName("button")[0].addEventListener("click",()=>{
    document.cookie ='jwt=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //Cookie vieja para que cuando el navegador la detecte la borre automaticamente 
    document.location.href="/"
})