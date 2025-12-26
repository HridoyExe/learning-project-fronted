import { useEffect, useState } from "react";

const DiscountTimer = () => {

    const targetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 30 // set 30 days  countdown

    const getTimeRemaining = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };

    };

    const [timeLeft, setTimeLeft ] = useState(getTimeRemaining())

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTimeLeft(getTimeRemaining())
        },1000)

        return ()=> clearInterval(timer)
    },[])
    return (
        <div className="flex gap-4 mt-4">
            <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">{timeLeft.days}</div>
                <span className="text-sm">Days</span>
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">{timeLeft.hours}</div>
                <span className="text-sm">Hrs</span>
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">{timeLeft.minutes}</div>
                <span className="text-sm">Min</span>
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">{timeLeft.seconds}</div>
                <span className="text-sm">Sec</span>
            </div>
        </div>
    );
};

export default DiscountTimer;




// import { useEffect, useState } from "react";

// const DiscountTimer = () => {
//   // ৩০ দিনের সময় (milliseconds)
//   const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

//   // localStorage থেকে আগের তারিখ নেওয়া
//   const getStoredTargetDate = () => {
//     const saved = localStorage.getItem("discount_target_date");
//     if (saved) return parseInt(saved, 10);

//     const newTarget = new Date().getTime() + THIRTY_DAYS;
//     localStorage.setItem("discount_target_date", newTarget);
//     return newTarget;
//   };

//   const [targetDate] = useState(getStoredTargetDate);

//   const getTimeRemaining = () => {
//     const now = new Date().getTime();
//     const difference = targetDate - now;

//     if (difference <= 0) {
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//     }

//     return {
//       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((difference / (1000 * 60)) % 60),
//       seconds: Math.floor((difference / 1000) % 60),
//     };
//   };

//   const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(getTimeRemaining());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return (
//     <div className="flex gap-4 mt-4">
//       <div className="text-center">
//         <div className="text-3xl font-bold text-pink-500">{timeLeft.days}</div>
//         <span className="text-sm">Days</span>
//       </div>
//       <div className="text-center">
//         <div className="text-3xl font-bold text-pink-500">{timeLeft.hours}</div>
//         <span className="text-sm">Hrs</span>
//       </div>
//       <div className="text-center">
//         <div className="text-3xl font-bold text-pink-500">{timeLeft.minutes}</div>
//         <span className="text-sm">Min</span>
//       </div>
//       <div className="text-center">
//         <div className="text-3xl font-bold text-pink-500">{timeLeft.seconds}</div>
//         <span className="text-sm">Sec</span>
//       </div>
//     </div>
//   );
// };

// export default DiscountTimer;
