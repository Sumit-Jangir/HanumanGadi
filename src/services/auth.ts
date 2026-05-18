import { apiPost } from "@/utils/api";

export const loginApi = async (mobile: string) => {
  const formData = new FormData();
  formData.append("mobile", mobile);

  return apiPost("/loginAuthH", formData, {
    "Content-Type": "multipart/form-data",
  });
};
