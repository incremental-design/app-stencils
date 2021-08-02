import { reactive, computed } from 'vue';
import { UnwrapNestedRefs, WritableComputedRef } from '@vue/reactivity';
import SEAMLSS from '@/use/Seamlss/SeamlssIntefaces';

type States<Affordances> = UnwrapNestedRefs<
  {
    [State in keyof Affordances]:
      | Affordances[State]
      | WritableComputedRef<Affordances[State]>;
  }
>; // this means that given a certain type of Affordances, `states` will contain either the members of Affordances, or `WriteableComputedRef`s that wrap those members.

interface VueReactiveStateMachine<Affordances> {
  states: States<Affordances>;
}

export class ButtonStates
  implements
    VueReactiveStateMachine<
      SEAMLSS.Affordances.Focusable & SEAMLSS.Affordances.Pressable
    > {
  /**
   * This class keeps track of the state of a button.
   * @remarks
   * Use this class to represent the state of a button that can be focused (and hovered), and also pressed.
   * This class furnishes and `isPressed` and `isFocused` state. It also makes sure that `isPressed` is only true if `isFocused` is true.
   * This class does not furnish any behavior. It literally only keeps track of whether a button is focused, pressed or both.
   * This class implements a state machine in a {@link `reactive` | https://v3.vuejs.org/api/basic-reactivity.html#reactive} object.
   *
   */
  #internal: UnwrapNestedRefs<any>; // ES2020 private fields ftw

  public states;
  constructor() {
    this.#internal = reactive({
      pressed: true,
    });

    const states = reactive({
      isFocused: true,
      isPressed: computed({
        get: (): boolean => {
          return this.states.isFocused && this.#internal.pressed;
        },
        set: (value: boolean) => {
          this.#internal.pressed = value;
        },
      }),
    });

    this.states = states;
  }
}
