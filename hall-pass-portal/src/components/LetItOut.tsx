// import axios from "axios";
import girls from "../assets/image-from-rawpixel-id-6613301-png.png";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./LetItOut.css";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

type FormInputs = {
  pseudonym: string;
  email: string;
  title: string;
  tea: string;
}

const schema = yup.object({
  pseudonym: yup.string().required(),
  email: yup.string().email().required(),
  title: yup.string().required(),
  tea: yup.string().required(),
}).required();

const LetItOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
  })

  const [newTea, setNewTea] = useState({ pseudonym: '', title: '', tea: '', email: '' });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data)

  // const onSubmitOld = async () => {
  //   axios.post('http://localhost:3006/submitTea', newTea, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     .then(async response => {
  //       await console.log(response.data);
  //       setNewTea({pseudonym: '', email: '', title: '', tea: '' });
  //     })
  //     .catch(error => console.error('Error creating task:', error));
  // };


  return (
    <div className="page-style">
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ width: "100%", paddingTop: "10%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div> Spill It Out! </div>

            <label htmlFor="Pseudonym"> Pseudonym </label>
            <br />
            <input {...register("pseudonym", { required: true })} type="text" name="pseudonym" id="Pseudonym" onChange={(e) => setNewTea({ ...newTea, pseudonym: e.target.value })} />
            {errors.pseudonym && <span>This field is required</span>}

            <br />

            <label htmlFor="Email"> Email </label>
            <br />
            <input {...register("email", { required: true })} type="text" name="email" id="Email" onChange={(e) => setNewTea({ ...newTea, email: e.target.value })} />
            {errors.email && <span>This field is required</span>}

            <br />

            <label htmlFor="title"> Title</label>
            <br />
            <input {...register("title", { required: true })} type="text" name="title" id="title" onChange={(e) => setNewTea({ ...newTea, title: e.target.value })} />
            {errors.title && <span>This field is required</span>}

            <br />

            <label htmlFor="tea"> Tea/Message </label>
            <br />
            <textarea {...register("tea", { required: true })} style={{ width: "100%" }} id="tea" name="tea" onChange={(e) => setNewTea({ ...newTea, tea: e.target.value })}></textarea>
            <br />
            {errors.tea && <span>This field is required</span>}

            <br />

            <button type="submit">Spill It.</button>
            <input type="submit" />


            {/* ART DECO BUTTON */}
            {/* <main className="main">

<div className="button">
<div className="button__ornament button__ornament--vertical">
<div className="button__ornament-top-bottom"></div>
<div className="button__ornament-left-right"></div>
</div>

<div className="button__ornament button__ornament--horisontal">
            <div className="button__ornament-top-bottom"></div>
            <div className="button__ornament-left-right"></div>
            </div>
            
            <span className="button__label">Spill It</span>
            </div>
            
          </main> */}

            {/* DRIPPING BUTTON IDEA */}
            {/* <div className="loader">
        <div className="loader-bg">
        <p>HEHE</p>
        </div>
        <div className="drops">
        <div className="drop1"></div>
        <div className="drop2"></div>
        </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
        <filter id="liquid">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
        </filter>
        </defs>
      </svg> */}




            {/* ART DECO BUTTON: */}

            {/* <div className="video-controls">
        <button video-id="BtyBjOW8sGY" className="btn watch-video-btn">
        <img src="https://cdn-hogwartslegacy.warnerbrosgames.com/static/play-button-shadow.png" alt="" className="circle" />
        <img src="https://cdn-hogwartslegacy.warnerbrosgames.com/static/play-button-outer.png" alt="" className="circle" />
        <img src="https://cdn-hogwartslegacy.warnerbrosgames.com/static/play-button-inner.png" alt="" className="circle" />
        <img src="https://cdn-hogwartslegacy.warnerbrosgames.com/static/play-button-lip.png" alt="" className="circle" />
        <img src="https://cdn-hogwartslegacy.warnerbrosgames.com/static/play-button-arrow.png" alt="" className="center" /></button>
      </div> */}

          </form>
        </div>

        <img className="img-girls" src={girls} />

      </div>

    </div>
  )
}

export default LetItOut

// import React, {
//   createContext,
//   useState,
//   useContext,
//   useRef,
//   useEffect,
// } from "react";

// const MouseEnterContext = createContext<
//   [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
// >(undefined);

// export const CardContainer = ({
//   children,
//   className,
//   containerClassName,
// }: {
//   children?: React.ReactNode;
//   className?: string;
//   containerClassName?: string;
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isMouseEntered, setIsMouseEntered] = useState(false);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!containerRef.current) return;
//     const { left, top, width, height } =
//       containerRef.current.getBoundingClientRect();
//     const x = (e.clientX - left - width / 2) / 25;
//     const y = (e.clientY - top - height / 2) / 25;
//     containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
//   };

//   const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
//     setIsMouseEntered(true);
//     if (!containerRef.current) return;
//   };

//   const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!containerRef.current) return;
//     setIsMouseEntered(false);
//     containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
//   };
//   return (
//     <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
//       <div
//         className={
//           "py-20 flex items-center justify-center",
//           containerClassName
//         }
//         style={{
//           perspective: "1000px",
//         }}
//       >
//         <div
//           ref={containerRef}
//           onMouseEnter={handleMouseEnter}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//           className={cn(
//             "flex items-center justify-center relative transition-all duration-200 ease-linear",
//             className
//           )}
//           style={{
//             transformStyle: "preserve-3d",
//           }}
//         >
//           {children}
//         </div>
//       </div>
//     </MouseEnterContext.Provider>
//   );
// };

// export const CardBody = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div
//       className={cn(
//         "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// };

// export const CardItem = ({
//   as: Tag = "div",
//   children,
//   className,
//   translateX = 0,
//   translateY = 0,
//   translateZ = 0,
//   rotateX = 0,
//   rotateY = 0,
//   rotateZ = 0,
//   ...rest
// }: {
//   as?: React.ElementType;
//   children: React.ReactNode;
//   className?: string;
//   translateX?: number | string;
//   translateY?: number | string;
//   translateZ?: number | string;
//   rotateX?: number | string;
//   rotateY?: number | string;
//   rotateZ?: number | string;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [isMouseEntered] = useMouseEnter();

//   useEffect(() => {
//     handleAnimations();
//   }, [isMouseEntered]);

//   const handleAnimations = () => {
//     if (!ref.current) return;
//     if (isMouseEntered) {
//       ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
//     } else {
//       ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
//     }
//   };

//   return (
//     <Tag
//       ref={ref}
//       className={cn("w-fit transition duration-200 ease-linear", className)}
//       {...rest}
//     >
//       {children}
//     </Tag>
//   );
// };

// // Create a hook to use the context
// export const useMouseEnter = () => {
//   const context = useContext(MouseEnterContext);
//   if (context === undefined) {
//     throw new Error("useMouseEnter must be used within a MouseEnterProvider");
//   }
//   return context;
// };