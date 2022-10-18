import { VideoSource, VideoCodec, VideoPoster } from "./useProps";
import { getHls, getDash } from "./getTechs";

let supportsPlayerTech: null | boolean = null;

const checkPlayerTechSupport = () => {
  if (typeof supportsPlayerTech === "boolean") return supportsPlayerTech;

  const supportsMSE = typeof MediaSource === "function";
  const supportsSourceBuffer =
    typeof SourceBuffer === "function" &&
    typeof SourceBuffer.prototype.appendBuffer === "function" &&
    typeof SourceBuffer.prototype.remove === "function";

  supportsPlayerTech = supportsMSE && supportsSourceBuffer;

  return supportsPlayerTech;
};

let preferredCodec: VideoCodec | null = null;

const getPreferredCodec = async () => {
  if (preferredCodec !== null) return preferredCodec;

  const dimensions = {
    width: 1920,
    height: 1080,
    bitrate: 5000,
    framerate: 30,
  }; /* mediaCapabilities demands these dimensions, so that it can tell us if a video will play back without dropping frames. We only care about whether a codec is supported. */

  const contentType = {
    hvc1: 'video/mp4; codecs="hvc1.2.4.L153.B0"' /* this is hvc1 + dolby atmos ... see: https://developer.apple.com/documentation/http_live_streaming/http_live_streaming_hls_authoring_specification_for_apple_devices. If you don't supply this long-ass codec string to mediaCapabilities, then it will fail */,
    vp9: 'video/webm; codecs="vp09.03.10.12"' /* this is a vp9 video that supports up to 444 chroma subsampling, with 12 bits-per-channel */,
  }; // todo: at some point get the server to tell us what media is available, and then actually (correctly) query mediaCapabilities

  const supportsHvc1 = (
    await navigator.mediaCapabilities.decodingInfo({
      type: "media-source",
      video: {
        contentType: contentType.hvc1,
        ...dimensions,
      },
    })
  ).supported;

  const supportsVp9 = (
    await navigator.mediaCapabilities.decodingInfo({
      type: "media-source",
      video: {
        contentType: contentType.vp9,
        ...dimensions,
      },
    })
  ).supported;

  if (supportsVp9) {
    preferredCodec = VideoCodec.vp9;
  } else if (supportsHvc1) {
    preferredCodec = VideoCodec.hvc1;
  } else {
    preferredCodec = VideoCodec.avc1;
  }
  return preferredCodec;
};

