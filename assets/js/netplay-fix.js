function passToHost(key) {
  const body = document.body;
  body.dispatchEvent(new KeyboardEvent("keydown", { key }));
}
