import { motion } from "motion/react";
import { Search, ShieldAlert, Clock3 } from "lucide-react";
import "@/css/landing-features.css";

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
          <SearchFeatureVisual />
        ) : featureIndex === 1 ? (
          <DietaryFeatureVisual />
        ) : featureIndex === 2 ? (
          <QuickMealFeatureVisual />
        ) : (
          <img src={imageSrc} alt={imageAlt} className="feature-image" />
        )}
      </div>
    </section>
  );
}

function SearchFeatureVisual() {
  return (
    <motion.div
      className="search-demo"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        className="search-demo-icon"
        initial={{ x: 0 }}
        whileInView={{ x: -6 }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Search size={32} strokeWidth={2.4} />
      </motion.div>

      <motion.div
        className="search-demo-text"
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.55 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Search recipes
      </motion.div>
    </motion.div>
  );
}

function DietaryFeatureVisual() {
  return (
    <div className="dietary-demo">
      <motion.div
        className="dietary-demo-item dietary-demo-egg"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <img src="/landing/egg.png" alt="Egg allergen" className="dietary-demo-image" />
        <span className="dietary-demo-strike">
          <motion.span
            className="dietary-demo-strike-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </span>
      </motion.div>

      <motion.div
        className="dietary-demo-item dietary-demo-walnut"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <img src="/landing/walnut.png" alt="Walnut allergen" className="dietary-demo-image" />
        <span className="dietary-demo-strike">
          <motion.span
            className="dietary-demo-strike-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </span>
      </motion.div>
    </div>
  );
}

function QuickMealFeatureVisual() {
  return (
    <div className="quickmeal-demo">
      <motion.div
        className="quickmeal-clock"
        initial={{ opacity: 0, scale: 0.82 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="quickmeal-clock-face">
          <span className="quickmeal-clock-ring" />
          <motion.span
            className="quickmeal-hand quickmeal-hour"
            initial={{ rotate: -55 }}
            whileInView={{ rotate: 55 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
            viewport={{ once: true, amount: 0.5 }}
          />
          <motion.span
            className="quickmeal-hand quickmeal-minute"
            initial={{ rotate: -120 }}
            whileInView={{ rotate: 120 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
            viewport={{ once: true, amount: 0.5 }}
          />
          <span className="quickmeal-center-dot" />
        </div>
      </motion.div>
    </div>
  );
}

export function LandingFeatures() {
  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          className="feature-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <LandingFeature
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            imageSrc={feature.imageSrc}
            imageAlt={feature.imageAlt}
            featureIndex={index}
          />
        </motion.div>
      ))}
    </div>
  );
}
