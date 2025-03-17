document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const basePath = (currentPath.includes("/posts/") ||
        currentPath.includes("/img/") ||
        currentPath.includes("/pages/") ||
        currentPath.includes("/articles/"))
        ? "../" : "";

    const navbarHTML = `
    <nav id="navbar">
        <button class="hamburger" onclick="toggleMenu()"><i class="fa-solid fa-bars"></i></button>
        <div class="navbar" id="navbar-menu">
            <div class="nav-item active" onclick="showPlan('home', this)">Home</div>
            <div class="nav-item" onclick="showPlan('six-month', this)">Six-Month Plan (<i class="fa-solid fa-fire"></i>)</div>
            <div class="nav-item" onclick="showPlan('one-year-chrono', this)">1 Year Chronological Plan</div>

            <br>

            <!-- 
            <div class="nav-item" onclick="showPlan('generate', this)">Generate Plan <i class="fa-solid fa-wand-magic-sparkles"></i></div>
            

            <div class="nav-item" onclick="showPlan('one-year', this)">One-Year Plan</div>
            <div class="nav-item" onclick="showPlan('two-year', this)">Two-Year Plan</div>
            
            <div class="nav-item" onclick="showPlan('psalms-proverbs', this)">Psalms-Proverbs Plan</div>
            <div class="nav-item" onclick="showPlan('old-testament', this)">Old Testament Plan</div>
            <div class="nav-item" onclick="showPlan('new-testament', this)">New Testament Plan</div>
        </div>

        <div class="navbar" id="navbar-menu">
            <div class="nav-item" onclick="showPlan('about', this)">About</div>
        -->

            <a href="https://www.mattbramer.com" target="_blank" class="nav-item">Developer <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            <a href="https://github.com/bramermatt/bibleReadingPlans" target="_blank" class="nav-item">Open-Source Code <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>


    <div id="mobile-menu">
            <div class="nav-item active" onclick="showPlan('home', this)">Home</div>
            <div class="nav-item" onclick="showPlan('six-month', this)">Six-Month Plan (<i class="fa-solid fa-fire"></i>)</div>
            <div class="nav-item" onclick="showPlan('one-year-chrono', this)">1 Year Chronological Plan</div>

            <br>
            <!-- <div class="nav-item" onclick="showPlan('generate', this)">Generate Plan <i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div class="nav-item" onclick="showPlan('one-year', this)">One-Year Plan</div>
            <div class="nav-item" onclick="showPlan('two-year', this)">Two-Year Plan</div>
            
            <div class="nav-item" onclick="showPlan('psalms-proverbs', this)">Psalms-Proverbs Plan</div>
            <div class="nav-item" onclick="showPlan('old-testament', this)">Old Testament Plan</div>
            <div class="nav-item" onclick="showPlan('new-testament', this)">New Testament Plan</div>

            <div class="nav-item" onclick="showPlan('about', this)">About</div>
            -->

            <a href="https://www.mattbramer.com" target="_blank" class="nav-item">Developer <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            <a href="https://github.com/bramermatt/bibleReadingPlans" target="_blank" class="nav-item">Open-Source Code <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
        </div>
    </div>
        </nav>`;

        document.body.insertAdjacentHTML('afterbegin', navbarHTML); 

        const links = document.querySelectorAll('a[href^="#"]');
        const plans = document.querySelectorAll('.plan');
    
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetPlan = document.getElementById(targetId);
    
                plans.forEach(plan => {
                    plan.style.display = 'none';
                });
    
                if (targetPlan) {
                    targetPlan.style.display = 'block';
                    targetPlan.active = true;
                }
    
                // Update active class in the navigation menu
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
    
                const navItem = document.querySelector(`.nav-item[onclick="showPlan('${targetId}', this)"]`);
                if (navItem) {
                    navItem.classList.add('active');
                }
    
                // Close mobile menu after selecting a plan
                document.getElementById("mobile-menu").classList.remove("open");
                document.querySelector(".hamburger").classList.remove("open");
            });
        });
    });
    
    // Toggle menu function
    function toggleMenu() {
        const mobileMenu = document.getElementById("mobile-menu");
        const hamburger = document.querySelector(".hamburger");
        if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            hamburger.classList.remove("open");
        } else {
            mobileMenu.classList.add("open");
            hamburger.classList.add("open");
        }
    }
    
    // Function to handle navbar item activation
    function showPlan(planId, element) {
        document.querySelectorAll('.plan').forEach(plan => {
            plan.style.display = 'none';
        });
    
        const selectedPlan = document.getElementById(planId);
        if (selectedPlan) {
            selectedPlan.style.display = 'block';
        }
    
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
    
        element.classList.add('active');
    
        // Close menu on mobile after selecting a plan
        document.getElementById("mobile-menu").classList.remove("open");
        document.querySelector(".hamburger").classList.remove("open");
    }
    
    // Function to open the export modal
    function openModal() {
        document.getElementById("exportModal").style.display = "block";
    }
    
    // Function to close the export modal
    function closeModal() {
        document.getElementById("exportModal").style.display = "none";
    }
    
    // Function to export to PDF
    function exportToPDF() {
        const plans = document.querySelectorAll('.plan');
        let visiblePlan = null;
        plans.forEach(plan => {
            if (plan.style.display !== 'none') {
                visiblePlan = plan;
            }
        });
    
        if (visiblePlan) {
            const opt = {
                margin: 1,
                filename: 'Bible_Reading_Plan.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 1, useCORS: true }, // No scaling for fitting based on screen size
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(visiblePlan).set(opt).save();
        }
    }