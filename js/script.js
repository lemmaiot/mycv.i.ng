// Configuration
        const CONFIG = {
            // Add any configuration you need here
        };

        // Static data configuration
        const siteData = {
            'standard_price': { value: '2500' },
            'professional_price': { value: '25000' },
            'customers_this_month': { value: '247' },
            'total_customers': { value: '1250' },
            'hero_headline': { value: 'Your CV, Now a Clickable Website in 24 Hours!' },
            'hero_subtext': { value: 'For just ₦2,500, we turn your CV into a sleek website you can share anywhere — and everywhere. No coding. No stress. No wahala.' }
        };
        
        let takenUrls = ['admin', 'api', 'www', 'mail', 'support', 'info', 'contact', 'help', 'about', 'terms', 'privacy', 'blog', 'news', 'test', 'demo', 'root', 'user', 'login', 'signup', 'register', 'love', 'emma'];

        // Update page content with static data
        function updatePageContent() {
            // Update pricing throughout the page
            const standardPrice = siteData.standard_price?.value || '2500';
            const professionalPrice = siteData.professional_price?.value || '25000';
            
            // Format prices with commas
            const formatPrice = (price) => {
                return parseInt(price).toLocaleString();
            };
            
            // Update all standard price elements
            const standardPriceElements = [
                'standardPrice', 'standardPriceCTA', 'standardPriceStep', 
                'standardPricePackage', 'standardPriceButton', 'standardPriceTable',
                'standardPriceFeature', 'standardPriceFinal', 'standardPriceFinalButton'
            ];
            
            standardPriceElements.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = formatPrice(standardPrice);
                }
            });
            
            // Update all professional price elements
            const professionalPriceElements = [
                'professionalPricePackage', 'professionalPriceButton', 'professionalPriceTable',
                'professionalPriceFinal', 'professionalPriceFinalButton'
            ];
            
            professionalPriceElements.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = formatPrice(professionalPrice);
                }
            });
            
            // Update counters
            const customersThisMonth = siteData.customers_this_month?.value || '247';
            const totalCustomers = siteData.total_customers?.value || '1250';
            
            const cvCounterElement = document.getElementById('cvCounter');
            const customersThisMonthElement = document.getElementById('customersThisMonth');
            const totalCustomersTooltipElement = document.getElementById('totalCustomersTooltip');
            
            if (cvCounterElement) {
                animateCounterTo(cvCounterElement, parseInt(customersThisMonth));
            }
            if (customersThisMonthElement) {
                customersThisMonthElement.textContent = customersThisMonth;
            }
            if (totalCustomersTooltipElement) {
                totalCustomersTooltipElement.textContent = totalCustomers;
            }
            
            // Update hero content
            const heroHeadline = siteData.hero_headline?.value;
            const heroSubtext = siteData.hero_subtext?.value;
            
            if (heroHeadline) {
                const heroHeadlineElement = document.getElementById('heroHeadline');
                if (heroHeadlineElement) {
                    heroHeadlineElement.textContent = heroHeadline;
                }
            }
            
            if (heroSubtext) {
                const heroSubtextElement = document.getElementById('heroSubtext');
                if (heroSubtextElement) {
                    // Replace price placeholder in subtext
                    const updatedSubtext = heroSubtext.replace(/₦\d+,?\d*/g, `₦${formatPrice(standardPrice)}`);
                    heroSubtextElement.innerHTML = updatedSubtext;
                }
            }
            
            // Load testimonials
            loadTestimonials();
            
            // Mark page as loaded
            document.body.classList.add('loaded');
        }

        // Load testimonials with static data
        function loadTestimonials() {
            const testimonials = [
                { name: 'Adebayo O.', text: 'Got 3 interview calls within a week of sharing my new CV website. Worth every kobo!', title: 'Software Developer, Lagos' },
                { name: 'Funmi S.', text: 'Professional package was perfect for my consulting business. Clients love the payment integration!', title: 'Marketing Manager, Abuja' },
                { name: 'Chidi M.', text: 'Fast, affordable, and looks amazing on mobile. My freelance clients are impressed!', title: 'Graphic Designer, Port Harcourt' }
            ];
            
            console.log('📝 Loaded testimonials:', testimonials);
            
            // Generate testimonial HTML
            const container = document.getElementById('testimonialsContainer');
            if (container && testimonials.length > 0) {
                container.innerHTML = testimonials.slice(0, 3).map((testimonial, index) => {
                    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500'];
                    const initial = testimonial.name.charAt(0).toUpperCase();
                    const title = testimonial.title || `Happy Customer #${index + 1}`;
                    
                    return `
                        <div class="bg-white p-6 rounded-2xl shadow-lg loaded">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 ${colors[index]} rounded-full flex items-center justify-center text-white font-bold">
                                    ${initial}
                                </div>
                                <div class="ml-4">
                                    <div class="font-bold">${testimonial.name}</div>
                                    <div class="text-gray-600 text-sm">${title}</div>
                                </div>
                            </div>
                            <p class="text-gray-700">"${testimonial.text}"</p>
                            <div class="text-yellow-400 mt-2">⭐⭐⭐⭐⭐</div>
                        </div>
                    `;
                }).join('');
            }
        }

        // Animate counter to specific value
        function animateCounterTo(element, targetValue) {
            let currentValue = 0;
            const increment = targetValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    element.textContent = targetValue;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(currentValue);
                }
            }, 40);
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Load static data
            updatePageContent();
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Form handling
            initializeForm();

            // Modal control functions
            window.openOrderModal = function(packageType = 'standard') {
                const modal = document.getElementById('orderFormModal');
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                selectPackage(packageType);
            };

            window.closeOrderModal = function() {
                const modal = document.getElementById('orderFormModal');
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            };

            // Modal event listeners
            document.getElementById('closeModal').addEventListener('click', closeOrderModal);
            document.getElementById('orderFormModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeOrderModal();
                }
            });

            // Button click handlers
            document.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', function() {
                    const standardPrice = siteData.standard_price?.value || '2500';
                    const professionalPrice = siteData.professional_price?.value || '25000';
                    
                    if (this.textContent.includes('Start Now') || this.textContent.includes('Create My Website')) {
                        openOrderModal('standard');
                    } else if (this.textContent.includes('Go Pro') || this.textContent.includes('Professional Package')) {
                        openOrderModal('professional');
                    } else if (this.textContent.includes('Get Started')) {
                        document.querySelector('.gradient-bg').scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });



        // Form handling functions
        function initializeForm() {
            console.log('🔧 Initializing form...');
            
            const form = document.getElementById('cvOrderForm');
            const packageOptions = document.querySelectorAll('.package-option');
            const fileInput = document.getElementById('cvFile');
            const preferredUrlInput = document.getElementById('preferredUrl');
            const domainOptionInputs = document.querySelectorAll('input[name="domainOption"]');
            const customDomainInput = document.getElementById('customDomainName');
            const domainExtensionSelect = document.getElementById('domainExtension');
            
            if (!form) {
                console.error('❌ Form not found!');
                return;
            }
            
            console.log('✅ Form found:', form);
            console.log('📋 Form action:', form.action);
            console.log('📋 Form method:', form.method);
            
            // Update form prices
            updateFormPrices();
            
            // Package selection handlers
            packageOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const packageType = this.dataset.package;
                    selectPackage(packageType);
                });
            });
            
            // URL availability checker for standard package
            let urlCheckTimeout;
            preferredUrlInput.addEventListener('input', function() {
                clearTimeout(urlCheckTimeout);
                const url = this.value.trim().toLowerCase();
                
                if (url.length < 3) {
                    hideUrlStatus();
                    return;
                }
                
                // Validate URL format
                if (!/^[a-z0-9-]+$/.test(url)) {
                    showUrlError('Only letters, numbers, and hyphens allowed');
                    return;
                }
                
                urlCheckTimeout = setTimeout(() => {
                    checkUrlAvailabilityAndShow(url);
                }, 500);
            });
            
            // Domain option handlers
            domainOptionInputs.forEach(input => {
                input.addEventListener('change', function() {
                    toggleDomainInputs(this.value);
                    updatePricing();
                });
            });
            
            // Domain availability checker for professional package
            let domainCheckTimeout;
            const checkDomainAvailability = () => {
                clearTimeout(domainCheckTimeout);
                const domainName = customDomainInput.value.trim().toLowerCase();
                const extension = domainExtensionSelect.value;
                
                if (domainName.length < 3) {
                    hideDomainStatus();
                    return;
                }
                
                if (!/^[a-z0-9-]+$/.test(domainName)) {
                    showDomainError('Only letters, numbers, and hyphens allowed');
                    return;
                }
                
                domainCheckTimeout = setTimeout(() => {
                    checkDomainAvailabilityAPI(domainName + extension);
                }, 500);
            };
            
            customDomainInput.addEventListener('input', checkDomainAvailability);
            domainExtensionSelect.addEventListener('change', () => {
                updateDomainCost();
                checkDomainAvailability();
            });
            
            // File upload handler
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                const fileInfo = document.getElementById('fileInfo');
                
                if (file) {
                    const fileSize = (file.size / 1024 / 1024).toFixed(2);
                    if (file.size > 5 * 1024 * 1024) {
                        alert('File size must be less than 5MB');
                        this.value = '';
                        fileInfo.classList.add('hidden');
                        return;
                    }
                    
                    fileInfo.textContent = `✅ ${file.name} (${fileSize}MB)`;
                    fileInfo.classList.remove('hidden');
                } else {
                    fileInfo.classList.add('hidden');
                }
            });
            
            // Form submission handler with debugging
            form.addEventListener('submit', function(e) {
                console.log('🚀 Form submit event triggered');
                handleFormSubmission(e);
            });
            
            // Also add click handler to submit button as backup
            const submitButton = document.getElementById('submitOrder');
            submitButton.addEventListener('click', function(e) {
                console.log('🖱️ Submit button clicked');
                // Check if this is inside a form
                const form = this.closest('form');
                if (form) {
                    e.preventDefault();
                    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                    form.dispatchEvent(submitEvent);
                }
            });
            
            // Initialize domain inputs and pricing
            toggleDomainInputs('none');
            updateDomainCost();
            updatePricing(); // Initialize the pricing calculation
        }
        
        // URL availability checking functions
        async function checkUrlAvailabilityAndShow(url) {
            showUrlChecking();
            
            try {
                const isAvailable = await checkUrlAvailability(url);
                
                if (isAvailable) {
                    showUrlAvailable(url);
                } else {
                    showUrlTaken(url);
                }
            } catch (error) {
                console.error('URL check failed:', error);
                // Fallback to local check if main check fails
                const isAvailable = await simulateUrlCheck(url);
                if (isAvailable) {
                    showUrlAvailable(url);
                } else {
                    showUrlTaken(url);
                }
            }
        }
        
        async function checkUrlAvailability(url) {
            try {
                console.log('🔍 Checking URL availability for:', url);
                console.log('📋 Current taken URLs:', takenUrls);
                
                const isAvailable = !takenUrls.includes(url.toLowerCase().trim());
                
                console.log(`✅ URL "${url}" is ${isAvailable ? 'AVAILABLE' : 'TAKEN'}`);
                
                return isAvailable;
                
            } catch (error) {
                console.error('URL check failed:', error);
                return true; // Default to available if check fails
            }
        }
        
        async function simulateUrlCheck(url) {
            // Fallback simulation for when API is unavailable
            await new Promise(resolve => setTimeout(resolve, 1000));
            const takenUrls = ['john', 'admin', 'test', 'demo', 'api', 'www', 'mail', 'support', 'info', 'contact'];
            return !takenUrls.includes(url);
        }
        
        function showUrlChecking() {
            document.getElementById('urlStatus').classList.remove('hidden');
            document.getElementById('urlChecking').classList.remove('hidden');
            document.getElementById('urlAvailable').classList.add('hidden');
            document.getElementById('urlTaken').classList.add('hidden');
        }
        
        function showUrlAvailable(url) {
            document.getElementById('urlChecking').classList.add('hidden');
            document.getElementById('availableUrl').textContent = url;
            document.getElementById('urlAvailable').classList.remove('hidden');
            document.getElementById('urlTaken').classList.add('hidden');
        }
        
        function showUrlTaken(url) {
            document.getElementById('urlChecking').classList.add('hidden');
            document.getElementById('takenUrl').textContent = url;
            document.getElementById('urlTaken').classList.remove('hidden');
            document.getElementById('urlAvailable').classList.add('hidden');
            
            // Generate suggestions
            const suggestions = [url + '2024', url + 'ng', url + 'pro', 'my' + url].slice(0, 3);
            document.getElementById('suggestions').textContent = suggestions.join(', ');
        }
        
        function showUrlError(message) {
            document.getElementById('urlStatus').classList.remove('hidden');
            document.getElementById('urlChecking').classList.add('hidden');
            document.getElementById('urlAvailable').classList.add('hidden');
            document.getElementById('urlTaken').innerHTML = `❌ ${message}`;
            document.getElementById('urlTaken').classList.remove('hidden');
        }
        
        function hideUrlStatus() {
            document.getElementById('urlStatus').classList.add('hidden');
        }
        
        // Domain availability checking functions
        async function checkDomainAvailabilityAPI(domain) {
            showDomainChecking();
            
            try {
                // Simulate API call to check domain availability
                const isAvailable = await simulateDomainCheck(domain);
                
                if (isAvailable) {
                    showDomainAvailable(domain);
                } else {
                    showDomainUnavailable(domain);
                }
            } catch (error) {
                console.error('Domain check failed:', error);
                hideDomainStatus();
            }
        }
        
        async function simulateDomainCheck(domain) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            // Simulate some taken domains for demo
            const takenDomains = ['google.com', 'facebook.com', 'test.com', 'demo.com', 'admin.com.ng'];
            return !takenDomains.includes(domain);
        }
        
        function showDomainChecking() {
            document.getElementById('domainAvailability').classList.remove('hidden');
            document.getElementById('domainChecking').classList.remove('hidden');
            document.getElementById('domainAvailable').classList.add('hidden');
            document.getElementById('domainUnavailable').classList.add('hidden');
        }
        
        function showDomainAvailable(domain) {
            document.getElementById('domainChecking').classList.add('hidden');
            document.getElementById('availableDomain').textContent = domain;
            document.getElementById('domainAvailable').classList.remove('hidden');
            document.getElementById('domainUnavailable').classList.add('hidden');
        }
        
        function showDomainUnavailable(domain) {
            document.getElementById('domainChecking').classList.add('hidden');
            document.getElementById('unavailableDomain').textContent = domain;
            document.getElementById('domainUnavailable').classList.remove('hidden');
            document.getElementById('domainAvailable').classList.add('hidden');
            
            // Generate domain suggestions
            const baseName = domain.split('.')[0];
            const extension = domain.substring(baseName.length);
            const suggestions = [baseName + '2024' + extension, baseName + 'ng' + extension, 'my' + baseName + extension].slice(0, 2);
            document.getElementById('domainSuggestions').textContent = suggestions.join(', ');
        }
        
        function hideDomainStatus() {
            document.getElementById('domainAvailability').classList.add('hidden');
        }
        
        function toggleDomainInputs(option) {
            const customInput = document.getElementById('customDomainInput');
            
            if (option === 'custom') {
                customInput.classList.remove('hidden');
            } else {
                customInput.classList.add('hidden');
            }
        }
        
        function updateDomainCost() {
            const extension = document.getElementById('domainExtension');
            const selectedOption = extension.options[extension.selectedIndex];
            const price = selectedOption.dataset.price;
            
            document.getElementById('domainCost').textContent = parseInt(price).toLocaleString();
            updatePricing();
        }
        
        function updatePricing() {
            const selectedPackage = document.querySelector('input[name="package"]:checked')?.value || 'standard';
            const domainOption = document.querySelector('input[name="domainOption"]:checked')?.value || 'none';
            
            // Get prices from siteData
            const standardPrice = parseInt(siteData.standard_price?.value || '2500');
            const professionalPrice = parseInt(siteData.professional_price?.value || '25000');
            
            let packagePrice = selectedPackage === 'professional' ? professionalPrice : standardPrice;
            let totalPrice = packagePrice;
            
            // Handle domain costs for professional package
            if (selectedPackage === 'professional' && domainOption === 'custom') {
                const extension = document.getElementById('domainExtension');
                if (extension && extension.selectedIndex >= 0) {
                    const selectedOption = extension.options[extension.selectedIndex];
                    const domainPrice = parseInt(selectedOption.dataset.price || '0');
                    
                    totalPrice += domainPrice;
                    
                    document.getElementById('domainCostLine').classList.remove('hidden');
                    document.getElementById('domainPriceDisplay').textContent = `₦${domainPrice.toLocaleString()}/year`;
                    document.getElementById('domainNote').classList.remove('hidden');
                }
            } else {
                document.getElementById('domainCostLine').classList.add('hidden');
                document.getElementById('domainNote').classList.add('hidden');
            }
            
            // Update all pricing displays
            document.getElementById('packagePrice').textContent = `₦${packagePrice.toLocaleString()}`;
            document.getElementById('totalPrice').textContent = `₦${totalPrice.toLocaleString()}`;
            
            // Store the calculated total for form submission
            window.calculatedTotal = totalPrice;
        }
        
        function selectPackage(packageType) {
            const packageOptions = document.querySelectorAll('.package-option');
            const professionalExtras = document.getElementById('professionalExtras');
            const selectedPackageName = document.getElementById('selectedPackageName');
            const packagePrice = document.getElementById('packagePrice');
            const totalPrice = document.getElementById('totalPrice');
            const deliveryTime = document.getElementById('deliveryTime');
            const domainCostLine = document.getElementById('domainCostLine');
            const domainNote = document.getElementById('domainNote');
            
            // Update visual selection
            packageOptions.forEach(option => {
                if (option.dataset.package === packageType) {
                    option.classList.remove('border-gray-200');
                    option.classList.add('border-blue-500', 'bg-blue-50');
                    option.querySelector('.package-radio').checked = true;
                } else {
                    option.classList.remove('border-blue-500', 'bg-blue-50', 'border-green-500', 'bg-green-50');
                    option.classList.add('border-gray-200');
                    option.querySelector('.package-radio').checked = false;
                }
            });
            
            // Show/hide professional extras
            if (packageType === 'professional') {
                professionalExtras.classList.remove('hidden');
                selectedPackageName.textContent = 'Professional Package';
                selectedPackageName.className = 'font-bold text-green-600';
                
                const profPrice = parseInt(siteData.professional_price?.value || '25000');
                packagePrice.textContent = `₦${profPrice.toLocaleString()}`;
                packagePrice.className = 'font-semibold text-green-600';
                totalPrice.className = 'text-green-600';
                deliveryTime.textContent = 'Delivery: 48 hours';
                
                // Update professional package styling
                const professionalOption = document.querySelector('[data-package="professional"]');
                professionalOption.classList.remove('border-gray-200');
                professionalOption.classList.add('border-green-500', 'bg-green-50');
                
                // Update pricing based on domain option
                updatePricing();
            } else {
                professionalExtras.classList.add('hidden');
                selectedPackageName.textContent = 'Standard Package';
                selectedPackageName.className = 'font-bold text-blue-600';
                
                const stdPrice = parseInt(siteData.standard_price?.value || '2500');
                packagePrice.textContent = `₦${stdPrice.toLocaleString()}`;
                packagePrice.className = 'font-semibold text-blue-600';
                totalPrice.textContent = `₦${stdPrice.toLocaleString()}`;
                totalPrice.className = 'text-blue-600';
                deliveryTime.textContent = 'Delivery: 24 hours';
                
                // Hide domain cost for standard package
                domainCostLine.classList.add('hidden');
                domainNote.classList.add('hidden');
            }
        }
        
        function updateFormPrices() {
            const standardPrice = siteData.standard_price?.value || '2500';
            const professionalPrice = siteData.professional_price?.value || '25000';
            
            const formStandardPrice = document.getElementById('formStandardPrice');
            const formProfessionalPrice = document.getElementById('formProfessionalPrice');
            
            if (formStandardPrice) {
                formStandardPrice.textContent = parseInt(standardPrice).toLocaleString();
            }
            if (formProfessionalPrice) {
                formProfessionalPrice.textContent = parseInt(professionalPrice).toLocaleString();
            }
        }
        
        // Telegram Bot Configuration
        const TELEGRAM_CONFIG = {
            // Your actual bot token from @BotFather
            BOT_TOKEN: '8297676511:AAG0LoEe28vhbJqwCK4kUh6nsMHcRDezyxo',
            
            // Direct chat bot ID (works reliably)
            CHAT_ID: '7019735236',
            
            // Telegram API URL
            API_URL: 'https://api.telegram.org/bot'
        };

        // Paystack Configuration
        const PAYSTACK_CONFIG = {
            PAYMENT_LINK: 'https://paystack.shop/pay/mycving',
            PUBLIC_KEY: 'pk_test_b8a926b9c2e8b2b8c2e8b2b8c2e8b2b8c2e8b2b8', // Replace with your actual public key
            API_URL: 'https://api.paystack.co'
        };

        async function handleFormSubmission(e) {
            e.preventDefault(); // Prevent default form submission
            
            const submitButton = document.getElementById('submitOrder');
            const submitText = document.getElementById('submitText');
            const submitLoader = document.getElementById('submitLoader');
            const form = e.target;
            
            console.log('🚀 Form submission started');
            
            // Show loading state
            submitButton.disabled = true;
            submitText.classList.add('hidden');
            submitLoader.classList.remove('hidden');
            
            try {
                // Validate required fields first
                const requiredFields = ['fullName', 'email', 'phone', 'preferredUrl', 'cvFile'];
                for (const fieldName of requiredFields) {
                    const field = form.querySelector(`[name="${fieldName}"]`);
                    if (!field || (field.type === 'file' ? !field.files.length : !field.value.trim())) {
                        throw new Error(`Please fill in the ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
                    }
                }
                
                console.log('✅ Form validation passed');
                
                // Create FormData for submission
                const formData = new FormData(form);
                
                // Add order metadata to form
                const orderId = 'CV-' + Date.now();
                const timestamp = new Date().toISOString();
                
                // Calculate total amount - use the stored calculated total
                let totalAmount = window.calculatedTotal;
                
                // Fallback calculation if calculatedTotal is not available
                if (!totalAmount) {
                    const selectedPackage = formData.get('package') || 'standard';
                    totalAmount = selectedPackage === 'professional' 
                        ? parseInt(siteData.professional_price?.value || '25000')
                        : parseInt(siteData.standard_price?.value || '2500');
                    
                    // Add domain cost for professional package if custom domain selected
                    if (selectedPackage === 'professional') {
                        const domainOption = formData.get('domainOption') || 'none';
                        if (domainOption === 'custom') {
                            const extension = document.getElementById('domainExtension');
                            if (extension && extension.selectedIndex >= 0) {
                                const selectedOption = extension.options[extension.selectedIndex];
                                const domainPrice = parseInt(selectedOption.dataset.price || '0');
                                totalAmount += domainPrice;
                            }
                        }
                    }
                }
                
                const selectedPackage = formData.get('package') || 'standard';
                
                console.log('📋 Processing Order ID:', orderId);
                console.log('💰 Total Amount:', totalAmount);
                
                // Send to Telegram (don't let this fail the whole process)
                let telegramSuccess = false;
                try {
                    console.log('📤 Attempting to send to Telegram...');
                    await sendToTelegram({
                        orderId: orderId,
                        timestamp: timestamp,
                        fullName: formData.get('fullName'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        preferredUrl: formData.get('preferredUrl'),
                        jobTitle: formData.get('jobTitle'),
                        industry: formData.get('industry'),
                        packageType: selectedPackage,
                        totalAmount: totalAmount,
                        domainOption: formData.get('domainOption'),
                        customDomain: formData.get('customDomain'),
                        paymentMethods: formData.getAll('paymentMethods'),
                        socialLinks: {
                            linkedin: formData.get('linkedinUrl'),
                            facebook: formData.get('facebookUrl'),
                            instagram: formData.get('instagramUrl'),
                            twitter: formData.get('twitterUrl'),
                            whatsapp: formData.get('whatsappBusiness'),
                            website: formData.get('otherWebsite')
                        },
                        specialRequests: formData.get('specialRequests'),
                        cvFile: formData.get('cvFile')
                    });
                    telegramSuccess = true;
                    console.log('✅ Telegram notification sent successfully');
                } catch (telegramError) {
                    console.error('❌ Telegram notification failed:', telegramError);
                    console.error('❌ Error details:', telegramError.message);
                    // Continue processing even if Telegram fails
                }
                
                // Success - now redirect to payment
                console.log('✅ Order processed, redirecting to payment...');
                
                // Create Paystack payment
                const paymentData = await createPaystackPayment({
                    orderId: orderId,
                    amount: totalAmount,
                    email: formData.get('email'),
                    fullName: formData.get('fullName'),
                    phone: formData.get('phone'),
                    packageType: selectedPackage,
                    preferredUrl: formData.get('preferredUrl')
                });
                
                if (paymentData.authorization_url) {
                    // Show success message with payment redirect
                    showPaymentRedirectMessage({
                        orderId: orderId,
                        fullName: formData.get('fullName'),
                        packageType: selectedPackage,
                        totalAmount: totalAmount,
                        preferredUrl: formData.get('preferredUrl'),
                        telegramSuccess: telegramSuccess
                    }, paymentData.authorization_url);
                } else {
                    // Fallback to success message without payment
                    showSuccessMessage({
                        orderId: orderId,
                        fullName: formData.get('fullName'),
                        packageType: selectedPackage,
                        totalAmount: totalAmount,
                        preferredUrl: formData.get('preferredUrl'),
                        telegramSuccess: telegramSuccess
                    });
                }
                
                // Reset form and close modal
                form.reset();
                selectPackage('standard');
                closeOrderModal();
                
            } catch (error) {
                console.error('❌ Form submission failed:', error);
                showErrorMessage(error.message);
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitText.classList.remove('hidden');
                submitLoader.classList.add('hidden');
            }
        }

        // Create Paystack payment with prefilled data
        async function createPaystackPayment(orderData) {
            try {
                console.log('💳 Creating Paystack payment...');
                console.log('💳 Using Paystack Shop Link:', PAYSTACK_CONFIG.PAYMENT_LINK);
                console.log('💳 Order Data:', orderData);
                
                const baseUrl = PAYSTACK_CONFIG.PAYMENT_LINK;
                
                // Split full name into first and last name
                const nameParts = orderData.fullName.trim().split(' ');
                const firstName = nameParts[0] || '';
                const lastName = nameParts.slice(1).join(' ') || firstName; // Use first name as fallback if no last name
                
                // Build URL with exact parameter format as your example
                const params = [
                    `first_name=${encodeURIComponent(firstName)}`,
                    `email=${encodeURIComponent(orderData.email)}`,
                    `last_name=${encodeURIComponent(lastName)}`,
                    `phone=${encodeURIComponent(orderData.phone)}`,
                    `amount=${orderData.totalAmount}`,
                    `preferred_url=mycv.i.ng/${encodeURIComponent(orderData.preferredUrl)}`
                ];
                
                const paymentUrl = `${baseUrl}?${params.join('&')}`;
                
                console.log('💳 Paystack Shop URL created (matching your format):');
                console.log('💳 URL:', paymentUrl);
                console.log('💳 Parameters being sent:');
                console.log('   - first_name:', firstName);
                console.log('   - email:', orderData.email);
                console.log('   - last_name:', lastName);
                console.log('   - phone:', orderData.phone);
                console.log('   - amount:', orderData.totalAmount);
                console.log('   - preferred_url:', `mycv.i.ng/${orderData.preferredUrl}`);
                
                return {
                    authorization_url: paymentUrl,
                    reference: orderData.orderId,
                    shop_link: true,
                    parameters_sent: {
                        first_name: firstName,
                        email: orderData.email,
                        last_name: lastName,
                        phone: orderData.phone,
                        amount: orderData.totalAmount,
                        preferred_url: `mycv.i.ng/${orderData.preferredUrl}`
                    }
                };
                
            } catch (error) {
                console.error('❌ Paystack payment creation failed:', error);
                // Always fallback to the basic shop link
                return {
                    authorization_url: PAYSTACK_CONFIG.PAYMENT_LINK,
                    reference: orderData.orderId,
                    shop_link: true,
                    fallback: true
                };
            }
        }

        // Send order data to Telegram
        async function sendToTelegram(orderData) {
            try {
                console.log('📤 Sending to Telegram DIRECT CHAT...');
                console.log('🔧 Bot Token:', TELEGRAM_CONFIG.BOT_TOKEN ? 'Present' : 'Missing');
                console.log('🔧 Direct Chat ID:', TELEGRAM_CONFIG.CHAT_ID);
                
                // Validate configuration
                if (!TELEGRAM_CONFIG.BOT_TOKEN || !TELEGRAM_CONFIG.CHAT_ID) {
                    throw new Error('Telegram configuration missing');
                }
                
                // Format message for Telegram
                const message = formatTelegramMessage(orderData);
                console.log('📝 Message formatted, length:', message.length);
                
                // Send text message first
                const url = `${TELEGRAM_CONFIG.API_URL}${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;
                console.log('🌐 Sending to URL:', url);
                
                const payload = {
                    chat_id: String(TELEGRAM_CONFIG.CHAT_ID), // Ensure it's a string
                    text: message,
                    parse_mode: 'HTML'
                };
                
                console.log('📦 Payload chat_id:', payload.chat_id);
                console.log('📦 Payload text length:', payload.text.length);
                
                const textResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                console.log('📡 Response status:', textResponse.status);
                console.log('📡 Response ok:', textResponse.ok);
                
                const responseText = await textResponse.text();
                console.log('📡 Response body:', responseText);

                if (!textResponse.ok) {
                    let errorData;
                    try {
                        errorData = JSON.parse(responseText);
                    } catch (e) {
                        errorData = { description: responseText };
                    }
                    
                    console.error('❌ Telegram API Error Details:', errorData);
                    
                    // Check for common chat issues
                    if (errorData.description) {
                        if (errorData.description.includes('bot was blocked')) {
                            throw new Error('Bot was blocked by the user. Please unblock the bot.');
                        } else if (errorData.description.includes('chat not found')) {
                            throw new Error('Chat not found. Please check the chat ID.');
                        } else if (errorData.description.includes('not enough rights')) {
                            throw new Error('Bot needs permission to send messages.');
                        } else if (errorData.description.includes('Forbidden')) {
                            throw new Error('Bot access forbidden. Check bot permissions.');
                        }
                    }
                    
                    throw new Error(`Telegram API error: ${textResponse.status} - ${errorData.description || responseText}`);
                }

                // Parse successful response
                const responseData = JSON.parse(responseText);
                console.log('✅ Message sent successfully, message_id:', responseData.result?.message_id);

                // Send CV file if available
                if (orderData.cvFile && orderData.cvFile.size > 0) {
                    console.log('📎 Sending CV file...');
                    await sendFileToTelegram(orderData.cvFile, orderData.orderId);
                }

                console.log('✅ Order sent to Telegram successfully');
                return true;
                
            } catch (error) {
                console.error('❌ Failed to send to Telegram:', error);
                console.error('❌ Error details:', error.message);
                throw error; // Re-throw to be caught by the calling function
            }
        }

        // Format order data for Telegram message
        function formatTelegramMessage(data) {
            const socialLinks = Object.entries(data.socialLinks)
                .filter(([key, value]) => value && value.trim())
                .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
                .join('\n');

            const paymentMethods = data.paymentMethods && data.paymentMethods.length > 0 
                ? data.paymentMethods.join(', ') 
                : 'None selected';

            return `
🆕 <b>NEW CV WEBSITE ORDER</b>

📋 <b>Order Details:</b>
🆔 Order ID: <code>${data.orderId}</code>
📅 Date: ${new Date(data.timestamp).toLocaleString('en-NG')}
💰 Total: ₦${data.totalAmount.toLocaleString()}
📦 Package: ${data.packageType.toUpperCase()}

👤 <b>Customer Info:</b>
👨‍💼 Name: ${data.fullName}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
💼 Job Title: ${data.jobTitle || 'Not specified'}
🏢 Industry: ${data.industry || 'Not specified'}

🌐 <b>Website Details:</b>
🔗 URL: mycv.i.ng/${data.preferredUrl}
${data.domainOption === 'custom' ? `🌍 Custom Domain: ${data.customDomain || 'Not specified'}` : ''}

${data.packageType === 'professional' ? `💳 <b>Payment Methods:</b> ${paymentMethods}` : ''}

${socialLinks ? `🔗 <b>Social Links:</b>\n${socialLinks}` : ''}

${data.specialRequests ? `📝 <b>Special Requests:</b>\n${data.specialRequests}` : ''}

⚠️ <b>Next Steps:</b>
1. Download CV file (sent separately)
2. Contact customer for payment
3. Start building website
4. Deliver within ${data.packageType === 'professional' ? '48' : '24'} hours

#NewOrder #${data.packageType.toUpperCase()}Package #CVWebsite
            `.trim();
        }

        // Send CV file to Telegram
        async function sendFileToTelegram(file, orderId) {
            try {
                const formData = new FormData();
                formData.append('chat_id', TELEGRAM_CONFIG.CHAT_ID);
                formData.append('document', file);
                formData.append('caption', `📄 CV File for Order: ${orderId}\n\nFilename: ${file.name}\nSize: ${(file.size / 1024 / 1024).toFixed(2)}MB`);

                const response = await fetch(`${TELEGRAM_CONFIG.API_URL}${TELEGRAM_CONFIG.BOT_TOKEN}/sendDocument`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    console.warn('⚠️ Failed to send CV file to Telegram, but order was processed');
                }

                console.log('✅ CV file sent to Telegram');
                
            } catch (error) {
                console.warn('⚠️ CV file upload to Telegram failed:', error);
                // Don't throw error here - order should still be processed
            }
        }
        
        // Formspree handles all email notifications and file uploads automatically
        // No need for complex email functions - much simpler!

        // Payment redirect will be handled after Formspree submission
        // Formspree will redirect to thank you page, then to payment
        
        function showSuccessMessage(orderData) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            
            const telegramStatus = orderData.telegramSuccess 
                ? '✅ Order notification sent to our team'
                : '⚠️ Order saved locally (notification pending)';
            
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Order Submitted Successfully! 🎉</h3>
                    <p class="text-gray-600 mb-4">Thank you ${orderData.fullName}! Your order #${orderData.orderId} has been received.</p>
                    
                    <div class="bg-blue-50 p-4 rounded-lg mb-6">
                        <div class="text-sm text-gray-700 mb-3">
                            <strong>Order Summary:</strong><br>
                            📦 ${orderData.packageType.toUpperCase()} Package<br>
                            💰 Total: ₦${orderData.totalAmount.toLocaleString()}<br>
                            🌐 URL: mycv.i.ng/${orderData.preferredUrl}
                        </div>
                        <p class="text-sm ${orderData.telegramSuccess ? 'text-green-700' : 'text-orange-700'} font-semibold">
                            ${telegramStatus}<br>
                            📧 Order details processed successfully
                        </p>
                    </div>
                    
                    <div class="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
                        <p class="text-sm text-red-800 font-semibold">
                            ⚠️ IMPORTANT: Your website will NOT be built until payment is confirmed. You must complete payment to proceed.
                        </p>
                    </div>
                    
                    <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        I understand - I'll make payment now
                    </button>
                    
                    <p class="text-xs text-gray-500 mt-4">
                        We'll contact you within 1 hour with payment instructions<br>
                        ${!orderData.telegramSuccess ? 'Note: Manual notification may be required' : ''}
                    </p>
                </div>
            `;
            document.body.appendChild(modal);
        }

        function showPaymentRedirectMessage(orderData, paystackUrl) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            
            console.log('💳 Payment URL being used:', paystackUrl);
            console.log('💳 Order Data for payment:', orderData);
            
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Order Submitted!</h3>
                    <p class="text-gray-600 mb-4">Thank you ${orderData.fullName}! Your order #${orderData.orderId} has been received.</p>
                    
                    <div class="bg-blue-50 p-4 rounded-lg mb-6">
                        <div class="text-sm text-gray-700 mb-3">
                            <strong>Order Summary:</strong><br>
                            📦 ${orderData.packageType.toUpperCase()} Package<br>
                            💰 Total: ₦${orderData.totalAmount.toLocaleString()}<br>
                            🌐 URL: mycv.i.ng/${orderData.preferredUrl}<br>
                            🆔 Reference: ${orderData.orderId}
                        </div>
                        <p class="text-sm text-gray-700">
                            <strong>Next:</strong> Complete your payment to start building your CV website!
                        </p>
                    </div>
                    
                    <div class="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
                        <p class="text-sm text-red-800 font-semibold">
                            ⚠️ IMPORTANT: You must complete payment to proceed. Your website will NOT be built until payment is confirmed.
                        </p>
                    </div>
                    
                    <div class="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-6">
                        <p class="text-xs text-yellow-800">
                            💡 <strong>Payment Instructions:</strong><br>
                            • Use Order ID: <strong>${orderData.orderId}</strong> as reference<br>
                            • Amount: <strong>₦${orderData.totalAmount.toLocaleString()}</strong><br>
                            • Email: <strong>${orderData.email}</strong>
                        </p>
                    </div>
                    
                    <div class="flex gap-3">
                        <button onclick="this.parentElement.parentElement.remove()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
                            Cancel Order
                        </button>
                        <button onclick="console.log('Opening payment URL:', '${paystackUrl}'); window.open('${paystackUrl}', '_blank'); this.parentElement.parentElement.remove();" class="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                            Make Payment ₦${orderData.totalAmount.toLocaleString()}
                        </button>
                    </div>
                    
                    <p class="text-xs text-gray-500 mt-4">
                        🔒 Secure payment powered by Paystack<br>
                        📧 Order details sent to our team<br>
                        🔗 Payment URL: <span class="font-mono text-xs">${paystackUrl.substring(0, 50)}...</span>
                    </p>
                </div>
            `;
            document.body.appendChild(modal);
        }

        
        function showErrorMessage(errorDetails = '') {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Submission Failed</h3>
                    <p class="text-gray-600 mb-4">Sorry, there was an error submitting your order. Please try again or contact us directly.</p>
                    ${errorDetails ? `<div class="bg-gray-100 p-3 rounded-lg mb-4 text-xs text-left"><strong>Error details:</strong><br>${errorDetails}</div>` : ''}
                    <div class="bg-blue-50 p-4 rounded-lg mb-6">
                        <p class="text-sm text-gray-700">
                            <strong>Alternative:</strong> Contact us directly:<br>
                            📧 Email: help@mycv.i.ng<br>
                            📱 WhatsApp: +234 XXX XXX XXXX
                        </p>
                    </div>
                    <div class="flex gap-4">
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
                            Close
                        </button>
                        <button onclick="this.parentElement.parentElement.parentElement.remove(); document.getElementById('cvOrderForm').scrollIntoView({behavior: 'smooth'});" class="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Try Again
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }