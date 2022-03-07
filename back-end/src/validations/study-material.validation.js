const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createStudyMaterial = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    link: Joi.string().required(),
    tags: Joi.array()
  }),
};

const getStudyMaterials = {
  query: Joi.object().keys({
    title: Joi.string(),
    link: Joi.string(),
    contributor: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStudyMaterial = {
  params: Joi.object().keys({
    studyMaterialId: Joi.string().custom(objectId),
  }),
};

const updateStudyMaterial = {
  params: Joi.object().keys({
    studyMaterialId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      link: Joi.string()
    })
    .min(1),
};

const deleteStudyMaterial = {
  params: Joi.object().keys({
    studyMaterialId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStudyMaterial,
  getStudyMaterials,
  getStudyMaterial,
  updateStudyMaterial,
  deleteStudyMaterial,
};
