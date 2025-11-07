<template>
  <div class="carousel-wrap">
    <BackgroundCarousel />
    <div class="info-card-centered" role="article" aria-labelledby="commissions-title">
      <form class="commission-card" @submit.prevent="submitForm" novalidate>
        <header class="form-header" :class="{ scrolled: bodyScrolled }" aria-hidden="false">
          <h2 id="commissions-title">Request a Commission 🎨</h2>
          <p class="muted">Fill the fields below — some are required.</p>
        </header>

        <div class="form-body" ref="formBody" @scroll="onBodyScroll">
          <div class="row">
            <label>
              Contact Platform *
              <select ref="contactPlatform" :class="{ invalid: validationErrors.contactPlatform }" v-model="form.contactPlatform" required>
                <option disabled value="">Choose platform</option>
                <option>Discord</option>
                <option>Twitter</option>
                <option>FurAffinity</option>
                <option>Email</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Contact Handle / Username *
              <input ref="contactHandle" :class="{ invalid: validationErrors.contactHandle }" type="text" v-model.trim="form.contactHandle" placeholder="e.g. User#1234 or @user" required />
            </label>
          </div>

          <div class="row">
            <label>
              Email to receive finished commission (if different)
              <input type="email" v-model.trim="form.email" placeholder="you@example.com" />
            </label>

            <label>
              Preferred contact time (optional)
              <input type="text" v-model.trim="form.preferredTime" placeholder="e.g. evenings (UTC-5)" />
            </label>
          </div>

          <div class="row">
            <label>
              Commission Type *
              <select ref="commissionType" :class="{ invalid: validationErrors.commissionType }" v-model="form.commissionType" required>
                <option disabled value="">Choose a type</option>
                <option>Black and white sketch</option>
                <option>Colored Sketch</option>
                <option>Flat Colors</option>
                <option>Full Color</option>
                <option>Dakimakura</option>
              </select>
            </label>

            <label>
              Commission Style *
              <select ref="commissionStyle" :class="{ invalid: validationErrors.commissionStyle }" v-model="form.commissionStyle" required>
                <option disabled value="">Choose a style</option>
                <option>Headshot</option>
                <option>Waist Up</option>
                <option>Full Body</option>
              </select>
            </label>
          </div>

          <div class="row">
            <label>
              SFW or NSFW? *
              <select ref="rating" :class="{ invalid: validationErrors.rating }" v-model="form.rating" required>
                <option disabled value="">Choose</option>
                <option>SFW</option>
                <option>NSFW</option>
              </select>
            </label>

            <label>
              How many characters? *
              <select ref="characters" :class="{ invalid: validationErrors.characters }" v-model.number="form.characters" required>
                <option disabled value="">Reference sheets with front and back views count as 2 characters.</option>
                <option :value="1">1 Character</option>
                <option :value="2">2 Characters</option>
                <option :value="3">3 Characters</option>
              </select>
            </label>
          </div>

          <div class="row">
            <label>
              Alternate versions?
              <select ref="alternate" :class="{ invalid: validationErrors.alternate }" v-model="form.alternate" required>
                <option disabled value="">Choose</option>
                <option value="no">No</option>
                <option value="yes">Yes — alternate outfits/expressions</option>
              </select>
            </label>

            <label>
              Background?
              <select ref="background" :class="{ invalid: validationErrors.background }" v-model="form.background" required>
                <option disabled value="">Choose</option>
                <option value="no">No</option>
                <option value="yes">Yes — simple / detailed (describe below)</option>
              </select>
            </label>
          </div>


          <label class="full">
            Description (include poses, clothing, colors) *
            <textarea ref="description" :class="{ invalid: validationErrors.description }" rows="4" v-model.trim="form.description" required></textarea>
          </label>

          <label class="full">
            Anything to add? (optional)
            <textarea rows="3" v-model.trim="form.additional"></textarea>
          </label>

          <label class="full tos">
            <input ref="agree" :class="{ invalid: validationErrors.agree }" type="checkbox" v-model="form.agree" />
            I have read and agree to the <router-link to="/tos">Terms of Service</router-link>. *
          </label>

          <div v-if="submitted" class="confirmation" role="status" aria-live="polite">
            <h3>Request sent ✅</h3>
            <p>Thanks — your request has been prepared. You'll receive a confirmation email shortly.</p>
            <pre class="summary">{{ submissionSummary }}</pre>
          </div>
        </div>

        <footer class="form-actions">
          <div class="left-actions">
            <button type="button" class="link" @click="resetForm">Reset</button>
          </div>
          <div class="right-actions">
            <!-- button always clickable; validation handled on submit -->
            <button type="submit">Send Request ✉️</button>
          </div>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import BackgroundCarousel from '@/components/BackgroundCarousel.vue';

