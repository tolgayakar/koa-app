const users = [
  {
    title: "Tolga",
    subtitle: "Yakar",
  },
];

module.exports.get = function get(next, id) {
  if ("GET" != this.method) return next;
  if (!users[id]) {
    this.status = 404;
    this.body = { isError: true };
    return;
  }

  this.body = users[id];
  return;
};
