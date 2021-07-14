/**
 * SEAMLSS Design System Interfaces
 *
 * The SEAMLSS Design System categorizes the parts of a user interface into content, controls, chunks, sections, and layouts.
 * Content consists of anything that has meaning to an end user, regardless of its interactivity. If you can view it, read it, listen to it, or otherwise play it back, without actually interacting with it, it's content.
 * Controls consist of anything a user can interact with, that doesn't necessarily contain meaning on it own. If you tan tap it, press it, click it, drag it, drop it, or otherwise manipulate it, it's a control.
 * Chunks consist of two or more content and controls grouped together, such that the controls manipulate the content. Examples of chunks include video players and text editors.
 * Sections consist of one or more content, controls or chunks of similar types. Examples include lists, feeds, tables, and grids.
 * Layouts consist of one or more sections, fit within an application window.
 *
 * Each piece of a user interface has states and affordances. States are the different appearances a piece of the user interface can exhibit. Affordances are the inputs that transition the piece from one state to another. For example, a button has a not focused, focused, not pressed, and pressed state. Hovering on a button with a mouse cursor transitions it from the not focused state to the focused state. Once the button is in the focused state, clicking the button with the mouse transitions it from the not pressed state to the pressed state.
 * Notice how certain states can overlap, while others can't. A button can be both _focused_ and _pressed_, but cannot be _not focused_ and _pressed_. SEAMLSS Design System Interfaces not only define what states each of the piece of a user interface can have, but also how those states can overlap.
 */

declare namespace SEAMLSS {
  declare namespace Affordances {
    // ! Content and Control Affordances

    type Focusable = {
      isFocused: boolean;
      // onFocus: Function;
    };
    type Peekable = {
      isPeeking: boolean;
      // onPeek: Function;
    };
    type Selectable =
      | Focusable
      | {
          isSelected: boolean;
          // onSelect: Function;
        };
    type Copyable =
      | Selectable
      | {
          // onCopy: Function;
        };
    type Pasteable =
      | Copyable
      | {
          // onPaste: Function;
        };
    type Replicable = Affordance | Selectable | {};
    type Editable =
      | Selectable
      | {
          isEditing: boolean;
          // onEdit: Function;
          // afterEditingStops: Function;
        };
    type Typeable =
      | Editable
      | {
          isTyping: boolean;
          // onType: Function;
          // afterTypingStops: Function;
        };
    type Drawable =
      | Editable
      | {
          isDrawing: boolean;
          // onDraw: Function;
          // afterDrawingStops: Function;
        };
    type Recordable =
      | Editable
      | {
          isRecording: boolean;
          // onRecord: Function;
          // afterRecordingStops: Function;
        };
    type Deleteable =
      | Selectable
      | {
          // onDelete: Function;
        };
    type Createable = {
      // onCreate: Function;
    };
    type Toggleable<Option> = {
      options: Array<Option>;
      toggledIndex: Number;
    };
    type Draggable<Option extends Number> =
      | Toggleable<Option>
      | {
          minimum: Option;
          maximum: Option;
        };
    type Snappable<Option extends Number> =
      | Draggable<Option>
      | {
          options: Array<Option>;
          indexOfSnappedOption: number;
        };
    type Pressable = {
      isPressed: boolean;
    };

    // !Collection Item Affordances

    type Arrangeable = Selectable | {};
    type Nestable = Arrangeable | {};
    type Removable = {};
    type Resizeable = {};
    type Expandable = Resizeable | {};
    type Collapsible = Expandable | {};
    type Tileable = {};

    // !Canvas Item Affordances

    type Moveable = Selectable | {};
    type Translateable = Moveable | {};
    type Rotateable = Moveable | {};
    type Alignable = Moveable | {};
    type Layerable = Alignable | {};
    type Stretchable = Selectable | {};
    type Scaleable = Stretchable | {};
    type Groupable = Selectable | {};
    type Editable = Selectable | {};
    type Effectable = Editable | {};

    // TODO: add canvas and collection affordances
  }
  declare namespace Components {
    // !Components

    type Item = {};
    type Content = Item | {};
    type Control = Item | {};
    type Chunk = Item | {};
    type CollectionItem<Item> = {};
    type CanvasItem<Item> = {};
    type Section = Iterable<Item> | {};
    type Collection<CollectionItem> = Section | {};
    type Canvas<CanvasItem> = Section | {};
    type Layout<Section> = {};
  }
}

export default SEAMLSS;