export default {
  name: 'CommissionsPage',
  components: { BackgroundCarousel },
  data() {
    return {
      form: {
        contactPlatform: '',
        contactHandle: '',
        preferredTime: '',
        email: '',
        commissionType: '',
        commissionStyle: '',
        rating: '',
        characters: '', // keep as string so placeholder works
        alternate: '',
        background: '',
        usage: '',
        description: '',
        additional: '',
        private: false,
        agree: false
      },
      files: [],
      previews: [],
      submitted: false,
      submittedAt: null,
      bodyScrolled: false,
      // tracks which required fields failed validation
      validationErrors: {
        contactPlatform: false,
        contactHandle: false,
        commissionType: false,
        commissionStyle: false,
        alternate: false,
        background: false,
        rating: false,
        characters: false,
        description: false,
        agree: false
      }
    };
  },
  computed: {
    // helpful quick check (used only for summary/logic) — validation still enforced on submit
    isValid() {
      return (
        this.form.contactPlatform &&
        this.form.contactHandle &&
        this.form.commissionType &&
        this.form.commissionStyle &&
        this.form.alternate &&
        this.form.background &&
        this.form.rating &&
        Number(this.form.characters) >= 1 &&
        this.form.description &&
        this.form.agree
      );
    },
    submissionSummary() {
      const f = { ...this.form };
      f.files = this.files.map((fi) => fi.name);
      f.submittedAt = this.submittedAt;
      return JSON.stringify(f, null, 2);
    }
  },
  methods: {
    handleFiles(e) {
      const list = Array.from(e.target.files || []);
      this.files = list;
      this.previews = [];
      list.forEach((file) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (ev) => this.previews.push(ev.target.result);
        reader.readAsDataURL(file);
      });
    },
    validateForm() {
      const errs = {
        contactPlatform: !this.form.contactPlatform,
        contactHandle: !this.form.contactHandle,
        commissionType: !this.form.commissionType,
        commissionStyle: !this.form.commissionStyle,
        alternate: !this.form.alternate,
        background: !this.form.background,
        rating: !this.form.rating,
        characters: !(Number(this.form.characters) >= 1),
        description: !this.form.description,
        agree: !this.form.agree
      };
      this.validationErrors = errs;
      return Object.values(errs).every((v) => v === false);
    },
    submitForm() {
      // always attempt submit, validate and show errors if any
      const valid = this.validateForm();
      if (!valid) {
        // focus & scroll to first invalid field
        const first = Object.keys(this.validationErrors).find(k => this.validationErrors[k]);
        const refEl = this.$refs[first];
        if (refEl && refEl.focus) refEl.focus();
        // if ref is a Vue array (multiple elements) attempt first element
        const el = Array.isArray(refEl) ? refEl[0] : refEl;
        if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // proceed with submission
      this.submittedAt = new Date().toISOString();
      this.submitted = true;
      // clear validation markers on success
      Object.keys(this.validationErrors).forEach(k => (this.validationErrors[k] = false));
      // TODO: send this.form + files to server or email handler
      this.files = [];
      setTimeout(() => (this.previews = []), 8000);
    },
    resetForm() {
      this.form = {
        contactPlatform: '',
        contactHandle: '',
        preferredTime: '',
        email: '',
        commissionType: '',
        commissionStyle: '',
        rating: '',
        characters: '',
        alternate: '',
        background: '',
        usage: '',
        description: '',
        additional: '',
        private: false,
        agree: false
      };
      this.files = [];
      this.previews = [];
      this.submitted = false;
      this.submittedAt = null;
      Object.keys(this.validationErrors).forEach(k => (this.validationErrors[k] = false));
    },
    onBodyScroll(e) {
      const el = e.target;
      this.bodyScrolled = el.scrollTop > 6;
    }
  },
  mounted() {
    this.$nextTick(() => {
      const fb = this.$refs.formBody;
      if (fb) {
        // initialize state
        this.bodyScrolled = fb.scrollTop > 6;
      }
    });
  }
};
</script>

