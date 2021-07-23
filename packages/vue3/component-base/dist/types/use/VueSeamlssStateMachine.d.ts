import { UnwrapNestedRefs, WritableComputedRef } from '@vue/reactivity';
import SEAMLSS from '@/use/Seamlss/SeamlssIntefaces';
declare type States<Affordances> = UnwrapNestedRefs<{
    [State in keyof Affordances]: Affordances[State] | WritableComputedRef<Affordances[State]>;
}>;
interface VueReactiveStateMachine<Affordances> {
    states: States<Affordances>;
}
export declare class ButtonStates implements VueReactiveStateMachine<SEAMLSS.Affordances.Focusable & SEAMLSS.Affordances.Pressable> {
    /**
     * This class keeps track of the state of a button.
     * @remarks
     * Use this class to represent the state of a button that can be focused (and hovered), and also pressed.
     * This class furnishes and `isPressed` and `isFocused` state. It also makes sure that `isPressed` is only true if `isFocused` is true.
     * This class does not furnish any behavior. It literally only keeps track of whether a button is focused, pressed or both.
     * This class implements a state machine in a {@link `reactive` | https://v3.vuejs.org/api/basic-reactivity.html#reactive} object.
     *
     */
    states: {
        isFocused: boolean;
        _pressed: boolean;
        isPressed: boolean;
    };
    constructor();
}
export {};
//# sourceMappingURL=VueSeamlssStateMachine.d.ts.map