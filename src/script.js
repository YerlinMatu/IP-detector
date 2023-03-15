(function() {
  'use strict';

  const endpoint = 'https://api.ipify.org/?format=json';
  const platformInfo = navigator.platform;
  const isOnline = navigator.onLine;
  
  const publicIpText = document.getElementById('public-ip');
  const localIpText = document.getElementById('local-ip');
  const platformText = document.getElementById('platform-info');
  const connectionText = document.getElementById('connection-status');

  axios.get(endpoint)
    .then(response => {
      const publicIp = response.data.ip;
      publicIpText.textContent = publicIp;
    })
    .catch(error => {
      publicIpText.textContent = error.toString();
    });

  platformText.textContent = platformInfo;
  connectionText.textContent = isOnline ? 'Connected' : 'Disconnected';

  window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  const pc = new RTCPeerConnection({iceServers: []});
  const noop = () => {};      
  pc.createDataChannel('');    
  pc.createOffer(pc.setLocalDescription.bind(pc), noop);    
  pc.onicecandidate = ice => {
    if (!ice || !ice.candidate || !ice.candidate.candidate)  return;
    const localIp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
    localIpText.textContent = localIp;
    pc.onicecandidate = noop;
  };
})();
