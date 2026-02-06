import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'

// Generate array of frame paths
const totalFrames = 240
const frames = Array.from({ length: totalFrames }, (_, i) => {
  const frameNum = String(i + 1).padStart(3, '0')
  return `/ezgif-59835d4e34a6e4b3-jpg/ezgif-frame-${frameNum}.jpg`
})

function App() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const { scrollYProgress } = useScroll()

  // Map scroll progress to frame index with smoothing
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Cancel any pending updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      // Use requestAnimationFrame for smoother updates
      rafRef.current = requestAnimationFrame(() => {
        const frameIndex = Math.min(
          Math.floor(latest * totalFrames),
          totalFrames - 1
        )
        setCurrentFrame(frameIndex)
      })
    })

    return () => {
      unsubscribe()
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [scrollYProgress])

  // Preload images
  useEffect(() => {
    let loadedCount = 0
    const totalToLoad = frames.length

    frames.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalToLoad) {
          setIsLoading(false)
        }
      }
      img.src = src
    })
  }, [])

  return (
    <div className="app" ref={containerRef}>
      {/* Animated Background */}
      <div className="background-animation">
        {isLoading && (
          <div className="loading-indicator">
            <div className="loader"></div>
            <p>Loading experience...</p>
          </div>
        )}
        <div
          className="frame-container"
          style={{
            backgroundImage: `url(${frames[currentFrame]})`,
            opacity: isLoading ? 0 : 1,
          }}
        />
        <div className="background-overlay" />
      </div>

      {/* Navigation */}
      <nav className="nav">
        <motion.div
          className="nav-content"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="logo">
            <span className="logo-bracket">{'['}</span>
            <span className="logo-text">DCIM</span>
            <span className="logo-bracket">{']'}</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#monitoring">Monitoring</a>
            <a href="#contact">Contact</a>
            <button className="nav-cta">Deploy Now</button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.div
            className="status-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="status-indicator"></span>
            SYSTEM OPERATIONAL
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Infrastructure
            <br />
            <span className="gradient-text">Intelligence</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Real-time monitoring and management for mission-critical data centers.
            <br />
            Precision control. Total visibility. Zero compromise.
          </motion.p>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="stat">
              <div className="stat-value">99.99%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value">&lt;50ms</div>
              <div className="stat-label">Latency</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </motion.div>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button className="btn-primary">Start Monitoring</button>
            <button className="btn-secondary">View Demo</button>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4, repeat: Infinity, repeatType: 'reverse' }}
        >
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-content">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-label">&gt;_ Core Capabilities</span>
            <h2 className="section-title">Built for Scale</h2>
          </motion.div>

          <div className="features-grid">
            {[
              {
                icon: '⚡',
                title: 'Real-Time Analytics',
                desc: 'Sub-second data processing with predictive insights and anomaly detection.',
                color: 'var(--electric-cyan)'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                desc: 'Military-grade encryption, zero-trust architecture, and compliance automation.',
                color: 'var(--electric-green)'
              },
              {
                icon: '🌐',
                title: 'Global Network',
                desc: 'Edge computing nodes across 50+ locations for minimal latency worldwide.',
                color: 'var(--neon-purple)'
              },
              {
                icon: '📊',
                title: 'Advanced Visualization',
                desc: 'Interactive dashboards with 3D topology mapping and custom alert systems.',
                color: 'var(--warning-orange)'
              },
              {
                icon: '⚙️',
                title: 'Automation Engine',
                desc: 'AI-driven workflows for capacity planning, resource optimization, and scaling.',
                color: 'var(--electric-cyan)'
              },
              {
                icon: '🔌',
                title: 'API Integration',
                desc: 'RESTful and GraphQL APIs with webhooks for seamless third-party integration.',
                color: 'var(--electric-green)'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
                <div className="feature-link">
                  Learn more <span>→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section id="monitoring" className="monitoring">
        <div className="section-content">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-label">&gt;_ Total Control</span>
            <h2 className="section-title">Unified Monitoring</h2>
          </motion.div>

          <div className="monitoring-grid">
            <motion.div
              className="monitoring-card large"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <h3>Power & Thermal</h3>
                <span className="status-pill active">ACTIVE</span>
              </div>
              <div className="metric-display">
                <div className="metric">
                  <span className="metric-label">Power Draw</span>
                  <span className="metric-value">847 <small>kW</small></span>
                </div>
                <div className="metric">
                  <span className="metric-label">Temperature</span>
                  <span className="metric-value">21.4 <small>°C</small></span>
                </div>
                <div className="metric">
                  <span className="metric-label">Efficiency</span>
                  <span className="metric-value">94.2 <small>%</small></span>
                </div>
              </div>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  {[65, 82, 75, 91, 88, 79, 85, 92, 87, 94].map((height, i) => (
                    <motion.div
                      key={i}
                      className="chart-bar"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="monitoring-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <h3>Network Status</h3>
                <span className="status-pill active">OPTIMAL</span>
              </div>
              <div className="network-stats">
                <div className="network-stat">
                  <span className="network-label">Throughput</span>
                  <span className="network-value">1.24 Gb/s</span>
                </div>
                <div className="network-stat">
                  <span className="network-label">Packet Loss</span>
                  <span className="network-value">0.001%</span>
                </div>
                <div className="network-stat">
                  <span className="network-label">Connections</span>
                  <span className="network-value">2,847</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="monitoring-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card-header">
                <h3>Security Events</h3>
                <span className="status-pill secure">SECURE</span>
              </div>
              <div className="security-log">
                <div className="log-entry">
                  <span className="log-time">14:32:15</span>
                  <span className="log-message">Access granted: Admin-01</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">14:28:42</span>
                  <span className="log-message">Firewall rule updated</span>
                </div>
                <div className="log-entry">
                  <span className="log-time">14:15:09</span>
                  <span className="log-message">Backup completed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="section-content">
          <motion.div
            className="contact-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="contact-info">
              <span className="section-label">&gt;_ Get Started</span>
              <h2 className="section-title">Deploy Today</h2>
              <p className="contact-text">
                Join 500+ enterprises managing their infrastructure with precision.
                Our team is ready to architect your custom solution.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>enterprise@dcim.io</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>+1 (555) 847-2000</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🌐</span>
                  <span>24/7 Global Support</span>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" placeholder="Full Name" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Work Email" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Company" />
                </div>
                <div className="form-group">
                  <select>
                    <option>Infrastructure Size</option>
                    <option>Small (1-10 racks)</option>
                    <option>Medium (11-50 racks)</option>
                    <option>Large (51-200 racks)</option>
                    <option>Enterprise (200+ racks)</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary full-width">
                  Request Demo
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="logo">
              <span className="logo-bracket">{'['}</span>
              <span className="logo-text">DCIM</span>
              <span className="logo-bracket">{']'}</span>
            </div>
            <p className="footer-tagline">Infrastructure Intelligence Platform</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Documentation</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 DCIM. All rights reserved.</p>
          <div className="footer-scroll-progress">
            <motion.div
              className="progress-bar"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
