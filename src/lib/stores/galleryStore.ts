import { create } from "zustand";
import { getGallery, type GalleryVideo } from "@/services/gallery";

export type Video = GalleryVideo;

export interface GalleryState {
  videos: Video[];
  images: string[];
  loading: boolean;
  error: string | null;
  fetchGallery: () => Promise<void>;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  videos: [],
  images: [],
  loading: false,
  error: null,
  fetchGallery: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getGallery();

      if (data.status) {
        set({
          videos: data.videos,
          images: data.images,
          loading: false,
        });
      } else {
        set({
          error: data.msg || "Failed to fetch gallery",
          loading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        loading: false,
      });
    }
  },
}));
