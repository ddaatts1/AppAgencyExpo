import BaseService from '../base.service';

export default function archiveRequire() {
  const { post } = BaseService();

  const ArchiveRequire = async function () {
    return await post('/archive/require');
  };

  return {
    newsService : ArchiveRequire,
  };
}
