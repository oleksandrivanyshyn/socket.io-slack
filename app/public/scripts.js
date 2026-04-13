const userName= prompt('What is your name?');
const password = prompt('What is the password?');
const socket = io('http://localhost:9000');
socket.on('connect', () => {
    console.log('Connected!');
    socket.emit('clientConnect');
})
socket.on('nsList', (nsData) => {
    console.log(nsData);
    nsData.forEach((ns) => {
        const nameSpacesDiv = document.querySelector('.namespaces');
        const nsDiv = document.createElement('div');
        nsDiv.classList.add('namespace');
        nsDiv.innerHTML = `
            <img src="${ns.img}" />
            <span>${ns.endpoint}</span>
        `
        nameSpacesDiv.appendChild(nsDiv);
    });
})