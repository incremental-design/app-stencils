import { UnwrapNestedRefs, WritableComputedRef } from '@vue/reactivity';
import SEAMLSS from '@/use/Seamlss/SeamlssIntefaces';
declare type States<Affordances> = UnwrapNestedRefs<{
    [State in keyof Affordances]: Affordances[State] | WritableComputedRef<Affordances[State]>;
}>;
interface VueReactiveStateMachine<Affordances> {
    states: States<Affordances>;
}
export declare class ButtonStates implements VueReactiveStateMachine<SEAMLSS.Affordances.Focusable & SEAMLSS.Affordances.Pressable> {
    #private;
    states: {
        isFocused: boolean;
        isPressed: boolean;
    };
    constructor();
}
export {};
//# sourceMappingURL=VueSeamlssStateMachine.d.ts.map