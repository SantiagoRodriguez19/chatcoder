let socket = io();
let chatBox = document.getElementById('chatBox');
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
            socket.emit('message',{user, message:chatBox.value.trim()})
            chatBox.value=""
        }
    }
})
/*Socket events*/

socket.on('log', data=>{
    let messages = "";
    data.forEach(log => {
        messages = messages + `${log.user} dice: ${log.message}</br>`
    });
    log.innerHTML=messages;

})


