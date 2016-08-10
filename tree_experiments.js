const tree = {
  value: 'root',
  children: [
    {
      value: 'a',
      children: [{value: 'd'}, {value: 'e'}]
    },
    {
      value: 'b',
      children: [{value: 'f'}]
    },
    {
      value: 'c',
      children: [{value: 'g', children: [{value: 'i'}, {value: 'j'}]}, {value: 'h'}]
    }
  ]
};


function has_children(node) {
  return typeof node.children !== 'undefined';
}


function is_leaf(node) {
  return !has_children(node);
}


const q = {
  create(starter_values) {
    return starter_values || [];
  },

  next(queue) {
    return queue[0];
  },
  
  dequeue(queue) {
    return queue.slice(1);
  },

  enqueue(queue, value) {
    return queue.concat(value);
  },

  has_items(queue) {
    return queue.length > 0;
  }
};


function add_children_to_queue(some_q, children) {
  children.forEach(child => {
    some_q = q.enqueue(some_q, child);
  });

  return some_q;
}


function bf_apply(cb, tree) {
  (function sub_routine(nodes) {
    let my_q = q.create();
    nodes.forEach(node => {
      cb(node.value);
      if (has_children(node)) {
        my_q = add_children_to_queue(my_q, node.children);
      }
    }); 

    if (q.has_items(my_q)) {
      sub_routine(my_q);
    }
  }(tree.children));
}
