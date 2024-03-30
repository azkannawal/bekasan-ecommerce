import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/lib/axios';

type AuthResponseData = {
  data: {
    access_token: string;
  };
}

export const getNewToken = async (
  refreshToken: string,
  setTokens: (accessToken: string, refreshToken: string) => void
): Promise<string> => {
  try {
    const data = {
      refresh_token: refreshToken,
    };
    const response: AxiosResponse<AuthResponseData> = await axiosInstance.post(
      '/auth/renew-access-token',
      data
    );
    console.log('berhasil');
    setTokens(response.data.data.access_token, refreshToken);
  } catch (error) {
    console.log(error);
  }

  return refreshToken;
};