<style scoped>
/* wrapper sized to match the carousel height (App header is 100px) */
.carousel-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px); /* keep same height used by BackgroundCarousel */
  min-height: 0;
  display: block;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

:root {
  --card-gap: 24px;
  --card-width: 250px;
  --card-border: 6px;

  /* page-accent palette (close to page but not identical) */
  --accent-light: #FFDDEE;    /* page highlight */
  --accent-mid:   #C9B7EA;    /* page lavender */
  --accent-contrast: #E6C2F6; /* slightly different purple for contrast */

  /* border gradient using the above accents */
  --card-border-gradient: linear-gradient(90deg, var(--accent-light) 0%, var(--accent-contrast) 55%, var(--accent-mid) 100%);
}

/* keep the info-card styles unchanged below; make it a column container */
.info-card-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(94vw, 920px);
  max-width: 98vw;
  min-width: 320px;
  padding: 0; /* header handles padding */
  border-radius: 2vw;
  background: rgba(22,20,28,0.96);
  color: #fff;
  z-index: 10;
  /* match Home.vue border + persistent glow */
  border: 0.3vw solid #FFDDEE;
  backdrop-filter: blur(6px);
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  height: 80vh; /* match Home for consistent sizing */
  max-height: calc(100vh - 80px);
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
  box-shadow:
    0 0.6vw 2vw 0 rgba(200,100,200,0.18),
    0 0.15vw 0.6vw 0 rgba(0,0,0,0.18),
    0 0 0 0.6vw rgba(255,221,238,0.12);
}

/* sticky header so title stays visible while form body scrolls */
.form-header {
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, rgba(22,20,28,0.98), rgba(22,20,28,0.96));
  padding: 18px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  z-index: 6;
  transition: background 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}
.form-header h2 { margin: 0 0 6px 0; }
.form-header .muted { margin: 0; font-size: 0.9rem; color: rgba(255,255,255,0.7); }



/* nicer scrolling behavior and thin custom scrollbar */
.form-body {
  padding: 14px 28px 8px 28px;
  overflow: auto;
  flex: 1 1 auto;
  scroll-behavior: smooth;
  position: relative; /* required for gradient overlays */
  scrollbar-width: thin;
  scrollbar-color: rgba(255,221,238,0.9) rgba(255,255,255,0.03);
  min-height: 0;
}

/* WebKit scrollbar styling */
.form-body::-webkit-scrollbar { width: 12px; }
.form-body::-webkit-scrollbar-track { background: transparent; border-radius: 8px; }
.form-body::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(255,221,238,0.95), rgba(201,183,234,0.95));
  border-radius: 10px;
  border: 2px solid rgba(0,0,0,0.12);
}

/* make sure actual form children render above the fade overlays */
.form-body > * {
  position: relative;
  z-index: 6;
}


.form-body::before {
  top: 0;
  background: linear-gradient(180deg, rgba(22,20,28,0.92), rgba(22,20,28,0));
}
.form-body::after {
  bottom: 0;
  background: linear-gradient(0deg, rgba(22,20,28,0.92), rgba(22,20,28,0));
}

/* header gets a soft elevated shadow when content is scrolled */
.form-header.scrolled {
  box-shadow: 0 8px 22px rgba(0,0,0,0.35), 0 3px 10px rgba(200,100,200,0.06);
  border-bottom-color: rgba(255,255,255,0.08);
  transition: box-shadow 180ms ease, border-color 180ms ease;
}

/* reduce intensity of header gradient when scrolled for subtle difference */
.form-header.scrolled {
  background: linear-gradient(180deg, rgba(36,32,44,0.99), rgba(22,20,28,0.98));
}

/* actions are sticky to bottom so Send/Reset always visible */
.form-actions {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 18px;
  background: linear-gradient(180deg, rgba(22,20,28,0.04), rgba(22,20,28,0.02));
  border-top: 1px solid rgba(255,255,255,0.03);
  z-index: 7;
}
.form-actions .right-actions { margin-left: auto; }

