import React, {useState} from 'react';
import TrainingService from '../../../services/training.service';

export default function useTrainingSchedule() {
  const [dataTraining, setDataTraining] = useState() as any;

  const [isLoadingTraining, setIsLoadingTraining] = useState(false);
  const [dataTrainingDetail, setDataTrainingDetail] = useState() as any;

  const [isLoadingTrainingDetail, setIsLoadingTrainingDetail] = useState(false);

  const {postTraining, postTrainingDetail} = TrainingService();

  const Training = async function () {
    try {
      const result = await postTraining();
      if (result.status == 200) {
        setDataTraining(result?.data);
        setIsLoadingTraining(true);
      }
    } catch (err: any) {
    } finally {
    }
  };

  const TrainingDetail = async function (id: Number) {
    try {
      const result = await postTrainingDetail(id);
      if (result.status == 200) {
        setDataTrainingDetail(result?.data);
        setIsLoadingTrainingDetail(true);
      }
    } catch (err: any) {
    } finally {
    }
  };

  return {
    Training,
    TrainingDetail,
    dataTraining,
    isLoadingTraining,
    dataTrainingDetail,
    isLoadingTrainingDetail,
  };
}
