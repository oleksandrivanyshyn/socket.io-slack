// const userName= prompt('What is your name?');
// const password = prompt('What is the password?');
const socket = io('http://localhost:9000');
socket.on('connect', () => {
    console.log('Connected!');
    socket.emit('clientConnect');
})
socket.on('nsList', (nsData) => {
    const lastNs = localStorage.getItem('lastNs');
    console.log(nsData);
    const nameSpacesDiv = document.querySelector('.namespaces');
    nameSpacesDiv.innerHTML = '';
    nsData.forEach((ns) => {
        nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}" /><span>${ns.endpoint}</span></div>`;
        io('http://localhost:9000' + ns.endpoint);
    });
    Array.from(document.getElementsByClassName('namespace')).forEach((elem) => {
        elem.addEventListener('click', () => {
            joinNs(elem, nsData);
        });
    });
    joinNs(document.querySelectorAll('.namespace')[0], nsData);
})