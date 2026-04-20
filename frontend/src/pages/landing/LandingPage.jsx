import { motion } from "motion/react";
import { Search, ShieldAlert, Clock3, UserPlus, SlidersHorizontal, ChefHat, Github, Mail } from "lucide-react";
import {LandingHeader} from "./LandingHeader"
import {LandingBanner} from "./LandingBanner"
import "@/css/landing.css"

const steps = [
  { icon: UserPlus, title: "Create an account", description: "Sign up in seconds and tell us your dietary preferences." },
  { icon: SlidersHorizontal, title: "Filter your way", description: "Narrow recipes by ingredients, time, and allergens." },
  { icon: ChefHat, title: "Start cooking", description: "Follow simple steps and enjoy a meal you actually want to eat." },
];


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
      <LandingBanner />

      <section id="how-it-works" className="features-section">
        <div className="section-header">
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">From signup to dinner in three steps.</p>
        </div>

        <div className="features-grid">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="feature-card soft-shadow"
            >
              <div className="feature-icon">
                <step.icon size={24} />
              </div>
              <h3 className="feature-title">{`${index + 1}. ${step.title}`}</h3>
              <p className="feature-description">{step.description}</p>
            </motion.div>
          ))}
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

      <footer id="contact" className="landing-footer">
        <div className="landing-footer-inner">
          <span className="landing-footer-copy">© {new Date().getFullYear()} QuickBites</span>
          <a href="mailto:admin@quickbites.site" className="landing-footer-link">
            <Mail size={16} /> admin@quickbites.site
          </a>
        </div>
      </footer>
    </div>
  );
}