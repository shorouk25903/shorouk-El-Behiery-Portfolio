/* ==========================================================================
   Shorouk El-Behiery - Cybersecurity Portfolio Scripts
   Features: Cyber Loading Screen, Typewriter Effect, Theme Switcher,
             Project Filter & Modal Viewer, Scroll Reveal, Contact Form Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Loading Screen Animation & Role Cycling
  // ==========================================================================
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingRoleText = document.getElementById('loadingRoleText');
  const loadingBar = document.getElementById('loadingBar');

  if (loadingScreen) {
    const roles = [
      '[System Initializing...]',
      'DEPI Pen Testing Trainee',
      'Vulnerability Analyst',
      'CCNA Certified',
      'Ethical Hacking Enthusiast',
      'Red & Blue Team Practitioner',
      'IoT & Robotics Builder'
    ];

    let roleIndex = 0;
    let progress = 0;

    const roleInterval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      if (loadingRoleText) {
        loadingRoleText.textContent = roles[roleIndex];
      }
    }, 400);

    const progressInterval = setInterval(() => {
      progress += Math.random() * 20 + 10;
      if (progress > 100) progress = 100;
      if (loadingBar) loadingBar.style.width = progress + '%';
    }, 150);

    const hideLoadingScreen = () => {
      clearInterval(roleInterval);
      clearInterval(progressInterval);
      if (loadingBar) loadingBar.style.width = '100%';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    };

    window.addEventListener('load', () => {
      setTimeout(hideLoadingScreen, 1200);
    });

    // Fallback maximum timeout
    setTimeout(hideLoadingScreen, 3000);
    document.body.style.overflow = 'hidden';
  }

  // ==========================================================================
  // 2. Typewriter Effect for Hero Title
  // ==========================================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const rolesToType = [
      'DEPI Pen Testing Trainee',
      'Vulnerability Analyst',
      'CCNA Certified Engineer',
      'Ethical Hacking Enthusiast',
      'Red & Blue Team Practitioner',
      'Cybersecurity Student'
    ];

    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = rolesToType[currentRoleIdx];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, currentCharIdx - 1);
        currentCharIdx--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, currentCharIdx + 1);
        currentCharIdx++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIdx === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && currentCharIdx === 0) {
        isDeleting = false;
        currentRoleIdx = (currentRoleIdx + 1) % rolesToType.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ==========================================================================
  // 3. Theme Switcher (Dark / Light Mode)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const darkIcon = document.querySelector('.dark-icon');
  const lightIcon = document.querySelector('.light-icon');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (darkIcon) darkIcon.style.display = 'none';
    if (lightIcon) lightIcon.style.display = 'inline-block';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');

      localStorage.setItem('theme', isLight ? 'light' : 'dark');

      if (darkIcon && lightIcon) {
        darkIcon.style.display = isLight ? 'none' : 'inline-block';
        lightIcon.style.display = isLight ? 'inline-block' : 'none';
      }
    });
  }

  // ==========================================================================
  // 4. Mobile Drawer Navigation Menu
  // ==========================================================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Header Scroll Shadow
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link highlight
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. Projects Filter Grid & Modal Viewer
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Modal Dialog Logic
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  const projectDetailsMap = {
    'ad-lab': {
      title: 'Active Directory Penetration Testing Lab',
      category: 'Penetration Testing & Red-Teaming',
      tech: 'Windows Server, Kali Linux, Metasploit, PowerShell, Mimikatz',
      description: `
        <p style="margin-bottom: 1rem;">This independent enterprise lab project simulates a full corporate Windows domain environment designed for offensive security assessments and threat emulation.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Key Objectives & Actions Executed:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Constructed a multi-VM virtual infrastructure featuring Active Directory Domain Controller and domain-joined workstations.</li>
          <li>Executed initial access and reconnaissance via enumeration tools and network scanning (Nmap).</li>
          <li>Performed credential dumping, Kerberoasting, and privilege escalation using PowerShell scripts and Metasploit modules.</li>
          <li>Demonstrated lateral movement across domain nodes to evaluate domain dominance risks.</li>
          <li>Composed a comprehensive remediation report detailing GPO hardening, password policies, and detection rules.</li>
        </ul>
      `
    },
    'ctf-challenges': {
      title: 'Capture The Flag (CTF) Practice & Exploitation',
      category: 'Practical Exploitation & CTFs',
      tech: 'Burp Suite, Wireshark, Python, Ghidra, Web Security Labs',
      description: `
        <p style="margin-bottom: 1rem;">Active participation in competitive Capture The Flag events and security platforms (TryHackMe, HackTheBox, local CTFs).</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Achievements & Highlights:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Solved 20+ exploitation challenges spanning Web Security (SQLi, XSS, IDOR), Network Traffic Analysis, and Binary Exploitation.</li>
          <li>Utilized Burp Suite Professional features for intercepting HTTP traffic and analyzing parameter tampering vulnerabilities.</li>
          <li>Analyzed pcap packet captures with Wireshark to identify cleartext credential leaks and suspicious protocol behavior.</li>
          <li>Demonstrated systematic root-cause analysis and vulnerability reporting skills.</li>
        </ul>
      `
    },
    'network-sec': {
      title: 'Network Architecture & Infrastructure Defense',
      category: 'Networking & Security',
      tech: 'Cisco Packet Tracer, CCNA Protocols, VLANs, ACLs, Subnetting',
      description: `
        <p style="margin-bottom: 1rem;">Architecting resilient campus networks built on CCNA fundamentals with robust access control and segmentation policies.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Technical Implementation:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Designed hierarchical network topologies with VLAN segmentation to isolate sensitive departmental traffic.</li>
          <li>Configured inter-VLAN routing, OSPF/EIGRP protocols, and STP (Spanning Tree Protocol) redundancy.</li>
          <li>Implemented Access Control Lists (ACLs) and Port Security rules to defend against MAC flooding and unauthorized access.</li>
          <li>Calculated IPv4/IPv6 VLSM subnet schemes to optimize IP distribution and subnet boundaries.</li>
        </ul>
      `
    },
    'smart-home': {
      title: 'Smart Home IoT System',
      category: 'IoT & Embedded Systems',
      tech: 'Arduino, Motor Shield, Sensors, TinkerCad, Smart Automation',
      description: `
        <p style="margin-bottom: 1rem;">A hands-on Smart Home project completed at Simple Steps Academy, integrating multiple IoT technologies for creative home automation and control.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Project Highlights:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Designed sensor-driven automation for lighting, temperature, and motion detection.</li>
          <li>Programmed Arduino microcontrollers with Motor Shield for actuator control.</li>
          <li>Built and simulated electronic circuits on TinkerCad before physical deployment.</li>
          <li>Combined creativity, technology, and teamwork for an end-to-end IoT solution.</li>
        </ul>
      `
    },
    'mcit-academy': {
      title: 'MCIT Cybersecurity Academy (Undergraduate Level)',
      category: 'Professional Training & Certification',
      tech: 'Kali Linux, Nessus, Burp Suite, Metasploit, Red & Blue Team Labs',
      description: `
        <p style="margin-bottom: 1rem;">Comprehensive cybersecurity training organized by the Ministry of Communications and Information Technology (MCIT) in collaboration with the National Telecommunication Institute (NTI) and NTRA — completed in August 2025.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Technical Skills Gained:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Mastered Network Security Fundamentals and Kali Linux operations.</li>
          <li>Learned Vulnerability Assessment & Exploitation using Nessus, Burp Suite, and Metasploit.</li>
          <li>Participated in Red & Blue Team exercises (offensive and defensive security).</li>
          <li>Built knowledge in Web Application Security, Threat Hunting, and Log Analysis.</li>
        </ul>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Professional & Soft Skills Enhanced:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Freelancing platforms mastery and professional portfolio building.</li>
          <li>Personal branding and identifying Unique Selling Proposition (USP).</li>
          <li>Communication, teamwork, analytical thinking, and time management under pressure.</li>
        </ul>
      `
    }
  };

  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const details = projectDetailsMap[projectId];

      if (details && modalOverlay) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = `
          <div style="margin-bottom: 1rem;">
            <span style="font-size: 0.85rem; color: var(--accent-cyan); background: rgba(56,189,248,0.1); padding: 0.3rem 0.8rem; border-radius: 99px; border: 1px solid rgba(56,189,248,0.25); font-weight:600;">${details.category}</span>
          </div>
          <div style="margin-bottom: 1.2rem; font-family: var(--font-code); font-size: 0.88rem; color: var(--text-muted);">
            <strong>Tools:</strong> ${details.tech}
          </div>
          ${details.description}
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 6. Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Animate skill bars if inside skill section
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Trigger skill bars on load if already in view
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const targetWidth = bar.getAttribute('data-width');
    if (targetWidth) bar.style.width = targetWidth;
  });

  // ==========================================================================
  // 7. Contact Form Simulation & Toast Feedback
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const message = document.getElementById('formMessage').value;

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--accent-green)';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

});
/* ==========================================================================
   Shorouk El-Behiery - Cybersecurity Portfolio Scripts
   Features: Cyber Loading Screen, Typewriter Effect, Theme Switcher,
             Project Filter & Modal Viewer, Scroll Reveal, Contact Form Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Loading Screen Animation & Role Cycling
  // ==========================================================================
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingRoleText = document.getElementById('loadingRoleText');
  const loadingBar = document.getElementById('loadingBar');

  if (loadingScreen) {
    const roles = [
      '[System Initializing...]',
      'DEPI Pen Testing Trainee',
      'Vulnerability Analyst',
      'CCNA Certified',
      'Ethical Hacking Enthusiast',
      'Red & Blue Team Practitioner',
      'IoT & Robotics Builder'
    ];

    let roleIndex = 0;
    let progress = 0;

    const roleInterval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      if (loadingRoleText) {
        loadingRoleText.textContent = roles[roleIndex];
      }
    }, 400);

    const progressInterval = setInterval(() => {
      progress += Math.random() * 20 + 10;
      if (progress > 100) progress = 100;
      if (loadingBar) loadingBar.style.width = progress + '%';
    }, 150);

    const hideLoadingScreen = () => {
      clearInterval(roleInterval);
      clearInterval(progressInterval);
      if (loadingBar) loadingBar.style.width = '100%';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    };

    window.addEventListener('load', () => {
      setTimeout(hideLoadingScreen, 1200);
    });

    // Fallback maximum timeout
    setTimeout(hideLoadingScreen, 3000);
    document.body.style.overflow = 'hidden';
  }

  // ==========================================================================
  // 2. Typewriter Effect for Hero Title
  // ==========================================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const rolesToType = [
      'DEPI Pen Testing Trainee',
      'Vulnerability Analyst',
      'CCNA Certified Engineer',
      'Ethical Hacking Enthusiast',
      'Red & Blue Team Practitioner',
      'Cybersecurity Student'
    ];

    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = rolesToType[currentRoleIdx];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, currentCharIdx - 1);
        currentCharIdx--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, currentCharIdx + 1);
        currentCharIdx++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIdx === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && currentCharIdx === 0) {
        isDeleting = false;
        currentRoleIdx = (currentRoleIdx + 1) % rolesToType.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ==========================================================================
  // 3. Theme Switcher (Dark / Light Mode)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const darkIcon = document.querySelector('.dark-icon');
  const lightIcon = document.querySelector('.light-icon');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (darkIcon) darkIcon.style.display = 'none';
    if (lightIcon) lightIcon.style.display = 'inline-block';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');

      localStorage.setItem('theme', isLight ? 'light' : 'dark');

      if (darkIcon && lightIcon) {
        darkIcon.style.display = isLight ? 'none' : 'inline-block';
        lightIcon.style.display = isLight ? 'inline-block' : 'none';
      }
    });
  }

  // ==========================================================================
  // 4. Mobile Drawer Navigation Menu
  // ==========================================================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Header Scroll Shadow
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link highlight
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. Projects Filter Grid & Modal Viewer
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Modal Dialog Logic
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  const projectDetailsMap = {
    'ad-lab': {
      title: 'Active Directory Penetration Testing Lab',
      category: 'Penetration Testing & Red-Teaming',
      tech: 'Windows Server, Kali Linux, Metasploit, PowerShell, Mimikatz',
      description: `
        <p style="margin-bottom: 1rem;">This independent enterprise lab project simulates a full corporate Windows domain environment designed for offensive security assessments and threat emulation.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Key Objectives & Actions Executed:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Constructed a multi-VM virtual infrastructure featuring Active Directory Domain Controller and domain-joined workstations.</li>
          <li>Executed initial access and reconnaissance via enumeration tools and network scanning (Nmap).</li>
          <li>Performed credential dumping, Kerberoasting, and privilege escalation using PowerShell scripts and Metasploit modules.</li>
          <li>Demonstrated lateral movement across domain nodes to evaluate domain dominance risks.</li>
          <li>Composed a comprehensive remediation report detailing GPO hardening, password policies, and detection rules.</li>
        </ul>
      `
    },
    'ctf-challenges': {
      title: 'Capture The Flag (CTF) Practice & Exploitation',
      category: 'Practical Exploitation & CTFs',
      tech: 'Burp Suite, Wireshark, Python, Ghidra, Web Security Labs',
      description: `
        <p style="margin-bottom: 1rem;">Active participation in competitive Capture The Flag events and security platforms (TryHackMe, HackTheBox, local CTFs).</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Achievements & Highlights:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Solved 20+ exploitation challenges spanning Web Security (SQLi, XSS, IDOR), Network Traffic Analysis, and Binary Exploitation.</li>
          <li>Utilized Burp Suite Professional features for intercepting HTTP traffic and analyzing parameter tampering vulnerabilities.</li>
          <li>Analyzed pcap packet captures with Wireshark to identify cleartext credential leaks and suspicious protocol behavior.</li>
          <li>Demonstrated systematic root-cause analysis and vulnerability reporting skills.</li>
        </ul>
      `
    },
    'network-sec': {
      title: 'Network Architecture & Infrastructure Defense',
      category: 'Networking & Security',
      tech: 'Cisco Packet Tracer, CCNA Protocols, VLANs, ACLs, Subnetting',
      description: `
        <p style="margin-bottom: 1rem;">Architecting resilient campus networks built on CCNA fundamentals with robust access control and segmentation policies.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Technical Implementation:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Designed hierarchical network topologies with VLAN segmentation to isolate sensitive departmental traffic.</li>
          <li>Configured inter-VLAN routing, OSPF/EIGRP protocols, and STP (Spanning Tree Protocol) redundancy.</li>
          <li>Implemented Access Control Lists (ACLs) and Port Security rules to defend against MAC flooding and unauthorized access.</li>
          <li>Calculated IPv4/IPv6 VLSM subnet schemes to optimize IP distribution and subnet boundaries.</li>
        </ul>
      `
    },
    'smart-home': {
      title: 'Smart Home IoT System',
      category: 'IoT & Embedded Systems',
      tech: 'Arduino, Motor Shield, Sensors, TinkerCad, Smart Automation',
      description: `
        <p style="margin-bottom: 1rem;">A hands-on Smart Home project completed at Simple Steps Academy, integrating multiple IoT technologies for creative home automation and control.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Project Highlights:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Designed sensor-driven automation for lighting, temperature, and motion detection.</li>
          <li>Programmed Arduino microcontrollers with Motor Shield for actuator control.</li>
          <li>Built and simulated electronic circuits on TinkerCad before physical deployment.</li>
          <li>Combined creativity, technology, and teamwork for an end-to-end IoT solution.</li>
        </ul>
      `
    },
    'mcit-academy': {
      title: 'MCIT Cybersecurity Academy (Undergraduate Level)',
      category: 'Professional Training & Certification',
      tech: 'Kali Linux, Nessus, Burp Suite, Metasploit, Red & Blue Team Labs',
      description: `
        <p style="margin-bottom: 1rem;">Comprehensive cybersecurity training organized by the Ministry of Communications and Information Technology (MCIT) in collaboration with the National Telecommunication Institute (NTI) and NTRA — completed in August 2025.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Technical Skills Gained:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Mastered Network Security Fundamentals and Kali Linux operations.</li>
          <li>Learned Vulnerability Assessment & Exploitation using Nessus, Burp Suite, and Metasploit.</li>
          <li>Participated in Red & Blue Team exercises (offensive and defensive security).</li>
          <li>Built knowledge in Web Application Security, Threat Hunting, and Log Analysis.</li>
        </ul>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Professional & Soft Skills Enhanced:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Freelancing platforms mastery and professional portfolio building.</li>
          <li>Personal branding and identifying Unique Selling Proposition (USP).</li>
          <li>Communication, teamwork, analytical thinking, and time management under pressure.</li>
        </ul>
      `
    }
  };

  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const details = projectDetailsMap[projectId];

      if (details && modalOverlay) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = `
          <div style="margin-bottom: 1rem;">
            <span style="font-size: 0.85rem; color: var(--accent-cyan); background: rgba(56,189,248,0.1); padding: 0.3rem 0.8rem; border-radius: 99px; border: 1px solid rgba(56,189,248,0.25); font-weight:600;">${details.category}</span>
          </div>
          <div style="margin-bottom: 1.2rem; font-family: var(--font-code); font-size: 0.88rem; color: var(--text-muted);">
            <strong>Tools:</strong> ${details.tech}
          </div>
          ${details.description}
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 6. Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Animate skill bars if inside skill section
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Trigger skill bars on load if already in view
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const targetWidth = bar.getAttribute('data-width');
    if (targetWidth) bar.style.width = targetWidth;
  });

  // ==========================================================================
  // 7. Contact Form Simulation & Toast Feedback
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const message = document.getElementById('formMessage').value;

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--accent-green)';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

});
/* ==========================================================================
   Shorouk El-Behiery - Cybersecurity Portfolio Scripts
   Features: Cyber Loading Screen, Typewriter Effect, Theme Switcher,
             Project Filter & Modal Viewer, Scroll Reveal, Contact Form Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Loading Screen Animation & Role Cycling
  // ==========================================================================
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingRoleText = document.getElementById('loadingRoleText');
  const loadingBar = document.getElementById('loadingBar');

  if (loadingScreen) {
    const roles = [
      '[System Initializing...]',
      'DEPI Pen Testing Trainee',
      'Vulnerability Analyst',
      'CCNA Certified',
      'Ethical Hacking Enthusiast',
      'Red & Blue Team Practitioner',
      'IoT & Robotics Builder'
    ];

    let roleIndex = 0;
    let progress = 0;

    const roleInterval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      if (loadingRoleText) {
        loadingRoleText.textContent = roles[roleIndex];
      }
    }, 400);

    const progressInterval = setInterval(() => {
      progress += Math.random() * 20 + 10;
      if (progress > 100) progress = 100;
      if (loadingBar) loadingBar.style.width = progress + '%';
    }, 150);

    const hideLoadingScreen = () => {
      clearInterval(roleInterval);
      clearInterval(progressInterval);
      if (loadingBar) loadingBar.style.width = '100%';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    };

    window.addEventListener('load', () => {
      setTimeout(hideLoadingScreen, 1200);
    });

    // Fallback maximum timeout
    setTimeout(hideLoadingScreen, 3000);
    document.body.style.overflow = 'hidden';
  }

  // ==========================================================================
  // 2. Typewriter Effect for Hero Title
  // ==========================================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const rolesToType = [
      'DEPI Pen Testing Trainee',
      'Vulnerability Analyst',
      'CCNA Certified Engineer',
      'Ethical Hacking Enthusiast',
      'Red & Blue Team Practitioner',
      'Cybersecurity Student'
    ];

    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = rolesToType[currentRoleIdx];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, currentCharIdx - 1);
        currentCharIdx--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, currentCharIdx + 1);
        currentCharIdx++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIdx === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && currentCharIdx === 0) {
        isDeleting = false;
        currentRoleIdx = (currentRoleIdx + 1) % rolesToType.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ==========================================================================
  // 3. Theme Switcher (Dark / Light Mode)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const darkIcon = document.querySelector('.dark-icon');
  const lightIcon = document.querySelector('.light-icon');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (darkIcon) darkIcon.style.display = 'none';
    if (lightIcon) lightIcon.style.display = 'inline-block';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');

      localStorage.setItem('theme', isLight ? 'light' : 'dark');

      if (darkIcon && lightIcon) {
        darkIcon.style.display = isLight ? 'none' : 'inline-block';
        lightIcon.style.display = isLight ? 'inline-block' : 'none';
      }
    });
  }

  // ==========================================================================
  // 4. Mobile Drawer Navigation Menu
  // ==========================================================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Header Scroll Shadow
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link highlight
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. Projects Filter Grid & Modal Viewer
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Modal Dialog Logic
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  const projectDetailsMap = {
    'ad-lab': {
      title: 'Active Directory Penetration Testing Lab',
      category: 'Penetration Testing & Red-Teaming',
      tech: 'Windows Server, Kali Linux, Metasploit, PowerShell, Mimikatz',
      description: `
        <p style="margin-bottom: 1rem;">This independent enterprise lab project simulates a full corporate Windows domain environment designed for offensive security assessments and threat emulation.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Key Objectives & Actions Executed:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Constructed a multi-VM virtual infrastructure featuring Active Directory Domain Controller and domain-joined workstations.</li>
          <li>Executed initial access and reconnaissance via enumeration tools and network scanning (Nmap).</li>
          <li>Performed credential dumping, Kerberoasting, and privilege escalation using PowerShell scripts and Metasploit modules.</li>
          <li>Demonstrated lateral movement across domain nodes to evaluate domain dominance risks.</li>
          <li>Composed a comprehensive remediation report detailing GPO hardening, password policies, and detection rules.</li>
        </ul>
      `
    },
    'ctf-challenges': {
      title: 'Capture The Flag (CTF) Practice & Exploitation',
      category: 'Practical Exploitation & CTFs',
      tech: 'Burp Suite, Wireshark, Python, Ghidra, Web Security Labs',
      description: `
        <p style="margin-bottom: 1rem;">Active participation in competitive Capture The Flag events and security platforms (TryHackMe, HackTheBox, local CTFs).</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Achievements & Highlights:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Solved 20+ exploitation challenges spanning Web Security (SQLi, XSS, IDOR), Network Traffic Analysis, and Binary Exploitation.</li>
          <li>Utilized Burp Suite Professional features for intercepting HTTP traffic and analyzing parameter tampering vulnerabilities.</li>
          <li>Analyzed pcap packet captures with Wireshark to identify cleartext credential leaks and suspicious protocol behavior.</li>
          <li>Demonstrated systematic root-cause analysis and vulnerability reporting skills.</li>
        </ul>
      `
    },
    'network-sec': {
      title: 'Network Architecture & Infrastructure Defense',
      category: 'Networking & Security',
      tech: 'Cisco Packet Tracer, CCNA Protocols, VLANs, ACLs, Subnetting',
      description: `
        <p style="margin-bottom: 1rem;">Architecting resilient campus networks built on CCNA fundamentals with robust access control and segmentation policies.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Technical Implementation:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Designed hierarchical network topologies with VLAN segmentation to isolate sensitive departmental traffic.</li>
          <li>Configured inter-VLAN routing, OSPF/EIGRP protocols, and STP (Spanning Tree Protocol) redundancy.</li>
          <li>Implemented Access Control Lists (ACLs) and Port Security rules to defend against MAC flooding and unauthorized access.</li>
          <li>Calculated IPv4/IPv6 VLSM subnet schemes to optimize IP distribution and subnet boundaries.</li>
        </ul>
      `
    },
    'smart-home': {
      title: 'Smart Home IoT System',
      category: 'IoT & Embedded Systems',
      tech: 'Arduino, Motor Shield, Sensors, TinkerCad, Smart Automation',
      description: `
        <p style="margin-bottom: 1rem;">A hands-on Smart Home project completed at Simple Steps Academy, integrating multiple IoT technologies for creative home automation and control.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Project Highlights:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Designed sensor-driven automation for lighting, temperature, and motion detection.</li>
          <li>Programmed Arduino microcontrollers with Motor Shield for actuator control.</li>
          <li>Built and simulated electronic circuits on TinkerCad before physical deployment.</li>
          <li>Combined creativity, technology, and teamwork for an end-to-end IoT solution.</li>
        </ul>
      `
    },
    'mcit-academy': {
      title: 'MCIT Cybersecurity Academy (Undergraduate Level)',
      category: 'Professional Training & Certification',
      tech: 'Kali Linux, Nessus, Burp Suite, Metasploit, Red & Blue Team Labs',
      description: `
        <p style="margin-bottom: 1rem;">Comprehensive cybersecurity training organized by the Ministry of Communications and Information Technology (MCIT) in collaboration with the National Telecommunication Institute (NTI) and NTRA — completed in August 2025.</p>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Technical Skills Gained:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Mastered Network Security Fundamentals and Kali Linux operations.</li>
          <li>Learned Vulnerability Assessment & Exploitation using Nessus, Burp Suite, and Metasploit.</li>
          <li>Participated in Red & Blue Team exercises (offensive and defensive security).</li>
          <li>Built knowledge in Web Application Security, Threat Hunting, and Log Analysis.</li>
        </ul>
        <h4 style="color: var(--accent-cyan); margin: 1rem 0 0.5rem 0;">Professional & Soft Skills Enhanced:</h4>
        <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
          <li>Freelancing platforms mastery and professional portfolio building.</li>
          <li>Personal branding and identifying Unique Selling Proposition (USP).</li>
          <li>Communication, teamwork, analytical thinking, and time management under pressure.</li>
        </ul>
      `
    }
  };

  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const details = projectDetailsMap[projectId];

      if (details && modalOverlay) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = `
          <div style="margin-bottom: 1rem;">
            <span style="font-size: 0.85rem; color: var(--accent-cyan); background: rgba(56,189,248,0.1); padding: 0.3rem 0.8rem; border-radius: 99px; border: 1px solid rgba(56,189,248,0.25); font-weight:600;">${details.category}</span>
          </div>
          <div style="margin-bottom: 1.2rem; font-family: var(--font-code); font-size: 0.88rem; color: var(--text-muted);">
            <strong>Tools:</strong> ${details.tech}
          </div>
          ${details.description}
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 6. Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Animate skill bars if inside skill section
        const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Trigger skill bars on load if already in view
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const targetWidth = bar.getAttribute('data-width');
    if (targetWidth) bar.style.width = targetWidth;
  });

  // ==========================================================================
  // 7. Contact Form Simulation & Toast Feedback
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const message = document.getElementById('formMessage').value;

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--accent-green)';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

});
