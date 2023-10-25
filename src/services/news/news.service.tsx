import BaseService from '../base.service';

export default function NewsService() {
  const { post } = BaseService();

  const AllNews = async function () {
    return await post('/news');
  };

  const getDataNewsDetail = async function (slug: String) {
    return await post('/news/' + slug);
  };

  const getCategory = async function () {
    return await post('/news/category');
  };

  const newsCategory = async function(params:any){
    return await post('/news/',null, {params})
  }

  return {
    newsService : AllNews,
    getDataNewsDetail,
    getCategory,
    newsCategory
  };
}
