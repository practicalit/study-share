const httpStatus = require('http-status');
const { StudyMaterial } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Study Material
 * @param {Object} studyMaterialBody
 * @param {Object} creator - user that is injected in the middleware
 * @returns {Promise<StudyMaterial>}
 */
const createStudyMaterial = async (studyMaterial, creator) => {
  studyMaterial.contributor = creator._id;
  //pull the source and add it to the document.
  let url = new URL(studyMaterial.link);
  console.log(url);
  studyMaterial.source = url.hostname?.replace('www.', '');
  return StudyMaterial.create(studyMaterial);
};

/**
 * Query for studyMaterial
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStudyMaterials = async (filter, options) => {
  options.populate = 'contributor'; //since using paginate, pass it in option
  const studyMaterial = await StudyMaterial.paginate(filter, options);
  return studyMaterial;
};

/**
 * Get study material by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getStudyMaterialById = async (id) => {
  return StudyMaterial.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateStudyMaterialById = async (studyMaterialId, updateBody) => {
  const studyMaterial = await getStudyMaterialById(userId);
  if (!studyMaterial) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Study material not found');
  }

  Object.assign(studyMaterial, updateBody);
  await studyMaterial.save();
  return studyMaterial;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteStudyMaterialById = async (userId) => {
  const studyMaterial = await getUserById(userId);
  if (!studyMaterial) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Study Material not found');
  }
  await studyMaterial.remove();
  return studyMaterial;
};

module.exports = {
  createStudyMaterial,
  queryStudyMaterials,
  getStudyMaterialById,
  updateStudyMaterialById,
  deleteStudyMaterialById,
};
