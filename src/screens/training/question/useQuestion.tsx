import Snackbar from 'react-native-snackbar';
import React, { useState } from 'react';
import TrainingService from '../../../services/training.service';

export default function useQuestion() {
  const [dataLessons, setDataLessons] = useState() as any;
  const [fakedataLessons, setFakeDataLessons] = useState() as any;
  const [dataLessonsClone, setDataLessonsClone] = useState() as any;
  const [itemData, setItemData] = useState() as any;
  const [isLoadingLessons, setIsLoadingLessons] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const { getCoursesLessons, postMark } = TrainingService();
  const Lessons = async function (id: Number) {
    try {
      const result = await getCoursesLessons(id);
      console.log("result----------------", result)
      if (result.status == 200) {
        if (result?.time_limit !== null) {
          setIsTimer(true);
        }

        setDataLessonsClone(
          result?.data.map((item: any, index: any) => {
            if (index == 0) {
              setItemData({
                ...item,
                index: 1,
                checkResult: null,
                result: null,
                explainResult: '',
                correctResult: '',
                wrongResult: '',
              });
              return {
                ...item,
                index: 1,
                checkResult: null,
                result: null,
                explainResult: '',
                correctResult: '',
                wrongResult: '',
              };
            } else {
              return {
                ...item,
                index: 0,
                checkResult: null,
                result: null,
                explainResult: '',
                correctResult: '',
                wrongResult: '',
              };
            }
          }),
        );

        setDataLessons(result?.data);
        setIsLoadingLessons(true);
      }
    } catch (err: any) {
    } finally {
    }
  };

  const Mark = async function (data: any) {
    try {
      const result = await postMark(data);
      if (result.status == 200) {
        console.log(result);
      }
    } catch (err: any) {
    } finally {
    }
  };
  return {
    dataLessons,
    isLoadingLessons,
    Lessons,
    dataLessonsClone,
    setIsLoadingLessons,
    setDataLessonsClone,
    isTimer,
    itemData,
    setItemData,
    Mark,
  };
}
