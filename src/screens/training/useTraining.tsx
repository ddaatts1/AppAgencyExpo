import Snackbar from 'react-native-snackbar';
import React, { useState } from 'react';
import TrainingService from '../../services/training.service';

export default function useTraining() {
  const [startLearning, setStartLearning] = useState(false);

  const [isLoadingArchives, setIsLoadingArchives] = useState(false);
  const [dataArchives, setDataArchives] = useState() as any;
  const [dataCourses, setDataCourses] = useState([]) as any;
  const [isLoadingCourses, setIsLoadingCourses] = useState() as any;

  const [isLoadingArchivesDetail, setIsLoadingArchivesDetail] = useState(false);
  const [dataArchivesDetail, setDataArchivesDetail] = useState() as any;
  const [isLoadingMyCourses, setIsLoadingMyCourses] = useState(false);

  const [dataCoursesDetail, setDataCoursesDetail] = useState() as any;
  const [isLoadingCoursesDetail, setIsLoadingCoursesDetail] = useState(false);

  const [dataLessons, setDataLessons] = useState() as any;
  const [isLoadingLessons, setIsLoadingLessons] = useState(false);


  const [dataMyCourses, setDataMyCourses] = useState() as any;
  const { archivesService, getDataArchivesDetail, getCourses, getCoursesDetail, getMyCourses, getCoursesLessons } = TrainingService();

  const abc = () => {
    console.log(startLearning);
  };
  const archives = async function () {
    try {

      const result = await archivesService();
      if (result.status == 200) {

        setDataArchives(result?.data)
        setIsLoadingArchives(true)
      }
    } catch (err: any) {

    } finally {

    }
  };
  const Courses = async function () {
    try {

      const result = await getCourses();
      if (result.status == 200) {
        setDataCourses(result?.data)

        setIsLoadingCourses(true)
      }
    } catch (err: any) {

    } finally {

    }
  };
  const MyCourses = async function () {
    try {

      const result = await getMyCourses();
      if (result.status == 200) {
        setDataMyCourses(result?.data)

        setIsLoadingMyCourses(true)
      }
    } catch (err: any) {

    } finally {

    }
  };
  const archivesDetail = async function (id: Number) {
    try {

      const result = await getDataArchivesDetail(id);
      if (result.status == 200) {
        setDataArchivesDetail(result?.data)
        setIsLoadingArchivesDetail(true)
      }
    } catch (err: any) {

    } finally {

    }
  };
  const CoursesDetail = async function (id: Number) {
    try {

      const result = await getCoursesDetail(id);
      if (result.status == 200) {
        setDataCoursesDetail(result?.data)
        setIsLoadingCoursesDetail(true)
      }
    } catch (err: any) {

    } finally {

    }
  };
  const Lessons = async function (id: Number) {
    try {

      const result = await getCoursesLessons(id);
      if (result.status == 200) {
        console.log(result?.data)
        setDataLessons(result?.data)
        setIsLoadingLessons(true)
      }
    } catch (err: any) {

    } finally {

    }
  };

  return {
    startLearning,
    setStartLearning,
    abc,
    archives,
    isLoadingArchives,
    dataArchives,
    archivesDetail, isLoadingArchivesDetail, dataArchivesDetail,
    Courses,
    CoursesDetail,
    dataCourses,
    isLoadingCourses,
    MyCourses,
    isLoadingMyCourses,
    dataMyCourses,
    isLoadingCoursesDetail,
    dataCoursesDetail,
    dataLessons,
    isLoadingLessons,
    Lessons,
  };
}
