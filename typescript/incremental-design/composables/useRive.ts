import {Rive} from '@rive-app/canvas'

const useRive = (cv: Ref<HTMLCanvasElement>, src: string) => {
  // let unmount: () => void
  onMounted(() => {
    const r = new Rive({
      src,
      canvas: cv.value as HTMLCanvasElement,
      autoplay: true,
      stateMachines: "State Machine 1",
      onLoop: true,
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
      },
    });
    console.log(cv.value,src, r);
    // unmount = () => r.cleanup();
  });

  // onUnmounted(() => unmount())
}

export default useRive
