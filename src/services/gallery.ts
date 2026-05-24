import { apiGet } from "@/utils/api";

export type GalleryVideo = {
  title: string;
  url: string;
};

type GalleryApiResponse = {
  msg: string;
  status: boolean;
  imageGallery: string[];
  videoGallery: GalleryVideo[];
};

export const getGallery = async () => {
  const response = await apiGet<GalleryApiResponse>("/get_gallery");

  return {
    status: Boolean(response.status),
    msg: response.msg || "",
    images: response.imageGallery || [],
    videos: response.videoGallery || [],
  };
};
