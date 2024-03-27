import { useEffect, useRef } from 'react';
import "./Bubble.css";

function Bubble(): JSX.Element {
  const vidRef = useRef<HTMLVideoElement>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const processor = useRef<{
    video: HTMLVideoElement | null;
    c1: HTMLCanvasElement | null;
    ctx1: CanvasRenderingContext2D | null;
    c2: HTMLCanvasElement | null;
    ctx2: CanvasRenderingContext2D | null;
    width: number;
    height: number;
    timerCallback: () => void;
    doLoad: () => void;
    computeFrame: () => void;
  }>({
    video: null,
    c1: null,
    ctx1: null,
    c2: null,
    ctx2: null,
    width: 0,
    height: 0,
    timerCallback: function () {
      if (!this.video?.paused && !this.video?.ended) {
        this.computeFrame();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        setTimeout(function () {
          self.timerCallback();
        }, 0);
      }
    },
    doLoad: function () {
      this.video = document.getElementById("video") as HTMLVideoElement;
      this.c1 = document.getElementById("c1") as HTMLCanvasElement;
      this.ctx1 = this.c1.getContext("2d");
      this.c2 = document.getElementById("c2") as HTMLCanvasElement;
      this.ctx2 = this.c2.getContext("2d");
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      this.video.addEventListener("play", function () {
        if (self.video) {
          self.width = self.video.videoWidth / 2;
          self.height = self.video.videoHeight / 2;
          self.timerCallback();
        }
      }, false);
    },
    computeFrame: function () {
      if (this.ctx1 && this.ctx2 && this.video) {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        const frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        const l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
          const r = frame.data[i * 4 + 0];
          const g = frame.data[i * 4 + 1];
          const b = frame.data[i * 4 + 2];
          // if (g == 255 && r >= 16 && r <= 80 && b >= 2 && b <= 90)
          // if ((Math.abs(r - 16) < 20 && Math.abs(g - 255) < 20 && Math.abs(b - 2) < 20)
          //   ||
          //   (Math.abs(r - 207) < 20 && Math.abs(g - 255) < 20 && Math.abs(b - 200) < 20)

          //   // || (Math.abs(r - 55) < 20 && Math.abs(g - 230) < 20 && Math.abs(b - 44) < 20)
          // )

          // if (r !== 240 && b < 240)

          // if ((Math.abs(r - 16) < 20 && Math.abs(g - 255) < 20 && Math.abs(b - 2) < 20) ||
          //   (Math.abs(r - 207) < 20 && Math.abs(g - 255) < 20 && Math.abs(b - 200) < 20) ||
          //   (Math.abs(r - 255) < 20 && Math.abs(g - 0) < 20 && Math.abs(b - 0) < 20) ||
          //   (Math.abs(r - 55) < 20 && Math.abs(g - 230) < 20 && Math.abs(b - 44) < 20) ||
          //   (Math.abs(r - 114) < 20 && Math.abs(g - 255) < 20 && Math.abs(b - 106) < 20) ||
          //   (Math.abs(r - 179) < 20 && Math.abs(g - 255) < 20 && Math.abs(b - 173) < 20))

          if (r < 217 && r < 217 && b < 217)
            frame.data[i * 4 + 3] = 0;
        }
        this.ctx2.putImageData(frame, 0, 0);
      }
    }
  });

  useEffect(() => {
    processor.current.doLoad();
  }, []);

  // const removeGreenColor = () => {
  //   setIsProcessing(true);

  //   if (vidRef.current && canvasRef.current) {
  //     const vid: HTMLVideoElement | null = vidRef.current;
  //     const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');

  //     if (ctx && vid) {
  //       vid.addEventListener('loadedmetadata', () => {
  //         canvasRef.current!.width = vid.videoWidth;
  //         canvasRef.current!.height = vid.videoHeight;

  //         const drawVideo = (): void => {
  //           if (vid && vid.readyState >= 2 && vid.videoWidth && vid.videoHeight) {
  //             ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

  //             const frame: ImageData | null = ctx.getImageData(0, 0, vid.videoWidth, vid.videoHeight);
  //             if (frame) {
  //               for (let i = 0; i < frame.data.length; i += 4) {
  //                 const r = frame.data[i];
  //                 const g = frame.data[i + 1];
  //                 const b = frame.data[i + 2];
  //                 // Remove green color
  //                 if (g > 100 && g < 190 && r < 100 && b < 100) {
  //                   frame.data[i + 3] = 0; // Set alpha to 0 to make it transparent
  //                 }
  //               }
  //               ctx.putImageData(frame, 0, 0);
  //             }

  //             requestAnimationFrame(drawVideo);
  //           }
  //         };

  //         requestAnimationFrame(drawVideo);
  //         setIsProcessing(false);
  //       });

  //       setIsProcessing(false);

  //       // Error handling
  //       vid.onerror = () => {
  //         console.error("Error loading video");
  //         setIsProcessing(false);
  //       };
  //     }
  //   } else {
  //     console.error("Video or canvas element is not available");
  //     setIsProcessing(false);
  //   }
  // };


  return (
    <div>
      {/* <video controls ref={vidRef} autoPlay >
        <source src="/src/assets/Bubble.mp4" type="video/mp4" />
      </video>
      <br />
      <button onClick={removeGreenColor} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Remove Green Color'}
      </button>
      <canvas ref={canvasRef} style={{ backgroundColor: "purple" }}></canvas> */}

      <div>
        <video id="video" src="/src/assets/Bubble.mp4" controls={true || undefined} />
      </div>
      <div style={{ display: "none" }}>
        <canvas id="c1" width="160" height="96"></canvas>
      </div>
      <br />
      <br />

      <canvas id="c2" className='lol' width={vidRef.current?.width} height={vidRef.current?.height}></canvas>
    </div>
  );
}

export default Bubble;
