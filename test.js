function XX(promises) {
  let arr = [];
  let fn;
  promises.forEach(p => {
    p.then(v => {
      arr.push(v);
      arr.length === 10 && fn(arr);
    });
  });
  return new Promise(r => fn = r);
}