/* rows for two-up fields */
.row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
}
.row label { flex: 1; }

/* full width labels */
label.full { display: block; margin-bottom: 12px; }


/* Keep the hover effect for the card background and border */
.info-card-centered:hover {
  background: rgba(40, 30, 60, 0.98);
  border-color: #C9B7EA;
  box-shadow:
    0 16px 48px 0 rgba(200, 100, 200, 0.28),
    0 4px 16px 0 rgba(0,0,0,0.22),
    0 0 0 12px rgba(255, 221, 238, 0.18);
}

/* apply the same visual treatment to the header when the card or header is hovered */
.info-card-centered:hover .form-header,
.info-card-centered .form-header:hover {
  background: linear-gradient(180deg, rgba(40,30,60,0.98), rgba(22,20,28,0.96));
  border-bottom-color: rgba(255,255,255,0.06);
  box-shadow: 0 8px 24px rgba(200,100,200,0.08);
}

/* inputs */
input[type="text"],
input[type="email"],
input[type="number"],
select,
textarea {
  width: 100%;
  margin-top: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  color: #fff;
  font: inherit;
  box-sizing: border-box;
}

/* nicer selects: dark background, white text, custom arrow, and clear focus state */
select {
  /* remove default OS arrow so our custom arrow shows consistently */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* visual */
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  color: #fff;
  padding: 8px 36px 8px 10px; /* room for the arrow at the right */
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.08);

  /* custom arrow (inline SVG white) positioned to the right */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 20 20' fill='none'><path d='M5 7l5 5 5-5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 14px;
  cursor: pointer;
}

/* accessible focus state */
select:focus {
  outline: none;
  border-color: var(--accent-mid);
  box-shadow: 0 0 0 4px rgba(201,183,234,0.10);
}

/* fallback styling for option lists where supported */
option {
  background: rgba(22,20,28,0.98);
  color: #fff;
}

/* Only allow textareas to be resized vertically */
textarea {
  resize: vertical;
  min-height: 56px;
  max-height: 40vh;
}

/* small tweaks for buttons */
button[type="submit"] {
  background: linear-gradient(90deg, #FFDDEE 0%, #C9B7EA 100%);
  color: #2c2c3e;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  cursor: pointer;
}
button[type="submit"]:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
button.link {
  background: transparent;
  color: #ffddee;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}

/* TOS line */
label.tos {
  display: flex;
  gap: 8px;
  font-size: 0.98rem;
}
.muted { color: rgba(255,255,255,0.6); margin-left: 6px; }

/* previews */
.previews { display:flex; gap:8px; margin-top:8px; flex-wrap:wrap; }
.previews img { width:72px; height:72px; object-fit:cover; border-radius:6px; border:1px solid rgba(255,255,255,0.06); }

/* confirmation summary */
.confirmation { margin-top: 12px; background: rgba(255,255,255,0.02); padding: 12px; border-radius:8px; }
.summary { max-height: 160px; overflow:auto; background: rgba(0,0,0,0.2); padding:8px; border-radius:6px; color:#fff; }

/* responsive adjustments */
@media (max-width: 700px) {
  .info-card-centered { width: 96vw; height: auto; max-height: 90vh; }
  .form-header, .form-actions { padding-left: 16px; padding-right: 16px; }
  .form-body { padding-left: 16px; padding-right: 16px; }
  .row { flex-direction: column; }
}
/* commission form container must be a flex column so .form-body can flex and scroll */
.commission-card {
  height: 100%;
  min-height: 0; /* allow children to shrink and overflow for scrolling */
  display: flex;
  flex-direction: column;
}

/* ensure the scroll area can shrink inside the flex layout */
.form-body {
  min-height: 0;
}

/* invalid field visuals */
input.invalid,
select.invalid,
textarea.invalid,
input.invalid[type="checkbox"] {
  border-color: #ff6b6b !important;
  box-shadow: 0 0 0 6px rgba(255,107,107,0.06);
}

/* keep transitions small so the red border doesn't feel jarring */
input, select, textarea {
  transition: border-color 120ms ease, box-shadow 120ms ease, background 120ms ease;
}
</style>
