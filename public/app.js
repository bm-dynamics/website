  const canvas = document.getElementById('network');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = canvas.width / 3;

  const nodes = Array.from({ length: 6 }, () => ({
    x: 10 + Math.random() * (canvas.width - 20),
    y: 10 + Math.random() * (canvas.height - 20),
    radius: 4 + Math.random() * 3,
    color: "#FFF"
    }));

  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    connected = false
    for (let j = i + 1; j < nodes.length; j++) {
        if (connected) {
            if (Math.random() > 0.3) continue;
        }
      connected = true
      edges.push({ from: i, to: j, t: Math.random() });
    }
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    edges.forEach(edge => {
      const from = nodes[edge.from];
      const to = nodes[edge.to];

      edge.t += 0.01;
      if (edge.t > 1) edge.t = 0;

      const x = from.x + (to.x - from.x) * edge.t;
      const y = from.y + (to.y - from.y) * edge.t;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      ctx.fillStyle = '#02c39a';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();