const express = require('express');
const projectHelper = require('../data/helpers/projectModel');
const router = express.Router();

/********************************************************
 *                GET api/projects/:id                  *
 ********************************************************/
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  projectHelper
    .get(id)
    .then(project => {
      res.status(200).json({
        success: true,
        project
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *             GET api/projects/:id/actions             *
 ********************************************************/
router.get('/:id/actions', (req, res, next) => {
  const { id } = req.params;

  projectHelper
    .getProjectActions(id)
    .then(actions => {
      res.status(200).json({
        success: true,
        actions
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *                  POST api/projects                   *
 ********************************************************/
router.post('/', validateRequestBody, (req, res, next) => {
  projectHelper
    .insert(req.project)
    .then(project => {
      res.status(201).json({
        success: true,
        project
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *                 PUT api/actions/:id                  *
 ********************************************************/
router.put('/:id', validateRequestBody, (req, res, next) => {
  const { id } = req.params;
  const { project } = req;

  projectHelper
    .update(id, project)
    .then(project => {
      res.status(200).json({
        success: true,
        project
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *                  DELETE api/actions                  *
 ********************************************************/
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  projectHelper
    .remove(id)
    .then(project => {
      res.status(200).json({
        success: true,
        project
      });
    })
    .catch(err => next(err));
});

/********************************************************
 *                      MIDDLE-WARE                     *
 ********************************************************/
function validateRequestBody(req, res, next) {
  const project = req.body;

  if (
    !project.name ||
    !project.description ||
    !project.hasOwnProperty('completed')
  ) {
    res.status(400).json({
      success: false,
      message: 'Project is missing a name, description or completed field.'
    });
  } else {
    req.project = project;
    next();
  }
}

module.exports = router;
