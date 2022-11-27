import { PropType } from "vue";

/**
 * component-video-player supports 3 codecs: vp9, hvc1, and avc1.
 *
 * If you supply a vp9 video, then that video will play in supported browsers, such as google chrome on desktop.
 *
 * If you supply a hvc1 video, then that video will play on supported browsers, such as safari
 *
 * If you supply an avc1 video, then that video will play if you haven't supplied any videos of an alternate codec, or if the other videos you supplied can't be played in the browser. E.g. if you supply an hvc1 and an avc1 video to Chrome, then the video player will fall back to avc1, because chrome doesn't support hvc1.
 *
 * If you do NOT supply an avc1 video, then you MUST supply both a vp9 video and an hvc1 video.
 *
 * Try to supply an hvc1 video and a vp9 video. Both of these codecs consume less bandwidth than avc1
 */
export const enum VideoCodec {
  vp9 = "vp9",
  hvc1 = "hvc1",
  avc1 = "avc1",
} // todo: add the following profiles for each:
// 420 chroma subsampling, 8 bits per channel, no alpha
// 420 chroma subsampling, 8 bits per channel, alpha (if supported)
// 444 chroma subsampling, 12 bits per channel, alpha (if supported)
// also, add in av1 codec
// also, add in audio codecs (aac for hls.js, opus for dashjs)

/**
 *
 * @param url - the link to the poster image
 *
 * @param w - the intrinsic width of the image
 *
 * @param h - the intrinsic height of the image
 *
 */
export interface VideoPoster {
  url: string;
  w: number;
  h: number;
}

/**
 *
 * @param url - the link to the video
 *
 * @param w - the intrinsic width of the video
 *
 * @param h - the the intrinsic height of the video
 *
 * @param codec - the {@link VideoCodec} of the video. This property determines whether the video can play in a given browser.
 *
 */
export interface VideoSource extends VideoPoster {
  codec: VideoCodec | "vp9" | "hvc1" | "avc1";
}

/**
 *
 * @param width - the width in pixels or percentage, e.g. '100px', or '100%'
 *
 * @param height - the height in pixels or percentage, e.g. '100px', or '100%'
 *
 * @remarks
 * The width and height values are directly fed into the css properties, 'width' and 'height', i.e.
 * @example
 * ```css
 * .container {
 *  width: 100%;
 *  height: 100%;
 *  }
 * ```
 *
 */
export interface VideoPlayerDimensions {
  width: string;
  height: string;
}

export interface VideoPlayerContent {
  posters: Array<VideoPoster>;
  sources: Array<VideoSource>;
  title: string;
  dimensions: VideoPlayerDimensions;
}

/**
 *
 * @param playback.loop - whether the video should loop.
 *
 * @param playback.rate - the speed at which to play the video back. set this number to 0 to stop the video. Set it to 1 to play it.
 *
 * @param startAt - the time in milliseconds at which to start the video. defaults to 0
 *
 * @param volume - the volume of the video. Set this number to 0 to mute the video. Set it to 1 to play the video at full volume.
 */
export interface VideoPlayerPlayback {
  loop: boolean;
  rate: number;
  startAt: number;
  volume: number;
}

// export interface VideoPlayerControls {} // need to add ui

export interface VideoPlayerOptions {
  content: VideoPlayerContent;
  // controls: VideoPlayerControls;
}

const validatePoster = (p: unknown): boolean => {
  const poster = p as VideoPoster;
  if (typeof poster.w !== "number" || typeof poster.h !== "number")
    return false;
  if (typeof poster.url !== "string")
    return false; /* we don't actually check if URL is valid because separation of concerns */
  return true;
};

const validateSource = (s: unknown): boolean => {
  const sources = s as VideoSource;
  if (
    ![
      VideoCodec.avc1,
      VideoCodec.hvc1,
      VideoCodec.vp9,
      "avc1",
      "hvc1",
      "vp9",
    ].includes(sources.codec)
  )
    return false;
  return validatePoster(s);
};

const validatePlayback = (p: unknown): boolean => {
  const playback = p as VideoPlayerPlayback;
  if (
    typeof playback.loop !== "boolean" ||
    typeof playback.rate !== "number" ||
    typeof playback.startAt !== "number" ||
    typeof playback.volume !== "number"
  )
    return false;
  if (playback.volume < 0) return false;
  if (playback.startAt < 0) return false;
  if (playback.rate < 0) return false; // todo: support rewinding and fast-forwarding
  return true;
};

const validateOptions = (o: unknown): boolean => {
  const options = o as VideoPlayerOptions;

  if (typeof options !== "object") return false;
  if (options.content === undefined) return false;

  if (
    options.content.posters === undefined ||
    options.content.sources === undefined ||
    options.content.title === undefined
  )
    return false;

  if (
    !Array.isArray(options.content.posters) ||
    !Array.isArray(options.content.sources)
  )
    return false;

  if (typeof options.content.title !== "string") return false;

  if (options.content.sources.length === 0) return false;

  if (!options.content.posters.every((poster) => validatePoster(poster)))
    return false;

  if (!options.content.sources.every((source) => validateSource(source)))
    return false;

  return true;
};

/**
 * videoPlayerOptions - all of the configuration details for the video player
 *
 * @values any {@link VideoPlayerOptions} object
 *
 * @remarks
 * updating options.content.sources WILL ALWAYS reinitialize the entire video player, even if the video player ends up selecting the SAME video source that it was already playing. Once you set this property, don't change it unless you are willing to incur the performance cost of reinitializing the entire video player.
 *
 * @example
 * ```vue
 *
 * <VideoPlayer options="options"/>
 *
 * <script setup>
 *
 * // todo: show the shape of the options object
 *
 * </script>
 *
 * ```
 */
const options = {
  type: Object as PropType<VideoPlayerOptions>,
  required: true,
  validator: (options: unknown): boolean => validateOptions(options),
};

/**
 * playback - the values that control the state of the video
 *
 * @values any {@link VideoPlayerPlayback} object
 *
 * @example
 * ```vue
 *
 * <VideoPlayer options="options"/>
 *
 * <script setup>
 *
 * // todo: show the shape of the options object
 *
 * </script>
 *
 * ```
 */
const playback = {
  type: Object as PropType<VideoPlayerPlayback>,
  required: true,
  validator: (playback: unknown): boolean => validatePlayback(playback),
};

export { options, playback, validatePlayback };
