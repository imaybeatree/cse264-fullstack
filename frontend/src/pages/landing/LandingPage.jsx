import { motion } from "motion/react";
import { Calendar, Users, MessageSquare } from "lucide-react";
import {LandingHeader} from "./LandingHeader"
import "@/css/landing.css"


export default function LandingPage() {
  const features = [
  {
    title: "Placeholder1",
    description:
      "Desc",
    icon: Calendar,
  },
  {
    title: "Placeholder2",
    description: "Desc",
    icon: Users,
  },
  {
    title: "Placeholder3",
    description: "Desc",
    icon: MessageSquare,
  },
];
  return (
    <div className="landing">
      <LandingHeader/>
      <section className="landing">
    <div className="landing-banner">
      <div className="landing-title">
        <h1 className="landing-title-strong">Food app</h1>

        <p className="landing-subtitle">
          Cook simple and easy meals from the comfort of your home
        </p>

        <div className="landing-actions">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/register"
            className="btn btn-primary"
          >
            Use Foodapp for free
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
          >
          </motion.div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Cook simple homemade food</h2>
          <p className="section-subtitle">
            Powerful features designed to make your meal options cheaper and healthier.
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
};