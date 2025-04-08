import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return (
    <div className="bg-neutral-80">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"],
    });
  
    const totalCards = cards.length;
    const cardWidth = 450;
    const gap = 16;
    const visibleWidth = window.innerWidth;
    const scrollDistance = totalCards * (cardWidth + gap) - visibleWidth;
  
    const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);
  
    return (
      <section ref={targetRef} className="relative h-[200vh] bg-black">
        {/* Sticky Horizontal Scroll */}
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4 pl-4 pr-4">
            {cards.map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </motion.div>
        </div>
  
        {/* This appears AFTER the scroll */}
        <div className="mt-20 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Meet the Team Behind the Vision
          </h2>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-neutral-400">
            These are the individuals who bring creativity, innovation, and energy to life. Their dedication fuels the mission and defines our journey.
          </p>
        </div>
      </section>
    );
  };
  
  
  

  const Card = ({ card }) => {
    return (
      <div
        key={card.id}
        className="group relative flex flex-col items-center h-[500px] w-[450px] bg-neutral-200 overflow-hidden pt-10 " // Added pt-10
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-[450px] w-full transition-transform duration-300 group-hover:scale-110"
        ></div>
  
        <p className="mt-2 text-xl font-bold text-white text-center">
          {card.title}
        </p>
      </div>
    );
  };
  

export default HorizontalScrollCarousel;

const cards = [
  {
    url: "https://media.licdn.com/dms/image/v2/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/B4DZYK3WC.G4Ak-/0/1743939003516?e=1749686400&v=beta&t=MdaFdj3S4bV8F9vvIZ7TmUwYC_grJwffeJjF0O0Czak",
    title: "Title 1",
    id: 1,
  },
  {
    url: "https://media.licdn.com/dms/image/v2/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/B4DZYK3WC.G4Ak-/0/1743939003516?e=1749686400&v=beta&t=MdaFdj3S4bV8F9vvIZ7TmUwYC_grJwffeJjF0O0Czak",
    title: "Title 2",
    id: 2,
  },
  {
    url: "https://media.licdn.com/dms/image/v2/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/B4DZYK3WC.G4Ak-/0/1743939003516?e=1749686400&v=beta&t=MdaFdj3S4bV8F9vvIZ7TmUwYC_grJwffeJjF0O0Czak",
    title: "Title 3",
    id: 3,
  },
  {
    url: "https://media.licdn.com/dms/image/v2/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/B4DZYK3WC.G4Ak-/0/1743939003516?e=1749686400&v=beta&t=MdaFdj3S4bV8F9vvIZ7TmUwYC_grJwffeJjF0O0Czak",
    title: "Title 4",
    id: 4,
  },
  {
    url: "https://media.licdn.com/dms/image/v2/D4D03AQGvudvHm_EMDQ/profile-displayphoto-shrink_400_400/B4DZYK3WC.G4Ak-/0/1743939003516?e=1749686400&v=beta&t=MdaFdj3S4bV8F9vvIZ7TmUwYC_grJwffeJjF0O0Czak",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/imgs/abstract/6.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/imgs/abstract/7.jpg",
    title: "Title 7",
    id: 7,
  },
];