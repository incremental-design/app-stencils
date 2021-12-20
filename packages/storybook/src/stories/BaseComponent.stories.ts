import BaseComponent from '@incremental.design/component-base';

export default {
  title: 'Base Component',
  component: BaseComponent,
  argTypes: {
    isHoverable: { control: 'boolean' },
    isPeekable: { control: 'boolean' },
    isPressable: { control: 'boolean' },
    isToggleable: { control: 'boolean' },
    isDraggable: { control: 'boolean' },
    isSnappable: { control: 'boolean' },
    isSelectable: { control: 'boolean' },
    isFocusable: { control: 'boolean' },
  },
  args: {
    isHoverable: true,
    isPeekable: true,
    isPressable: true,
    isToggleable: true,
    isDraggable: true,
    isSnappable: true,
    isSelectable: true,
    isFocusable: true,
  },
};

type BaseComponentArgs = {
  isHoverable: boolean;
  isPeekable: boolean;
  isPressable: boolean;
  isToggleable: boolean;
  isDraggable: boolean;
  isSnappable: boolean;
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
    '<base-component :isHoverable="args.isHoverable" :isPeekable="args.isPeekable" :isPressable="args.isPressable" :isToggleable="args.isToggleable" :isDraggable="args.isDraggable" :isSnappable="args.isSnappable" :isSelectable="args.isSelectable" :isFocusable="args.isFocusable"></base-component>',
});

export const Empty = Template.bind({});
Empty.args = {
  isHoverable: true,
  isPeekable: false,
  isPressable: false,
  isToggleable: false,
  isDraggable: false,
  isSnappable: false,
  isSelectable: false,
  isFocusable: false,
} as BaseComponentArgs;
