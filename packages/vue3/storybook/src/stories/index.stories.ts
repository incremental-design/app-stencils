import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import BaseComponent from '@incremental.design/vue3-component-base';

export default {
  title: 'base component',
};

export const withText = () => ({
  components: { BaseComponent },
  template: '<base-component></base-component>',
  // methods: { action: action('clicked') },
});

// export const withJSX = () => ({
//   render() {
//     return (
//       <MyButton onClick={linkTo('Button', 'With Some Emoji')}>
//         With JSX
//       </MyButton>
//     );
//   },
// });
//
// export const withSomeEmoji = () => ({
//   components: { MyButton },
//   template: '<my-button>😀 😎 👍 💯</my-button>',
// });
