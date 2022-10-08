<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <VideoPlayer
    :playback="filePlayback"
    :options="fileOptions"
    @click="playPauseFile"
    @currentTimeMs="tu"
  />
  <!-- <VideoPlayer v-model:playback="streamPlayback" :options="streamOptions" /> -->
</template>

<script setup lang="ts">
import VideoPlayer, {
  VideoPlayerOptions,
  VideoPlayerPlayback,
} from "@incremental.design/component-video-player";
import "@incremental.design/component-video-player/dist/style.css"; // todo: come up with a cleaner way to import styles
import { reactive } from "vue";

const fileOptions: VideoPlayerOptions = {
  content: {
    posters: [
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_poster_600x540.webp",
        w: 600,
        h: 540,
      },
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_poster_1200x1080.webp",
        w: 1200,
        h: 1080,
      },
    ],
    sources: [
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_h2160-vp9_30fps.webm",
        codec: "vp9",
        h: 2160,
        w: 2400,
      },
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_h1440-vp9_30fps.webm",
        codec: "vp9",
        h: 1440,
        w: 1600,
      },
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_h1080-vp9_30fps.webm",
        codec: "vp9",
        h: 1080,
        w: 1200,
      },
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_h720-vp9_30fps.webm",
        codec: "vp9",
        h: 720,
        w: 800,
      },
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_h2160-hvc1_bg_alpha_30fps.mov",
        codec: "hvc1",
        h: 2160,
        w: 2400,
      },
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_h1440-hvc1_bg_alpha_30fps.mov",
        codec: "hvc1",
        h: 1440,
        w: 1600,
      },
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_h1080-hvc1_bg_alpha_30fps.mov",
        codec: "hvc1",
        h: 1080,
        w: 1200,
      },
      {
        url: "https://static.incremental.design/elephant_ears/elephant_ears_h720-hvc1_bg_alpha_30fps.mov",
        codec: "hvc1",
        h: 720,
        w: 800,
      },
    ],
    title: "elephant ears",
    dimensions: {
      width: "300px",
      height: "200px",
    },
  },
};

const filePlayback: VideoPlayerPlayback = reactive({
  rate: 1,
  startAt: 1000,
  loop: true,
  volume: 0,
});

const playPauseFile = () => {
  filePlayback.rate = filePlayback.rate === 0 ? 1 : 0;
};

const tu = (time: number) => console.log(time);

const streamOptions: VideoPlayerOptions = {
  content: {
    posters: fileOptions.content.posters,
    sources: [
      {
        url: "http://media.developer.dolby.com/DolbyVision_Atmos/profile5_HLS/master.m3u8",
        codec: "hvc1",
        w: 1920,
        h: 1080,
      },
      {
        url: "https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd",
        codec: "vp9",
        w: 1920,
        h: 1080,
      },
    ],
    title: "bipbop",
    dimensions: {
      width: "300px",
      height: "200px",
    },
  },
};

const streamPlayback: VideoPlayerPlayback = {
  rate: 1,
  startAt: 10000,
  loop: true,
  volume: 0,
};
</script>
