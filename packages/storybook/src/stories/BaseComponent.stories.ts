import BaseComponent from '@incremental.design/component-base';

export default {
  title: 'Base Component',
  component: BaseComponent,
  argTypes: {
    isHoverable: { control: 'boolean' },
    isPeekable: { control: 'boolean' },
    isPressable: { control: 'boolean' },
    isToggleable: { control: 'boolean' },
    isSlideable: { control: 'boolean' },
    isSelectable: { control: 'boolean' },
    isFocusable: { control: 'boolean' },
    logStateChange: { action: '@stateChange' },
    logPointerInput: { action: '@pointerInput' },
  },
  args: {
    isHoverable: true,
    isPeekable: true,
    isPressable: true,
    isToggleable: true,
    isSlideable: true,
    isSelectable: true,
    isFocusable: true,
  },
};

type BaseComponentArgs = {
  isHoverable: boolean;
  isPeekable: boolean;
  isPressable: boolean;
  isToggleable: boolean;
  isSlideable: boolean;
  isSelectable: boolean;
  isFocusable: boolean;
};
const Template = (args: BaseComponentArgs) => ({
  components: { BaseComponent },
  setup() {
    return {
      args,
    };
  },
  template:
    '<base-component :isHoverable="args.isHoverable" :isPeekable="args.isPeekable" :isPressable="args.isPressable" :isToggleable="args.isToggleable" :isSlideable="args.isSlideable" :isSelectable="args.isSelectable" :isFocusable="args.isFocusable" @stateChange="args.logStateChange" @pointerInput="args.logPointerInput"><div style="width: 100px; height: 100px; background: blue"></div><div style="marginLeft:100px; width: 100px; height: 100px; background: red"></div></base-component>',
});

export const Empty = Template.bind({});
Empty.args = {
  isHoverable: true,
  isPeekable: false,
  isPressable: false,
  isToggleable: false,
  isSlideable: false,
  isSelectable: false,
  isFocusable: false,
} as BaseComponentArgs;