type Controls = {
  play: () => void;
  pause: (updateFn: (timeMs: number) => void) => void;
  loop: (shouldLoop: boolean) => void;
  mute: (shouldMute: boolean) => void;
  seek: (timestampMs: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  getTimeUpdate: (updateFn: (timeMs: number) => void) => () => void;
  destroy: () => void;
  useSource: VideoSource;
  usePoster: VideoPoster;
};

/**
 * initializes a video player. This involves loading player tech (either {@link Hls} or {@link Dash}) if necessary, picking the optimal video source to play, and assigning to {@link HTMLVideoElement["src"]}
 *
 * @param sources - the array of {@link VideoSource}s to use. This function will use the best source for the browser.
 * - on Safari, it will always try to use a source with a codec of {@link VideoCodec.hvc1}.
 * - on other browsers, it will always try to use a source with a codec of {@link VideoCodec.vp9}.
 * - if no sources with these codecs are provided, it will fall back to a source with a codec of {@link VideoCodec.avc1} on all browsers.
 *
 * @param poster - the array of {@link VideoPoster}s to use. This function will pick the best-sized poster.
 *
 * @param videoElement - the {@link HTMLVideoElement} in which the video should play.
 *
 * @param autoplay - whether the video should automatically start playing. Defaults to false.
 *
 * @param startAt - the time in seconds at which to start the video. Defaults to 0. Do not supply a negative number to this parameter, because it will error.
 *
 * @returns a function of type () => void. This function destroys the player tech that was just created, if any.
 *
 * @remarks
 * DO NOT RUN THIS FUNCTION ON SERVER SIDE. IT WILL ERROR.
 *
 */
export default async (
  sources: Array<VideoSource>,
  posters: Array<VideoPoster>,
  videoElement: HTMLVideoElement,
  frameWidth: number,
  frameHeight: number,
  startAt = 0
): Promise<Controls> => {
  const canUsePlayerTech = checkPlayerTechSupport();

  const preferredCodec = await getPreferredCodec();

  const validSources = sources.filter(
    (source) => source.codec === preferredCodec
  );

  const fallbackSources = sources.filter(
    (source) => source.codec === VideoCodec.avc1
  );

  if (validSources.length === 0 && fallbackSources.length === 0)
    throw new Error(
      `No video sources with codec ${preferredCodec} provided${
        preferredCodec === VideoCodec.avc1
          ? "."
          : ", and no sources with codec avc1 provided"
      }`
    );

  const chooseRightSizeSource = (
    sources: Array<VideoSource>,
    posters: Array<VideoPoster>,
    width: number,
    height: number
  ): {
    rightSizeSource: VideoSource;
    rightSizePoster: VideoPoster;
  } => {
    const getAbsoluteDifference = (w, h) =>
      Math.abs(w - width) + Math.abs(h - height);

    const rightSizeSource = sources
      .map((source) => {
        const { w, h } = source;
        const absdif = getAbsoluteDifference(w, h);
        return { source, absdif };
      })
      .sort((a, b) => a.absdif - b.absdif)
      .shift().source;

    const rightSizePoster = posters
      .map((poster) => {
        const { w, h } = poster;
        const absdif = getAbsoluteDifference(w, h);
        return { poster, absdif };
      })
      .sort((a, b) => a.absdif - b.absdif)
      .shift().poster;

    return { rightSizeSource, rightSizePoster };
  };

  const noOp = () => {
    return;
  }; /* return a no-op to keep the function signature clean */

  const { rightSizeSource, rightSizePoster } = chooseRightSizeSource(
    validSources.length > 0 ? validSources : fallbackSources,
    posters,
    frameWidth,
    frameHeight
  );

  const initShared = (): void => {
    videoElement.poster = rightSizePoster.url;
    videoElement.muted = true;
    videoElement.playsInline = true;
    preferredCodec === VideoCodec.hvc1 /* i.e. is safari */
      ? (videoElement.preload = "metadata")
      : (videoElement.preload = "auto");
  };

  const isM3U8 = rightSizeSource.url.endsWith(".m3u8");
  const isMPD = rightSizeSource.url.endsWith(".mpd");

  const usePlayerTech =
    canUsePlayerTech &&
    (isM3U8 ||
      isMPD); /* don't load a streaming player if the source isn't an m3u8 or mpd manifest */

  const nativeControls = {
    play: () => videoElement.play(),
    pause: (updateFn: (timeMs: number) => void) => {
      videoElement.pause();
      updateFn(videoElement.currentTime * 1000);
    },
    loop: (shouldLoop: boolean) => {
      videoElement.loop = shouldLoop;
    },
    mute: (shouldMute: boolean) => {
      videoElement.muted = shouldMute;
    },
    seek: (timestampMs: number) => {
      videoElement.currentTime = timestampMs / 1000;
    },
    setVolume: (volume: number) => {
      videoElement.volume = volume;
    },
    setPlaybackRate: (rate: number) => {
      videoElement.playbackRate = rate;
    },
    getTimeUpdate: (updateFn: (timeMs: number) => void): (() => void) => {
      const callUpdate = () => updateFn(videoElement.currentTime * 1000);
      videoElement.addEventListener("timeupdate", callUpdate);
      return () => videoElement.removeEventListener("timeupdate", callUpdate);
    },
    destroy: noOp,
    useSource: rightSizeSource,
    usePoster: rightSizePoster,
  };

  const initHls = async (source: string) => {
    const HLS = await getHls();
    const hlsPlayer = new HLS({
      startPosition: startAt,
      // todo: check all of the params: https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning
    });
    await new Promise<void>((resolve) => {
      hlsPlayer.attachMedia(videoElement);
      hlsPlayer.on(HLS.Events.MEDIA_ATTACHED, () =>
        hlsPlayer.loadSource(source)
      );
      /* the idea is to make initVideo wait until video is actually ready to play */
      hlsPlayer.on(HLS.Events.MANIFEST_PARSED, () => {
        initShared();
        resolve(); /* todo: come up with a way to cancel source change */
      });
    });
    return {
      ...nativeControls,
      destroy: hlsPlayer.destroy, // is this right??
    };
  };

  const initDash = async (source: string) => {
    const dash = await getDash();
    const dashPlayer = dash().create();
    dashPlayer.initialize(videoElement, source, false, startAt);
    initShared();
    await new Promise<void>((resolve) => {
      dashPlayer.on("streamInitialized", () => {
        // I have no idea if this is right
        /* the idea is to make initVideo wait until video is actually ready to play */
        return resolve();
      });
    });
    return {
      ...nativeControls,
      play: dashPlayer.play,
      pause: dashPlayer.pause,
      destroy: dashPlayer.destroy,
    };
  };

  if (!usePlayerTech) {
    videoElement.src = rightSizeSource.url;
    initShared();
    return nativeControls;
  } else {
    if (validSources.length === 0 || preferredCodec === VideoCodec.avc1) {
      if (isM3U8) {
        /* then feed the .m3u8 manifest into hls.js */
        const hlsControls = await initHls(rightSizeSource.url);
        initShared();
        return hlsControls;
      } else if (isMPD) {
        /* then feed the .mpd manifest into dashjs */
        const dashControls = await initDash(rightSizeSource.url);
        initShared();
        return dashControls;
      } else {
        /* assume the video is a file and feed it straight into the video src attribute */
        videoElement.src = rightSizeSource.url;
        initShared();
        return nativeControls;
      }
    } else {
      if (!isM3U8 && !isMPD) {
        /* then the preferred source is actually a file, in which case the player techs are unnecessary */
        videoElement.src = rightSizeSource.url;
        initShared();

        return nativeControls;
      } else if (preferredCodec === VideoCodec.hvc1) {
        const hlsControls = await initHls(rightSizeSource.url);
        initShared();
        return hlsControls;
      } else {
        /* the preferredCodec is necessarily VideoCodec.vp9 */
        const dashControls = await initDash(rightSizeSource.url);
        initShared();
        return dashControls;
      }
    }
  }
};

// todo: add av1 support, but keep vp9 for transparency
