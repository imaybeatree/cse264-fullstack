import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";
import "@/css/landing-banner.css";

function CountStat({ to, label, delay = 1.2 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    const controls = animate(count, to, { duration: 2.2, ease: "easeOut", delay });
    return controls.stop;
  }, [count, to, delay]);

  return (
    <div className="recipe-counter">
      <span className="recipe-counter-num">
        <motion.span>{rounded}</motion.span>+
      </span>
      <span className="recipe-counter-label">{label}</span>
    </div>
  );
}

function HeroStats() {
  return (
    <motion.div
      className="recipe-counter-row"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
    >
      <CountStat to={5000} label="Recipes" />
      <span className="recipe-counter-divider" />
      <CountStat to={2600} label="Ingredients" delay={1.3} />
    </motion.div>
  );
}

export function LandingBanner() {
  return (
    <section className="landing-banner">
      <div className="landing-banner-inner">
        <div className="utensils-title-wrapper">
        <motion.img
          src="/landing/fork.png" alt="fork" className="utensil"
          initial={{ x: "-170%", y: 800, rotate: -15}}
          animate={{ x: "-170%", y: 400, rotate: -15}}
          transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
        />
        <div className="title-group">
          <motion.h1
            className="bowl-title"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9, type: "spring", bounce: 0.3 }}
          >
            Meals Made Simple
          </motion.h1>
          <motion.p
            className="bowl-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
          >
            Cook simple and delicious meals from the comfort of your home
          </motion.p>
          <HeroStats />
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
            href="/register"
            className="btn btn-primary"
          >
            Get Started
          </motion.a>
        </div>
        <motion.img
          src="/landing/spoon.png" alt="spoon" className="utensil"
          initial={{ x: "70%", y: 800, rotate: 15}}
          animate={{ x: "70%", y: 400, rotate: 15}}
          transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.3 }}
        />
      </div>

      <div className="bowl-scene">
        <img src="/landing/bowl.png" alt="bowl" className="bowl-img" />

        <motion.img
          src="/landing/chicken.png" alt="chicken" className="food-item food-chicken"
          initial={{ y: 200, x: "-50%", opacity: 0, scale: 0.3 }}
          animate={{ y: 0, x: "-50%", opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.4 }}
        />
        <motion.img
          src="/landing/chilli.png" alt="chilli" className="food-item food-chilli"
          initial={{ y: 200, rotate: 0, opacity: 0, scale: 0.3 }}
          animate={{ y: 0, rotate: -85, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, type: "spring", bounce: 0.4 }}
        />
        <motion.img
          src="/landing/longbeans.png" alt="long beans" className="food-item food-longbeans"
          initial={{ y: 200, rotate: 0, opacity: 0, scale: 0.3 }}
          animate={{ y: 0, rotate: 90, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45, type: "spring", bounce: 0.4 }}
        />
        <motion.img
          src="/landing/mushroom.png" alt="mushroom" className="food-item food-mushroom"
          initial={{ y: 200, opacity: 0, scale: 0.3 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", bounce: 0.4 }}
        />
        <motion.img
          src="/landing/potato.png" alt="potato" className="food-item food-potato"
          initial={{ y: 200, rotate: 0, opacity: 0, scale: 0.3 }}
          animate={{ y: 0, rotate: 5, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5, type: "spring", bounce: 0.4 }}
        />
        <motion.img
          src="/landing/mushroom.png" alt="mushroom" className="food-item food-mushroom-2"
          initial={{ y: 200, rotate: 0, opacity: 0, scale: 0.3 }}
          animate={{ y: 0, rotate: 50, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.55, type: "spring", bounce: 0.4 }}
        />
        <motion.img
          src="/landing/mushroom.png" alt="mushroom" className="food-item food-mushroom-3"
          initial={{ y: 200, rotate: 0, opacity: 0, scale: 0.3 }}
          animate={{ y: 0, rotate: -20, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, type: "spring", bounce: 0.4 }}
        />
        <motion.img
          src="/landing/chilli.png" alt="chilli" className="food-item food-chilli-2"
          initial={{ y: 200, rotate: 0, opacity: 0, scale: 0.3 }}
          animate={{ y: 0, rotate: 20, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.4 }}
        />

        <img src="/landing/bowl_front.png" alt="" className="bowl-front-img" />
      </div>
      </div>
    </section>
  );
}
