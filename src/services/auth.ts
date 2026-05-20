import { fetcher } from "@/utils/api";

const LOGIN_API = "/api/login";

type LoginResponse = {
  status: boolean;
  msg: string;
  // Add other fields if needed
};

export const loginApi = async (mobile: string): Promise<LoginResponse> => {
  const formData = new FormData();
  formData.append("mobile", mobile);

  const response = await fetcher<LoginResponse>(LOGIN_API, {
    method: "POST",
    data: formData,
  });

  return {
    ...response,
  };
};
