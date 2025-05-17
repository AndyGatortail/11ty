(function(){
  const container = document.getElementById('experience');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, 0.1, 1000);
  camera.position.set(0,1.6,5);
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);
  const light = new THREE.PointLight(0xff00ff, 1, 100);
  light.position.set(2,2,2);
  scene.add(light);

  const groundGeo = new THREE.PlaneGeometry(50,50);
  const groundMat = new THREE.MeshPhongMaterial({color:0x222222});
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  const boxGeo = new THREE.BoxGeometry();
  const boxMat = new THREE.MeshStandardMaterial({color:0x00ffff});
  for(let i=0;i<5;i++){
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.position.set((i-2)*2,0.5,-i*5);
    scene.add(box);
  }

  const messages = [
    'A neon alley beckons...',
    'You move through the haze...',
    'Electric hum surrounds you...',
    'The path grows darker...',
    'Your journey ends.'
  ];
  let step = 0;
  const narration = document.getElementById('narration');
  narration.textContent = messages[step];

  function move(dir){
    const dist = 2;
    if(dir==='forward') camera.position.z -= dist;
    if(dir==='back') camera.position.z += dist;
    if(dir==='left') camera.position.x -= dist;
    if(dir==='right') camera.position.x += dist;
    if(step < messages.length-1){
      step++;
      narration.textContent = messages[step];
    }
  }

  document.getElementById('btn-left').addEventListener('click', ()=>move('left'));
  document.getElementById('btn-right').addEventListener('click', ()=>move('right'));
  document.getElementById('btn-forward').addEventListener('click', ()=>move('forward'));
  document.getElementById('btn-back').addEventListener('click', ()=>move('back'));

  document.addEventListener('keydown', e => {
    if(e.key==='ArrowUp' || e.key==='w') move('forward');
    if(e.key==='ArrowDown' || e.key==='s') move('back');
    if(e.key==='ArrowLeft' || e.key==='a') move('left');
    if(e.key==='ArrowRight' || e.key==='d') move('right');
  });

  let sx, sy;
  container.addEventListener('touchstart', e=>{
    sx = e.changedTouches[0].clientX;
    sy = e.changedTouches[0].clientY;
  });
  container.addEventListener('touchend', e=>{
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if(Math.abs(dx) > Math.abs(dy)){
      if(dx>30) move('right');
      else if(dx<-30) move('left');
    }else{
      if(dy>30) move('back');
      else if(dy<-30) move('forward');
    }
  });

  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
  }
  animate();
})();
