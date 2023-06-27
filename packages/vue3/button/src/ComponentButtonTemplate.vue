<template>
  <div :style="styles.fill[toggle][state]" role="button">
    <slot
      name="icon-left"
      v-bind="{
        toggle,
        state,
        styles: styles.iconLeft,
      }"
    >
      <FontAwesomeIcon
        v-if="iL"
        :icon="iL.icon"
        :style="styles.iconLeft[toggle][state]"
      />
    </slot>
    <slot
      name="label"
      v-bind="{
        toggle,
        state,
        styles: styles.label,
      }"
    >
      <p :style="styles.label[toggle][state]">
        {{ l }}
      </p>
    </slot>
    <slot
      name="icon-right"
      v-bind="{
        toggle,
        state,
        styles: styles.iconRight,
      }"
    >
      <FontAwesomeIcon
        v-if="iR"
        :icon="iR.icon"
        :style="styles.iconRight[toggle][state]"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import useProps, { Icon } from './useProps';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  Ref,
  watch,
  ref,
  computed,
  CSSProperties,
  ComputedRef,
  PropType,
} from 'vue';
import {
  makeElevationCSSRules,
  makeFontCSSRules,
  makeShapeCSSRules,
} from '@incremental.design/theme';
import { State } from '@incremental.design/vue3-component-base';

const props = defineProps({
  ...useProps,
  /**
   * isToggled - whether the button is toggled
   *
   * @values - true, false
   *
   */
  isToggled: {
    type: Boolean,
    default: () => false,
    required: true,
  },
  /**
   * state - the state of the button
   *
   * @values one of {@link State.hovering}, {@link State.pressing} or 'none'
   *
   */
  state: {
    type: String as PropType<State.hovering | State.pressing | 'none'>,
    default: () => 'none',
    required: true,
    validator: (value: State.hovering | State.pressing | 'none'): boolean =>
      [State.hovering, State.pressing, 'none'].includes(value),
  },
});

/* set button icon and label */

const iL: Ref<Icon | false> = ref(false);
const iR: Ref<Icon | false> = ref(false);
const l: Ref<string> = ref('');

const buttonContent = computed(() => props.options?.content);

watch(
  buttonContent,
  async (current) => {
    if (!current) return;
    const { iconLeft, iconRight, label } = current;
    l.value = label;
    iL.value = iconLeft ? iconLeft : false;
    iR.value = iconRight ? iconRight : false;
  },
  { immediate: true, deep: true }
);

/* make inline styles */

const transition = 'all 0.05s linear';

const toggle = computed(() => (props.isToggled ? 'toggled' : 'notToggled'));
const state = computed(() => {
  switch (props.state) {
    case 'none':
      return 'none';
    case State.hovering:
      return 'hovering';
    case State.pressing:
      return 'pressing';
    default:
      throw new Error('props.state was not supplied');
  }
});

