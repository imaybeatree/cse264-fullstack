import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Mail } from "lucide-react";
import {LandingHeader} from "./LandingHeader"
import {LandingBanner} from "./LandingBanner"
import { LandingFeatures } from "./LandingFeatures";
import "@/css/landing.css"
// TODO: show user flow after app is done
// const steps = [
//   { icon: UserPlus, title: "Create an account", description: "Sign up in seconds and tell us your dietary preferences." },
//   { icon: SlidersHorizontal, title: "Filter your way", description: "Narrow recipes by ingredients, time, and allergens." },
//   { icon: ChefHat, title: "Start cooking", description: "Follow simple steps and enjoy a meal you actually want to eat." },
// ];

export default function LandingPage() {
  const featuresRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start start", "end end"],
  });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.21, 0.28, 1], [1, 1, 0, 0]);

  return (
    <div className="landing">
      <LandingHeader />
      <LandingBanner />

      {/* <section id="how-it-works" className="features-section">
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
      </section> */}

      <section id="features" ref={featuresRef} className="features-section features-scroll-section">
        <div className="features-scroll-sticky">
          <motion.div
            className="section-header features-scroll-header"
            style={{ opacity: titleOpacity }}
          >
            <h2 className="section-title">Built for easier everyday cooking</h2>
            <p className="section-subtitle">
              QuickBites helps users find meals that are practical, personalized,
              and easy to make.
            </p>
          </motion.div>
          <LandingFeatures scrollYProgress={scrollYProgress} />
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
