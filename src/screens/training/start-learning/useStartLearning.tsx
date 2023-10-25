import Snackbar from 'react-native-snackbar';
import React, {useState} from 'react';
import TrainingService from '../../../services/training.service';

export default function useStartLearning() {
  const [dataLessons, setDataLessons] = useState() as any;
  const [title, setTitle] = useState() as any;
  const [id, setId] = useState() as any;

  const [isLoadingLessons, setIsLoadingLessons] = useState(false);
  const {getCoursesLessons, postMark} = TrainingService();
  const Lessons = async function (id: Number) {
    try {
      const result = await getCoursesLessons(id);
      console.log('result----------------', result);
      if (result.status == 200) {
        setDataLessons(result?.data[0]);
        setTitle(result?.lesson_name);
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
    setIsLoadingLessons,
    Mark,
    title,
    id,
    setId,
  };
}
