import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useLocalStorage from "use-local-storage";
import './App.css';
import Minion from './components/Minion/Minion';
import Bubble from './components/Bubbles/Bubble';
import LetItOut from './components/LetItOut';

interface Quote {
  name: string, quote: string, _id: number
}
interface MousePosition {
  x: number,
  y: number
}
function App() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  const [language, setLanguage] = useLocalStorage("language", "en");
  const [tasks, setTasks] = useState<Quote[]>([]);
  const [newTask, setNewTask] = useState({ name: '', quote: '' });

  useEffect(() => {
    axios.get('http://localhost:3006/q')
      .then(response => {
        console.log(response.data)
        setTasks(response.data)
        console.log(tasks, ">>>>>>>>>>>>>>");
      })
      .catch(error => console.error('Error fetching tasks:', error));

  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3006/quotes', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ name: '', quote: '' });
      })
      .catch(error => console.error('Error creating task:', error));
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3006/quotes${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  //================================SNACKBAR LOGIC==================================
  const [isVisible, setIsVisible] = useState<boolean>(false)

  // const showSnackbar = () => {
  //   setIsVisible(true);
  //   setTimeout(() => setIsVisible(false), 3000);
  // };

  const vidRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (vidRef.current && canvasRef.current) {
      const vid = vidRef.current;
      const ctx = canvasRef.current.getContext('2d');

      const drawVid = () => {
        if (vid) {
          ctx?.drawImage(vid, 0, 0, vid.width, vid.height);
          const frame = ctx?.getImageData(0, 0, vid.width, vid.height);
          if (frame) {
            for (let i = 0; i < frame.data.length; i += 4) {
              const r = frame.data[i];
              const g = frame.data[i + 1];
              const b = frame.data[i + 2];
              if (r > 10 && r < 100 && g > 100 && g < 190 && b < 50) {
                frame.data[i + 3] = 0;
              }
            }

            if (vidRef.current.paused) {
              setIsVisible(false);
            }


            ctx?.putImageData(frame, 0, 0);
          }
        }
        requestAnimationFrame(drawVid);
      };

      vid.addEventListener('play', drawVid);

      return () => {
        vid.removeEventListener('play', drawVid);
      };
    }
  }, []);

  // const showSnackbar = () => {
  //   setIsVisible(true);
  //   setTimeout(() => setIsVisible(false), 3000);

  //   if (vidRef.current && canvasRef.current) {
  //     const vid = vidRef.current;
  //     const ctx = canvasRef.current.getContext('2d');

  //     const drawVid = () => {
  //       if (vid && vid.videoWidth && vid.videoHeight && canvasRef && canvasRef.current) { // Check if video dimensions are available

  //         if (canvasRef && canvasRef.current && canvasRef.current?.width)
  //           canvasRef.current.width = vid.videoWidth; // Set canvas width to video width
  //         if (canvasRef && canvasRef?.current && canvasRef?.current?.height)
  //           canvasRef.current.height = vid.videoHeight; // Set canvas height to video height
  //         ctx?.drawImage(vid, 0, 0, vid.width, vid.height);
  //         const frame = ctx?.getImageData(0, 0, vid.width, vid.height);
  //         if (frame) {
  //           for (let i = 0; i < frame.data.length; i += 4) {
  //             const r = frame.data[i];
  //             const g = frame.data[i + 1];
  //             const b = frame.data[i + 2];
  //             if (r > 10 && r < 100 && g > 100 && g < 190 && b < 50) {
  //               frame.data[i + 3] = 144;
  //             }
  //           }
  //           ctx?.putImageData(frame, 0, 0);
  //         }
  //       }
  //       requestAnimationFrame(drawVid);
  //     };

  //     vid.addEventListener('play', drawVid);

  //     return () => {
  //       vid.removeEventListener('play', drawVid);
  //     };
  //   }
  // };

  const showSnackbar = () => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);

    if (vidRef.current && canvasRef.current) {
      const vid: HTMLVideoElement | null = vidRef.current;
      const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext('2d');

      const drawVid = (): void => {
        if (vid && vid.readyState >= 2 && vid.videoWidth && vid.videoHeight && ctx) {

          if (canvasRef && canvasRef.current) {
            canvasRef.current.width = vid.videoWidth;
            canvasRef.current.height = vid.videoHeight;
          }
          ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

          // Your image manipulation logic goes here

          requestAnimationFrame(drawVid);
        }
      };

      vid.addEventListener('loadedmetadata', drawVid);

      return () => {
        if (vid) {
          vid.removeEventListener('loadedmetadata', drawVid);
        }
      };
    }
  };

  return (
    <>
      <LetItOut />
      {/* <Bubble />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        <Minion id="1" />
        <Minion id="2" />
      </div> */}

      {/* <button onClick={showSnackbar}>Show SnackBar</button> */}

      {/* <video controls loop className="vid" ref={vidRef}>
        <source src="/src/assets/Bubble.mp4" type="video/mp4" />
      </video>

      <div className="box">
        <canvas ref={canvasRef}></canvas>
      </div> */}

      {/* <div id="snackbar" className={isVisible ? "show" : ""}>Some text some message..</div> */}

    </>
    // <>
    //   <p> {`x:${mousePos.x} y:${mousePos.y}`}</p>
    //   <div style={{ marginTop: "210px", marginLeft: '600px', height: "500px", width: "500px" }}>
    //     <Card3D />
    //   </div>
    //   <LetItOut />
    //   <div className="App" data-language={language} data-theme={isDark ? "dark" : "light"}>
    //     <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />

    //     <div>
    //       <h1>Language Translator</h1>

    //       <label htmlFor="languageSelect">Select Language:</label>
    //       <select
    //         id="languageSelect"
    //         onChange={(e) => setLanguage(e.target.value)}
    //         value={language}
    //       >
    //         <option value="en">English</option>
    //         <option value="urdu">Urdu</option>
    //       </select>

    //       <p>{language === 'en' ? 'Hello' : 'ہیلو'}</p>

    //     </div>
    //     <h1 className="title">Hello world!</h1>

    //     <div className="box">
    //       <h2>This is a box</h2>
    //     </div>

    //     <h1>Quote List IT</h1>

    //     <ul>
    //       {tasks.length > 0 && tasks.map(task => (
    //         <li key={task._id}>
    //           {task.name} - {task.quote}
    //           <button onClick={() => handleDelete(task._id)}>Delete</button>
    //         </li>
    //       ))}
    //     </ul>
    //     <input
    //       type="text"
    //       name="name"
    //       placeholder="Name"
    //       value={newTask.name}
    //       onChange={handleInputChange}
    //     />
    //     <input
    //       type="text"
    //       name="quote"
    //       placeholder="Quote"
    //       value={newTask.quote}
    //       onChange={handleInputChange}
    //     />
    //     <button onClick={handleSubmit}>Add Quote</button>

    //     <footer>
    //       <h1>
    //         WE RUMORS & CONJECTURE, NOT FACTS. IN ADDITION TO INFORMATION REPORTED DIRECTLY FROM SOURCES, CERTAIN CHARACTERS, SITUATIONS, AND EVENTS PORTRAYED ON THIS WEBSITE ARE EITHER PRODUCTS OF THE AUTHORS IMAGINATION OR CONJECTURE. INFORMATION ON THIS WEBSITE MAY CONTAIN INACCURACIES. THE PROPRIETOR OF THIS WEBSITE DOES NOT MAKE WARRANTY AS TO THE RELIABILITY, VALIDITY OR CORRECTNESS OF THE CONTENT OF THE SITE’S CONTENT OR OF THE INFORMATION SENT DIRECTLY FROM SOURCES. MATERIALS PUBLISHED ON THIS SITE SENT DIRECTLY FROM OTHER SOURCES ARE NOT OUR RESPONSIBILITY.
    //       </h1>
    //       <h1>
    //         2023 ALL RIGHTS RESERVED.
    //       </h1>
    //       <h2>
    //         آسان نہیں ہے مجھے پڑھ لینا<br />
    //         لفظوں کی نہیں جذبات کی کتاب ہوں میں
    //       </h2>
    //     </footer>
    //   </div>
    // </>
  );
}

export default App
