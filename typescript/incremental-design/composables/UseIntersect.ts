import {
  ObserveCb,
  RegisterObserve,
  UnobserveCb,
  observeIntersectionInjectable,
} from "./Injectables";

export default (el: Ref<HTMLElement | null>): Ref<boolean> => {

    const intersecting = ref(false); // the output

    const oi = inject(observeIntersectionInjectable) as RegisterObserve;
    const onIntersect: ObserveCb = (e) => {
    intersecting.value = e.isIntersecting;
    };

    let cb: UnobserveCb;

    watchEffect(() => {
        if (el.value){
            /* should NEVER execute ... here as a type guard only */
            cb = oi(el.value, onIntersect);
        }
    })

    onUnmounted(() => {
    cb();
    });

    return intersecting

}

