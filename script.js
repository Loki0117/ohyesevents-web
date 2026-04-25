// script.js - Complete with Transitions for ALL Steps
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll
    function smoothScrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Show transition message (slower for luxury feel - 2200ms)
    function showTransitionMessage(message) {
        const msgDiv = document.getElementById('transitionMessage');
        if (msgDiv) {
            msgDiv.textContent = message;
            msgDiv.classList.add('show');
            setTimeout(() => {
                msgDiv.classList.remove('show');
            }, 2200);
        }
    }

    // ==================== SIGNATURE MOMENT (ONLY AFTER STEP 3) ====================
    function showSignatureMoment() {
        return new Promise((resolve) => {
            const momentDiv = document.createElement('div');
            momentDiv.className = 'signature-moment';
            momentDiv.innerHTML = `
                <div class="signature-moment-content">
                    <div class="signature-moment-line">━━━━━━━━</div>
                    <p class="signature-moment-text">We're shaping something beautiful for you...</p>
                    <div class="signature-moment-line">━━━━━━━━</div>
                </div>
            `;
            document.body.appendChild(momentDiv);
            
            setTimeout(() => {
                momentDiv.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                momentDiv.classList.remove('show');
                setTimeout(() => {
                    momentDiv.remove();
                    resolve();
                }, 300);
            }, 2000);
        });
    }

    // ==================== PREMIUM INTERACTIONS FOR PRIORITY CARDS ====================
    function initPremiumInteractions() {
        const priorityCards = document.querySelectorAll('.priority-card');
        
        priorityCards.forEach(card => {
            const checkbox = card.querySelector('input');
            const label = card.querySelector('label');
            
            if (!checkbox || !label) return;
            
            label.addEventListener('mousedown', function(e) {
                if (e.target === checkbox) return;
                card.classList.add('press');
            });
            
            label.addEventListener('mouseup', function() {
                card.classList.remove('press');
                card.classList.add('press-release');
                setTimeout(() => {
                    card.classList.remove('press-release');
                    card.classList.add('press-settle');
                    setTimeout(() => {
                        card.classList.remove('press-settle');
                    }, 200);
                }, 150);
            });
            
            label.addEventListener('mouseleave', function() {
                card.classList.remove('press', 'press-release');
            });
        });
    }

    // DOM Elements
    const formWrapper = document.getElementById('formWrapper');
    const startBtn = document.getElementById('startPlanningBtn');
    const form = document.getElementById('weddingPlannerForm');
    const statusDiv = document.getElementById('formStatus');
    let currentStep = 1;
    const totalSteps = 5;

    // Transition messages for each step transition
    const transitionMessages = {
        from1to2: "Beautiful choice. Let's make it yours.",
        from2to3: "Thank you. Now let's plan the details.",
        from3to4: "You're doing great. One more step.",
        from4to5: "You're all set. Review your plan below."
    };

    // Show form on start
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            formWrapper.style.display = 'block';
            startBtn.style.display = 'none';
            smoothScrollToTop();
            setTimeout(() => {
                showTransitionMessage("Let's begin your journey.");
            }, 300);
        });
    }

    // Entertainment options toggle
    const entertainmentRadios = document.querySelectorAll('.entertainmentRadio');
    const entertainmentOptionsDiv = document.getElementById('entertainmentOptionsDiv');
    if (entertainmentRadios.length && entertainmentOptionsDiv) {
        entertainmentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                entertainmentOptionsDiv.style.display = this.value === 'yes' ? 'block' : 'none';
            });
        });
    }

    // Entertainment Other Checkbox
    const entertainmentOtherCheckbox = document.getElementById('entertainmentOtherCheckbox');
    const entertainmentOtherInput = document.getElementById('entertainmentOtherInput');
    if (entertainmentOtherCheckbox) {
        entertainmentOtherCheckbox.addEventListener('change', function() {
            if (entertainmentOtherInput) entertainmentOtherInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Google Sheets URL
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwMFX_zkSTb7ShRV2HSADdNX7Hm0jDYyOAGEajE0YSH8wnsJ7DNlOyOnUEK1F_JS285Ig/exec';

    // Complete Districts for all locations
    const locationData = {
        'Tamil Nadu': [
            'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode',
            'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
            'Nagapattinam', 'Namakkal', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem',
            'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
            'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
        ],
        'Bangalore': [
            'Bengaluru Urban', 'Bengaluru Rural', 'Chikkaballapur', 'Chitradurga', 'Davanagere', 'Dharwad',
            'Gadag', 'Hassan', 'Haveri', 'Hubli', 'Kalaburagi', 'Kolar', 'Mandya', 'Mysore', 'Ramanagara',
            'Shivamogga', 'Tumakuru', 'Udupi', 'Vijayapura', 'Bagalkot', 'Ballari', 'Belagavi', 'Bidar',
            'Chamarajanagar', 'Chikkamagaluru', 'Kodagu', 'Koppal', 'Raichur', 'Yadgir'
        ],
        'Hyderabad': [
            'Hyderabad', 'Secunderabad', 'Adilabad', 'Bhadradri Kothagudem', 'Jagtial', 'Jangaon',
            'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam',
            'Kumuram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal',
            'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla',
            'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'
        ],
        'Mumbai': [
            'Mumbai City', 'Mumbai Suburban', 'Thane', 'Palghar', 'Raigad', 'Ratnagiri', 'Sindhudurg',
            'Pune', 'Nashik', 'Nagpur', 'Aurangabad', 'Nanded', 'Solapur', 'Amravati', 'Kolhapur',
            'Sangli', 'Jalgaon', 'Akola', 'Latur', 'Dhule', 'Ahmednagar', 'Chandrapur', 'Wardha',
            'Buldhana', 'Yavatmal', 'Beed', 'Osmanabad', 'Hingoli', 'Parbhani', 'Gadchiroli'
        ],
        'Kerala': [
            'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam',
            'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
        ],
        'Delhi': [
            'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi',
            'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi', 'Gurugram', 'Noida',
            'Ghaziabad', 'Faridabad'
        ],
        'UAE': [
            'Abu Dhabi', 'Ajman', 'Dubai', 'Fujairah', 'Ras Al Khaimah', 'Sharjah', 'Umm Al Quwain'
        ]
    };

    // Flatpickr
    flatpickr("#dateRangePicker", {
        mode: "range",
        dateFormat: "d M Y",
        minDate: "today",
        altInput: true,
        altFormat: "F j, Y",
        theme: "light"
    });

    // State/City update
    const stateSelect = document.getElementById('stateSelect');
    const citySelect = document.getElementById('citySelect');
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

    // Step Navigation with proper transitions for each step
    function showStep(step) {
        document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
        const targetStep = document.getElementById(`step${step}`);
        if (targetStep) targetStep.classList.add('active');
        
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
        if (prevBtn) prevBtn.disabled = (step === 1);
        
        if (step === totalSteps) {
            if (nextBtn) nextBtn.style.display = 'none';
            updateSummaryPreview();
        } else {
            if (nextBtn) nextBtn.style.display = 'flex';
        }
        
        smoothScrollToTop();
    }

    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            const eventSelected = Array.from(document.querySelectorAll('.eventTypeRadio')).some(r => r.checked);
            if (!eventSelected) {
                showStatus('Please select an event type', 'error');
                isValid = false;
            }
        }
        
        if (step === 2) {
            const name = document.querySelector('input[name="clientName"]')?.value;
            const phone = document.querySelector('input[name="clientPhone"]')?.value;
            const email = document.querySelector('input[name="clientEmail"]')?.value;
            const budget = document.querySelector('input[name="estimatedBudget"]')?.value;
            
            if (!name || !phone || !email || !budget) {
                showStatus('Please fill all required fields', 'error');
                isValid = false;
            } else if (email && !email.includes('@')) {
                showStatus('Please enter a valid email address', 'error');
                isValid = false;
            }
        }
        
        if (step === 3) {
            const days = document.querySelector('select[name="celebrationDays"]')?.value;
            const dateRange = document.querySelector('input[name="dateRange"]')?.value;
            const guests = document.querySelector('input[name="guestCount"]')?.value;
            const state = document.querySelector('select[name="state"]')?.value;
            const city = document.querySelector('select[name="city"]')?.value;
            
            if (!days || !dateRange || !guests || !state || !city) {
                showStatus('Please complete all event details', 'error');
                isValid = false;
            }
        }
        
        return isValid;
    }

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', async function() {
            if (validateStep(currentStep)) {
                if (currentStep === 3 && currentStep < totalSteps) {
                    // SPECIAL: Show signature moment after Step 3
                    await showSignatureMoment();
                    currentStep++;
                    showStep(currentStep);
                } else if (currentStep === 1 && currentStep < totalSteps) {
                    // Transition from Step 1 to 2
                    showTransitionMessage(transitionMessages.from1to2);
                    currentStep++;
                    showStep(currentStep);
                } else if (currentStep === 2 && currentStep < totalSteps) {
                    // Transition from Step 2 to 3
                    showTransitionMessage(transitionMessages.from2to3);
                    currentStep++;
                    showStep(currentStep);
                } else if (currentStep === 4 && currentStep < totalSteps) {
                    // Transition from Step 4 to 5
                    showTransitionMessage(transitionMessages.from4to5);
                    currentStep++;
                    showStep(currentStep);
                } else if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }

    // Event Type Logic
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
    const otherEventInput = document.getElementById('otherEventInput');

    function updateEventTypeUI() {
        const selected = getSelectedEventType();
        if (weddingSection) weddingSection.style.display = 'none';
        if (receptionSection) receptionSection.style.display = 'none';
        if (corporateSection) corporateSection.style.display = 'none';
        
        if (selected === 'Wedding' && weddingSection) weddingSection.style.display = 'block';
        else if (selected === 'Reception Only' && receptionSection) receptionSection.style.display = 'block';
        else if (selected === 'Corporate Event' && corporateSection) corporateSection.style.display = 'block';
        
        if (otherEventInput) otherEventInput.style.display = (selected === 'Other') ? 'block' : 'none';
    }

    document.querySelectorAll('.eventTypeRadio').forEach(radio => {
        radio.addEventListener('change', updateEventTypeUI);
    });
    updateEventTypeUI();

    // Wedding Vibe Other
    const weddingVibeOther = document.getElementById('weddingVibeOther');
    const weddingVibeOtherInput = document.getElementById('weddingVibeOtherInput');
    if (weddingVibeOther) {
        weddingVibeOther.addEventListener('change', function() {
            if (weddingVibeOtherInput) weddingVibeOtherInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Other input handlers
    const otherCeremonyCheckbox = document.getElementById('otherCeremonyCheckbox');
    const otherCeremonyInput = document.getElementById('otherCeremonyInput');
    if (otherCeremonyCheckbox) {
        otherCeremonyCheckbox.addEventListener('change', function() {
            if (otherCeremonyInput) otherCeremonyInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const culturalStyleOtherRadio = document.getElementById('culturalStyleOtherRadio');
    const culturalStyleOtherInput = document.getElementById('culturalStyleOtherInput');
    if (culturalStyleOtherRadio) {
        culturalStyleOtherRadio.addEventListener('change', function() {
            if (culturalStyleOtherInput) culturalStyleOtherInput.style.display = this.checked ? 'block' : 'none';
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

    const venueOtherCheckbox = document.getElementById('venueOtherCheckbox');
    const venueOtherInput = document.getElementById('venueOtherInput');
    if (venueOtherCheckbox) {
        venueOtherCheckbox.addEventListener('change', function() {
            if (venueOtherInput) venueOtherInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const vendorOtherCheckbox = document.getElementById('vendorOtherCheckbox');
    const vendorOtherInput = document.getElementById('vendorOtherInput');
    if (vendorOtherCheckbox) {
        vendorOtherCheckbox.addEventListener('change', function() {
            if (vendorOtherInput) vendorOtherInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const needRoomsRadios = document.querySelectorAll('.needRoomsRadio');
    const roomsInputDiv = document.getElementById('roomsInput');
    if (roomsInputDiv) {
        needRoomsRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                roomsInputDiv.style.display = this.value === 'yes' ? 'block' : 'none';
            });
        });
    }

    const vendorRadios = document.querySelectorAll('.vendorRadio');
    const vendorOptionsDiv = document.getElementById('vendorOptions');
    if (vendorOptionsDiv) {
        vendorRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                vendorOptionsDiv.style.display = this.value === 'yes' ? 'block' : 'none';
            });
        });
    }

    const planningOtherRadio = document.getElementById('planningOtherRadio');
    const otherPlanningInput = document.getElementById('otherPlanningInput');
    if (planningOtherRadio) {
        planningOtherRadio.addEventListener('change', function() {
            if (otherPlanningInput) otherPlanningInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    const otherReachOut = document.getElementById('reachOutOtherCheckbox');
    const otherReachOutInput = document.getElementById('reachOutOtherInput');
    if (otherReachOut) {
        otherReachOut.addEventListener('change', function() {
            if (otherReachOutInput) otherReachOutInput.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Collect form data
    function collectFormData() {
        const formData = new FormData(form);
        const data = {};
        
        const arrayFields = ['ceremonies', 'weddingVibe', 'receptionItems', 'corporateFunctions', 'venueCategory', 'foodType', 'finalizedVendors', 'reachOutReason', 'entertainmentOptions'];
        arrayFields.forEach(field => { data[field] = []; });
        
        for (let [key, value] of formData.entries()) {
            if (arrayFields.includes(key)) {
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        
        // Handle Entertainment Other
        if (entertainmentOtherCheckbox?.checked) {
            const otherText = document.getElementById('entertainmentOtherText')?.value;
            if (otherText) {
                const otherIndex = data.entertainmentOptions.indexOf('Other');
                if (otherIndex !== -1) {
                    data.entertainmentOptions[otherIndex] = `Other: ${otherText}`;
                } else {
                    data.entertainmentOptions.push(`Other: ${otherText}`);
                }
            }
        }
        
        // Signature Priorities
        const signatureCheckboxes = document.querySelectorAll('.priority-card input[name="signaturePriorities"]');
        const selectedSignatures = [];
        signatureCheckboxes.forEach(cb => {
            if (cb.checked) selectedSignatures.push(cb.value);
        });
        data.signaturePriorities = selectedSignatures.length > 0 ? selectedSignatures : ['None selected'];
        
        // Handle Wedding Vibe Other
        if (weddingVibeOther?.checked) {
            const otherText = document.getElementById('weddingVibeOtherText')?.value;
            if (otherText) data.weddingVibe.push(`Other: ${otherText}`);
        }
        
        // Handle Venue Other
        if (venueOtherCheckbox?.checked) {
            const otherText = document.getElementById('venueOtherText')?.value;
            if (otherText) {
                const otherIndex = data.venueCategory.indexOf('Other');
                if (otherIndex !== -1) {
                    data.venueCategory[otherIndex] = `Other: ${otherText}`;
                }
            }
        }
        
        // Handle Vendor Other
        if (vendorOtherCheckbox?.checked) {
            const otherVendorText = document.getElementById('vendorOtherText')?.value;
            if (otherVendorText) {
                data.finalizedVendors.push(`Other: ${otherVendorText}`);
            }
        }
        
        // Handle Other Reach Out
        if (otherReachOut?.checked) {
            const otherText = document.getElementById('reachOutOtherText')?.value;
            if (otherText) data.reachOutReason.push(`Other: ${otherText}`);
        }
        
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
        
        // Other Corporate
        if (otherCorporateCheckbox?.checked) {
            const otherText = document.getElementById('otherCorporateText')?.value;
            if (otherText) data.corporateFunctions.push(`Other: ${otherText}`);
        }
        
        // Planning Type Other
        if (planningOtherRadio?.checked) {
            const otherText = document.getElementById('otherPlanningText')?.value;
            if (otherText) data.planningType = `Other: ${otherText}`;
        }
        
        // Other event type
        const otherEventRadio = document.getElementById('otherEventRadio');
        if (otherEventRadio?.checked && eventType === 'Other') {
            const otherText = document.getElementById('otherEventText')?.value;
            if (otherText) data.eventType = `Other: ${otherText}`;
        }
        
        // State/City other
        let finalState = data.state;
        if (data.state === 'Other') {
            const otherStateText = document.getElementById('stateOtherText')?.value;
            if (otherStateText) finalState = otherStateText;
        }
        data.state = finalState || '';
        
        let finalCity = data.city;
        if (!finalCity || finalCity === 'Other') {
            const otherCityText = document.getElementById('cityOtherText')?.value;
            if (otherCityText) finalCity = otherCityText;
        }
        data.city = finalCity || '';
        
        // Food experience
        data.foodExperience = data.foodExperience || 'Not specified';
        
        // Décor & Inspiration
        data.decorInspiration = data.decorInspiration || 'Not specified';
        data.inspirationLink = data.inspirationLink || 'Not specified';
        
        // Rooms
        data.roomsRequired = (data.needRooms === 'yes' && data.roomsRequired) ? data.roomsRequired : 'Not required';
        
        // Entertainment options - ensure proper formatting
        if (data.needEntertainment !== 'yes') {
            data.entertainmentOptions = ['None selected'];
        } else if (data.entertainmentOptions.length === 0) {
            data.entertainmentOptions = ['None selected'];
        }
        
        // Remove any 'Other' placeholder that wasn't replaced
        data.entertainmentOptions = data.entertainmentOptions.filter(opt => opt !== 'Other');
        
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
        data.estimatedBudget = data.estimatedBudget || '';
        data.decisionMaker = data.decisionMaker || '';
        data.finaliseDeadline = data.finaliseDeadline || '';
        data.otherPlanners = data.otherPlanners || 'No';
        data.sustainableWedding = data.sustainableWedding || 'No';
        data.planningType = data.planningType || '';
        data.vendorFinalized = data.vendorFinalized || 'no';
        data.needEntertainment = data.needEntertainment || 'no';
        
        return data;
    }

    // Update summary preview
    function updateSummaryPreview() {
        const data = collectFormData();
        const preview = document.getElementById('summaryPreview');
        if (!preview) return;
        
        let weddingStyleHtml = '';
        if (data.eventType === 'Wedding') {
            weddingStyleHtml = `
                <div class="summary-section"><div class="summary-title">Wedding Style</div>
                    <div class="summary-item"><strong>Cultural:</strong> ${data.culturalStyle || '—'}</div>
                    <div class="summary-item"><strong>Vibe:</strong> ${data.weddingVibe.join(', ')}</div>
                </div>
                <div class="summary-section"><div class="summary-title">Ceremonies</div>
                    <div class="summary-item">${data.ceremonies.join(' • ')}</div>
                </div>
            `;
        }
        
        preview.innerHTML = `
            <div class="summary-section"><div class="summary-title">About you</div>
                <div class="summary-item"><strong>${data.clientName || '—'}</strong></div>
                <div class="summary-item">${data.clientPhone || '—'} · ${data.clientEmail || '—'}</div>
                <div class="summary-item">${data.planningType || '—'} · ${data.estimatedBudget || '—'}</div>
            </div>
            <div class="summary-section"><div class="summary-title">Your event</div>
                <div class="summary-item">${data.eventType || '—'} · ${data.celebrationDays || '—'} · ${data.dateRange || '—'}</div>
                <div class="summary-item">${data.guestCount || '—'} guests · ${data.state || '—'} → ${data.city || '—'}</div>
                <div class="summary-item">Venue: ${data.venueCategory.slice(0, 3).join(', ')}</div>
            </div>
            ${weddingStyleHtml}
            <div class="summary-section"><div class="summary-title">What matters most</div>
                <div class="summary-item">${data.signaturePriorities.join(' • ')}</div>
            </div>
            <div class="summary-section"><div class="summary-title">Food & Entertainment</div>
                <div class="summary-item">Food: ${data.foodType.join(', ')}</div>
                <div class="summary-item">Entertainment: ${data.needEntertainment === 'yes' ? 'Yes' : 'No'}</div>
                ${data.needEntertainment === 'yes' && data.entertainmentOptions[0] !== 'None selected' ? `<div class="summary-item">Options: ${data.entertainmentOptions.join(', ')}</div>` : ''}
            </div>
        `;
    }

    // Excel download
    function downloadExcel(data) {
        const rows = [
            ['OH YES EVENTS - CLIENT DETAILS', ''],
            ['Generated:', new Date().toLocaleString()], ['', ''],
            ['CONTACT INFORMATION', ''], ['Name', data.clientName], ['Phone', data.clientPhone],
            ['Email', data.clientEmail], ['Event Type', data.eventType], ['Planning Type', data.planningType],
            ['Estimated Budget', data.estimatedBudget], ['', ''],
            ['EVENT DETAILS', ''], ['Number of Days', data.celebrationDays], ['Date Range', data.dateRange],
            ['Expected Guests', data.guestCount], ['', ''],
        ];
        
        if (data.eventType === 'Wedding') {
            rows.push(['WEDDING CEREMONIES', ''], ['Ceremonies', data.ceremonies.join(', ')], ['', '']);
            rows.push(['WEDDING STYLE', ''], ['Cultural Style', data.culturalStyle], ['Wedding Vibe', data.weddingVibe.join(', ')], ['', '']);
            rows.push(['WHAT MATTERS MOST', ''], ...data.signaturePriorities.map(p => ['Priority', p]), ['', '']);
        } else {
            rows.push(['WHAT MATTERS MOST', ''], ...data.signaturePriorities.map(p => ['Priority', p]), ['', '']);
        }
        
        rows.push(
            ['LOCATION & VENUE', ''], ['State/Region', data.state], ['District/City', data.city],
            ['Venue Preference', data.venueCategory.join(', ')], ['', ''],
            ['FOOD & ACCOMMODATION', ''], ['Food Preference', data.foodType.join(', ')],
            ['Food Details', data.foodExperience], ['Rooms Required', data.roomsRequired], ['', ''],
            ['ENTERTAINMENT', ''], ['Interested', data.needEntertainment === 'yes' ? 'Yes' : 'No']
        );
        
        if (data.needEntertainment === 'yes') {
            rows.push(['Entertainment Options', data.entertainmentOptions.join(', ')]);
        }
        
        rows.push(['', '']);
        rows.push(['DÉCOR & INSPIRATION', ''], ['Vision', data.decorInspiration], ['Reference Links', data.inspirationLink], ['', '']);
        rows.push(['VENDORS & DECISION', ''], ['Vendors Finalized', data.vendorFinalized === 'yes' ? 'Yes' : 'No']);
        
        if (data.vendorFinalized === 'yes') rows.push(['Finalized Vendors', data.finalizedVendors.join(', ')]);
        rows.push(['Decision Maker', data.decisionMaker], ['Finalize By', data.finaliseDeadline],
            ['Other Planners', data.otherPlanners], ['Sustainable Wedding', data.sustainableWedding],
            ['', ''], ['HOW YOU FOUND US', ''], ['Source', data.reachOutReason.join(', ')],
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

    // Email function
    const YOUR_EMAIL = 'logeshdev0117@gmail.com';
    
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
        emailBody += `Food Details: ${data.foodExperience}\n`;
        emailBody += `Rooms Required: ${data.roomsRequired}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `🎵 ENTERTAINMENT\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `Interested: ${data.needEntertainment === 'yes' ? 'Yes' : 'No'}\n`;
        if (data.needEntertainment === 'yes') {
            emailBody += `Options: ${data.entertainmentOptions.join(', ')}\n`;
        }
        emailBody += `\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `🎨 DÉCOR & INSPIRATION\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `Theme/Idea: ${data.decorInspiration}\n`;
        emailBody += `Reference Links: ${data.inspirationLink}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `👑 WHAT MATTERS MOST\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `${data.signaturePriorities.join('\n')}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `📢 HOW YOU FOUND US\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `${data.reachOutReason.join(', ')}\n\n`;
        
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `🤝 VENDORS & DECISION MAKING\n`;
        emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        emailBody += `Vendors Finalized: ${data.vendorFinalized === 'yes' ? 'Yes' : 'No'}\n`;
        if (data.vendorFinalized === 'yes') {
            emailBody += `Finalized Vendors: ${data.finalizedVendors.join(', ')}\n`;
        }
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
                    name: `${data.eventType} Enquiry: ${data.clientName}`, 
                    email: data.clientEmail, 
                    message: emailBody, 
                    _subject: `✨ NEW: ${data.eventType} Enquiry from ${data.clientName} ✨`,
                    _template: 'table'
                })
            });
            return response.ok;
        } catch { return false; }
    }

    // Google Sheets
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

    // Process submission
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
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 8000);
    }

    // Initialize premium interactions for priority cards
    initPremiumInteractions();

    // Form submit
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
            
            for (let i = 1; i <= totalSteps; i++) {
                if (!validateStep(i)) {
                    currentStep = i;
                    showStep(i);
                    return;
                }
            }
            
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Submitting...';
                submitBtn.disabled = true;
            }
            
            const data = collectFormData();
            const result = await processSubmission(data);
            
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
            
            if (result.emailOk || result.sheetsOk) {
                showStatus(`✨ ${data.clientName}, your vision is now safe with us. Within 24 hours, a senior experience designer will reach out with a mood board. Welcome to the Oh Yes family. ✨`, 'success');
                setTimeout(() => {
                    form.reset();
                    formWrapper.style.display = 'none';
                    if (startBtn) startBtn.style.display = 'inline-flex';
                    currentStep = 1;
                    showStep(1);
                }, 4000);
            } else {
                showStatus('Something went wrong. Please try again or contact us directly.', 'error');
            }
        });
    }
    
    showStep(1);
});
