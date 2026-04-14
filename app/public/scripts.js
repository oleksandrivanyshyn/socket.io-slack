const userName= prompt('What is your name?');
const password = prompt('What is the password?');
const socket = io('http://localhost:9000');
socket.on('connect', () => {
    console.log('Connected!');
    socket.emit('clientConnect');
})
socket.on('nsList', (nsData) => {
    console.log(nsData);
    const nameSpacesDiv = document.querySelector('.namespaces');
    nsData.forEach((ns) => {
        nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}" /><span>${ns.endpoint}</span></div>`;
    });
    Array.from(document.getElementsByClassName('namespace')).forEach((elem) => {
        elem.addEventListener('click', () => {
            const nsEndpoint = elem.getAttribute('ns');
            const clickedNs = nsData.find(row => row.endpoint === nsEndpoint);
            const rooms = clickedNs.rooms;
            let roomList = document.querySelector('.room-list');
            roomList.innerHTML = '';
            rooms.forEach(room => {
                roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`
            })

        });
    });
})