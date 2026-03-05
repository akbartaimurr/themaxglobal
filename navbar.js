class Navbar {
  constructor() {
    this.scrolled = false;
    this.servicesDropdownOpen = false;
    this.isClosing = false;
    this.timeoutRef = null;
    this.init();
  }

  getHomeHref() {
    try {
      const scriptSrc = document.currentScript && document.currentScript.src;
      if (scriptSrc) {
        return new URL('./index.html#home', scriptSrc).href;
      }
    } catch (e) {
    }

    return '/';
  }

  init() {
    this.injectNavbar();
    this.setupEventListeners();
  }

  injectNavbar() {
    const homeHref = this.getHomeHref();
    const navbarHTML = `
      <header id="navbar" class="fixed inset-x-0 top-0 z-50 transition-all duration-150 border-b border-transparent">
        <nav class="relative mx-auto flex h-20 md:h-28 max-w-screen-2xl items-center justify-between gap-3 px-3 sm:px-4" aria-label="Primary">
          <a href="${homeHref}" class="flex items-center gap-3 mr-2 md:mr-8">
            <div class="flex flex-col items-center">
              <img src="/assets/logo2.png" alt="Logo" width="190" height="190" class="rounded-lg" style="max-width: 150px; height: auto;">
              <span id="logoSubtitle" class="mt-1 hidden text-xs font-medium text-white md:block">Accounting | Finance | Taxation</span>
            </div>
          </a>

          <button type="button" onclick="toggleMobileMenu()" class="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div id="navLinks" class="hidden items-center gap-6 text-sm font-medium md:flex transition-colors duration-300 text-white">
            <a href="#home" class="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 hover:text-white/80">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Home
            </a>
            <a href="#about" class="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 hover:text-white/80">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              About Us
            </a>
            <a href="#team" class="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 hover:text-white/80">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Our Team
            </a>
            <div class="relative" id="servicesDropdown">
              <div class="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 cursor-pointer hover:text-white/80" id="servicesDropdownTrigger">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Services
                <svg id="servicesChevron" class="h-3 w-3 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <div id="servicesDropdownMenu" class="hidden">
                <div class="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                <div class="absolute top-full left-0 mt-3 w-80 rounded-2xl shadow-2xl border transition-all duration-300 ease-out transform origin-top bg-white border-gray-200">
                  <div class="py-3">
                    <a href="/tax-accounting/" class="flex items-center gap-3 px-5 py-4 text-sm font-normal font-sans rounded-xl mx-2 text-black" style="color: black !important;">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      Tax & Accounting Services
                    </a>
                    <a href="/corporate-tax-vat/" class="flex items-center gap-3 px-5 py-4 text-sm font-normal font-sans rounded-xl mx-2 text-black" style="color: black !important;">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Corporate Tax & VAT Advisory
                    </a>
                    <a href="/aml-compliance/" class="flex items-center gap-3 px-5 py-4 text-sm font-normal font-sans rounded-xl mx-2 text-black" style="color: black !important;">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      AML Compliance Services
                    </a>
                    <a href="/service-financial-solutions/" class="flex items-center gap-3 px-5 py-4 text-sm font-normal font-sans rounded-xl mx-2 text-black" style="color: black !important;">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                      Financial Solutions & Advisory
                    </a>
                    <a href="/business-formation/" class="flex items-center gap-3 px-5 py-4 text-sm font-normal font-sans rounded-xl mx-2 text-black" style="color: black !important;">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      Business Formation & Management
                    </a>
                    <a href="/cost-control-risk-management/" class="flex items-center gap-3 px-5 py-4 text-sm font-normal font-sans rounded-xl mx-2 text-black" style="color: black !important;">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                      Cost Control & Risk Management
                    </a>
                    <a href="/international-tax-structuring/" class="flex items-center gap-3 px-5 py-4 text-sm font-normal font-sans rounded-xl mx-2 text-black" style="color: black !important;">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2 2 2 0 012 2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      International Tax Structuring
                    </a>
                    <a href="/service-erp-accounting-system/" class="flex items-center gap-3 px-5 py-4 text-sm font-normal font-sans rounded-xl mx-2 text-black" style="color: black !important;">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                      </svg>
                      ERP & Accounting System
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden md:flex flex-1 items-center justify-end gap-3">
            <button onclick="openContactModal()" class="hidden h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-300 sm:inline-flex cursor-pointer bg-white text-black hover:bg-white/90">
              Book a consultation
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
          </div>

          <div id="mobileMenu" class="hidden md:hidden absolute top-full inset-x-0 mt-2 px-3">
            <div class="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden">
              <div class="p-3 space-y-2 text-white">
                <a href="#home" class="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-white/10">Home</a>
                <a href="#about" class="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-white/10">About Us</a>
                <a href="#team" class="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-white/10">Our Team</a>
                <a href="#faq" class="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-white/10">FAQ</a>

                <div class="pt-1">
                  <div class="px-4 py-2 text-xs font-semibold text-white/70">Services</div>
                  <a href="/tax-accounting/" class="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">Tax &amp; Accounting Services</a>
                  <a href="/corporate-tax-vat/" class="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">Corporate Tax &amp; VAT Advisory</a>
                  <a href="/aml-compliance/" class="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">AML Compliance Services</a>
                  <a href="/service-financial-solutions/" class="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">Financial Solutions &amp; Advisory</a>
                  <a href="/business-formation/" class="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">Business Formation &amp; Management</a>
                  <a href="/cost-control-risk-management/" class="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">Cost Control &amp; Risk Management</a>
                  <a href="/international-tax-structuring/" class="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">International Tax Structuring</a>
                  <a href="/service-erp-accounting-system/" class="block rounded-xl px-4 py-3 text-sm hover:bg-white/10">ERP &amp; Accounting System</a>
                </div>

                <button type="button" onclick="openContactModal(); closeMobileMenu();" class="mt-2 w-full inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black shadow-sm">
                  Book a consultation
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    window.toggleMobileMenu = function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      if (!menu) return;
      menu.classList.toggle('hidden');
    };

    window.closeMobileMenu = function closeMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      if (!menu) return;
      menu.classList.add('hidden');
    };
  }

  setupEventListeners() {
    window.addEventListener('scroll', () => {
      const isScrolled = window.scrollY > 20;
      const navbar = document.getElementById('navbar');
      const navLinks = document.getElementById('navLinks');
      
      if (isScrolled !== this.scrolled) {
        this.scrolled = isScrolled;
        
        if (isScrolled) {
          navbar.classList.remove('bg-transparent', 'border-transparent');
          navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'border-b', 'border-gray-200/50');
          navLinks.classList.remove('text-white');
          navLinks.classList.add('text-black');
          
          const logoSubtitle = document.getElementById('logoSubtitle');
          if (logoSubtitle) {
            logoSubtitle.classList.remove('text-white');
            logoSubtitle.classList.add('text-black');
          }
          
          navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('hover:text-white/80');
            link.classList.add('hover:text-black/80');
          });
          
          const servicesDropdownTrigger = document.getElementById('servicesDropdownTrigger');
          if (servicesDropdownTrigger) {
            servicesDropdownTrigger.classList.remove('hover:text-white/80');
            servicesDropdownTrigger.classList.add('hover:text-black/80');
          }
          
          const bookConsultationBtn = document.querySelector('[onclick*="openContactModal"]');
          if (bookConsultationBtn) {
            bookConsultationBtn.classList.remove('bg-white', 'text-black');
            bookConsultationBtn.classList.add('bg-[#0E946C]', 'text-white');
          }
        } else {
          navbar.classList.add('bg-transparent', 'border-transparent');
          navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'border-b', 'border-gray-200/50');
          navLinks.classList.add('text-white');
          navLinks.classList.remove('text-black');
          
          const logoSubtitle = document.getElementById('logoSubtitle');
          if (logoSubtitle) {
            logoSubtitle.classList.add('text-white');
            logoSubtitle.classList.remove('text-black');
          }
          
          navLinks.querySelectorAll('a').forEach(link => {
            link.classList.add('hover:text-white/80');
            link.classList.remove('hover:text-black/80');
          });
          
          const servicesDropdownTrigger = document.getElementById('servicesDropdownTrigger');
          if (servicesDropdownTrigger) {
            servicesDropdownTrigger.classList.add('hover:text-white/80');
            servicesDropdownTrigger.classList.remove('hover:text-black/80');
          }
          
          const bookConsultationBtn = document.querySelector('[onclick*="openContactModal"]');
          if (bookConsultationBtn) {
            bookConsultationBtn.classList.add('bg-white', 'text-black');
            bookConsultationBtn.classList.remove('bg-[#0E946C]', 'text-white');
          }
        }
        
        const dropdownItems = document.querySelectorAll('#servicesDropdownMenu a');
        dropdownItems.forEach(item => {
          item.classList.remove('text-gray-700');
          item.classList.add('text-gray-900');
          item.classList.remove('hover:bg-gray-800');
          item.classList.add('hover:bg-gray-100');
          item.classList.add('text-black');
        });
      }
    });

    const servicesDropdown = document.getElementById('servicesDropdown');
    const servicesDropdownMenu = document.getElementById('servicesDropdownMenu');
    const servicesChevron = document.getElementById('servicesChevron');

    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          window.closeMobileMenu();
        });
      });
    }

    if (servicesDropdown) {
      servicesDropdown.addEventListener('mouseenter', () => {
        if (this.timeoutRef) {
          clearTimeout(this.timeoutRef);
        }
        this.isClosing = false;
        this.servicesDropdownOpen = true;
        servicesDropdownMenu.classList.remove('hidden');
        servicesChevron.classList.add('rotate-180');
      });

      servicesDropdown.addEventListener('mouseleave', () => {
        this.isClosing = true;
        this.timeoutRef = setTimeout(() => {
          this.servicesDropdownOpen = false;
          this.isClosing = false;
          servicesDropdownMenu.classList.add('hidden');
          servicesChevron.classList.remove('rotate-180');
        }, 150);
      });

      servicesDropdownMenu.addEventListener('mouseenter', () => {
        if (this.timeoutRef) {
          clearTimeout(this.timeoutRef);
        }
        this.isClosing = false;
      });

      servicesDropdownMenu.addEventListener('mouseleave', () => {
        this.isClosing = true;
        this.timeoutRef = setTimeout(() => {
          this.servicesDropdownOpen = false;
          this.isClosing = false;
          servicesDropdownMenu.classList.add('hidden');
          servicesChevron.classList.remove('rotate-180');
        }, 150);
      });
    }

    window.addEventListener('beforeunload', () => {
      if (this.timeoutRef) {
        clearTimeout(this.timeoutRef);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
});
