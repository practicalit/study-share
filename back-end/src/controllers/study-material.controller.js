const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { studyMaterialService, userService } = require('../services');
const logger = require('./../config/logger');

const createStudyMaterial = catchAsync(async (req, res) => {
  const studyMaterial = await studyMaterialService.createStudyMaterial(
    req.body, req.user);
  res.status(httpStatus.CREATED).send(studyMaterial);
});

const getStudyMaterials = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'link', 'contributor']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await studyMaterialService.queryStudyMaterials(filter, options);
  // if (result && result.results.length > 0) {
  //   //get the contributor's ids first
  //   const contributorIds = result.results.map( res => res.contributor);
  //   //grab all the contributors.
  //   const contributors = await userService.queryUsers(
  //     {_id: {$in: contributorIds}}, {});
  //   console.log(contributors);
  // } 
  res.send(result);
});

const getStudyMaterial = catchAsync(async (req, res) => {
  const studyMaterial = await studyMaterialService.getStudyMaterialById(req.params.userId);
  if (!studyMaterial) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Study material not found');
  }
  res.send(studyMaterial);
});

const updateStudyMaterial = catchAsync(async (req, res) => {
  const studyMaterial = await studyMaterialService.updateStudyMaterialById(
    req.params.studyMaterialId, req.body);
  res.send(studyMaterial);
});

const deleteStudyMaterial = catchAsync(async (req, res) => {
  await studyMaterialService.deleteStudyMaterialById(req.params.studyMaterialId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStudyMaterial,
  getStudyMaterials,
  getStudyMaterial,
  updateStudyMaterial,
  deleteStudyMaterial,
};
