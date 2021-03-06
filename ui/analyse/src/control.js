var treePath = require('./tree/path');

function canEnterVariation(ctrl) {
  return ctrl.vm.node.children.length > 1;
}

function sharedStart(p1, p2) {
  var L = p1.length,
    i = 0;
  while (i < L && p1.charAt(i) === p2.charAt(i)) i++;
  return p1.substring(0, i);
}

module.exports = {

  canGoForward: function(ctrl) {
    return ctrl.vm.node.children.length > 0;
  },

  next: function(ctrl) {
    var child = ctrl.vm.node.children[0];
    if (!child) return;
    ctrl.userJumpIfCan(ctrl.vm.path + child.id);
  },

  prev: function(ctrl) {
    ctrl.userJumpIfCan(treePath.init(ctrl.vm.path));
  },

  last: function(ctrl) {
    ctrl.userJumpIfCan(treePath.fromNodeList(ctrl.vm.mainline));
  },

  first: function(ctrl) {
    ctrl.userJump(treePath.root);
  },

  enterVariation: function(ctrl) {
    var child = ctrl.vm.node.children[1];
    if (!child) return;
    ctrl.userJump(ctrl.vm.path + child.id);
  },

  exitVariation: function(ctrl) {
    var nodes = ctrl.vm.nodeList;
    var prev, found, path = treePath.root;
    nodes.forEach(function(n, i) {
      prev = nodes[i-1];
      if (prev) {
        path += prev.id;
        if (prev.children[0].id !== n.id) found = path;
      }
    });
    if (found) ctrl.userJump(found);
  }
};
