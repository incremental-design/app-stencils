<template>
  <div ref="frameElement" :style="frame">
    <video v-if="mounted" ref="videoElement" :style="[scaleVideo, video]" />
    <img
      v-if="iA.src"
      :src="iA.src.url"
      :srcset="iA.srcset"
      :sizes="iA.sizes"
      :alt="iA.alt"
      :style="img"
      fetchpriority="high"
    />
  </div>
  <!-- see if this fetchpriority helps LCP https://web.dev/priority-hints/#the-fetchpriority-attribute -->
</template>

<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref,
  reactive,
  computed,
  watch,
  Ref,
  StyleValue,
  CSSProperties,
} from "vue";
import initVideo from "./initVideo";
import { options, playback, VideoSource } from "./useProps";

const props = defineProps({ options, playback });
const emit = defineEmits<{
  (event: "currentTimeMs", t: number): void;
}>();
/* don't even load the video if the component isn't mounted - this is because we don't want video assets to load when this component is rendered on the server or edge */
const mounted = ref(false);
onMounted(() => (mounted.value = true));

/* calculate fallback image attributes */
const iA /* (i)mage(A)ttributes */ = reactive({
  /* for browsers that don't support srcset, fall back to the biggest poster image */
  src: computed(() =>
    props.options
      ? props.options.content.posters
          .map((poster) => poster)
          .sort((a, b) => {
            const awh = a.w * a.h;
            const bwh = b.w * b.h;
            if (awh < bwh) return -1;
            if (awh === bwh) return 0;
            return 1;
          })
          .pop()
      : false
  ),
  srcset: computed(() =>
    props.options
      ? props.options.content.posters
          .map((poster) => `${poster.url} ${poster.w}w`)
          .reduce((acc, curr) => `${acc}, ${curr}`)
      : ""
  ),
  /* assume that the video will stretch to fill the viewport */
  sizes: computed(() =>
    props.options
      ? props.options.content.posters
          .map((poster) => `(min-width: ${poster.w}px) ${poster.w}px`)
          .reduce((acc, curr) => `${acc}, ${curr}`)
      : ""
  ),
  alt: computed(() => (props.options ? props.options.content.title : "")),
});

/* set video playback controls */

/* initialize the video every time the sources change */
const noOp = () => {
  return;
};

let destroyPlayer = noOp;

let playVideo = noOp;

let loopVideo = (shouldLoop: boolean) => {
  return;
};

let muteVideo = (shouldMute: boolean) => {
  return;
};

let seekVideo = (timestampMs: number) => {
  return;
};

let setVolumeVideo = (volume: number) => {
  return;
};

let setPlaybackRateVideo = (rate: number) => {
  return;
};

const currentTimeMs = ref(0);

const updateCurrentTimeMs = (ms: number) => {
  emit("currentTimeMs", ms);
  currentTimeMs.value = ms;
};

let pauseVideo = (updateCurrentTimeMs) => {
  return;
};

let getTimeUpdateVideo = (updateCurrentTimeMs) => {
  return () => {
    return;
  };
};

let stopTimeUpdate = noOp;

const videoElement: Ref<HTMLVideoElement | null> = ref(null);

const frameElement: Ref<HTMLElement | null> = ref(null);

/* watch the size of the frame */
const frameWidth = ref(0);
const frameHeight = ref(0);
let disconnectResizeObserver = ref(() => {
  return; /* use a no-op to establish function signature */
});

onMounted(() => {
  const f = frameElement.value as HTMLElement;
  const resizeObserver = new ResizeObserver(() => {
    const { clientWidth, clientHeight } = f;
    frameWidth.value = clientWidth;
    frameHeight.value = clientHeight;
    console.log("hibob");
  });
  resizeObserver.observe(f);
  disconnectResizeObserver.value = () => resizeObserver.disconnect(); // is there any performance advantage to passing a single resize observer into this component??
});

onUnmounted(() => disconnectResizeObserver.value());

