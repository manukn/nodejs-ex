'use strict';

var _ = require('lodash');
var Cart = require('./cart.model');
var Champion = require('./champion.model');
// Get list of carts
exports.index = function (req, res) {
  Cart.find(function (err, carts) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(carts);
  });
};
// Get list of champion
exports.Champindex = function (req, res) {
  Champion.find(function (err, carts) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(carts);
  });
};
// Get list of carts
exports.cartmy = function (req, res) {

  Cart.find({ user: req.user._id, status: 0 }, function (err, carts) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(carts);
  });
};
// Get list of carts
exports.user = function (req, res) {
  Champion.find({}, function (err, carts) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(carts);
  });
};
exports.userChamp = function (req, res) {
  Cart.find({ champion: req.body.champ }, function (err, carts) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(carts);
  });
};
// get cartItem
exports.cartItem = function (req, res) {
  if (req.body.orderNo) {

    Cart.find({ "$and": [{ "company.company": req.body.user_id }, { orderNo: req.body.orderNo }]
    }, function (err, carts) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(carts);
    });
  }
  if (req.body.user) {
    Cart.find({ user: req.body.user }, function (err, carts) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(carts);
    });
  }
};
// Get a single cart
exports.show = function (req, res) {
  Cart.findById(req.params.id, function (err, cart) {
    if (err) {
      return handleError(res, err);
    }
    if (!cart) {
      return res.status(404).send('Not Found');
    }
    return res.json(cart);
  });
};
// Get a single champion
exports.Champshow = function (req, res) {
  Champion.findById(req.params.id, function (err, cart) {
    if (err) {
      return handleError(res, err);
    }
    if (!cart) {
      return res.status(404).send('Not Found');
    }
    return res.json(cart);
  });
};
// Creates a new cart in the DB.
exports.create = function (req, res) {
  Cart.create(req.body, function (err, cart) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(cart);
  });
};
// Creates a new champion in the DB.
exports.Champcreate = function (req, res) {
  Champion.create(req.body, function (err, cart) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(cart);
  });
};
exports.updatesingleCart = function (req, res) {
  Cart.update({ _id: req.body.id }, { $set: { company: req.body.company, cartItem: req.body.cartItem } }, { multi: true }, function (err, cart) {
    if (err) {
      return handleError(res, err);
    } else {
      return res.status(200).json(cart);
    }
  });
};
// Updates an existing cart in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Cart.findById(req.params.id, function (err, cart) {
    if (err) {
      return handleError(res, err);
    }
    if (!cart) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(cart, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(cart);
    });
  });
};
// Updates an existing champion in the DB.
exports.Champupdate = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Champion.findById(req.params.id, function (err, cart) {
    if (err) {
      return handleError(res, err);
    }
    if (!cart) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(cart, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(cart);
    });
  });
};
// Updates an existing cart in the DB for remove user cart.
exports.updateCart = function (req, res) {
  Cart.update({ user: req.body.user, status: 0, _id: req.body.id }, { $set: { status: 1, orderNo: req.body.orderNo } }, { multi: true }, function (err, cart) {
    if (err) {
      return handleError(res, err);
    } else {
      return res.status(200).json(cart);
    }
  });
};
// Deletes a cart from the DB.
exports.destroy = function (req, res) {
  Cart.findById(req.params.id, function (err, cart) {
    if (err) {
      return handleError(res, err);
    }
    if (!cart) {
      return res.status(404).send('Not Found');
    }
    cart.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};
// Deletes a cart from the DB.
exports.Champdestroy = function (req, res) {
  Champion.findById(req.params.id, function (err, cart) {
    if (err) {
      return handleError(res, err);
    }
    if (!cart) {
      return res.status(404).send('Not Found');
    }
    cart.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};
function handleError(res, err) {
  return res.status(500).send(err);
}
//# sourceMappingURL=cart.controller.js.map
