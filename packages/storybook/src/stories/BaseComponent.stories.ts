import BaseComponent from '@incremental.design/component-base';

export default {
  title: 'Base Component',
};

export const MyStory = () => ({
  components: { BaseComponent },
  template: '<base-component></base-component>',
});