const styles: ComputedRef<{
  fill: {
    notToggled: {
      none: CSSProperties;
      hovering: CSSProperties;
      pressing: CSSProperties;
    };
    toggled: {
      none: CSSProperties;
      hovering: CSSProperties;
      pressing: CSSProperties;
    };
  };
  iconLeft: {
    notToggled: {
      none: CSSProperties;
      hovering: CSSProperties;
      pressing: CSSProperties;
    };
    toggled: {
      none: CSSProperties;
      hovering: CSSProperties;
      pressing: CSSProperties;
    };
  };
  label: {
    notToggled: {
      none: CSSProperties;
      hovering: CSSProperties;
      pressing: CSSProperties;
    };
    toggled: {
      none: CSSProperties;
      hovering: CSSProperties;
      pressing: CSSProperties;
    };
  };
  iconRight: {
    notToggled: {
      none: CSSProperties;
      hovering: CSSProperties;
      pressing: CSSProperties;
    };
    toggled: {
      none: CSSProperties;
      hovering: CSSProperties;
      pressing: CSSProperties;
    };
  };
}> = computed(() => {
  const styles = {
    fill: {
      notToggled: {
        none: {},
        hovering: {},
        pressing: {},
      },
      toggled: {
        none: {},
        hovering: {},
        pressing: {},
      },
    },
    iconLeft: {
      notToggled: {
        none: {},
        hovering: {},
        pressing: {},
      },
      toggled: {
        none: {},
        hovering: {},
        pressing: {},
      },
    },
    label: {
      notToggled: {
        none: {},
        hovering: {},
        pressing: {},
      },
      toggled: {
        none: {},
        hovering: {},
        pressing: {},
      },
    },
    iconRight: {
      notToggled: {
        none: {},
        hovering: {},
        pressing: {},
      },
      toggled: {
        none: {},
        hovering: {},
        pressing: {},
      },
    },
  };

  const buttonStyles = props.options?.style;
  if (!buttonStyles) return styles;

  const fontCSS = ['notToggled', 'toggled'].map((t) => {
    return ['none', 'hovering', 'pressing'].map((s) =>
      makeFontCSSRules(buttonStyles.font[t][s])
    );
  });

  const shapeCSS = ['notToggled', 'toggled'].map((t) => {
    return ['none', 'hovering', 'pressing'].map((s) =>
      makeShapeCSSRules(buttonStyles.shape[t][s])
    );
  });

  const elevationCSS = ['notToggled', 'toggled'].map((t) => {
    return ['none', 'hovering', 'pressing'].map((s) =>
      makeElevationCSSRules(buttonStyles.elevation[t][s])
    );
  });

  const fillShared = {
    display: 'inline-grid',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'relative',
  };

  const [left, right] = [iL.value, iR.value].map((icon, index) => {
    const g = {
      noAnimate: {
        none: 'min-content',
        hovering: 'min-content',
        pressing: 'min-content',
      },
      showAnimate: {
        none: '0rem',
        hovering: '2rem',
        pressing: '2rem',
      },
      hideAnimate: {
        none: '2rem',
        hovering: '0rem',
        pressing: '0rem',
      },
    };

    const iO = {
      noAnimate: {
        none: 1,
        hovering: 1,
        pressing: 1,
      },
      showAnimate: {
        none: 0,
        hovering: 1,
        pressing: 1,
      },
      hideAnimate: {
        none: 1,
        hovering: 0,
        pressing: 0,
      },
    };

    const isLeft = index === 0;

    const iT = {
      noAnimate: {
        none: `translateX(0)`,
        hovering: `translateX(0)`,
        pressing: `translateX(0)`,
      },
      showAnimate: {
        none: `translateX(${isLeft ? '100%' : '-100%'})`,
        hovering: `translateX(0)`,
        pressing: `translateX(0)`,
      },
      hideAnimate: {
        none: `translateX(0)`,
        hovering: `translateX(${isLeft ? '100%' : '-100%'})`,
        pressing: `translateX(${isLeft ? '100%' : '-100%'})`,
      },
    };

    const a = icon
      ? icon.animateOnPress
        ? icon.animateOnPress === 'show'
          ? 'showAnimate'
          : 'hideAnimate'
        : 'noAnimate'
      : 'noAnimate';

    const gridTemplateColumn = g[a];
    const iconOpacity = iO[a];
    const iconTranslate = iT[a];

    return {
      gridTemplateColumn,
      iconOpacity,
      iconTranslate,
    };
  });

  const gridTemplateColumns = {
    none: `[icon-left] ${left.gridTemplateColumn.none} [label] min-content [icon-right] ${right.gridTemplateColumn.none}`,
    hovering: `[icon-left] ${left.gridTemplateColumn.hovering} [label] min-content [icon-right] ${right.gridTemplateColumn.hovering}`,
    pressing: `[icon-left] ${left.gridTemplateColumn.pressing} [label] min-content [icon-right] ${right.gridTemplateColumn.pressing}`,
  };

  const padding = [0, 1].map((t) => {
    return [0, 1, 2].map((s) => {
      return `max(0.5rem,${shapeCSS[t][s]['border-radius'].split(' ').join()})`;
    });
  });

  styles.fill = {
    notToggled: {
      none: {
        ...shapeCSS[0][0],
        ...elevationCSS[1][0],
        ...fillShared,
        gridTemplateColumns: gridTemplateColumns.none,
        transition,
        ...fontCSS[0][0],
        paddingLeft: padding[0][0],
        paddingRight: padding[0][0],
      },
      hovering: {
        ...shapeCSS[0][1],
        ...elevationCSS[1][1],
        ...fillShared,
        gridTemplateColumns: gridTemplateColumns.hovering,
        transition,
        ...fontCSS[0][1],
        paddingLeft: padding[0][1],
        paddingRight: padding[0][1],
      },
      pressing: {
        ...shapeCSS[0][2],
        ...elevationCSS[1][2],
        ...fillShared,
        gridTemplateColumns: gridTemplateColumns.pressing,
        transition,
        ...fontCSS[0][2],
        paddingLeft: padding[0][2],
        paddingRight: padding[0][2],
      },
    },
    toggled: {
      none: {
        ...shapeCSS[0][0],
        ...elevationCSS[1][0],
        ...fillShared,
        gridTemplateColumns: gridTemplateColumns.none,
        transition,
        ...fontCSS[1][0],
        paddingLeft: padding[1][0],
        paddingRight: padding[1][0],
      },
      hovering: {
        ...shapeCSS[0][1],
        ...elevationCSS[1][1],
        ...fillShared,
        gridTemplateColumns: gridTemplateColumns.hovering,
        transition,
        ...fontCSS[1][1],
        paddingLeft: padding[1][1],
        paddingRight: padding[1][1],
      },
      pressing: {
        ...shapeCSS[0][2],
        ...elevationCSS[1][2],
        ...fillShared,
        gridTemplateColumns: gridTemplateColumns.pressing,
        transition,
        ...fontCSS[1][2],
        paddingLeft: padding[1][2],
        paddingRight: padding[1][2],
      },
    },
  };

  const iconShared = {
    height: fontCSS['font-size'],
    boxSizing: 'content-box',
  };

  styles.iconLeft = {
    notToggled: {
      none: {
        ...iconShared,
        gridColumn: `icon-left / span 1`,
        transform: left.iconTranslate.none,
        opacity: left.iconOpacity.none,
        transition,
        justifySelf: 'start',
      },
      hovering: {
        ...iconShared,
        gridColumn: `icon-left / span 1`,
        transform: left.iconTranslate.hovering,
        opacity: left.iconOpacity.hovering,
        transition,
        justifySelf: 'start',
      },
      pressing: {
        ...iconShared,
        gridColumn: `icon-left / span 1`,
        transform: left.iconTranslate.pressing,
        opacity: left.iconOpacity.pressing,
        transition,
        justifySelf: 'start',
      },
    },
    toggled: {
      none: {
        ...iconShared,
        gridColumn: `icon-left / span 1`,
        transform: left.iconTranslate.none,
        opacity: left.iconOpacity.none,
        transition,
        justifySelf: 'start',
      },
      hovering: {
        ...iconShared,
        gridColumn: `icon-left / span 1`,
        transform: left.iconTranslate.hovering,
        opacity: left.iconOpacity.hovering,
        transition,
        justifySelf: 'start',
      },
      pressing: {
        ...iconShared,
        gridColumn: `icon-left / span 1`,
        transform: left.iconTranslate.pressing,
        opacity: left.iconOpacity.pressing,
        transition,
        justifySelf: 'start',
      },
    },
  };

  styles.label = {
    notToggled: {
      none: {
        gridColumn: `label / span 1`,
        transition,
      },
      hovering: {
        gridColumn: `label / span 1`,
        transition,
      },
      pressing: {
        gridColumn: `label / span 1`,
        transition,
      },
    },
    toggled: {
      none: {
        gridColumn: `label / span 1`,
        transition,
      },
      hovering: {
        gridColumn: `label / span 1`,
        transition,
      },
      pressing: {
        gridColumn: `label / span 1`,
        transition,
      },
    },
  };

  styles.iconRight = {
    notToggled: {
      none: {
        ...iconShared,
        gridColumn: `icon-right / span 1`,
        transform: right.iconTranslate.none,
        opacity: right.iconOpacity.none,
        transition,
        justifySelf: 'end',
      },
      hovering: {
        ...iconShared,
        gridColumn: `icon-right / span 1`,
        transform: right.iconTranslate.hovering,
        opacity: right.iconOpacity.hovering,
        transition,
        justifySelf: 'end',
      },
      pressing: {
        ...iconShared,
        gridColumn: `icon-right / span 1`,
        transform: right.iconTranslate.pressing,
        opacity: right.iconOpacity.pressing,
        transition,
        justifySelf: 'end',
      },
    },
    toggled: {
      none: {
        ...iconShared,
        gridColumn: `icon-right / span 1`,
        transform: right.iconTranslate.none,
        opacity: right.iconOpacity.none,
        transition,
        justifySelf: 'end',
      },
      hovering: {
        ...iconShared,
        gridColumn: `icon-right / span 1`,
        transform: right.iconTranslate.hovering,
        opacity: right.iconOpacity.hovering,
        transition,
        justifySelf: 'end',
      },
      pressing: {
        ...iconShared,
        gridColumn: `icon-right / span 1`,
        transform: right.iconTranslate.pressing,
        opacity: right.iconOpacity.pressing,
        transition,
        justifySelf: 'end',
      },
    },
  };

  return styles;
});
</script>
