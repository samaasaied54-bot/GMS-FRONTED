import { useState } from 'react'
import './App.css'

function App() {
  const [saved, setSaved] = useState(false)
  const [view, setView] = useState('consent')
  const [hasAccess, setHasAccess] = useState(true)

  // =========================
  // CONSENT DATA
  // =========================

  const [details, setDetails] = useState({
    name: false,
    phone: false,
    email: false,
    nationality: false,
    passport: false,
  })

  const [contact, setContact] = useState({
    phone: false,
    whatsapp: false,
    email: false,
    sms: false,
  })

  const [consent, setConsent] = useState(false)

  // =========================
  // GUEST DATA
  // =========================

  const [guestSearch, setGuestSearch] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [guestSaved, setGuestSaved] = useState(false)
  const [duplicateGuest, setDuplicateGuest] = useState(null)

  const [guestForm, setGuestForm] = useState({
    name: '',
    phone: '',
    reference: '',
  })

  // =========================
  // DEMO GUEST DATA
  // =========================

  const demoGuests = [
    {
      id: 1,
      name: 'Omar Khaled',
      phone: '+20 101 234 5678',
      reference: 'GMS-1001',
    },
    {
      id: 2,
      name: 'Lina Mostafa',
      phone: '+20 111 876 5432',
      reference: 'GMS-1002',
    },
    {
      id: 3,
      name: 'Sara Mahmoud',
      phone: '+20 122 456 7890',
      reference: 'GMS-1003',
    },
    {
      id: 4,
      name: 'Youssef Ali',
      phone: '+20 109 345 6789',
      reference: 'GMS-1004',
    },
  ]

  // =========================
  // CONSENT FUNCTIONS
  // =========================

  const toggleDetail = (key) => {
    setDetails({ ...details, [key]: !details[key] })
  }

  const toggleContact = (key) => {
    setContact({ ...contact, [key]: !contact[key] })
  }

  const handleSave = () => {
    if (!consent) {
      alert('Please accept the consent to continue.')
      return
    }

    console.log({
      details,
      consent,
      contact,
    })

    setSaved(true)
  }

  // =========================
  // GUEST SEARCH
  // =========================

  const filteredGuests = demoGuests.filter((guest) => {
    if (!guestSearch.trim()) return false

    const search = guestSearch.toLowerCase()

    return guest[searchType].toLowerCase().includes(search)
  })

  // =========================
  // GUEST FORM
  // =========================

  const handleGuestInput = (field, value) => {
    setGuestForm({
      ...guestForm,
      [field]: value,
    })

    setDuplicateGuest(null)
    setGuestSaved(false)
  }

  const handleCreateGuest = () => {
    if (
      !guestForm.name ||
      !guestForm.phone ||
      !guestForm.reference
    ) {
      alert('Please complete all guest details.')
      return
    }

    const duplicate = demoGuests.find(
      (guest) =>
        guest.name.toLowerCase() === guestForm.name.toLowerCase() ||
        guest.phone === guestForm.phone ||
        guest.reference.toLowerCase() ===
          guestForm.reference.toLowerCase()
    )

    if (duplicate) {
      setDuplicateGuest(duplicate)
      return
    }

    saveNewGuest()
  }

  const saveNewGuest = () => {
    console.log('New guest saved:', guestForm)

    setGuestSaved(true)
    setDuplicateGuest(null)
  }

  const openExistingGuest = () => {
    if (!duplicateGuest) return

    alert(`Opening existing guest: ${duplicateGuest.name}`)
  }

  // =========================
  // FEATURE 4
  // SAVE THE GUEST
  // =========================

  if (view === 'guest') {
    return (
      <div className="luxury-page guest-page">

        <div className="background-shape shape-one"></div>
        <div className="background-shape shape-two"></div>

        <header className="luxury-header">

          <div className="logo-area">

            <div className="logo-symbol">
              G
            </div>

            <div>
              <div className="logo">
                GMS
              </div>

              <span>
                GUEST MANAGEMENT SYSTEM
              </span>
            </div>

          </div>

          <button
            className="back-button"
            onClick={() => setView('consent')}
          >
            ← Back to Consent
          </button>

        </header>

        <main className="luxury-main guest-main">

          <div className="welcome">

            <span className="gold-label">
              04 / SAVE THE GUEST
            </span>

            <h1>
              Find your
              <br />
              <em>guest.</em>
            </h1>

            <p>
              Search for an existing guest or create
              a new guest profile.
            </p>

          </div>

          {/* SEARCH */}

          <section className="glass-card guest-search-card">

            <div className="card-top">

              <div>

                <span className="section-label">
                  GUEST SEARCH
                </span>

                <h2>
                  Search for a guest
                </h2>

                <p>
                  Search by name, phone number,
                  or guest reference.
                </p>

              </div>

              <div className="mini-icon">
                ⌕
              </div>

            </div>

            <div className="guest-search-row">

              <select
                value={searchType}
                onChange={(e) =>
                  setSearchType(e.target.value)
                }
                className="search-select"
              >

                <option value="name">
                  Name
                </option>

                <option value="phone">
                  Phone
                </option>

                <option value="reference">
                  Reference
                </option>

              </select>

              <input
                type="text"
                className="guest-search-input"
                placeholder={`Search by ${searchType}...`}
                value={guestSearch}
                onChange={(e) =>
                  setGuestSearch(e.target.value)
                }
              />

            </div>

            {/* SEARCH RESULTS */}

            {guestSearch && (

              <div className="search-results">

                {filteredGuests.length > 0 ? (

                  filteredGuests.map((guest) => (

                    <div
                      className="guest-result"
                      key={guest.id}
                    >

                      <div className="guest-avatar">
                        {guest.name.charAt(0)}
                      </div>

                      <div className="guest-result-info">

                        <strong>
                          {guest.name}
                        </strong>

                        <span>
                          {guest.phone} · {guest.reference}
                        </span>

                      </div>

                      <button
                        className="open-guest-button"
                        onClick={() =>
                          alert(
                            `Opening ${guest.name}`
                          )
                        }
                      >
                        Open →
                      </button>

                    </div>

                  ))

                ) : (

                  <div className="no-results">
                    No guest found.
                  </div>

                )}

              </div>

            )}

          </section>

          {/* CREATE GUEST */}

          <section className="glass-card create-guest-card">

            <div className="card-top">

              <div>

                <span className="section-label">
                  NEW GUEST
                </span>

                <h2>
                  Create one guest
                </h2>

                <p>
                  Enter the guest's basic
                  registration details.
                </p>

              </div>

            </div>

            <div className="guest-form-grid">

              <div className="guest-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter guest name"
                  value={guestForm.name}
                  onChange={(e) =>
                    handleGuestInput(
                      'name',
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="guest-field">

                <label>
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="+20 ..."
                  value={guestForm.phone}
                  onChange={(e) =>
                    handleGuestInput(
                      'phone',
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="guest-field">

                <label>
                  Guest Reference
                </label>

                <input
                  type="text"
                  placeholder="GMS-XXXX"
                  value={guestForm.reference}
                  onChange={(e) =>
                    handleGuestInput(
                      'reference',
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* DUPLICATE WARNING */}

            {duplicateGuest && (

              <div className="duplicate-warning">

                <div className="warning-icon">
                  !
                </div>

                <div className="warning-content">

                  <strong>
                    This guest may already exist.
                  </strong>

                  <p>
                    We found an existing guest
                    matching the information you
                    entered: <b>{duplicateGuest.name}</b>.
                  </p>

                </div>

                <div className="warning-actions">

                  <button
                    className="open-existing-button"
                    onClick={openExistingGuest}
                  >
                    Open Existing
                  </button>

                  <button
                    className="save-anyway-button"
                    onClick={saveNewGuest}
                  >
                    Save Anyway
                  </button>

                </div>

              </div>

            )}

            {!duplicateGuest && (

              <div className="guest-form-footer">

                <div className="privacy">

                  <span>
                    🔒
                  </span>

                  <div>

                    <strong>
                      Guest data is protected
                    </strong>

                    <small>
                      Duplicate checks help keep
                      guest records accurate.
                    </small>

                  </div>

                </div>

                <button
                  className="gold-button"
                  onClick={handleCreateGuest}
                >
                  Save Guest
                  <span>→</span>
                </button>

              </div>

            )}

            {guestSaved && (

              <div className="guest-saved-message">
                ✓ Guest saved successfully.
              </div>

            )}

          </section>

          <footer className="luxury-footer">

            <span>
              GMS
            </span>

            <i></i>

            GUEST MANAGEMENT SYSTEM

            <i></i>

            HOSPITALITY & TOURISM

          </footer>

        </main>

      </div>
    )
  }

  // =========================
  // FEATURE 11
  // WHO OPENED THIS GUEST
  // =========================

  if (view === 'audit') {

    const auditRows = [
      {
        staff: 'Mariam Hassan',
        guest: 'Omar Khaled',
        date: '08 Oct 2026',
        time: '12:42 PM',
      },
      {
        staff: 'Ahmed Samir',
        guest: 'Lina Mostafa',
        date: '08 Oct 2026',
        time: '12:18 PM',
      },
      {
        staff: 'Nour Adel',
        guest: 'Youssef Ali',
        date: '08 Oct 2026',
        time: '11:56 AM',
      },
      {
        staff: 'Karim Nabil',
        guest: 'Sara Mahmoud',
        date: '08 Oct 2026',
        time: '10:31 AM',
      },
      {
        staff: 'Mariam Hassan',
        guest: 'Adam Tarek',
        date: '07 Oct 2026',
        time: '09:14 PM',
      },
    ]

    return (
      <div className="luxury-page audit-page">

        <div className="background-shape shape-one"></div>
        <div className="background-shape shape-two"></div>

        <header className="luxury-header">

          <div className="logo-area">

            <div className="logo-symbol">
              G
            </div>

            <div>

              <div className="logo">
                GMS
              </div>

              <span>
                GUEST MANAGEMENT SYSTEM
              </span>

            </div>

          </div>

          <button
            className="back-button"
            onClick={() => setView('consent')}
          >
            ← Back to Guest Flow
          </button>

        </header>

        <main className="luxury-main audit-main">

          <div className="audit-heading">

            <div>

              <span className="gold-label">
                PROTECT THE DATA
              </span>

              <h1>
                Who opened <em>this guest?</em>
              </h1>

              <p>
                Review staff access activity for
                guests in your property.
              </p>

            </div>

            <div className="access-badge">

              <span className="access-dot"></span>

              Manager Access

            </div>

          </div>

          {!hasAccess ? (

            <section className="glass-card access-denied-card">

              <div className="denied-icon">
                !
              </div>

              <span className="gold-label">
                ACCESS REFUSED
              </span>

              <h2>
                You cannot open this.
              </h2>

              <p>
                You do not have permission to view
                guest access activity for this property.
              </p>

              <button
                className="gold-button"
                onClick={() => setHasAccess(true)}
              >
                Demo: Restore Access
                <span>→</span>
              </button>

            </section>

          ) : (

            <section className="glass-card audit-card">

              <div className="audit-card-top">

                <div>

                  <span className="section-label">
                    ACCESS ACTIVITY
                  </span>

                  <h2>
                    Guest access history
                  </h2>

                  <p>
                    Newest activity appears first.
                  </p>

                </div>

                <div className="audit-count">

                  <strong>
                    {auditRows.length}
                  </strong>

                  <span>
                    recent entries
                  </span>

                </div>

              </div>

              <div className="table-wrap">

                <table className="audit-table">

                  <thead>

                    <tr>
                      <th>Staff Name</th>
                      <th>Guest Name</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>

                  </thead>

                  <tbody>

                    {auditRows.map((row, index) => (

                      <tr key={index}>

                        <td>
                          <span className="staff-avatar">
                            {row.staff.charAt(0)}
                          </span>

                          {row.staff}
                        </td>

                        <td>
                          {row.guest}
                        </td>

                        <td>
                          {row.date}
                        </td>

                        <td>
                          <span className="time-pill">
                            {row.time}
                          </span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              <div className="audit-footer">

                <span>
                  🔒 Access is limited to authorized
                  managers and this property's data only.
                </span>

                <button
                  className="text-button"
                  onClick={() => setHasAccess(false)}
                >
                  Demo Access Refused
                </button>

              </div>

            </section>

          )}

          <footer className="luxury-footer">

            <span>
              GMS
            </span>

            <i></i>

            GUEST MANAGEMENT SYSTEM

            <i></i>

            HOSPITALITY & TOURISM

          </footer>

        </main>

      </div>
    )
  }

  // =========================
  // SUCCESS PAGE
  // =========================

  if (saved) {

    return (
      <div className="luxury-page success-page">

        <div className="success-overlay"></div>

        <div className="success-content">

          <div className="logo">
            GMS
          </div>

          <div className="success-circle">
            ✓
          </div>

          <span className="gold-label">
            REGISTRATION STARTED
          </span>

          <h1>
            Welcome to
            <br />
            <em>your stay.</em>
          </h1>

          <p>
            Your preferences have been securely saved.
            Let's continue with your guest details.
          </p>

          <button
            className="gold-button"
            onClick={() => {
              setSaved(false)
              setView('guest')
            }}
          >
            Continue to Guest Details
            <span>→</span>
          </button>

        </div>

      </div>
    )
  }

  // =========================
  // CONSENT PAGE
  // =========================

  return (
    <div className="luxury-page">

      <div className="background-shape shape-one"></div>
      <div className="background-shape shape-two"></div>

      <header className="luxury-header">

        <div className="logo-area">

          <div className="logo-symbol">
            G
          </div>

          <div>

            <div className="logo">
              GMS
            </div>

            <span>
              GUEST MANAGEMENT SYSTEM
            </span>

          </div>

        </div>

        <div className="header-actions">

          <button
            className="audit-nav"
            onClick={() => setView('audit')}
          >
            Who opened this guest
            <span>↗</span>
          </button>

          <div className="secure">

            <span className="lock">
              ⌁
            </span>

            SECURE GUEST EXPERIENCE

          </div>

        </div>

      </header>

      <main className="luxury-main">

        <div className="welcome">

          <span className="gold-label">
            WELCOME
          </span>

          <h1>
            Your comfort
            <br />
            <em>comes first.</em>
          </h1>

          <p>
            Before we begin your guest registration,
            take a moment to review your information
            and communication preferences.
          </p>

        </div>

        {/* STEPS */}

        <div className="steps">

          <div className="step active">

            <div className="step-number">
              01
            </div>

            <div>

              <strong>
                Consent
              </strong>

              <span>
                Your preferences
              </span>

            </div>

          </div>

          <div className="step-line"></div>

          <div className="step">

            <div className="step-number">
              02
            </div>

            <div>

              <strong>
                Guest Details
              </strong>

              <span>
                Your information
              </span>

            </div>

          </div>

          <div className="step-line"></div>

          <div className="step">

            <div className="step-number">
              03
            </div>

            <div>

              <strong>
                Complete
              </strong>

              <span>
                Enjoy your stay
              </span>

            </div>

          </div>

        </div>

        {/* CONSENT CARD */}

        <section className="glass-card">

          <div className="card-top">

            <div>

              <span className="section-label">
                01 / INFORMATION
              </span>

              <h2>
                What may we collect?
              </h2>

              <p>
                Select the information you agree to provide.
              </p>

            </div>

            <div className="mini-icon">
              ✦
            </div>

          </div>

          {/* DETAILS */}

          <div className="detail-grid">

            <label
              className={`choice ${
                details.name ? 'selected' : ''
              }`}
            >

              <input
                type="checkbox"
                checked={details.name}
                onChange={() => toggleDetail('name')}
              />

              <span className="choice-icon">
                ♙
              </span>

              <span className="choice-text">

                <strong>
                  Full Name
                </strong>

                <small>
                  Guest identification
                </small>

              </span>

              <span className="check">
                ✓
              </span>

            </label>

            <label
              className={`choice ${
                details.phone ? 'selected' : ''
              }`}
            >

              <input
                type="checkbox"
                checked={details.phone}
                onChange={() => toggleDetail('phone')}
              />

              <span className="choice-icon">
                ◉
              </span>

              <span className="choice-text">

                <strong>
                  Phone Number
                </strong>

                <small>
                  Direct communication
                </small>

              </span>

              <span className="check">
                ✓
              </span>

            </label>

            <label
              className={`choice ${
                details.email ? 'selected' : ''
              }`}
            >

              <input
                type="checkbox"
                checked={details.email}
                onChange={() => toggleDetail('email')}
              />

              <span className="choice-icon">
                ✉
              </span>

              <span className="choice-text">

                <strong>
                  Email Address
                </strong>

                <small>
                  Reservations & updates
                </small>

              </span>

              <span className="check">
                ✓
              </span>

            </label>

            <label
              className={`choice ${
                details.nationality ? 'selected' : ''
              }`}
            >

              <input
                type="checkbox"
                checked={details.nationality}
                onChange={() =>
                  toggleDetail('nationality')
                }
              />

              <span className="choice-icon">
                ◎
              </span>

              <span className="choice-text">

                <strong>
                  Nationality
                </strong>

                <small>
                  Guest profile
                </small>

              </span>

              <span className="check">
                ✓
              </span>

            </label>

            <label
              className={`choice ${
                details.passport ? 'selected' : ''
              }`}
            >

              <input
                type="checkbox"
                checked={details.passport}
                onChange={() =>
                  toggleDetail('passport')
                }
              />

              <span className="choice-icon">
                ▣
              </span>

              <span className="choice-text">

                <strong>
                  Passport Details
                </strong>

                <small>
                  Registration requirements
                </small>

              </span>

              <span className="check">
                ✓
              </span>

            </label>

          </div>

          <div className="gold-divider"></div>

          {/* CONSENT */}

          <div className="consent-section">

            <div>

              <span className="section-label">
                02 / YOUR CONSENT
              </span>

              <h2>
                Privacy, with transparency.
              </h2>

            </div>

            <label
              className={`consent-card ${
                consent ? 'selected' : ''
              }`}
            >

              <input
                type="checkbox"
                checked={consent}
                onChange={(e) =>
                  setConsent(e.target.checked)
                }
              />

              <div className="consent-check">
                ✓
              </div>

              <div>

                <strong>
                  I agree to the collection and use
                  of my information.
                </strong>

                <p>
                  Your information may be used for
                  guest registration, reservation
                  management, communication, and
                  enhancing your experience with us.
                </p>

              </div>

            </label>

          </div>

          <div className="gold-divider"></div>

          {/* CONTACT */}

          <div className="contact-section">

            <div>

              <span className="section-label">
                03 / COMMUNICATION
              </span>

              <h2>
                How may we reach you?
              </h2>

              <p>
                Choose your preferred way to stay connected.
              </p>

            </div>

            <div className="contact-grid">

              <label
                className={
                  contact.phone
                    ? 'contact selected'
                    : 'contact'
                }
              >

                <input
                  type="checkbox"
                  checked={contact.phone}
                  onChange={() =>
                    toggleContact('phone')
                  }
                />

                <span>
                  ☎
                </span>

                Phone

              </label>

              <label
                className={
                  contact.whatsapp
                    ? 'contact selected'
                    : 'contact'
                }
              >

                <input
                  type="checkbox"
                  checked={contact.whatsapp}
                  onChange={() =>
                    toggleContact('whatsapp')
                  }
                />

                <span>
                  ◌
                </span>

                WhatsApp

              </label>

              <label
                className={
                  contact.email
                    ? 'contact selected'
                    : 'contact'
                }
              >

                <input
                  type="checkbox"
                  checked={contact.email}
                  onChange={() =>
                    toggleContact('email')
                  }
                />

                <span>
                  ✉
                </span>

                Email

              </label>

              <label
                className={
                  contact.sms
                    ? 'contact selected'
                    : 'contact'
                }
              >

                <input
                  type="checkbox"
                  checked={contact.sms}
                  onChange={() =>
                    toggleContact('sms')
                  }
                />

                <span>
                  ▱
                </span>

                SMS

              </label>

            </div>

          </div>

          {/* FOOTER */}

          <div className="card-footer">

            <div className="privacy">

              <span>
                🔒
              </span>

              <div>

                <strong>
                  Your privacy matters
                </strong>

                <small>
                  Your information is securely handled.
                </small>

              </div>

            </div>

            <button
              className="gold-button"
              onClick={handleSave}
            >
              Save & Continue
              <span>→</span>
            </button>

          </div>

        </section>

        <footer className="luxury-footer">

          <span>
            GMS
          </span>

          <i></i>

          GUEST MANAGEMENT SYSTEM

          <i></i>

          HOSPITALITY & TOURISM

        </footer>

      </main>

    </div>
  )
}

export default App