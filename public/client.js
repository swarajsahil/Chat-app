const socket= io();

let Name;
const messageContainer=document.querySelector(".container");
const messageInput=document.getElementById("messageInput");
const sendBtn=document.getElementById("send-container");

do{
    Name=prompt("Enter your name: ");
}while(!Name)

sendBtn.addEventListener("click",(e)=>{
     sendMessage(messageInput.value);
})

function sendMessage(message){
    let msg={
        user:Name,
        message:message
    }
    appendMessage(msg,'right');
    messageInput.value="";

    socket.emit('message',msg)
    
}

function appendMessage(msg,type){
    const messageElement=document.createElement("div");
    let className=type
    messageElement.classList.add(className,'message');
    messageElement.innerHTML=`${msg.user}: ${msg.message}`;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop=messageContainer.scrollHeight;
}

socket.on("message",(msg)=>{
    appendMessage(msg,'left');
    // console.log(msg);
})

// // let audio=new Audio("ting.mp3");
// const append=(message,position)=>{
//     const messageElement=document.createElement("div");
//     messageElement.innerHTML=message;
//     messageElement.classList.add("message");
//     messageElement.classList.add("position");
//     messageContainer.append(messageElement);
//     messageContainer.scrollTop=messageContainer.scrollHeight;
//     // if(position=="left"){
//     //     audio.play();
//     // }
// }

// form.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     const message=messageInput.value;
//     append(`you: ${message}`,`right`);
//     socket.emit(`send`,message);
//     messageInput.value="";
// })
// const name=prompt("enter the name to join chat");
// socket.emit("new-user-joined",name);

// socket.on("user-joined",(name)=>{
//     append(`${name} joined the chat`,`right`);
// })

// socket.on("receive",(data)=>{
//     append(`${data.name}: ${data.message}`,`left`);
// })
// socket.on("left",(name)=>{
//     append(`${name} left the chat`,`left`);
// })