import { motion, useMotionValueEvent, useTransform } from "motion/react";
import { Search, ShieldAlert, Clock3 } from "lucide-react";
import { useState } from "react";
import "@/css/landing.css";

const features = [
  {
    title: "Smart Recipe Search",
    description:
      "Search recipes by meal type, ingredients you already have, and cooking time.",
    icon: Search
  },
  {
    title: "Dietary & Allergy Filters",
    description:
      "Personalize results by excluding allergens and matching dietary preferences.",
    icon: ShieldAlert
  },
  {
    title: "Quick Meal Options",
    description:
      "Find simple, budget-friendly meals that fit a busy college schedule.",
    icon: Clock3
  },
];

function LandingFeature({
  title,
  description,
  imageSrc,
  imageAlt,
  icon: Icon,
  featureIndex,
  animateIn,
}) {
  return (
    <section className="feature-card">
      <div className="feature-copy">
        <div className="feature-icon">
          <Icon size={24} />
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
      
      <div className="feature-image-shell">
        {featureIndex === 0 ? (
          <SearchFeatureVisual animateIn={animateIn} />
        ) : featureIndex === 1 ? (
          <DietaryFeatureVisual animateIn={animateIn} />
        ) : featureIndex === 2 ? (
          <QuickMealFeatureVisual animateIn={animateIn} />
        ) : (
          <img src={imageSrc} alt={imageAlt} className="feature-image" />
        )}
      </div>
    </section>
  );
}

function SearchFeatureVisual({ animateIn }) {
  return (
    <motion.div
      className="search-demo"
      initial={{ width: "4.5rem" }}
      animate={animateIn ? { width: "18rem" } : { width: "4.5rem" }}
      transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }}
    >
      <motion.div
        className="search-demo-icon"
        initial={{ x: 0 }}
        animate={animateIn ? { x: -6 } : { x: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }}
      >
        <Search size={32} strokeWidth={2.4} />
      </motion.div>

      <motion.div
        className="search-demo-text"
        initial={{ opacity: 0, x: 12 }}
        animate={animateIn ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.55 }}
      >
        Search recipes
      </motion.div>
    </motion.div>
  );
}

function DietaryFeatureVisual({ animateIn }) {
  return (
    <div className="dietary-demo">
      <motion.div
        className="dietary-demo-item dietary-demo-egg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={animateIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
      >
        <img src="/landing/egg.png" alt="Egg allergen" className="dietary-demo-image" />
        <span className="dietary-demo-strike">
          <motion.span
            className="dietary-demo-strike-line"
            initial={{ scaleX: 0 }}
            animate={animateIn ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 }}
          />
        </span>
      </motion.div>

      <motion.div
        className="dietary-demo-item dietary-demo-walnut"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={animateIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
      >
        <img src="/landing/walnut.png" alt="Walnut allergen" className="dietary-demo-image" />
        <span className="dietary-demo-strike">
          <motion.span
            className="dietary-demo-strike-line"
            initial={{ scaleX: 0 }}
            animate={animateIn ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.5 }}
          />
        </span>
      </motion.div>
    </div>
  );
}

function QuickMealFeatureVisual({ animateIn }) {
  return (
    <div className="quickmeal-demo">
      <motion.div
        className="quickmeal-clock"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={animateIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
      >
        <div className="quickmeal-clock-face">
          <span className="quickmeal-clock-ring" />
          <motion.span
            className="quickmeal-hand quickmeal-hour"
            initial={{ rotate: -55 }}
            animate={animateIn ? { rotate: 55 } : { rotate: -55 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
          />
          <motion.span
            className="quickmeal-hand quickmeal-minute"
            initial={{ rotate: -120 }}
            animate={animateIn ? { rotate: 120 } : { rotate: -120 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
          />
          <span className="quickmeal-center-dot" />
        </div>
      </motion.div>
    </div>
  );
}

function ScrollFeatureFrame({ progress, featureIndex, start, end }) {
  const frameProgress = useTransform(progress, [start, end], [0, 1]);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const fadeWindow = 0.16;
  const opacity = featureIndex === 2
    ? useTransform(frameProgress, [0, fadeWindow, 1], [0, 1, 1])
    : useTransform(
        frameProgress,
        [0, fadeWindow, 1 - fadeWindow, 1],
        [0, 1, 1, 0]
      );
  const y = useTransform(frameProgress, [0, 1], [40, -40]);
  const feature = features[featureIndex] ?? features[0];

  useMotionValueEvent(frameProgress, "change", (latest) => {
    if (!hasAnimatedIn && latest >= fadeWindow) {
      setHasAnimatedIn(true);
    }
  });

  return (
    <motion.div className="feature-scroll-frame" style={{ opacity, y }}>
      <div className="features-grid">
        <LandingFeature
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          imageSrc={feature.imageSrc}
          imageAlt={feature.imageAlt}
          featureIndex={featureIndex}
          animateIn={hasAnimatedIn}
        />
      </div>
    </motion.div>
  );
}

export function LandingFeatures({ scrollYProgress }) {
  return (
    <div className="features-scroll-stage" aria-hidden="true">
      <ScrollFeatureFrame progress={scrollYProgress} featureIndex={0} start={0.16} end={0.44} />
      <ScrollFeatureFrame progress={scrollYProgress} featureIndex={1} start={0.42} end={0.7} />
      <ScrollFeatureFrame progress={scrollYProgress} featureIndex={2} start={0.68} end={0.96} />
    </div>
  );
}
