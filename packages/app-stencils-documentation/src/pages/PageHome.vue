<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <VideoPlayer
    :playback="filePlayback"
    :options="fileOptions"
    @click="playPauseFile"
  />
  <VideoPlayer :playback="streamPlayback" :options="streamOptions" />
  <div
    style="
      grid-column: left-content-start / left-content-end;
      grid-row: 0 span 1;
    "
  >
    <Button ref="btn" :options="buttonOptions" />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch, computed } from "vue";
import VideoPlayer, {
  VideoPlayerOptions,
  VideoPlayerPlayback,
} from "@incremental.design/component-video-player";
import Button, { ButtonProps } from "@incremental.design/component-button";
import { reactive } from "vue";
import { faChessQueen } from "@fortawesome/pro-duotone-svg-icons";

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
      width: "50vw",
      height: "10vw",
    },
  },
};

const streamPlayback: VideoPlayerPlayback = {
  rate: 1,
  startAt: 10000,
  loop: true,
  volume: 0,
};

const buttonOptions: ButtonProps = {
  style: {
    font: {
      notToggled: {
        none: {
          typeface: ["Helvetica", "Arial", "Sans Serif"],
          size: 1,
          weight: 400,
          color: {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
          },
        },
        hovering: {
          typeface: ["Helvetica", "Arial", "Sans Serif"],
          size: 1,
          weight: 400,
          color: {
            r: 0,
            g: 0,
            b: 255,
            a: 1,
          },
        },
        pressing: {
          typeface: ["Helvetica", "Arial", "Sans Serif"],
          size: 1,
          weight: 400,
          color: {
            r: 0,
            g: 255,
            b: 0,
            a: 1,
          },
        },
      },
      toggled: {
        none: {
          typeface: ["Helvetica", "Arial", "Sans Serif"],
          size: 1,
          weight: 400,
          color: {
            r: 0,
            g: 255,
            b: 0,
            a: 1,
          },
        },
        hovering: {
          typeface: ["Helvetica", "Arial", "Sans Serif"],
          size: 1,
          weight: 400,
          color: {
            r: 0,
            g: 0,
            b: 255,
            a: 1,
          },
        },
        pressing: {
          typeface: ["Helvetica", "Arial", "Sans Serif"],
          size: 1,
          weight: 400,
          color: {
            r: 0,
            g: 255,
            b: 0,
            a: 1,
          },
        },
      },
    },
    shape: {
      notToggled: {
        none: {
          minWidth: 3,
          minHeight: 3,
          borderRadius: {
            top: {
              left: 1.5,
              right: 0,
            },
            bottom: {
              left: 0,
              right: 1.5,
            },
          },
        },
        hovering: {
          minWidth: 3,
          minHeight: 3,
          borderRadius: {
            top: {
              left: 1.5,
              right: 0,
            },
            bottom: {
              left: 0,
              right: 1.5,
            },
          },
        },
        pressing: {
          minWidth: 3,
          minHeight: 3,
          borderRadius: {
            top: {
              left: 1.5,
              right: 0,
            },
            bottom: {
              left: 0,
              right: 1.5,
            },
          },
        },
      },
      toggled: {
        none: {
          minWidth: 3,
          minHeight: 3,
          borderRadius: {
            top: {
              left: 1.5,
              right: 0,
            },
            bottom: {
              left: 0,
              right: 1.5,
            },
          },
        },
        hovering: {
          minWidth: 3,
          minHeight: 3,
          borderRadius: {
            top: {
              left: 1.5,
              right: 0,
            },
            bottom: {
              left: 0,
              right: 1.5,
            },
          },
        },
        pressing: {
          minWidth: 3,
          minHeight: 3,
          borderRadius: {
            top: {
              left: 1.5,
              right: 0,
            },
            bottom: {
              left: 0,
              right: 1.5,
            },
          },
        },
      },
    },
    elevation: {
      notToggled: {
        none: {
          fill: [
            {
              color: {
                r: 128,
                g: 128,
                b: 128,
                a: 1,
              },
            },
          ],
          innerShadow: [],
          dropShadow: [],
          stroke: [],
        },
        hovering: {
          fill: [
            {
              color: {
                r: 128,
                g: 128,
                b: 128,
                a: 1,
              },
            },
          ],
          innerShadow: [],
          dropShadow: [],
          stroke: [],
        },
        pressing: {
          fill: [
            {
              color: {
                r: 128,
                g: 128,
                b: 128,
                a: 1,
              },
            },
          ],
          innerShadow: [],
          dropShadow: [],
          stroke: [],
        },
      },
      toggled: {
        none: {
          fill: [
            {
              color: {
                r: 128,
                g: 128,
                b: 128,
                a: 1,
              },
            },
          ],
          innerShadow: [],
          dropShadow: [],
          stroke: [],
        },
        hovering: {
          fill: [
            {
              color: {
                r: 128,
                g: 128,
                b: 128,
                a: 1,
              },
            },
          ],
          innerShadow: [],
          dropShadow: [],
          stroke: [],
        },
        pressing: {
          fill: [
            {
              color: {
                r: 128,
                g: 128,
                b: 128,
                a: 1,
              },
            },
          ],
          innerShadow: [],
          dropShadow: [],
          stroke: [],
        },
      },
    },
  },
  content: {
    label: "hibob",
    iconLeft: {
      icon: faChessQueen,
      animateOnPress: "hide",
    },
    iconRight: {
      icon: faChessQueen,
      animateOnPress: "show",
    },
  },
  isToggleable: true,
};

const btn: Ref<InstanceType<typeof Button> | null> = ref(null);

const btnToggled = computed(() => {
  return btn.value ? btn.value.isToggled : false;
});

watch(
  () => btnToggled.value,
  (isToggled) => {
    console.log(isToggled);
  }
);
</script>
