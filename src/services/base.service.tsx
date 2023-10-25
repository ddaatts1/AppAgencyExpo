const BASE_URL = 'https://agencyapi.erpo.vn/v1';
const BASE_URL_REGION = 'https://agencyweb.erpo.vn';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIResponse } from './api/response';
import { APIErrorResponse } from './api/error';
import { StorageHelper } from './api/auth';
import { useAuth } from '../screens/auth/AuthContext';
export default function BaseService() {
  const { setAuthStates } = useAuth() as any;
  const post = async function <T = any>(
    path: string,
    data: any = {},
    options: AxiosRequestConfig = {},
  ): Promise<APIResponse<T>> {
    Object.assign(options, await _getCommonOptions());
    return axios
      .post<APIResponse<T>>(
        path.startsWith('http')
          ? path.replace('http://', 'https://')
          : `${BASE_URL}${path}`,
        data,
        options,
      )
      .then((res: AxiosResponse<APIResponse<T>>) => {
        return res.data;
      })
      .catch((error: AxiosError<APIErrorResponse>) => {
        throw _handleHttpError(error);
      });
  };
  const get = async function <T = any>(
    path: string,
    options: AxiosRequestConfig = {},
  ): Promise<APIResponse<T>> {
    Object.assign(options, await _getCommonOptions());
    return axios
      .get<APIResponse<T>>(
        path.startsWith('http')
          ? path.replace('http://', 'https://')
          : `${BASE_URL}${path}`,
        options,
      )
      .then((res: AxiosResponse<APIResponse<T>>) => {
        return res.data;
      })
      .catch((error: AxiosError<APIErrorResponse>) => {
        throw _handleHttpError(error);
      });
  };
  function _handleHttpError(error: AxiosError<APIErrorResponse>) {
    if (error?.response) {
      const code = error?.response?.status;
      if (code === 401) {
        _handle401(error);
        return;
      }
      return error?.response?.data;
    } else {
      return error;
    }
  }
  function _handle401(error: AxiosError<APIErrorResponse>) {
    StorageHelper.clearSession();
    setAuthStates(null, false);
  }
  async function _getCommonOptions() {
    const token = await StorageHelper.getToken();
    if (token != null) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'access-control-allow-credentials': true,
          'Access-Control-Allow-Methods': 'PUT,GET,HEAD,POST,DELETE,OPTIONS',
        },
        withCredentials: true,
      };
    } else {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT,GET,HEAD,POST,DELETE,OPTIONS',
          'access-control-allow-credentials': true,
        },
        withCredentials: true,
      };
    }
  }

  async function _getCommonOptionFormData() {
    const token = await StorageHelper.getToken();
    if (token != null) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        withCredentials: true,
      };
    } else {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT,GET,HEAD,POST,DELETE,OPTIONS',
          'access-control-allow-credentials': true,
        },
        withCredentials: true,
      };
    }
  }
  const postFormData = async function <T = any>(
    path: string,
    data: any = {},
    options: AxiosRequestConfig = {},
  ): Promise<APIResponse<T>> {
    Object.assign(options, await _getCommonOptionFormData());
    return axios
      .post<APIResponse<T>>(
        path.startsWith('http')
          ? path.replace('http://', 'https://')
          : `${BASE_URL}${path}`,
        data,
        options,
      )
      .then((res: AxiosResponse<APIResponse<T>>) => {
        return res.data;
      })
      .catch((error: AxiosError<APIErrorResponse>) => {
        throw _handleHttpError(error);
      });
  };
  return {
    post,
    get,
    postFormData
  };
}
