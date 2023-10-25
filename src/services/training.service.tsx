import BaseService from './base.service';

export default function TrainingService() {
  const {post, get} = BaseService();

  const archives = async function () {
    return await post('/archives');
  };

  const getDataArchivesDetail = async function (id: Number) {
    return await post('/archives/' + id);
  };

  const getCourses = async function () {
    return await post('/academy/courses');
  };
  const getCoursesDetail = async function (id: Number) {
    return await post('/academy/courses/' + id);
  };
  const getCoursesLessons = async function (id: Number) {
    return await post('/academy/lessons/' + id);
  };
  const getMyCourses = async function () {
    return await post('/academy/my-courses');
  };
  const postMark = async function (data: any) {
    return await post('/academy/lessons/mark', data);
  };
  const postTraining = async function () {
    return await post('/tranning');
  };
  const postTrainingDetail = async function (id: Number) {
    return await post('/tranning/detail?id=' + id);
  };

  return {
    getCourses,
    getCoursesDetail,
    archivesService: archives,
    getDataArchivesDetail,
    getMyCourses,
    getCoursesLessons,
    postMark,
    postTraining,
    postTrainingDetail,
  };
}
