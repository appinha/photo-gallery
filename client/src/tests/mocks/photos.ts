import { Photo, RemotePhoto } from "../../utils/adapters";

export const remotePhotoMock: RemotePhoto = {
  id: "1",
  width: 500,
  height: 300,
  url: "url",
  photographer: "Photographer's Name",
  photographer_url: "photographerUrl",
  photographer_id: "photographerId",
  avg_color: "#FFFFFF",
  src_original: "srcOriginal",
  src_large2x: "srcLarge2x",
  src_large: "srcLarge",
  src_medium: "srcMedium",
  src_small: "srcSmall",
  src_portrait: "srcPortrait",
  src_landscape: "srcLandscape",
  src_tiny: "srcTiny",
  alt: "Alt text",
  is_starred: false,
};

export const photoMock: Photo = {
  id: "1",
  width: 500,
  height: 300,
  url: "url",
  photographer: "Photographer's Name",
  photographerUrl: "photographerUrl",
  photographerId: "photographerId",
  avgColor: "#FFFFFF",
  srcOriginal: "srcOriginal",
  srcLarge2x: "srcLarge2x",
  srcLarge: "srcLarge",
  srcMedium: "srcMedium",
  srcSmall: "srcSmall",
  srcPortrait: "srcPortrait",
  srcLandscape: "srcLandscape",
  srcTiny: "srcTiny",
  alt: "Alt text",
  isStarred: false,
};

export const photoMock1: Photo = {
  ...photoMock,
  id: "21751820",
  photographer: "Felix",
  photographerUrl: "https://www.pexels.com/@felix-57767809",
  photographerId: "57767809",
  avgColor: "#333831",
  srcTiny:
    "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
  alt: "A small island surrounded by trees in the middle of a lake",
};

export const photoMock2: Photo = {
  ...photoMock,
  id: "21405575",
  photographer: "Centre for Ageing Better",
  photographerUrl: "https://www.pexels.com/@centre-for-ageing-better-55954677",
  photographerId: "55954677",
  avgColor: "#6D755E",
  srcTiny:
    "https://images.pexels.com/photos/21405575/pexels-photo-21405575.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
  alt: "Two older people cycling",
};
