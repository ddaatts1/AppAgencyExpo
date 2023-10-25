import Snackbar from 'react-native-snackbar';
import React, { useState } from 'react';
import NewsService from '../../../services/news/news.service';

export default function useNews() {
    const { newsService, getDataNewsDetail, getCategory, newsCategory } = NewsService();

  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [dataNews, setDataNews] = useState() as any;

  const [isLoadingNewsDetail, setIsLoadingNewsDetail] = useState(false);
  const [dataNewsDetail, setDataNewsDetail] = useState() as any;

  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [dataCategory, setDataCategory] = useState() as any;

  const [isLoadingNewCategory, setIsLoadingNewCategory] = useState(false);
  const [dataNewCategory, setDataNewCategory] = useState() as any;


  const news = async function () {
    try {

      const result = await newsService();
      if (result.status == 200) {

        setDataNews(result?.data);
        setIsLoadingNews(true);
      }
    } catch (err: any) {

    } finally {

    }
  };

  const newsDetail = async function (slug: String) {
    try {
      setIsLoadingNewsDetail(true);

      const result = await getDataNewsDetail(slug);
      if (result.status == 200) {

        setDataNewsDetail(result?.data);
      }
    } catch (err: any) {

    } finally {
      setIsLoadingNewsDetail(false);

    }
  };

  const CategoryList = async function () {
    try {

      const result = await getCategory();
      if (result.status == 200) {

        setDataCategory(result?.data);
        setIsLoadingCategory(true);
      }
    } catch (err: any) {

    } finally {

    }
  };


  const getNewCategory = async (params:any)=>{
    try {
      setIsLoadingNewCategory(true);
      const result = await newsCategory(params);
      if (result.status == 200) {

        setDataNewCategory(result?.data);

      }
    } catch (err: any) {

    } finally {
      setIsLoadingNewCategory(false);
    }
  }

  return {
    news,
    dataNews,
    isLoadingNews,
    newsDetail,
    dataNewsDetail,
    isLoadingNewsDetail,
    CategoryList,
    dataCategory,
    isLoadingCategory,
    getNewCategory,
    dataNewCategory,
    isLoadingNewCategory
  };
}
