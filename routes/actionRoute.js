const express = require('express');
const actionHelper = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel');
const router = express.Router();

/********************************************************
 *                  GET api/actions/:id                 *
 ********************************************************/
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  actionHelper
    .get(id)
    .then(action => {
      res.status(200).json({
        success: true,
        action
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *                    POST api/actions                  *
 ********************************************************/
router.post('/', validateProjectId, validateAction, (req, res, next) => {
  actionHelper
    .insert(req.action)
    .then(action => {
      res.status(201).json({
        success: true,
        action
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *                  PUT api/actions/:id                 *
 ********************************************************/
router.put('/:id', validateProjectId, validateAction, (req, res, next) => {
  const { id } = req.params;

  actionHelper
    .update(id, req.action)
    .then(action => {
      res.status(200).json({
        success: true,
        action
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *                 DELETE api/actions/:id               *
 ********************************************************/
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  actionHelper
    .remove(id)
    .then(action => {
      res.status(200).json({
        success: true,
        action
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *                      MIDDLE-WARE                     *
 ********************************************************/
function validateAction(req, res, next) {
  const action = req.body;

  if (
    !action.project_id ||
    !action.description ||
    !action.notes ||
    !action.hasOwnProperty('completed')
  ) {
    res.status(400).json({
      success: false,
      message: `Action is missing either a 'project_id', 'description', 'notes' or 'completed' field.`
    });
  } else {
    req.action = action;
    next();
  }
}

async function validateProjectId(req, res, next) {
  const action = req.body;

  let project = await projectModel.get(action.project_id);

  project // is null if project not found
    ? next()
    : res.status(400).json({
        success: false,
        message: `Project with id: ${action.project_id} does not exist.`
      });
}

module.exports = router;
