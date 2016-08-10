const test_tree = {
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


/**
 * Namespace for generic helper functions.
 * @namespace
 */
const helpers = {
  identity(x) {
    return x;
  }  
};


/**
 * Namespace for Tree functions.
 * @namespace
 */
const tree = {
  has_children(node) {
    return typeof node.children !== 'undefined';
  }  
};


/**
 * Namespace for Queue functions.
 * @namespace
 */
const q = {
  create(initial_values) {
    return initial_values || [];
  },

  next(queue) {
    return queue[0];
  },
  
  dequeue(queue) {
    return queue.slice(1);
  },

  enqueue(value, queue) {
    return queue.concat(value);
  },

  has_items(queue) {
    return queue.length > 0;
  }
};


/**
 * Breadth-first traversal of a tree object.
 * @param {function(*)} cb Callback function applied and assigned to each
 *    node's values.
 * @param {Object} t The tree object being traversed.
 */
function bf_apply(cb, t) {
  /**
   * @param {Array<Object>} nodes A level of nodes within a tree.
   */
  (function sub_routine(nodes) {
    let my_q = q.create();
    nodes.forEach(node => {
      node.value = cb(node.value);
      if (tree.has_children(node)) {
        my_q = q.enqueue(node.children, my_q)
      }
    }); 

    if (q.has_items(my_q)) {
      sub_routine(my_q);
    }
  }(t.children));
}


/**
 * Generator-ized breadth-first traversal of a tree object.
 * @param {function(*)} cb Callback function applied and assigned to each
 *    node's values.
 * @param {Object} t The tree object being traversed.
 */
function *create_bf_apply_generator(cb, t) {
  yield *(function *sub_routine(nodes) {
    let my_q = q.create();

    for (let node, i = 0; i < nodes.length; i += 1) {
      node = nodes[i];
      node.value = yield cb(node.value);

      if (tree.has_children(node)) {
        my_q = q.enqueue(node.children, my_q)
      }
    }

    if (q.has_items(my_q)) {
      yield *sub_routine(my_q);
    }
  }(t.children));
}


/**
 * Depth-first traversal of a tree object.
 * @param {function(*)} cb Callback function applied and assigned to each
 *    node's values.
 * @param {Object} t The tree object being traversed.
 */
function df_apply(cb, nodes) {
  if (!nodes) { return; }

  for (let node, i = 0; i < nodes.length; i += 1) {
    node = nodes[i];
    node.value = cb(node.value);

    if (tree.has_children(node)) {
      df_apply(cb, node.children);
    }
  }
}


/**
 * Generator-ized depth-first traversal of a tree object.
 * @param {function(*)} cb Callback function applied and assigned to each
 *    node's values.
 * @param {Object} t The tree object being traversed.
 */
function *create_df_apply_generator(cb, nodes) {
  if (!nodes) { return; }

  for (let node, i = 0; i < nodes.length; i += 1) {
    node = nodes[i];
    node.value = yield cb(node.value);

    if (tree.has_children(node)) {
      yield *df_apply(cb, node.children);
    }
  }
}

/** Applications */
const bf_generator = create_bf_apply_generator(helpers.identity, test_tree);
const df_generator = create_df_apply_generator(helpers.identity, test_tree.children);

// Iterate through trees as easily as you might iterator through an array.
for (let value of bf_generator) {
  console.log(value);
}
// => a, b, c, d, e, f, g, h, i, j

for (let value of df_generator) {
  console.log(value);
}
// => a, d, e, b, f, c, g, i, j, h
