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

const makeAffordanceString = (A: BaseComponentArgs) =>
  `${A.isHoverable ? 'isHoverable' : ''}${A.isPeekable ? ' isPeekable' : ''}${
    A.isPressable ? ' isPressable' : ''
  }${A.isToggleable ? ' isToggleable' : ''}${
    A.isDraggable ? ' isDraggable' : ''
  } ${A.isSnappable ? ' isSnappable' : ''}${
    A.isSelectable ? ' isSelectable' : ''
  }${A.isFocusable ? ' isFocusable' : ''}`;

const Template = (args: BaseComponentArgs) => {
  const AffordanceString = makeAffordanceString(args);
  return {
    components: { BaseComponent },
    setup() {
      return {
        args: {
          AffordanceString,
        },
      };
    },
    template: '<base-component AffordanceString></base-component>',
  };
};

export const ExampleStory = Template.bind({});
ExampleStory.args = {
  isHoverable: true,
  isPeekable: false,
  isPressable: false,
  isToggleable: false,
  isDraggable: false,
  isSnappable: false,
  isSelectable: false,
  isFocusable: false,
};
