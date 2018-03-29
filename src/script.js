!function () {

  const api = {
    endpoint: 'https://api.ipify.org/?format=json',
    platform: navigator.platform,
    internet: navigator.onLine,
  } 
  
  const ipPublicText = document.querySelector('#ip'),
        ipPrivateText = document.querySelector('#ip-local');
        plataformText = document.querySelector('#plataform');
        internetText = document.querySelector('#internet');
        
  axios.get(api.endpoint).then( response => {
    const ip = response.data.ip
    ipPublicText.innerHTML += ip;
  }).catch( err => IpText.innerHTML = err.toString());
  
  plataformText.innerHTML += api.platform;
  internetText.innerHTML += api.internet ? 'Conectado' : 'Desconectado';  

  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const pc = new RTCPeerConnection({iceServers:[]}), noop = () => {};      
    pc.createDataChannel('');    //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
    pc.onicecandidate = ice => {  //listen for candidate events
        if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
        const ipLocal = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        ipPrivateText.innerHTML += ipLocal;
        pc.onicecandidate = noop;
    };

}();