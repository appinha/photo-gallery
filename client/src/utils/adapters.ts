import { snakeToCamelCase } from "./snakeToCamelCase";

export type RemotePhoto = {
  id: string;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  avg_color: string;
  src_original: string;
  src_large2x: string;
  src_large: string;
  src_medium: string;
  src_small: string;
  src_portrait: string;
  src_landscape: string;
  src_tiny: string;
  alt: string;
  is_starred: boolean;
};

export type Photo = ReturnType<typeof photoAdapter>;

const photoAdapter = (photo: RemotePhoto) => snakeToCamelCase(photo);

export function photosAdapter(photos: RemotePhoto[]) {
  return photos.map((p) => photoAdapter(p));
}
