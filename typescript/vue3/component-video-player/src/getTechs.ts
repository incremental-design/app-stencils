import type { MediaPlayer } from "dashjs";
import type Hls from "hls.js";

let DASH: typeof MediaPlayer | false = false;

export const getDash = async () => {
  if (!DASH) DASH = (await import("dashjs")).MediaPlayer;
  return DASH;
};

let HLS: typeof Hls | false = false;

export const getHls = async () => {
  if (!HLS) HLS = (await import("hls.js")).default as unknown as typeof Hls;
  return HLS;
};
