let socket = io();
let chatBox = document.getElementById('chatBox');
let btn =  document.getElementById('btn')
let log = document.getElementById('log');
let user;


/*Alert de identificacion*/
Swal.fire({
  title:"Nombre",
  input:"text",
  allowOutsideClick:false,
  inputValidator:(value)=>{
      //console.log(value);
      return !value && "Ingresa un nombre valido para iniciar el chat"
  }
}).then(result=>{
    user = result.value;
    //console.log(user);
})

chatBox.addEventListener('keyup', e=>{
    if(e.key ==="Enter"){
        if(chatBox.value.trim().length>0){//por lo menos se envia un simbolo
            socket.emit('message',{user, message:chatBox.value.trim(),time:`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`})
            chatBox.value=""
        }
    }
})

btn.addEventListener('click',()=>{
    if(chatBox.value.trim().length>0){//por lo menos se envia un simbolo
        socket.emit('message',{user, message:chatBox.value.trim(),time:`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`})
        chatBox.value=""
    }
})

/*Socket events*/

socket.on('log', data=>{
    let messages = "";
    data.forEach(log => {
        messages = messages + `(${log.time}) ${log.user} dice: ${log.message} </br>`
    });
    log.innerHTML=messages;

})