const source: Ref<VideoSource | null> = ref(null);

const scaleVideo = computed(() => {
  if (frameElement.value === null || source.value === null)
    return {
      width: "100%",
      height: "100%",
      objectFit: "fill",
    } as StyleValue;
  const { w, h } = source.value;
  const scaleX = frameWidth.value / w;
  const scaleY = frameHeight.value / h;

  return {
    transformOrigin: "top left",
    transform: `scale3d(${scaleX}, ${scaleY}, 1)`,
  } as StyleValue;
});

const videoInitialized = ref(false);

watch(
  [() => props.options, () => videoElement.value],
  async (current) => {
    const [options, v] = current;
    if (!options) return;
    if (v === null || frameElement.value === null) return;
    videoInitialized.value = false;
    destroyPlayer();
    const { clientWidth, clientHeight } = frameElement.value;
    const {
      play,
      pause,
      loop,
      mute,
      seek,
      setVolume,
      setPlaybackRate,
      getTimeUpdate,
      destroy,
      useSource,
    } = await initVideo(
      options.content.sources,
      options.content.posters,
      v,
      clientWidth,
      clientHeight,
      props.playback ? props.playback.startAt / 1000 : 0
    );

    playVideo = play;
    pauseVideo = pause;
    loopVideo = loop;
    muteVideo = mute;
    seekVideo = seek;
    setVolumeVideo = setVolume;
    setPlaybackRateVideo = setPlaybackRate;
    getTimeUpdateVideo = getTimeUpdate;
    destroyPlayer = destroy;
    source.value = useSource;

    stopTimeUpdate = getTimeUpdateVideo(updateCurrentTimeMs);

    loopVideo(props.playback ? props.playback.loop : false);

    const volume = props.playback ? props.playback.volume : 0;

    setVolumeVideo(volume);
    muteVideo(volume === 0);

    const rate = props.playback ? props.playback.rate : 0;
    if (rate !== 0) {
      setPlaybackRateVideo(rate);
      playVideo();
    }
    videoInitialized.value = true;
  },
  {
    immediate: false,
    deep: true,
  }
);

onUnmounted(() => {
  stopTimeUpdate();
  destroyPlayer();
});

/* watch for changes to playback */
watch(
  () => props.playback,

  (current, previous) => {
    if (!videoInitialized.value) return;
    if (!current || !previous) return;

    const cV = current.volume;
    const pV = previous.volume;
    const cR = current.rate;
    const pR = previous.rate;
    const cL = current.loop;
    const pL = previous.loop;
    const cS = current.startAt;
    const pS = previous.startAt;

    if (cV !== pV) {
      setVolumeVideo(cV);
      muteVideo(cV === 0);
    }

    if (cL !== pL) loopVideo(cL);

    if (cR !== pR) {
      if (cR === 0) {
        pauseVideo(updateCurrentTimeMs);
      } else {
        setPlaybackRateVideo(cR);
        playVideo();
      }
    }

    if (cS !== pS) seekVideo(cS);
  },
  { deep: true }
);

/* bind width and height to <style> tag */
const width = computed(() =>
  props.options ? props.options.content.dimensions.width : 0
);
const height = computed(() =>
  props.options ? props.options.content.dimensions.height : 0
);

/* hide the fallback image as soon as the video is mounted, because the image will be shoved into the poster attribute */
const fallbackOpacity = computed(() => (mounted.value ? 0 : 1));

// todo: figure out how to package multi-track streams so that there is a video for light mode and a video for dark mode, and the stream can auto-switch between the modes

/* calculate inline CSS */

const frame = computed(() => {
  return {
    position: "relative",
    width: width.value,
    height: height.value,
  } as CSSProperties;
});

const img = computed(() => {
  return {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "fill",
    opacity: fallbackOpacity.value,
  } as CSSProperties;
});

const video = computed(() => {
  return {
    position: "absolute",
  } as CSSProperties;
});
</script>
