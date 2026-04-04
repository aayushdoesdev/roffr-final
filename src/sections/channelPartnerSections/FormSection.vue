<script setup>
import { ref } from 'vue';

const email = ref('');

const subscribe = () => {
  if (email.value) {
    // Handle newsletter subscription
    console.log('Subscribed:', email.value);
    email.value = '';
  }
};
</script>

<template>
  <!-- Replaced FormSection with the requested Footer Design -->
  <footer class="footer-container">
    <div class="inner-container">
      
      <!-- Top Section -->
      <div class="grid-layout">
        
        <!-- Left Brand Column -->
        <div class="brand-col">
          <div class="logo">
            <!-- Simulated ROFFR Logo from screenshot -->
            <h2 class="logo-main">
              ROFFR
            </h2>
            <p class="logo-sub">RE INVESTMENT STUDIO</p>
          </div>
          <p class="brand-desc">
            The ultimate destination for smart real estate investments and group buying opportunities. Join the revolution today.
          </p>
          
          <!-- Social Icons -->
          <div class="social-links">
            <a href="#" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="link-col">
          <h4 class="col-title">Quick Links</h4>
          <ul class="link-list">
            <li><a href="#">Home</a></li>
            <li><a href="#">Properties</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>
        
        <!-- Support Links -->
        <div class="link-col">
          <h4 class="col-title">Support</h4>
          <ul class="link-list">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        
        <!-- Newsletter Box -->
        <div class="newsletter-col">
          <h4 class="col-title">Newsletter</h4>
          <p class="newsletter-desc">
            Stay updated with the latest group deals.
          </p>
          <form @submit.prevent="subscribe" class="newsletter-form">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Your email" 
              class="newsletter-input"
              required 
            />
            <button type="submit" class="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
        
      </div>

      <!-- Bottom Bar -->
      <div class="bottom-bar">
        <p>© 2024 ROFFER Real Estate Investment Studio. All Rights Reserved.</p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
/* ── Main Footer Base ── */
.footer-container {
  background-color: #05060A; /* Extremely dark navy/black matching the screenshot */
  padding: 5rem 1.5rem 2rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  color: #ffffff;
}

.inner-container {
  max-width: 1100px;
  margin: 0 auto;
}

/* ── Grid Layout ── */
.grid-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

@media (max-width: 640px) {
  .grid-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

/* ── Brand Column ── */
.brand-col {
  display: flex;
  flex-direction: column;
}

.logo {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

/* Visually mimicking the ROFFR logo text */
.logo-main {
  font-family: 'Urbanist', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  line-height: 1;
  color: #ffffff;
  margin: 0;
}

.logo-sub {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #ffffff;
  margin: 0.2rem 0 0 0;
}

.brand-desc {
  font-size: 0.85rem;
  color: #A1A1AA;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 320px;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.social-links a {
  color: #ffffff;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-flex;
}

.social-links a:hover {
  color: #D1D5DB;
  transform: translateY(-2px);
}

/* ── Link Columns ── */
.link-col {
  display: flex;
  flex-direction: column;
}

.col-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-list a {
  color: #A1A1AA;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.link-list a:hover {
  color: #ffffff;
}

/* ── Newsletter Column ── */
.newsletter-col {
  display: flex;
  flex-direction: column;
}

.newsletter-desc {
  font-size: 0.9rem;
  color: #A1A1AA;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.newsletter-input {
  background-color: #262734; /* Lighter slate blue-gray for the input */
  border: none;
  border-radius: 6px;
  padding: 0.8rem 1rem;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: background-color 0.2s ease;
}

.newsletter-input::placeholder {
  color: #71717A;
}

.newsletter-input:focus {
  background-color: #2D2E3D;
}

.newsletter-btn {
  background-color: #1A1A1E; /* Very dark charcoal button */
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-family: 'Urbanist', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.85rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.newsletter-btn:hover {
  background-color: #222228;
  transform: translateY(-1px);
}

/* ── Bottom Bar ── */
.bottom-bar {
  border-top: 1px solid rgba(255, 255, 255, 0.08); /* Faint sub-border */
  padding-top: 2rem;
  text-align: center;
}

.bottom-bar p {
  color: #A1A1AA;
  font-size: 0.8rem;
  margin: 0;
  font-weight: 300;
}
</style>
