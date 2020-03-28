(() => {
  let down = {};
  window.addEventListener('keydown', (e) => {
    down[e.keyCode] = true;
  });
  window.addEventListener('keyup', (e) => {
    // Add article page - Space + W
    if (down[32] && down[87]) {
      window.location.href = '/article/add';
    }
    // Return to home - Space + R
    else if (down[32] && down[82]) {
      window.location.href = '/';
    }
    // Logout - Space + Ctrl + Q
    else if (down[32] && down[81] && down[17]) {
      window.location.href = '/logout';
    }
    // Navigate to profile page - Space + P
    else if (down[32] && down[80]) {
      window.location.href = '/profile';
    }
    down[e.keyCode] = false;
  });
})();
