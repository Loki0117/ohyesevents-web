// script.js - Complete Version with All Features + Venue Other Option
document.addEventListener('DOMContentLoaded', function() {
    // ==================== INITIALIZATION ====================
    const form = document.getElementById('weddingPlannerForm');
    const statusDiv = document.getElementById('formStatus');
    let currentStep = 1;
    const totalSteps = 5;

    // Google Sheets Web App URL
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwMFX_zkSTb7ShRV2HSADdNX7Hm0jDYyOAGEajE0YSH8wnsJ7DNlOyOnUEK1F_JS285Ig/exec';

    // Complete Districts/Cities data
    const locationData = {
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Kanyakumari', 'Dindigul', 'Kanchipuram', 'Tiruppur', 'Namakkal', 'Krishnagiri', 'Ramanathapuram', 'Sivaganga', 'Pudukkottai', 'Thanjavur', 'Nagapattinam', 'Tiruvarur', 'Karur', 'Perambalur', 'Ariyalur', 'Cuddalore', 'Villupuram', 'Dharmapuri', 'Theni', 'Virudhunagar'],
        'Bangalore': ['Bengaluru Urban', 'Bengaluru Rural', 'Mysore', 'Hubli', 'Mangalore', 'Belagavi', 'Dharwad', 'Tumakuru', 'Shivamogga', 'Kalaburagi', 'Chitradurga', 'Davangere', 'Hassan', 'Kolar', 'Mandya', 'Ramanagara', 'Udupi', 'Vijayapura'],
        'Hyderabad': ['Hyderabad', 'Secunderabad', 'Karimnagar', 'Warangal', 'Nizamabad', 'Khammam', 'Mahabubnagar', 'Nalgonda', 'Sangareddy', 'Medak', 'Adilabad', 'Jagtial', 'Jangaon', 'Kamareddy', 'Mancherial'],
        'Mumbai': ['Mumbai City', 'Mumbai Suburban', 'Thane', 'Navi Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Aurangabad', 'Solapur', 'Kolhapur', 'Sangli', 'Jalgaon', 'Akola', 'Latur'],
        'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Kannur', 'Kottayam', 'Palakkad', 'Malappuram', 'Alappuzha', 'Pathanamthitta', 'Idukki', 'Wayanad', 'Kasaragod'],
        'Delhi': ['New Delhi', 'Gurgaon', 'Noida', 'Ghaziabad', 'Faridabad', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
        'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
    };

    // Services Data - Photography & Videography moved to Services category
    const servicesData = {
        stationery: [
            { name: 'Wedding Invitation Cards', badge: 'Essential', desc: 'Main invitation suite' },
            { name: 'Save the Date Cards', badge: 'Essential', desc: 'Announcement cards' },
            { name: 'RSVP Cards', badge: 'Essential', desc: 'Response cards' },
            { name: 'Thank You Cards', badge: 'Optional', desc: 'Post-event notes' },
            { name: 'Menu Cards', badge: 'Essential', desc: 'Food display' },
            { name: 'Place Cards / Table Numbers', badge: 'Essential', desc: 'Seating arrangement' },
            { name: 'Welcome Signs', badge: 'Essential', desc: 'Directional signage' },
            { name: 'Program Brochures', badge: 'Optional', desc: 'Event timeline' },
            { name: 'Seating Chart Display', badge: 'Essential', desc: 'Guest guide' }
        ],
        stays: [
            { name: 'Guest Room Block Booking', badge: 'Essential', desc: 'Discounted rooms' },
            { name: 'Welcome Drinks at Hotel', badge: 'Essential', desc: 'Arrival refreshments' },
            { name: 'Check-in Coordination', badge: 'Essential', desc: 'Smooth arrival' },
            { name: 'VIP Guest Accommodation', badge: 'Essential', desc: 'Special family rooms' },
            { name: 'Bridal Suite Preparation', badge: 'Essential', desc: 'Getting ready space' },
            { name: 'Groom\'s Room Arrangement', badge: 'Essential', desc: 'Preparation area' },
            { name: 'Hotel Staff Briefing', badge: 'Essential', desc: 'Service coordination' },
            { name: 'Late Check-out Requests', badge: 'Optional', desc: 'Extended stay' }
        ],
        transport: [
            { name: 'Guest Airport Transfers', badge: 'Essential', desc: 'Pickup & drop' },
            { name: 'Bridal Car / Vintage Car', badge: 'Essential', desc: 'Bride arrival' },
            { name: 'Groom\'s Arrival Vehicle', badge: 'Essential', desc: 'Groom transport' },
            { name: 'Family Shuttles', badge: 'Essential', desc: 'Group transport' },
            { name: 'Artist & Vendor Transport', badge: 'Essential', desc: 'Logistics' },
            { name: 'Return Transfers', badge: 'Essential', desc: 'Post-event' },
            { name: 'Valet Parking Service', badge: 'Essential', desc: 'Parking management' },
            { name: 'Driver Briefing & Routes', badge: 'Essential', desc: 'Route planning' }
        ],
        gifts: [
            { name: 'Welcome Hampers', badge: 'Essential', desc: 'Arrival gifts' },
            { name: 'Bridal Party Gift Boxes', badge: 'Essential', desc: 'Bridesmaids gifts' },
            { name: 'Groom\'s Squad Kits', badge: 'Essential', desc: 'Groomsmen gifts' },
            { name: 'Return Gifts', badge: 'Essential', desc: 'Guest favors' },
            { name: 'Eco-friendly Favors', badge: 'Optional', desc: 'Sustainable options' },
            { name: 'Personalized Mementos', badge: 'Optional', desc: 'Custom keepsakes' },
            { name: 'VIP Parent Hampers', badge: 'Essential', desc: 'Special gifts' }
        ],
        entertainment: [
            { name: 'Live Band / DJ', badge: 'Essential', desc: 'Music' },
            { name: 'Mehendi Artist', badge: 'Essential', desc: 'Henna' },
            { name: 'Special Effects', badge: 'Essential', desc: 'Atmospheric lighting, confetti blasts, dry ice, sparklers, and visual enhancements' },
            { name: 'Choreographer', badge: 'Optional', desc: 'Sangeet dances' },
            { name: 'Photo Booth', badge: 'Essential', desc: 'Interactive' },
            { name: 'Fireworks / Laser Show', badge: 'Optional', desc: 'Spectacular' }
        ],
        services: [
            { name: 'Decor & Florist', badge: 'Essential', desc: 'Styling' },
            { name: 'Catering & F&B', badge: 'Essential', desc: 'Food service' },
            { name: 'Photographer & Videographer', badge: 'Essential', desc: 'Documentation' },
            { name: 'Makeup Artist', badge: 'Essential', desc: 'Bridal makeup' },
            { name: 'Sound & Lighting', badge: 'Essential', desc: 'Production' },
            { name: 'Tent & Furniture', badge: 'Essential', desc: 'Infrastructure' },
            { name: 'Security Service', badge: 'Essential', desc: 'Safety' },
            { name: 'Cleanup & Waste', badge: 'Essential', desc: 'Post-event' },
            { name: 'Power Backup', badge: 'Essential', desc: 'Generator' }
        ],
        addons: [
            { name: 'Live Food Counter', badge: 'Optional', desc: 'Interactive dining' },
            { name: 'After Party', badge: 'Optional', desc: 'Extended celebration' },
            { name: 'Drone Photography', badge: 'Optional', desc: 'Aerial footage' },
            { name: '360° Video Booth', badge: 'Optional', desc: 'Immersive video' },
            { name: 'Fire Dancers', badge: 'Optional', desc: 'Live entertainment' },
            { name: 'Midnight Snack Counter', badge: 'Essential', desc: 'Late-night food' }
        ]
    };

    // Initialize Flatpickr
    flatpickr("#dateRangePicker", {
        mode: "range",
        dateFormat: "d M Y",
        minDate: "today",
        altInput: true,
        altFormat: "F j, Y",
        theme: "light"
    });

    // File upload tracking
    let uploadedFiles = [];
    const fileInput = document.getElementById('decorImages');
    const fileListDiv = document.getElementById('fileList');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            uploadedFiles = Array.from(e.target.files);
            if (fileListDiv) {
                fileListDiv.innerHTML = uploadedFiles.map(f => `<i class="fas fa-image"></i> ${f.name}`).join('<br>');
            }
        });
    }

    // ==================== RENDER SERVICES ====================
    function renderServices(category = 'all') {
        const container = document.getElementById('servicesContainer');
        if (!container) return;
        
        let html = '';
        const categoriesToShow = category === 'all' ? Object.keys(servicesData) : [category];
        
        for (const cat of categoriesToShow) {
            if (!servicesData[cat]) continue;
            html += `
                <div class="service-category" data-category="${cat}">
                    <div class="category-title">${getCategoryName(cat)}</div>
                    <div class="services-grid">
            `;
            for (const service of servicesData[cat]) {
                const badgeClass = service.badge === 'Essential' ? 'badge-essential' : 'badge-optional';
                html += `
                    <label class="service-label">
                        <input type="checkbox" name="services" value="${service.name}">
                        <span class="service-name">${service.name}</span>
                        <span class="service-badge ${badgeClass}">${service.badge}</span>
                        <span class="service-desc">${service.desc}</span>
                    </label>
                `;
            }
            html += `</div></div>`;
        }
        container.innerHTML = html;
    }

    function getCategoryName(cat) {
        const names = {
            stationery: 'Stationery',
            stays: 'Guest Stays',
            transport: 'Transport',
            gifts: 'Gifts',
            entertainment: 'Entertainment',
            services: 'Services',
            addons: 'Add-ons'
        };
        return names[cat] || cat;
    }

    // Category filter
    const categoryBtns = document.querySelectorAll('.cat-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderServices(this.dataset.cat);
        });
    });
    renderServices('all');

    // ==================== STATE/CITY UPDATE ====================
    const stateSelect = document.getElementById('stateSelect');
    const citySelect = document.getElementById('citySelect');
    const stateOtherOption = document.getElementById('stateOtherOption');
    const stateOtherInput = document.getElementById('stateOtherInput');
    const cityOtherInput = document.getElementById('cityOtherInput');
    
    function updateCities() {
        const selectedState = stateSelect.value;
        citySelect.innerHTML = '<option value="">Select District / City</option>';
        if (selectedState === 'Other') {
            cityOtherInput.style.display = 'block';
            citySelect.style.display = 'none';
        } else {
            cityOtherInput.style.display = 'none';
            citySelect.style.display = 'block';
            if (selectedState && locationData[selectedState]) {
                locationData[selectedState].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }
        }
    }
    
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            if (stateSelect.value === 'Other') {
                stateOtherInput.style.display = 'block';
            } else {
                stateOtherInput.style.display = 'none';
            }
            updateCities();
        });
    }
    updateCities();

    // ==================== STEP NAVIGATION ====================
    function showStep(step) {
        document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
        document.getElementById(`step${step}`).classList.add('active');
        
        document.querySelectorAll('.progress-step').forEach((el, idx) => {
            if (idx + 1 < step) {
                el.classList.add('completed');
                el.classList.remove('active');
            } else if (idx + 1 === step) {
                el.classList.add('active');
                el.classList.remove('completed');
            } else {
                el.classList.remove('active', 'completed');
            }
        });
        
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        prevBtn.disabled = (step === 1);
        
        if (step === totalSteps) {
            nextBtn.style.display = 'none';
            updateSummaryPreview();
        } else {
            nextBtn.style.display = 'flex';
        }
    }

    function validateStep(step) {
        let isValid = true;
        const currentStepDiv = document.getElementById(`step${step}`);
        const requiredInputs = currentStepDiv.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e8751a';
                isValid = false;
            } else {
                input.style.borderColor = '#fed7aa';
            }
        });
        
        if (step === 1) {
            const eventSelected = Array.from(document.querySelectorAll('.eventTypeRadio')).some(r => r.checked);
            if (!eventSelected) {
                showStatus('Please select an Event Type', 'error');
                isValid = false;
            }
        }
        
        const emailInput = document.querySelector('input[name="clientEmail"]');
        if (emailInput && emailInput.value && !emailInput.value.includes('@')) {
            emailInput.style.borderColor = '#e8751a';
            showStatus('Please enter a valid email address', 'error');
            isValid = false;
        }
        
        return isValid;
    }

    document.getElementById('nextBtn').addEventListener('click', function() {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
                if (currentStep === 5) updatePrioritySections();
            }
        } else {
            showStatus('Please fill all required fields', 'error');
            setTimeout(() => clearStatus(), 3000);
        }
    });

    document.getElementById('prevBtn').addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // ==================== EVENT TYPE LOGIC ====================
    function getSelectedEventType() {
        const radios = document.querySelectorAll('.eventTypeRadio');
        for (let radio of radios) {
            if (radio.checked) return radio.value;
        }
        return null;
    }

    const weddingSection = document.getElementById('weddingSection');
    const receptionSection = document.getElementById('receptionSection');
    const corporateSection = document.getElementById('corporateSection');
    const simpleEventSection = document.getElementById('simpleEventSection');
    const otherEventDetailsSection = document.getElementById('otherEventDetailsSection');
    const otherEventRadio = document.getElementById('otherEventRadio');
    const otherEventInput = document.getElementById('otherEventInput');

    const weddingPrioritiesSection = document.getElementById('weddingPrioritiesSection');
    const receptionPrioritiesSection = document.getElementById('receptionPrioritiesSection');
    const corporatePrioritiesSection = document.getElementById('corporatePrioritiesSection');
    const otherPrioritiesSection = document.getElementById('otherPrioritiesSection');

    // Cultural Style Other
    const culturalStyleOtherRadio = document.getElementById('culturalStyleOtherRadio');
    const culturalStyleOtherInput = document.getElementById('culturalStyleOtherInput');
    if (culturalStyleOtherRadio) {
        culturalStyleOtherRadio.addEventListener('change', function() {
            culturalStyleOtherInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Wedding Vibe Other
    const weddingVibeOther = document.getElementById('weddingVibeOther');
    const weddingVibeOtherInput = document.getElementById('weddingVibeOtherInput');
    if (weddingVibeOther) {
        weddingVibeOther.addEventListener('change', function() {
            weddingVibeOtherInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Venue Preference Other
    const venueOtherCheckbox = document.getElementById('venueOtherCheckbox');
    const venueOtherInput = document.getElementById('venueOtherInput');
    if (venueOtherCheckbox) {
        venueOtherCheckbox.addEventListener('change', function() {
            if (venueOtherInput) venueOtherInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    function updatePrioritySections() {
        const selected = getSelectedEventType();
        if (weddingPrioritiesSection) weddingPrioritiesSection.style.display = 'none';
        if (receptionPrioritiesSection) receptionPrioritiesSection.style.display = 'none';
        if (corporatePrioritiesSection) corporatePrioritiesSection.style.display = 'none';
        if (otherPrioritiesSection) otherPrioritiesSection.style.display = 'none';
        
        if (selected === 'Wedding' && weddingPrioritiesSection) weddingPrioritiesSection.style.display = 'block';
        else if (selected === 'Reception Only' && receptionPrioritiesSection) receptionPrioritiesSection.style.display = 'block';
        else if (selected === 'Corporate Event' && corporatePrioritiesSection) corporatePrioritiesSection.style.display = 'block';
        else if (selected === 'Other' && otherPrioritiesSection) otherPrioritiesSection.style.display = 'block';
    }

    function updateEventTypeUI() {
        const selected = getSelectedEventType();
        if (weddingSection) weddingSection.style.display = 'none';
        if (receptionSection) receptionSection.style.display = 'none';
        if (corporateSection) corporateSection.style.display = 'none';
        if (simpleEventSection) simpleEventSection.style.display = 'none';
        if (otherEventDetailsSection) otherEventDetailsSection.style.display = 'none';
        
        if (selected === 'Wedding' && weddingSection) weddingSection.style.display = 'block';
        else if (selected === 'Reception Only' && receptionSection) receptionSection.style.display = 'block';
        else if (selected === 'Corporate Event' && corporateSection) corporateSection.style.display = 'block';
        else if (selected === 'Decor Only' && simpleEventSection) simpleEventSection.style.display = 'block';
        else if (selected === 'Other') {
            if (simpleEventSection) simpleEventSection.style.display = 'block';
            if (otherEventDetailsSection) otherEventDetailsSection.style.display = 'block';
        }
        
        if (otherEventInput) otherEventInput.style.display = (selected === 'Other' && otherEventRadio?.checked) ? 'block' : 'none';
        updatePrioritySections();
    }

    document.querySelectorAll('.eventTypeRadio').forEach(radio => {
        radio.addEventListener('change', updateEventTypeUI);
    });
    updateEventTypeUI();

    // ==================== OTHER INPUT HANDLERS ====================
    const otherPriorityCheckbox = document.getElementById('otherPriorityCheckbox');
    const otherPriorityInput = document.getElementById('otherPriorityInput');
    if (otherPriorityCheckbox) {
        otherPriorityCheckbox.addEventListener('change', function() {
            if (otherPriorityInput) otherPriorityInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const otherReachOut = document.getElementById('reachOutOtherCheckbox');
    const otherReachOutInput = document.getElementById('reachOutOtherInput');
    if (otherReachOut) {
        otherReachOut.addEventListener('change', function() {
            if (otherReachOutInput) otherReachOutInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const otherCeremonyCheckbox = document.getElementById('otherCeremonyCheckbox');
    const otherCeremonyInput = document.getElementById('otherCeremonyInput');
    if (otherCeremonyCheckbox) {
        otherCeremonyCheckbox.addEventListener('change', function() {
            if (otherCeremonyInput) otherCeremonyInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const receptionOtherCheckbox = document.getElementById('receptionOtherCheckbox');
    const receptionOtherInput = document.getElementById('receptionOtherInput');
    if (receptionOtherCheckbox) {
        receptionOtherCheckbox.addEventListener('change', function() {
            if (receptionOtherInput) receptionOtherInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const otherCorporateCheckbox = document.getElementById('otherCorporateCheckbox');
    const otherCorporateInput = document.getElementById('otherCorporateInput');
    if (otherCorporateCheckbox) {
        otherCorporateCheckbox.addEventListener('change', function() {
            if (otherCorporateInput) otherCorporateInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const otherReceptionPriorityCheckbox = document.getElementById('otherReceptionPriorityCheckbox');
    const otherReceptionPriorityInput = document.getElementById('otherReceptionPriorityInput');
    if (otherReceptionPriorityCheckbox) {
        otherReceptionPriorityCheckbox.addEventListener('change', function() {
            if (otherReceptionPriorityInput) otherReceptionPriorityInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const otherCorporatePriorityCheckbox = document.getElementById('otherCorporatePriorityCheckbox');
    const otherCorporatePriorityInput = document.getElementById('otherCorporatePriorityInput');
    if (otherCorporatePriorityCheckbox) {
        otherCorporatePriorityCheckbox.addEventListener('change', function() {
            if (otherCorporatePriorityInput) otherCorporatePriorityInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const entertainmentRadios = document.querySelectorAll('.entertainmentRadio');
    const entertainmentSuggestions = document.getElementById('entertainmentSuggestions');
    entertainmentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (entertainmentSuggestions) entertainmentSuggestions.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });

    const needRoomsRadios = document.querySelectorAll('.needRoomsRadio');
    const roomsInputDiv = document.getElementById('roomsInput');
    needRoomsRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (roomsInputDiv) roomsInputDiv.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });

    const vendorRadios = document.querySelectorAll('.vendorRadio');
    const vendorOptionsDiv = document.getElementById('vendorOptions');
    vendorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (vendorOptionsDiv) vendorOptionsDiv.style.display = this.value === 'yes' ? 'block' : 'none';
        });
    });

    const planningOtherRadio = document.getElementById('planningOtherRadio');
    const otherPlanningInput = document.getElementById('otherPlanningInput');
    if (planningOtherRadio) {
        planningOtherRadio.addEventListener('change', function() {
            if (otherPlanningInput) otherPlanningInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    // ==================== COLLECT ALL SELECTED SERVICES ====================
    function getAllSelectedServices() {
        const selectedServices = [];
        const allServiceCheckboxes = document.querySelectorAll('#servicesContainer input[type="checkbox"]');
        allServiceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const label = checkbox.closest('.service-label');
                if (label) {
                    const serviceNameSpan = label.querySelector('.service-name');
                    if (serviceNameSpan) {
                        selectedServices.push(serviceNameSpan.textContent);
                    } else {
                        selectedServices.push(checkbox.value);
                    }
                } else {
                    selectedServices.push(checkbox.value);
                }
            }
        });
        return selectedServices;
    }

    // ==================== COLLECT FORM DATA ====================
    function collectFormData() {
        const formData = new FormData(form);
        const data = {};
        
        const arrayFields = ['ceremonies', 'weddingVibe', 'priorities', 'receptionItems', 'corporateFunctions', 'entertainmentOptions', 'venueCategory', 'foodType', 'finalizedVendors', 'reachOutReason', 'receptionPriorities', 'corporatePriorities'];
        arrayFields.forEach(field => { data[field] = []; });
        
        for (let [key, value] of formData.entries()) {
            if (arrayFields.includes(key)) {
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        
        // Handle Venue Other - Replace "Other" with actual text
        const venueOtherCheckboxGlobal = document.getElementById('venueOtherCheckbox');
        if (venueOtherCheckboxGlobal?.checked) {
            const otherText = document.getElementById('venueOtherText')?.value;
            if (otherText) {
                const otherIndex = data.venueCategory.indexOf('Other');
                if (otherIndex !== -1) {
                    data.venueCategory[otherIndex] = `Other: ${otherText}`;
                }
            }
        }
        
        // Services
        data.services = getAllSelectedServices();
        if (data.services.length === 0) data.services = ['None selected'];
        
        // Other Event Details
        const otherEventDetails = document.getElementById('otherEventDetails');
        if (otherEventDetails && otherEventDetails.value) data.otherEventDetails = otherEventDetails.value;
        
        // Other Priorities Text
        const otherPrioritiesText = document.getElementById('otherPrioritiesText');
        if (otherPrioritiesText && otherPrioritiesText.value) data.otherPrioritiesText = otherPrioritiesText.value;
        
        // Wedding Priorities
        const weddingPriorityCheckboxes = document.querySelectorAll('#weddingPrioritiesSection input[type="checkbox"]');
        const weddingPriorities = [];
        weddingPriorityCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.name === 'priorities') {
                const label = checkbox.closest('.priority-label');
                if (label) weddingPriorities.push(label.textContent.trim());
                else weddingPriorities.push(checkbox.value);
            }
        });
        if (weddingPriorities.length > 0) data.priorities = weddingPriorities;
        
        // Reception Priorities
        const receptionPriorityCheckboxes = document.querySelectorAll('#receptionPrioritiesSection input[type="checkbox"]');
        const receptionPriorities = [];
        receptionPriorityCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.name === 'receptionPriorities') {
                const label = checkbox.closest('.priority-label');
                if (label) receptionPriorities.push(label.textContent.trim());
                else receptionPriorities.push(checkbox.value);
            }
        });
        if (receptionPriorities.length > 0) data.receptionPriorities = receptionPriorities;
        
        // Corporate Priorities
        const corporatePriorityCheckboxes = document.querySelectorAll('#corporatePrioritiesSection input[type="checkbox"]');
        const corporatePriorities = [];
        corporatePriorityCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.name === 'corporatePriorities') {
                const label = checkbox.closest('.priority-label');
                if (label) corporatePriorities.push(label.textContent.trim());
                else corporatePriorities.push(checkbox.value);
            }
        });
        if (corporatePriorities.length > 0) data.corporatePriorities = corporatePriorities;
        
        // Event Type
        let eventType = getSelectedEventType();
        data.eventType = eventType || '';
        
        // Cultural Style
        const culturalStyleRadios = document.querySelectorAll('input[name="culturalStyle"]');
        for (let radio of culturalStyleRadios) {
            if (radio.checked) {
                if (radio.value === 'Other') {
                    const otherText = document.getElementById('culturalStyleOtherText')?.value;
                    data.culturalStyle = otherText || 'Other';
                } else {
                    data.culturalStyle = radio.value;
                }
            }
        }
        
        // Wedding Vibe Other
        if (weddingVibeOther?.checked) {
            const otherText = document.getElementById('weddingVibeOtherText')?.value;
            if (otherText) data.weddingVibe.push(`Other: ${otherText}`);
        }
        
        // Other Priority
        if (otherPriorityCheckbox?.checked) {
            const otherText = document.getElementById('otherPriorityText')?.value;
            if (otherText) data.priorities.push(`Other: ${otherText}`);
        }
        
        // Other Reception Priority
        if (otherReceptionPriorityCheckbox?.checked) {
            const otherText = document.getElementById('otherReceptionPriorityText')?.value;
            if (otherText) data.receptionPriorities.push(`Other: ${otherText}`);
        }
        
        // Other Corporate Priority
        if (otherCorporatePriorityCheckbox?.checked) {
            const otherText = document.getElementById('otherCorporatePriorityText')?.value;
            if (otherText) data.corporatePriorities.push(`Other: ${otherText}`);
        }
        
        // Other Ceremony
        if (otherCeremonyCheckbox?.checked) {
            const otherText = document.getElementById('otherCeremonyText')?.value;
            if (otherText) data.ceremonies.push(`Other: ${otherText}`);
        }
        
        // Other Reception
        if (receptionOtherCheckbox?.checked) {
            const otherText = document.getElementById('receptionOtherText')?.value;
            if (otherText) data.receptionItems.push(`Other: ${otherText}`);
        }
        
        // Other Corporate Function
        if (otherCorporateCheckbox?.checked) {
            const otherText = document.getElementById('otherCorporateText')?.value;
            if (otherText) data.corporateFunctions.push(`Other: ${otherText}`);
        }
        
        // Other Reach Out
        if (otherReachOut?.checked) {
            const otherText = document.getElementById('reachOutOtherText')?.value;
            if (otherText) data.reachOutReason.push(`Other: ${otherText}`);
        }
        
        // Planning Type Other
        if (planningOtherRadio?.checked) {
            const otherText = document.getElementById('otherPlanningText')?.value;
            if (otherText) data.planningType = `Other: ${otherText}`;
        }
        
        // Other Event Type
        if (otherEventRadio?.checked && eventType === 'Other') {
            const otherText = document.getElementById('otherEventText')?.value;
            if (otherText) data.eventType = `Other: ${otherText}`;
        }
        
        // State/City Other
        let finalState = data.state;
        if (data.state === 'Other') {
            const otherStateText = document.getElementById('stateOtherText')?.value;
            if (otherStateText) finalState = otherStateText;
        }
        data.state = finalState || '';
        
        let finalCity = data.city;
        if (data.city === 'Other' || !data.city) {
            const otherCityText = document.getElementById('cityOtherText')?.value;
            if (otherCityText) finalCity = otherCityText;
        }
        data.city = finalCity || '';
        
        // File uploads
        data.uploadedFiles = uploadedFiles.length > 0 ? uploadedFiles.map(f => f.name).join(', ') : 'No files uploaded';
        data.roomsRequired = (data.needRooms === 'yes' && data.roomsRequired) ? data.roomsRequired : 'Not required';
        
        // Defaults
        arrayFields.forEach(field => {
            if (data[field] && data[field].length === 0) data[field] = ['None selected'];
        });
        
        // Required fields
        data.clientName = data.clientName || '';
        data.clientPhone = data.clientPhone || '';
        data.clientEmail = data.clientEmail || '';
        data.dateRange = data.dateRange || '';
        data.celebrationDays = data.celebrationDays || '';
        data.guestCount = data.guestCount || '';
        data.foodExperience = data.foodExperience || '';
        data.estimatedBudget = data.estimatedBudget || '';
        data.decisionMaker = data.decisionMaker || '';
        data.finaliseDeadline = data.finaliseDeadline || '';
        data.otherPlanners = data.otherPlanners || 'No';
        data.sustainableWedding = data.sustainableWedding || 'No';
        data.planningType = data.planningType || '';
        data.vendorFinalized = data.vendorFinalized || 'no';
        
        return data;
    }

    // ==================== UPDATE SUMMARY ====================
    function updateSummaryPreview() {
        const data = collectFormData();
        const preview = document.getElementById('summaryPreview');
        if (!preview) return;
        
        let prioritiesHtml = '';
        if (data.eventType === 'Wedding') {
            prioritiesHtml = `<div class="summary-section"><div class="summary-title">What Matters Most</div><div class="summary-item">${data.priorities.join(' • ')}</div></div>`;
        } else if (data.eventType === 'Reception Only') {
            prioritiesHtml = `<div class="summary-section"><div class="summary-title">What Matters Most</div><div class="summary-item">${data.receptionPriorities.join(' • ')}</div></div>`;
        } else if (data.eventType === 'Corporate Event') {
            prioritiesHtml = `<div class="summary-section"><div class="summary-title">What Matters Most</div><div class="summary-item">${data.corporatePriorities.join(' • ')}</div></div>`;
        } else if (data.eventType.includes('Other')) {
            prioritiesHtml = `<div class="summary-section"><div class="summary-title">What Matters Most</div><div class="summary-item">${data.otherPrioritiesText || 'Not specified'}</div></div>`;
        }
        
        let eventDetailsHtml = '';
        if (data.eventType === 'Wedding') {
            eventDetailsHtml = `
                <div class="summary-section"><div class="summary-title">Wedding Ceremonies</div><div class="summary-item">${data.ceremonies.join(' • ')}</div></div>
                <div class="summary-section"><div class="summary-title">Wedding Style</div>
                <div class="summary-item"><strong>Cultural Style:</strong> ${data.culturalStyle || '—'}</div>
                <div class="summary-item"><strong>Vibe:</strong> ${data.weddingVibe.join(', ')}</div></div>
            `;
        } else if (data.eventType === 'Reception Only') {
            eventDetailsHtml = `<div class="summary-section"><div class="summary-title">Reception Items</div><div class="summary-item">${data.receptionItems.join(' • ')}</div></div>`;
        } else if (data.eventType === 'Corporate Event') {
            eventDetailsHtml = `<div class="summary-section"><div class="summary-title">Corporate Functions</div><div class="summary-item">${data.corporateFunctions.join(' • ')}</div></div>`;
        } else if (data.eventType.includes('Other')) {
            eventDetailsHtml = `<div class="summary-section"><div class="summary-title">Event Details</div><div class="summary-item">${data.otherEventDetails || 'Custom event as described above'}</div></div>`;
        }
        
        const servicesCount = data.services.length;
        const servicesDisplay = data.services.slice(0, 8).join(' • ');
        
        preview.innerHTML = `
            <div class="summary-section"><div class="summary-title">Client Information</div>
                <div class="summary-item"><strong>Name:</strong> ${data.clientName || '—'}</div>
                <div class="summary-item"><strong>Contact:</strong> ${data.clientPhone || '—'} | ${data.clientEmail || '—'}</div>
                <div class="summary-item"><strong>Event:</strong> ${data.eventType || '—'}</div>
                <div class="summary-item"><strong>Planning:</strong> ${data.planningType || '—'}</div>
                <div class="summary-item"><strong>Budget:</strong> ${data.estimatedBudget || '—'}</div>
            </div>
            <div class="summary-section"><div class="summary-title">Event Details</div>
                <div class="summary-item"><strong>Days:</strong> ${data.celebrationDays || '—'} | <strong>Date:</strong> ${data.dateRange || '—'}</div>
                <div class="summary-item"><strong>Guests:</strong> ${data.guestCount || '—'}</div>
            </div>
            ${eventDetailsHtml}
            ${prioritiesHtml}
            <div class="summary-section"><div class="summary-title">Location</div>
                <div class="summary-item"><strong>${data.state || '—'} → ${data.city || '—'}</strong></div>
                <div class="summary-item"><strong>Venue:</strong> ${data.venueCategory.join(', ')}</div>
            </div>
            <div class="summary-section"><div class="summary-title">Services Selected (${servicesCount})</div>
                <div class="summary-item">${servicesDisplay}${data.services.length > 8 ? '...' : ''}</div>
            </div>
            <div class="summary-section"><div class="summary-title">How You Found Us</div>
                <div class="summary-item">${data.reachOutReason.join(' • ')}</div>
            </div>
        `;
    }

    // ==================== EXCEL DOWNLOAD ====================
    function downloadExcel(data) {
        const rows = [
            ['OH YES EVENTS - CLIENT DETAILS', ''],
            ['Generated:', new Date().toLocaleString()], ['', ''],
            ['CONTACT INFORMATION', ''], ['Full Name', data.clientName], ['Phone Number', data.clientPhone],
            ['Email Address', data.clientEmail], ['Event Type', data.eventType], ['Planning Type', data.planningType],
            ['Estimated Budget', data.estimatedBudget], ['', ''],
            ['EVENT DETAILS', ''], ['Number of Days', data.celebrationDays], ['Date Range', data.dateRange],
            ['Expected Guests', data.guestCount], ['', ''],
        ];
        
        if (data.eventType === 'Wedding') {
            rows.push(['WEDDING CEREMONIES', ''], ['Ceremonies', data.ceremonies.join(', ')], ['', '']);
            rows.push(['WEDDING STYLE', ''], ['Cultural Style', data.culturalStyle], ['Wedding Vibe', data.weddingVibe.join(', ')], ['', '']);
            rows.push(['WHAT MATTERS MOST', ''], ...data.priorities.map(p => ['Priority', p]), ['', '']);
        } else if (data.eventType === 'Reception Only') {
            rows.push(['RECEPTION ITEMS', ''], ['Items', data.receptionItems.join(', ')], ['', '']);
            rows.push(['WHAT MATTERS MOST', ''], ...data.receptionPriorities.map(p => ['Priority', p]), ['', '']);
        } else if (data.eventType === 'Corporate Event') {
            rows.push(['CORPORATE FUNCTIONS', ''], ['Functions', data.corporateFunctions.join(', ')], ['', '']);
            rows.push(['WHAT MATTERS MOST', ''], ...data.corporatePriorities.map(p => ['Priority', p]), ['', '']);
        } else if (data.eventType.includes('Other')) {
            rows.push(['CUSTOM EVENT DETAILS', ''], ['Description', data.otherEventDetails || 'Not specified'], ['', '']);
            rows.push(['WHAT MATTERS MOST', ''], ['Priority', data.otherPrioritiesText || 'Not specified'], ['', '']);
        }
        
        rows.push(
            ['LOCATION & VENUE', ''], ['State/Region', data.state], ['District/City', data.city],
            ['Venue Preference', data.venueCategory.join(', ')], ['', ''],
            ['FOOD & ACCOMMODATION', ''], ['Food Preference', data.foodType.join(', ')],
            ['Food Details', data.foodExperience || 'Not specified'], ['Rooms Required', data.roomsRequired], ['', ''],
            ['SERVICES SELECTED (' + data.services.length + ' services)', '']
        );
        
        for (const service of data.services) {
            if (service !== 'None selected') rows.push(['✓ ' + service, '']);
        }
        
        rows.push(['', '']);
        rows.push(['HOW YOU FOUND US', ''], ['Source', data.reachOutReason.join(', ')], ['', '']);
        rows.push(['VENDORS & DECISION', ''], ['Vendors Finalized', data.vendorFinalized === 'yes' ? 'Yes' : 'No']);
        if (data.vendorFinalized === 'yes') rows.push(['Finalized Vendors', data.finalizedVendors.join(', ')]);
        rows.push(['Decision Maker', data.decisionMaker], ['Finalize By', data.finaliseDeadline],
            ['Other Planners', data.otherPlanners], ['Sustainable Wedding', data.sustainableWedding],
            ['', ''], ['Thank you for choosing Oh Yes Events!', '']
        );
        
        let csv = rows.map(row => row.map(cell => {
            let s = String(cell || '');
            if (s.includes(',') || s.includes('"')) s = '"' + s.replace(/"/g, '""') + '"';
            return s;
        }).join(',')).join('\n');
        
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `OhYesEvents_${data.clientName.replace(/[^a-z0-9]/gi, '_')}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    // ==================== EMAIL FUNCTION ====================
    const YOUR_EMAIL = 'ohyeseventschennai@gmail.com';
    
    async function sendFormDataToEmail(data) {
        const url = `https://formsubmit.co/ajax/${YOUR_EMAIL}`;
        
        let emailBody = `✨✨✨ NEW EVENT ENQUIRY - OH YES EVENTS ✨✨✨\n\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `📋 CLIENT INFORMATION\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `Name: ${data.clientName}\n`;
        emailBody += `Phone: ${data.clientPhone}\n`;
        emailBody += `Email: ${data.clientEmail}\n`;
        emailBody += `Event Type: ${data.eventType}\n`;
        emailBody += `Planning Type: ${data.planningType}\n`;
        emailBody += `Estimated Budget: ${data.estimatedBudget}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `📅 EVENT DETAILS\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `Number of Days: ${data.celebrationDays}\n`;
        emailBody += `Date Range: ${data.dateRange}\n`;
        emailBody += `Guest Count: ${data.guestCount}\n\n`;
        
        if (data.eventType === 'Wedding') {
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `🎊 WEDDING CEREMONIES\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.ceremonies.join(', ')}\n\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `🎨 WEDDING STYLE\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `Cultural Style: ${data.culturalStyle}\n`;
            emailBody += `Wedding Vibe: ${data.weddingVibe.join(', ')}\n\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `⭐ WHAT MATTERS MOST\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.priorities.join('\n')}\n\n`;
        } else if (data.eventType === 'Reception Only') {
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `🥂 RECEPTION ITEMS\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.receptionItems.join(', ')}\n\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `⭐ WHAT MATTERS MOST\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.receptionPriorities.join('\n')}\n\n`;
        } else if (data.eventType === 'Corporate Event') {
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `🏢 CORPORATE FUNCTIONS\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.corporateFunctions.join(', ')}\n\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `⭐ WHAT MATTERS MOST\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.corporatePriorities.join('\n')}\n\n`;
        } else if (data.eventType.includes('Other')) {
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `📝 CUSTOM EVENT DETAILS\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.otherEventDetails || 'Not specified'}\n\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `⭐ WHAT MATTERS MOST\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.otherPrioritiesText || 'Not specified'}\n\n`;
        }
        
        if (data.needEntertainment === 'yes' && data.entertainmentOptions[0] !== 'None selected') {
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `🎵 ENTERTAINMENT OPTIONS\n`;
            emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailBody += `${data.entertainmentOptions.join(', ')}\n\n`;
        }
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `📍 LOCATION & VENUE\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `State/Region: ${data.state}\n`;
        emailBody += `District/City: ${data.city}\n`;
        emailBody += `Venue Preference: ${data.venueCategory.join(', ')}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `🍽️ FOOD & ACCOMMODATION\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `Food Type: ${data.foodType.join(', ')}\n`;
        emailBody += `Food Details: ${data.foodExperience || 'Not specified'}\n`;
        emailBody += `Rooms Required: ${data.roomsRequired}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `🎨 DÉCOR & INSPIRATION\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `Theme/Idea: ${data.decorInspiration || 'Not specified'}\n`;
        emailBody += `Inspiration Link: ${data.inspirationLink || 'Not specified'}\n`;
        emailBody += `Uploaded Images: ${data.uploadedFiles}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `🛎️ SERVICES SELECTED (Total: ${data.services.length} services)\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        for (const service of data.services) {
            if (service !== 'None selected') emailBody += `✓ ${service}\n`;
        }
        emailBody += `\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `📢 HOW YOU FOUND US\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `${data.reachOutReason.join(', ')}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `🤝 VENDORS & DECISION MAKING\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `Vendors Finalized: ${data.vendorFinalized === 'yes' ? 'Yes' : 'No'}\n`;
        if (data.vendorFinalized === 'yes') emailBody += `Finalized Vendors: ${data.finalizedVendors.join(', ')}\n`;
        emailBody += `Decision Maker: ${data.decisionMaker}\n`;
        emailBody += `Finalize By: ${data.finaliseDeadline}\n`;
        emailBody += `Exploring Other Planners: ${data.otherPlanners}\n`;
        emailBody += `Sustainable Wedding: ${data.sustainableWedding}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `📎 This inquiry was sent via Oh Yes Events Premium Wedding Planner\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: `Wedding Enquiry: ${data.clientName}`, 
                    email: data.clientEmail, 
                    message: emailBody, 
                    _subject: `✨ NEW: ${data.eventType} Enquiry from ${data.clientName} ✨`,
                    _template: 'table'
                })
            });
            return response.ok;
        } catch { return false; }
    }

    // ==================== GOOGLE SHEETS ====================
    async function sendToGoogleSheets(data) {
        try {
            await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ timestamp: new Date().toISOString(), ...data })
            });
            return true;
        } catch { return false; }
    }

    // ==================== SUBMIT ====================
    async function processSubmission(data) {
        const emailOk = await sendFormDataToEmail(data);
        const sheetsOk = await sendToGoogleSheets(data);
        downloadExcel(data);
        return { emailOk, sheetsOk };
    }

    function showStatus(msg, type = 'success') {
        if (!statusDiv) return;
        statusDiv.innerHTML = msg;
        statusDiv.className = `status-message ${type}`;
        statusDiv.style.display = 'block';
        setTimeout(() => { if (statusDiv.innerHTML === msg) statusDiv.style.display = 'none'; }, 8000);
    }
    
    function clearStatus() { if (statusDiv) statusDiv.style.display = 'none'; }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            for (let i = 1; i <= totalSteps - 1; i++) {
                if (!validateStep(i)) {
                    showStatus('Please complete all required fields', 'error');
                    currentStep = i;
                    showStep(i);
                    return;
                }
            }
            
            showStatus('<i class="fas fa-spinner fa-pulse"></i> Processing...', 'success');
            const data = collectFormData();
            const result = await processSubmission(data);
            
            if (result.emailOk || result.sheetsOk) {
                showStatus('✅ Success! Your details have been submitted. Excel file is downloading. Our team will contact you within 24 hours! ✨', 'success');
            } else {
                showStatus('⚠️ Excel file downloaded. Please share it with us if you don\'t hear back.', 'error');
            }
        });
    }

    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('focus', function() { this.style.borderColor = '#fed7aa'; });
    });
    
    showStep(1);
});