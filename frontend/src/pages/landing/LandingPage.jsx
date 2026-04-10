import { motion } from "motion/react";
import { Search, ShieldAlert, Clock3 } from "lucide-react";
import { LandingHeader } from "./LandingHeader";
import "@/css/landing.css";

export default function LandingPage() {
  const features = [
    {
      title: "Smart Recipe Search",
      description:
        "Search recipes by meal type, ingredients you already have, and cooking time.",
      icon: Search,
    },
    {
      title: "Dietary & Allergy Filters",
      description:
        "Personalize results by excluding allergens and matching dietary preferences.",
      icon: ShieldAlert,
    },
    {
      title: "Quick Meal Options",
      description:
        "Find simple, budget-friendly meals that fit a busy college schedule.",
      icon: Clock3,
    },
  ];

  return (
    <div className="landing">
      <LandingHeader />

      <section className="landing">
        <div className="landing-banner">
          <div className="landing-title">
            <h1 className="landing-title-strong">
              Find Recipes that Match your Lifestyle
            </h1>

            <p className="landing-subtitle">
              Discover meals based on your dietary preferences, allergies,
              ingredients on hand, and time constraints with QuickBites.
            </p>

            <div className="landing-actions">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/register"
                className="btn btn-primary"
              >
                Get started free
              </motion.a>

              <a href="#features" className="text-link">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <img src="/food_bowl.png" alt="food" className="landing-image" />
        </div>

        <div className="landing-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Built for easier everyday cooking</h2>
          <p className="section-subtitle">
            QuickBites helps users find meals that are practical, personalized,
            and easy to make.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="feature-card soft-shadow"
            >
              <div className="feature-icon">
                <feature.icon size={24} />
              </div>

              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}