import { fetcher } from "@/utils/api";

// const CONTACT_US_API = "/api/contact-us";

export type ContactUsPayload = {
  name: string;
  mobile: string;
  email: string;
  msg: string;
};

type ContactUsResponse = {
  status: boolean;
  msg: string;
};

export const saveContactUs = async (payload: ContactUsPayload): Promise<ContactUsResponse> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("mobile", payload.mobile);
  formData.append("email", payload.email);
  formData.append("msg", payload.msg);

  const response = await fetcher<ContactUsResponse>("/saveContactUs", {
    method: "POST",
    data: formData,
  });

  return {
    status: Boolean(response.status),
    msg: response.msg || "",
  };
};
