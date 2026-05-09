import { apiGet } from "@/utils/api";

const GALLERY_API = "/api/gallery";

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
  const response = await apiGet<GalleryApiResponse>(GALLERY_API);

  return {
    status: Boolean(response.status),
    msg: response.msg || "",
    images: response.imageGallery || [],
    videos: response.videoGallery || [],
  };
};
